// Copyright (c) 2017-2022 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

#include "internal.h"

#include "readable.h"
#include "writable.h"

#include <workerd/api/util.h>
#include <workerd/io/features.h>
#include <workerd/jsg/jsg.h>
#include <workerd/util/string-buffer.h>

#include <kj/vector.h>

namespace workerd::api {

namespace {
// Use this in places where the exception thrown would cause finalizers to run. Your exception
// will not go anywhere, but we'll log the exception message to the console until the problem this
// papers over is fixed.
[[noreturn]] void throwTypeErrorAndConsoleWarn(kj::StringPtr message) {
  if (IoContext::hasCurrent()) {
    auto& context = IoContext::current();
    if (context.isInspectorEnabled()) {
      context.logWarning(kj::str(message));
    }
  }

  kj::throwFatalException(kj::Exception(kj::Exception::Type::FAILED, __FILE__, __LINE__,
      kj::str(JSG_EXCEPTION(TypeError) ": ", message)));
}

kj::Promise<void> pumpTo(ReadableStreamSource& input, WritableStreamSink& output, bool end) {
  kj::byte buffer[4096]{};

  while (true) {
    auto amount = co_await input.tryRead(buffer, 1, kj::size(buffer));

    if (amount == 0) {
      if (end) {
        co_await output.end();
      }
      co_return;
    }

    co_await output.write(kj::arrayPtr(buffer, amount));
  }
}

// Modified from AllReader in kj/async-io.c++.
class AllReader final {
 public:
  explicit AllReader(ReadableStreamSource& input, uint64_t limit): input(input), limit(limit) {
    JSG_REQUIRE(limit > 0, TypeError, "Memory limit exceeded before EOF.");
    KJ_IF_SOME(length, input.tryGetLength(StreamEncoding::IDENTITY)) {
      // Oh hey, we might be able to bail early.
      JSG_REQUIRE(length < limit, TypeError, "Memory limit would be exceeded before EOF.");
    }
  }
  KJ_DISALLOW_COPY_AND_MOVE(AllReader);

  kj::Promise<kj::Array<kj::byte>> readAllBytes() {
    return read<kj::byte>();
  }

  kj::Promise<kj::String> readAllText() {
    auto data = co_await read<char>(ReadOption::NULL_TERMINATE);
    co_return kj::String(kj::mv(data));
  }

 private:
  ReadableStreamSource& input;
  uint64_t limit;

  enum class ReadOption {
    NONE,
    NULL_TERMINATE,
  };

  template <typename T>
  kj::Promise<kj::Array<T>> read(ReadOption option = ReadOption::NONE) {
    // There are a few complexities in this operation that make it difficult to completely
    // optimize. The most important is that even if a stream reports an expected length
    // using tryGetLength, we really don't know how much data the stream will produce until
    // we try to read it. The only signal we have that the stream is done producing data
    // is a zero-length result from tryRead. Unfortunately, we have to allocate a buffer
    // in advance of calling tryRead so we have to guess a bit at the size of the buffer
    // to allocate.
    //
    // In the previous implementation of this method, we would just blindly allocate a
    // 4096 byte buffer on every allocation, limiting each read iteration to a maximum
    // of 4096 bytes. This works fine for streams producing a small amount of data but
    // risks requiring a greater number of loop iterations and small allocations for streams
    // that produce larger amounts of data. Also in the previous implementation, every
    // loop iteration would allocate a new buffer regardless of how much of the previous
    // allocation was actually used -- so a stream that produces only 4000 bytes total
    // but only provides 10 bytes per iteration would end up with 400 reads and 400 4096
    // byte allocations. Doh! Fortunately our stream implementations tend to be a bit
    // smarter than that but it's still a worst case possibility that it's likely better
    // to avoid.
    //
    // So this implementation does things a bit differently.
    // First, we check to see if the stream can give an estimate on how much data it
    // expects to produce. If that length is within a given threshold, then best case
    // is we can perform the entire read with at most two allocations and two calls to
    // tryRead. The first allocation will be for the entire expected size of the stream,
    // which the first tryRead will attempt to fulfill completely. In the best case the
    // stream provides all of the data. The next allocation would be smaller and would
    // end up resulting in a zero-length read signaling that we are done. Hooray!
    //
    // Not everything can be best case scenario tho, unfortunately. If our first tryRead
    // does not fully consume the stream or fully fill the destination buffer, we're
    // going to need to try again. It is possible that the new allocation in the next
    // iteration will be wasted if the stream doesn't have any more data so it's important
    // for us to try to be conservative with the allocation. If the running total of data
    // we've seen so far is equal to or greater than the expected total length of the stream,
    // then the most likely case is that the next read will be zero-length -- but unfortunately
    // we can't know for sure! So for this we will fall back to a more conservative allocation
    // which is either 4096 bytes or the calculated amountToRead, whichever is the lower number.

    kj::Vector<kj::Array<T>> parts;
    uint64_t runningTotal = 0;
    static constexpr uint64_t MIN_BUFFER_CHUNK = 1024;
    static constexpr uint64_t DEFAULT_BUFFER_CHUNK = 4096;
    static constexpr uint64_t MAX_BUFFER_CHUNK = DEFAULT_BUFFER_CHUNK * 4;

    // If we know in advance how much data we'll be reading, then we can attempt to
    // optimize the loop here by setting the value specifically so we are only
    // allocating at most twice. But, to be safe, let's enforce an upper bound on each
    // allocation even if we do know the total.
    kj::Maybe<uint64_t> maybeLength = input.tryGetLength(StreamEncoding::IDENTITY);

    // The amountToRead is the regular allocation size we'll use right up until we've
    // read the number of expected bytes (if known). This number is calculated as the
    // minimum of (limit, MAX_BUFFER_CHUNK, maybeLength or DEFAULT_BUFFER_CHUNK). In
    // the best case scenario, this number is calculated such that we can read the
    // entire stream in one go if the amount of data is small enough and the stream
    // is well behaved.
    // If the stream does report a length, once we've read that number of bytes, we'll
    // fallback to the conservativeAllocation.
    uint64_t amountToRead =
        kj::min(limit, kj::min(MAX_BUFFER_CHUNK, maybeLength.orDefault(DEFAULT_BUFFER_CHUNK)));
    // amountToRead can be zero if the stream reported a zero-length. While the stream could
    // be lying about its length, let's skip reading anything in this case.
    if (amountToRead > 0) {
      for (;;) {
        auto bytes = kj::heapArray<T>(amountToRead);
        // Note that we're passing amountToRead as the *minBytes* here so the tryRead should
        // attempt to fill the entire buffer. If it doesn't, the implication is that we read
        // everything.
        uint64_t amount = co_await input.tryRead(bytes.begin(), amountToRead, amountToRead);
        KJ_DASSERT(amount <= amountToRead);

        runningTotal += amount;
        JSG_REQUIRE(runningTotal < limit, TypeError, "Memory limit exceeded before EOF.");

        if (amount < amountToRead) {
          // The stream has indicated that we're all done by returning a value less than the
          // full buffer length.
          // It is possible/likely that at least some amount of data was written to the buffer.
          // In which case we want to add that subset to the parts list here before we exit
          // the loop.
          if (amount > 0) {
            parts.add(bytes.first(amount).attach(kj::mv(bytes)));
          }
          break;
        }

        // Because we specify minSize equal to maxSize in the tryRead above, we should only
        // get here if the buffer was completely filled by the read. If it wasn't completely
        // filled, that is an indication that the stream is complete which is handled above.
        KJ_DASSERT(amount == bytes.size());
        parts.add(kj::mv(bytes));

        // If the stream provided an expected length and our running total is equal to
        // or greater than that length then we assume we're done.
        KJ_IF_SOME(length, maybeLength) {
          if (runningTotal >= length) {
            // We've read everything we expect to read but some streams need to be read
            // completely in order to properly finish and other streams might lie (although
            // they shouldn't). Sigh. So we're going to make the next allocation potentially
            // smaller and keep reading until we get a zero length. In the best case, the next
            // read is going to be zero length but we have to try which will require at least
            // one additional (potentially wasted) allocation. (If we don't there are multiple
            // test failures).
            amountToRead = kj::min(MIN_BUFFER_CHUNK, amountToRead);
            continue;
          }
        }
      }
    }

    KJ_IF_SOME(length, maybeLength) {
      if (runningTotal > length) {
        // Realistically runningTotal should never be more than length so we'll emit
        // a warning if it is just so we know. It would be indicative of a bug somewhere
        // in the implementation.
        KJ_LOG(WARNING, "ReadableStream provided more data than advertised", runningTotal, length);
      }
    }

    if (option == ReadOption::NULL_TERMINATE) {
      auto out = kj::heapArray<T>(runningTotal + 1);
      out[runningTotal] = '\0';
      copyInto<T>(out, parts.asPtr());
      co_return kj::mv(out);
    }

    // As an optimization, if there's only a single part in the list, we can avoid
    // further copies.
    if (parts.size() == 1) {
      co_return kj::mv(parts[0]);
    }

    auto out = kj::heapArray<T>(runningTotal);
    copyInto<T>(out, parts.asPtr());
    co_return kj::mv(out);
  }

  template <typename T>
  void copyInto(kj::ArrayPtr<T> out, kj::ArrayPtr<kj::Array<T>> in) {
    size_t pos = 0;
    for (auto& part: in) {
      KJ_DASSERT(part.size() <= out.size() - pos);
      memcpy(out.begin() + pos, part.begin(), part.size());
      pos += part.size();
    }
  }
};

kj::Exception reasonToException(jsg::Lock& js,
    jsg::Optional<v8::Local<v8::Value>> maybeReason,
    kj::String defaultDescription = kj::str(JSG_EXCEPTION(Error) ": Stream was cancelled.")) {
  KJ_IF_SOME(reason, maybeReason) {
    return js.exceptionToKj(js.v8Ref(reason));
  } else {
    // We get here if the caller is something like `r.cancel()` (or `r.cancel(undefined)`).
    return kj::Exception(
        kj::Exception::Type::FAILED, __FILE__, __LINE__, kj::mv(defaultDescription));
  }
}

// =======================================================================================

// Adapt ReadableStreamSource to kj::AsyncInputStream's interface for use with `kj::newTee()`.
class TeeAdapter final: public kj::AsyncInputStream {
 public:
  explicit TeeAdapter(kj::Own<ReadableStreamSource> inner): inner(kj::mv(inner)) {}

  kj::Promise<size_t> tryRead(void* buffer, size_t minBytes, size_t maxBytes) override {
    return inner->tryRead(buffer, minBytes, maxBytes);
  }

  kj::Maybe<uint64_t> tryGetLength() override {
    return inner->tryGetLength(StreamEncoding::IDENTITY);
  }

 private:
  kj::Own<ReadableStreamSource> inner;
};

class TeeBranch final: public ReadableStreamSource {
 public:
  explicit TeeBranch(kj::Own<kj::AsyncInputStream> inner): inner(kj::mv(inner)) {}

  kj::Promise<size_t> tryRead(void* buffer, size_t minBytes, size_t maxBytes) override {
    return inner->tryRead(buffer, minBytes, maxBytes);
  }

  kj::Promise<DeferredProxy<void>> pumpTo(WritableStreamSink& output, bool end) override {
#ifdef KJ_NO_RTTI
    // Yes, I'm paranoid.
    static_assert(!KJ_NO_RTTI, "Need RTTI for correctness");
#endif

    // HACK: If `output` is another TransformStream, we don't allow pumping to it, in order to
    //   guarantee that we can't create cycles. Note that currently TeeBranch only ever wraps
    //   TransformStreams, never system streams.
    JSG_REQUIRE(kj::dynamicDowncastIfAvailable<IdentityTransformStreamImpl>(output) == kj::none,
        TypeError, "Inter-TransformStream ReadableStream.pipeTo() is not implemented.");

    // It is important we actually call `inner->pumpTo()` so that `kj::newTee()` is aware of this
    // pump operation's backpressure. So we can't use the default `ReadableStreamSource::pumpTo()`
    // implementation, and have to implement our own.

    PumpAdapter outputAdapter(output);
    co_await inner->pumpTo(outputAdapter);

    if (end) {
      co_await output.end();
    }

    // We only use `TeeBranch` when a locally-sourced stream was tee'd (because system streams
    // implement `tryTee()` in a different way that doesn't use `TeeBranch`). So, we know that
    // none of the pump can be performed without the IoContext active, and thus we do not
    // `KJ_CO_MAGIC BEGIN_DEFERRED_PROXYING`.
    co_return;
  }

  kj::Maybe<uint64_t> tryGetLength(StreamEncoding encoding) override {
    if (encoding == StreamEncoding::IDENTITY) {
      return inner->tryGetLength();
    } else {
      return kj::none;
    }
  }

  kj::Maybe<Tee> tryTee(uint64_t limit) override {
    KJ_IF_SOME(t, inner->tryTee(limit)) {
      auto branch = kj::heap<TeeBranch>(newTeeErrorAdapter(kj::mv(t)));
      auto consumed = kj::heap<TeeBranch>(kj::mv(inner));
      return Tee{kj::mv(branch), kj::mv(consumed)};
    }

    return kj::none;
  }

  void cancel(kj::Exception reason) override {
    // TODO(someday): What to do?
  }

 private:
  // Adapt WritableStreamSink to kj::AsyncOutputStream's interface for use in
  // `TeeBranch::pumpTo()`. If you squint, the write logic looks very similar to TeeAdapter's
  // read logic.
  class PumpAdapter final: public kj::AsyncOutputStream {
   public:
    explicit PumpAdapter(WritableStreamSink& inner): inner(inner) {}

    kj::Promise<void> write(kj::ArrayPtr<const byte> buffer) override {
      return inner.write(buffer);
    }

    kj::Promise<void> write(kj::ArrayPtr<const kj::ArrayPtr<const byte>> pieces) override {
      return inner.write(pieces);
    }

    kj::Promise<void> whenWriteDisconnected() override {
      KJ_UNIMPLEMENTED("whenWriteDisconnected() not expected on PumpAdapter");
    }

    WritableStreamSink& inner;
  };

  kj::Own<kj::AsyncInputStream> inner;
};

static const WarningAggregator::Key unusedStreamBranchKey;

class WarnIfUnusedStream final: public ReadableStreamSource {
 public:
  class UnusedStreamWarningContext final: public WarningAggregator::WarningContext {
   public:
    UnusedStreamWarningContext(jsg::Lock& js): exception(jsg::JsRef(js, js.error(""_kjc))) {}

    kj::String toString(jsg::Lock& js) override {
      auto handle = exception.getHandle(js);
      auto obj = KJ_ASSERT_NONNULL(handle.tryCast<jsg::JsObject>());
      obj.set(js, "name"_kjc, js.str("Unused stream created:"_kjc));
      return obj.get(js, "stack"_kjc).toString(js);
    }

   private:
    jsg::JsRef<jsg::JsValue> exception;
  };

  static kj::Own<WarningAggregator> createWarningAggregator(IoContext& context) {
    return kj::atomicRefcounted<WarningAggregator>(
        context, [](jsg::Lock& js, kj::Array<kj::Own<WarningAggregator::WarningContext>> warnings) {
      StringBuffer<1024> message(1024);
      if (warnings.size() > 1) {
        message.append(
            kj::str(warnings.size()), " ReadableStream branches were created but never consumed. ");
      } else {
        message.append("A ReadableStream branch was created but never consumed. ");
      }
      message.append("Such branches can be created, for instance, by calling the tee() "
                     "method on a ReadableStream, or by calling the clone() method on a "
                     "Request or Response object. If a branch is created but never consumed, "
                     "it can force the runtime to buffer the entire body of the stream in "
                     "memory, which may cause the Worker to exceed its memory limit and be "
                     "terminated. To avoid this, ensure that all branches created are consumed.\n");

      if (warnings.size() > 1) {
        for (int n = 0; n < warnings.size(); n++) {
          auto& warning = warnings[n];
          message.append("\n ", kj::str(n + 1), ". ", warning->toString(js), "\n");
        }
      } else {
        message.append("\n * ", warnings[0]->toString(js), "\n");
      }
      auto msg = message.toString();
      js.logWarning(msg);
    });
  }

  explicit WarnIfUnusedStream(
      jsg::Lock& js, kj::Own<ReadableStreamSource> inner, IoContext& ioContext)
      : warningAggregator(ioContext.getWarningAggregator(unusedStreamBranchKey,
            [](IoContext& context) { return createWarningAggregator(context); })),
        warningContext(kj::heap<UnusedStreamWarningContext>(js)),
        inner(kj::mv(inner)) {}

  kj::Promise<DeferredProxy<void>> pumpTo(WritableStreamSink& output, bool end) override {
    wasRead = true;
    return inner->pumpTo(output, end);
  }

  kj::Promise<size_t> tryRead(void* buffer, size_t minBytes, size_t maxBytes) override {
    wasRead = true;
    return inner->tryRead(buffer, minBytes, maxBytes);
  }

  // TODO(someday): we set `wasRead` to avoid warning here, but TeeBranch might still buffer the
  // body. We should fix it not to buffer when cancelled.
  void cancel(kj::Exception reason) override {
    wasRead = true;
    return inner->cancel(reason);
  }

  // No special behavior, just forward these verbatim.
  kj::Maybe<uint64_t> tryGetLength(StreamEncoding encoding) override {
    return inner->tryGetLength(encoding);
  }

  kj::Maybe<Tee> tryTee(uint64_t limit) override {
    KJ_IF_SOME(tee, inner->tryTee(limit)) {
      // If creating the tee this way is successful, we have to make sure we mark
      // this particular stream as read so we don't warn about it.
      // Refs: https://github.com/cloudflare/workerd/issues/983
      wasRead = true;
      return kj::mv(tee);
    }
    return kj::none;
  }

  ~WarnIfUnusedStream() {
    if (!wasRead) {
      warningAggregator->add(kj::mv(warningContext));
    }
  }

 private:
  kj::Own<WarningAggregator> warningAggregator;
  kj::Own<UnusedStreamWarningContext> warningContext;
  kj::Own<ReadableStreamSource> inner;
  // Used for tracking if this body was ever used.
  bool wasRead = false;
};
}  // namespace

// =======================================================================================

kj::Promise<DeferredProxy<void>> ReadableStreamSource::pumpTo(
    WritableStreamSink& output, bool end) {
  KJ_IF_SOME(p, output.tryPumpFrom(*this, end)) {
    return kj::mv(p);
  }

  // Non-optimized pumpTo() is presumed to require the IoContext to remain live, so don't do
  // anything in the deferred proxy part.
  return addNoopDeferredProxy(api::pumpTo(*this, output, end));
}

kj::Maybe<uint64_t> ReadableStreamSource::tryGetLength(StreamEncoding encoding) {
  return kj::none;
}

kj::Promise<kj::Array<byte>> ReadableStreamSource::readAllBytes(uint64_t limit) {
  try {
    AllReader allReader(*this, limit);
    co_return co_await allReader.readAllBytes();
  } catch (...) {
    // TODO(soon): Temporary logging.
    auto ex = kj::getCaughtExceptionAsKj();
    if (ex.getDescription().endsWith("exceeded before EOF.")) {
      LOG_WARNING_PERIODICALLY("NOSENTRY Internal Stream readAllBytes - Exceeded limit");
    }
    kj::throwFatalException(kj::mv(ex));
  }
}

kj::Promise<kj::String> ReadableStreamSource::readAllText(uint64_t limit) {
  try {
    AllReader allReader(*this, limit);
    co_return co_await allReader.readAllText();
  } catch (...) {
    // TODO(soon): Temporary logging.
    auto ex = kj::getCaughtExceptionAsKj();
    if (ex.getDescription().endsWith("exceeded before EOF.")) {
      LOG_WARNING_PERIODICALLY("NOSENTRY Internal Stream readAllText - Exceeded limit");
    }
    kj::throwFatalException(kj::mv(ex));
  }
}

void ReadableStreamSource::cancel(kj::Exception reason) {}

kj::Maybe<ReadableStreamSource::Tee> ReadableStreamSource::tryTee(uint64_t limit) {
  return kj::none;
}

kj::Maybe<kj::Promise<DeferredProxy<void>>> WritableStreamSink::tryPumpFrom(
    ReadableStreamSource& input, bool end) {
  return kj::none;
}

// =======================================================================================

ReadableStreamInternalController::~ReadableStreamInternalController() noexcept(false) {
  if (readState.is<ReaderLocked>()) {
    readState.init<Unlocked>();
  }
}

jsg::Ref<ReadableStream> ReadableStreamInternalController::addRef() {
  return KJ_ASSERT_NONNULL(owner).addRef();
}

kj::Maybe<jsg::Promise<ReadResult>> ReadableStreamInternalController::read(
    jsg::Lock& js, kj::Maybe<ByobOptions> maybeByobOptions) {

  if (isPendingClosure) {
    return js.rejectedPromise<ReadResult>(
        js.v8TypeError("This ReadableStream belongs to an object that is closing."_kj));
  }

  v8::Local<v8::ArrayBuffer> store;
  size_t byteLength = 0;
  size_t byteOffset = 0;
  size_t atLeast = 1;

  KJ_IF_SOME(byobOptions, maybeByobOptions) {
    store = byobOptions.bufferView.getHandle(js)->Buffer();
    byteOffset = byobOptions.byteOffset;
    byteLength = byobOptions.byteLength;
    atLeast = byobOptions.atLeast.orDefault(atLeast);
    if (byobOptions.detachBuffer) {
      if (!store->IsDetachable()) {
        return js.rejectedPromise<ReadResult>(
            js.v8TypeError("Unable to use non-detachable ArrayBuffer"_kj));
      }
      auto backing = store->GetBackingStore();
      jsg::check(store->Detach(v8::Local<v8::Value>()));
      store = v8::ArrayBuffer::New(js.v8Isolate, kj::mv(backing));
    }
  }

  auto getOrInitStore = [&](bool errorCase = false) {
    if (store.IsEmpty()) {
      // In an error case, where store is not provided, we can use zero length
      byteLength = errorCase ? 0 : UnderlyingSource::DEFAULT_AUTO_ALLOCATE_CHUNK_SIZE;

      if (!v8::ArrayBuffer::MaybeNew(js.v8Isolate, byteLength).ToLocal(&store)) {
        return v8::Local<v8::ArrayBuffer>();
      }
    }
    return store;
  };

  disturbed = true;

  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      if (maybeByobOptions != kj::none && FeatureFlags::get(js).getInternalStreamByobReturn()) {
        // When using the BYOB reader, we must return a sized-0 Uint8Array that is backed
        // by the ArrayBuffer passed in the options.
        auto theStore = getOrInitStore(true);
        if (theStore.IsEmpty()) {
          return js.rejectedPromise<ReadResult>(
              js.v8TypeError("Unable to allocate memory for read"_kj));
        }
        return js.resolvedPromise(ReadResult{
          .value = js.v8Ref(v8::Uint8Array::New(theStore, 0, 0).As<v8::Value>()),
          .done = true,
        });
      }
      return js.resolvedPromise(ReadResult{.done = true});
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      return js.rejectedPromise<ReadResult>(errored.addRef(js));
    }
    KJ_CASE_ONEOF(readable, Readable) {
      // TODO(conform): Requiring serialized read requests is non-conformant, but we've never had a
      //   use case for them. At one time, our implementation of TransformStream supported multiple
      //   simultaneous read requests, but it is highly unlikely that anyone relied on this. Our
      //   ReadableStream implementation that wraps native streams has never supported them, our
      //   TransformStream implementation is primarily (only?) used for constructing manually
      //   streamed Responses, and no teed ReadableStream has ever supported them.
      if (readPending) {
        return js.rejectedPromise<ReadResult>(js.v8TypeError(
            "This ReadableStream only supports a single pending read request at a time."_kj));
      }
      readPending = true;

      auto theStore = getOrInitStore();
      if (theStore.IsEmpty()) {
        return js.rejectedPromise<ReadResult>(
            js.v8TypeError("Unable to allocate memory for read"_kj));
      }

      auto ptr = static_cast<kj::byte*>(theStore->Data());
      auto bytes = kj::arrayPtr(ptr + byteOffset, byteLength);

      auto promise =
          kj::evalNow([&] { return readable->tryRead(bytes.begin(), atLeast, bytes.size()); });
      KJ_IF_SOME(readerLock, readState.tryGet<ReaderLocked>()) {
        promise = KJ_ASSERT_NONNULL(readerLock.getCanceler())->wrap(kj::mv(promise));
      }

      // TODO(soon): We use awaitIoLegacy() here because if the stream terminates in JavaScript in
      // this same isolate, then the promise may actually be waiting on JavaScript to do something,
      // and so should not be considered waiting on external I/O. We will need to use
      // registerPendingEvent() manually when reading from an external stream. Ideally, we would
      // refactor the implementation so that when waiting on a JavaScript stream, we strictly use
      // jsg::Promises and not kj::Promises, so that it doesn't look like I/O at all, and there's
      // no need to drop the isolate lock and take it again every time some data is read/written.
      // That's a larger refactor, though.
      auto& ioContext = IoContext::current();
      return ioContext.awaitIoLegacy(js, kj::mv(promise))
          .then(js,
              ioContext.addFunctor([this, store = js.v8Ref(store), byteOffset, byteLength,
                                       isByob = maybeByobOptions != kj::none](jsg::Lock& js,
                                       size_t amount) mutable -> jsg::Promise<ReadResult> {
        readPending = false;
        KJ_ASSERT(amount <= byteLength);
        if (amount == 0) {
          if (!state.is<StreamStates::Errored>()) {
            doClose(js);
          }
          KJ_IF_SOME(o, owner) {
            o.signalEof(js);
          }
          if (isByob && FeatureFlags::get(js).getInternalStreamByobReturn()) {
            // When using the BYOB reader, we must return a sized-0 Uint8Array that is backed
            // by the ArrayBuffer passed in the options.
            auto u8 = v8::Uint8Array::New(store.getHandle(js), 0, 0);
            return js.resolvedPromise(ReadResult{
              .value = js.v8Ref(u8.As<v8::Value>()),
              .done = true,
            });
          }
          return js.resolvedPromise(ReadResult{.done = true});
        }
        // Return a slice so the script can see how many bytes were read.
        return js.resolvedPromise(ReadResult{
          .value = js.v8Ref(
              v8::Uint8Array::New(store.getHandle(js), byteOffset, amount).As<v8::Value>()),
          .done = false});
      }),
              ioContext.addFunctor(
                  [this](jsg::Lock& js, jsg::Value reason) -> jsg::Promise<ReadResult> {
        readPending = false;
        if (!state.is<StreamStates::Errored>()) {
          doError(js, reason.getHandle(js));
        }
        return js.rejectedPromise<ReadResult>(kj::mv(reason));
      }));
    }
  }
  KJ_UNREACHABLE;
}

jsg::Promise<void> ReadableStreamInternalController::pipeTo(
    jsg::Lock& js, WritableStreamController& destination, PipeToOptions options) {

  KJ_DASSERT(!isLockedToReader());
  KJ_DASSERT(!destination.isLockedToWriter());

  if (isPendingClosure) {
    return js.rejectedPromise<void>(
        js.v8TypeError("This ReadableStream belongs to an object that is closing."_kj));
  }

  disturbed = true;
  KJ_IF_SOME(promise,
      destination.tryPipeFrom(js, KJ_ASSERT_NONNULL(owner).addRef(), kj::mv(options))) {
    return kj::mv(promise);
  }

  return js.rejectedPromise<void>(
      js.v8TypeError("This ReadableStream cannot be piped to this WritableStream."_kj));
}

jsg::Promise<void> ReadableStreamInternalController::cancel(
    jsg::Lock& js, jsg::Optional<v8::Local<v8::Value>> maybeReason) {
  disturbed = true;

  KJ_IF_SOME(errored, state.tryGet<StreamStates::Errored>()) {
    return js.rejectedPromise<void>(errored.getHandle(js));
  }

  doCancel(js, maybeReason);

  return js.resolvedPromise();
}

void ReadableStreamInternalController::doCancel(
    jsg::Lock& js, jsg::Optional<v8::Local<v8::Value>> maybeReason) {
  auto exception = reasonToException(js, maybeReason);
  KJ_IF_SOME(locked, readState.tryGet<ReaderLocked>()) {
    KJ_IF_SOME(canceler, locked.getCanceler()) {
      canceler->cancel(kj::cp(exception));
    }
  }
  KJ_IF_SOME(readable, state.tryGet<Readable>()) {
    readable->cancel(kj::mv(exception));
    doClose(js);
  }
}

void ReadableStreamInternalController::doClose(jsg::Lock& js) {
  state.init<StreamStates::Closed>();
  KJ_IF_SOME(locked, readState.tryGet<ReaderLocked>()) {
    maybeResolvePromise(js, locked.getClosedFulfiller());
  } else if (readState.tryGet<PipeLocked>() != kj::none) {
    readState.init<Unlocked>();
  }
}

void ReadableStreamInternalController::doError(jsg::Lock& js, v8::Local<v8::Value> reason) {
  state.init<StreamStates::Errored>(js.v8Ref(reason));
  KJ_IF_SOME(locked, readState.tryGet<ReaderLocked>()) {
    maybeRejectPromise<void>(js, locked.getClosedFulfiller(), reason);
  } else if (readState.tryGet<PipeLocked>() != kj::none) {
    readState.init<Unlocked>();
  }
}

ReadableStreamController::Tee ReadableStreamInternalController::tee(jsg::Lock& js) {
  JSG_REQUIRE(
      !isLockedToReader(), TypeError, "This ReadableStream is currently locked to a reader.");
  JSG_REQUIRE(
      !isPendingClosure, TypeError, "This ReadableStream belongs to an object that is closing.");
  readState.init<Locked>();
  disturbed = true;
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      // Create two closed ReadableStreams.
      return Tee{
        .branch1 = js.alloc<ReadableStream>(kj::heap<ReadableStreamInternalController>(closed)),
        .branch2 = js.alloc<ReadableStream>(kj::heap<ReadableStreamInternalController>(closed)),
      };
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      // Create two errored ReadableStreams.
      return Tee{
        .branch1 = js.alloc<ReadableStream>(
            kj::heap<ReadableStreamInternalController>(errored.addRef(js))),
        .branch2 = js.alloc<ReadableStream>(
            kj::heap<ReadableStreamInternalController>(errored.addRef(js))),
      };
    }
    KJ_CASE_ONEOF(readable, Readable) {
      auto& ioContext = IoContext::current();

      auto makeTee = [&](kj::Own<ReadableStreamSource> b1,
                         kj::Own<ReadableStreamSource> b2) -> Tee {
        doClose(js);
        if (ioContext.isInspectorEnabled()) {
          b1 = kj::heap<WarnIfUnusedStream>(js, kj::mv(b1), ioContext);
          b2 = kj::heap<WarnIfUnusedStream>(js, kj::mv(b2), ioContext);
        }
        return Tee{
          .branch1 = js.alloc<ReadableStream>(ioContext, kj::mv(b1)),
          .branch2 = js.alloc<ReadableStream>(ioContext, kj::mv(b2)),
        };
      };

      auto bufferLimit = ioContext.getLimitEnforcer().getBufferingLimit();
      KJ_IF_SOME(tee, readable->tryTee(bufferLimit)) {
        // This ReadableStreamSource has an optimized tee implementation.
        return makeTee(kj::mv(tee.branches[0]), kj::mv(tee.branches[1]));
      }

      auto tee = kj::newTee(kj::heap<TeeAdapter>(kj::mv(readable)), bufferLimit);

      return makeTee(kj::heap<TeeBranch>(newTeeErrorAdapter(kj::mv(tee.branches[0]))),
          kj::heap<TeeBranch>(newTeeErrorAdapter(kj::mv(tee.branches[1]))));
    }
  }

  KJ_UNREACHABLE;
}

kj::Maybe<kj::Own<ReadableStreamSource>> ReadableStreamInternalController::removeSource(
    jsg::Lock& js, bool ignoreDisturbed) {
  JSG_REQUIRE(
      !isLockedToReader(), TypeError, "This ReadableStream is currently locked to a reader.");
  JSG_REQUIRE(!disturbed || ignoreDisturbed, TypeError, "This ReadableStream is disturbed.");

  readState.init<Locked>();
  disturbed = true;

  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      class NullSource final: public ReadableStreamSource {
       public:
        kj::Promise<size_t> tryRead(void* buffer, size_t minBytes, size_t maxBytes) override {
          return size_t(0);
        }

        kj::Maybe<uint64_t> tryGetLength(StreamEncoding encoding) override {
          return uint64_t(0);
        }
      };

      return kj::heap<NullSource>();
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      kj::throwFatalException(js.exceptionToKj(errored.addRef(js)));
    }
    KJ_CASE_ONEOF(readable, Readable) {
      auto result = kj::mv(readable);
      state.init<StreamStates::Closed>();
      return kj::Maybe<kj::Own<ReadableStreamSource>>(kj::mv(result));
    }
  }

  KJ_UNREACHABLE;
}

bool ReadableStreamInternalController::lockReader(jsg::Lock& js, Reader& reader) {
  if (isLockedToReader()) {
    return false;
  }

  auto prp = js.newPromiseAndResolver<void>();
  prp.promise.markAsHandled(js);

  auto lock = ReaderLocked(
      reader, kj::mv(prp.resolver), IoContext::current().addObject(kj::heap<kj::Canceler>()));

  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      maybeResolvePromise(js, lock.getClosedFulfiller());
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      maybeRejectPromise<void>(js, lock.getClosedFulfiller(), errored.getHandle(js));
    }
    KJ_CASE_ONEOF(readable, Readable) {
      // Nothing to do.
    }
  }

  readState = kj::mv(lock);
  reader.attach(*this, kj::mv(prp.promise));
  return true;
}

void ReadableStreamInternalController::releaseReader(
    Reader& reader, kj::Maybe<jsg::Lock&> maybeJs) {
  KJ_IF_SOME(locked, readState.tryGet<ReaderLocked>()) {
    KJ_ASSERT(&locked.getReader() == &reader);
    KJ_IF_SOME(js, maybeJs) {
      KJ_IF_SOME(canceler, locked.getCanceler()) {
        JSG_REQUIRE(canceler->isEmpty(), TypeError,
            "Cannot call releaseLock() on a reader with outstanding read promises.");
      }
      maybeRejectPromise<void>(js, locked.getClosedFulfiller(),
          js.v8TypeError("This ReadableStream reader has been released."_kj));
    }
    locked.clear();

    // When maybeJs is nullptr, that means releaseReader was called when the reader is
    // being deconstructed and not as the result of explicitly calling releaseLock. In
    // that case, we don't want to change the lock state itself because we do not have
    // an isolate lock. Clearing the lock above will free the lock state while keeping the
    // ReadableStream marked as locked.
    if (maybeJs != kj::none) {
      readState.template init<Unlocked>();
    }
  }
}

void WritableStreamInternalController::Writable::abort(kj::Exception&& ex) {
  canceler.cancel(kj::cp(ex));
  sink->abort(kj::mv(ex));
}

WritableStreamInternalController::~WritableStreamInternalController() noexcept(false) {
  if (writeState.is<WriterLocked>()) {
    writeState.init<Unlocked>();
  }
}

jsg::Ref<WritableStream> WritableStreamInternalController::addRef() {
  return KJ_ASSERT_NONNULL(owner).addRef();
}

jsg::Promise<void> WritableStreamInternalController::write(
    jsg::Lock& js, jsg::Optional<v8::Local<v8::Value>> value) {
  if (isPendingClosure) {
    return js.rejectedPromise<void>(
        js.v8TypeError("This WritableStream belongs to an object that is closing."_kj));
  }
  if (isClosedOrClosing()) {
    return js.rejectedPromise<void>(js.v8TypeError("This WritableStream has been closed."_kj));
  }
  if (isPiping()) {
    return js.rejectedPromise<void>(
        js.v8TypeError("This WritableStream is currently being piped to."_kj));
  }

  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      // Handled by isClosedOrClosing().
      KJ_UNREACHABLE;
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      return js.rejectedPromise<void>(errored.addRef(js));
    }
    KJ_CASE_ONEOF(writable, IoOwn<Writable>) {
      if (value == kj::none) {
        return js.resolvedPromise();
      }
      auto chunk = KJ_ASSERT_NONNULL(value);

      std::shared_ptr<v8::BackingStore> store;
      size_t byteLength = 0;
      size_t byteOffset = 0;
      if (chunk->IsArrayBuffer()) {
        auto buffer = chunk.As<v8::ArrayBuffer>();
        store = buffer->GetBackingStore();
        byteLength = buffer->ByteLength();
      } else if (chunk->IsArrayBufferView()) {
        auto view = chunk.As<v8::ArrayBufferView>();
        store = view->Buffer()->GetBackingStore();
        byteLength = view->ByteLength();
        byteOffset = view->ByteOffset();
      } else if (chunk->IsString()) {
        // TODO(later): This really ought to return a rejected promise and not a sync throw.
        // This case caused me a moment of confusion during testing, so I think it's worth
        // a specific error message.
        throwTypeErrorAndConsoleWarn(
            "This TransformStream is being used as a byte stream, but received a string on its "
            "writable side. If you wish to write a string, you'll probably want to explicitly "
            "UTF-8-encode it with TextEncoder.");
      } else {
        // TODO(later): This really ought to return a rejected promise and not a sync throw.
        throwTypeErrorAndConsoleWarn(
            "This TransformStream is being used as a byte stream, but received an object of "
            "non-ArrayBuffer/ArrayBufferView type on its writable side.");
      }

      if (byteLength == 0) {
        return js.resolvedPromise();
      }

      auto prp = js.newPromiseAndResolver<void>();
      increaseCurrentWriteBufferSize(js, byteLength);
      KJ_IF_SOME(o, observer) {
        o->onChunkEnqueued(byteLength);
      }
      auto ptr =
          kj::ArrayPtr<kj::byte>(static_cast<kj::byte*>(store->Data()) + byteOffset, byteLength);
      queue.push_back(
          WriteEvent{.outputLock = IoContext::current().waitForOutputLocksIfNecessaryIoOwn(),
            .event = Write{
              .promise = kj::mv(prp.resolver),
              .totalBytes = store->ByteLength(),
              .ownBytes = js.v8Ref(v8::ArrayBuffer::New(js.v8Isolate, kj::mv(store))),
              .bytes = ptr,
            }});

      ensureWriting(js);
      return kj::mv(prp.promise);
    }
  }

  KJ_UNREACHABLE;
}

void WritableStreamInternalController::increaseCurrentWriteBufferSize(
    jsg::Lock& js, uint64_t amount) {
  currentWriteBufferSize += amount;
  KJ_IF_SOME(highWaterMark, maybeHighWaterMark) {
    int64_t amount = highWaterMark - currentWriteBufferSize;
    updateBackpressure(js, amount <= 0);
    // If the current buffer size is greater than or equal to double the high water mark,
    // let's emit a warning about excessive backpressure.
    // TODO(later): For the standard stream, we use a variable multiplier if the highWaterMark
    // is < 10 because the default high water mark is 1 and we don't want to emit the warning
    // too often. For internal streams, tho, there is no default high water mark and the user
    // would have to provide one... and since these are always bytes it would make sense
    // for the user to specify a larger value here in the typical case... so I decided to go with
    // the fixed 2x multiplier. However, I can make this variable too if folks feel the consistency
    // is important.
    if (warnAboutExcessiveBackpressure && (currentWriteBufferSize >= 2 * highWaterMark)) {
      excessiveBackpressureWarningCount++;
      auto warning = kj::str("A WritableStream is experiencing excessive backpressure. "
                             "The current write buffer size is ",
          currentWriteBufferSize,
          " bytes, which is greater than or equal to double the high water mark "
          "of ",
          highWaterMark,
          " bytes. Streams that consistently exceed the "
          "configured high water mark may cause excessive memory usage. ",
          "(Count ", excessiveBackpressureWarningCount, ")");
      js.logWarning(warning);
      warnAboutExcessiveBackpressure = false;
    }
  }
}

void WritableStreamInternalController::decreaseCurrentWriteBufferSize(
    jsg::Lock& js, uint64_t amount) {
  currentWriteBufferSize -= amount;
  KJ_IF_SOME(highWaterMark, maybeHighWaterMark) {
    int64_t amount = highWaterMark - currentWriteBufferSize;
    updateBackpressure(js, amount <= 0);
  }
}

void WritableStreamInternalController::updateBackpressure(jsg::Lock& js, bool backpressure) {
  KJ_IF_SOME(writerLock, writeState.tryGet<WriterLocked>()) {
    if (backpressure) {
      // Per the spec, when backpressure is updated and is true, we replace the existing
      // ready promise on the writer with a new pending promise, regardless of whether
      // the existing one is resolved or not.
      auto prp = js.newPromiseAndResolver<void>();
      prp.promise.markAsHandled(js);
      writerLock.setReadyFulfiller(prp);
      return;
    }

    // When backpressure is updated and is false, we resolve the ready promise on the writer
    warnAboutExcessiveBackpressure = true;
    maybeResolvePromise(js, writerLock.getReadyFulfiller());
  }
}

void WritableStreamInternalController::setHighWaterMark(uint64_t highWaterMark) {
  maybeHighWaterMark = highWaterMark;
}

jsg::Promise<void> WritableStreamInternalController::closeImpl(jsg::Lock& js, bool markAsHandled) {
  if (isClosedOrClosing()) {
    return js.resolvedPromise();
  }
  if (isPiping()) {
    auto reason = js.v8TypeError("This WritableStream is currently being piped to."_kj);
    return rejectedMaybeHandledPromise<void>(js, reason, markAsHandled);
  }

  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      // Handled by isClosedOrClosing().
      KJ_UNREACHABLE;
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      auto reason = errored.getHandle(js);
      return rejectedMaybeHandledPromise<void>(js, reason, markAsHandled);
    }
    KJ_CASE_ONEOF(writable, IoOwn<Writable>) {
      auto prp = js.newPromiseAndResolver<void>();
      if (markAsHandled) {
        prp.promise.markAsHandled(js);
      }
      queue.push_back(
          WriteEvent{.outputLock = IoContext::current().waitForOutputLocksIfNecessaryIoOwn(),
            .event = Close{.promise = kj::mv(prp.resolver)}});
      ensureWriting(js);
      return kj::mv(prp.promise);
    }
  }

  KJ_UNREACHABLE;
}

jsg::Promise<void> WritableStreamInternalController::close(jsg::Lock& js, bool markAsHandled) {
  KJ_IF_SOME(closureWaitable, maybeClosureWaitable) {
    // If we're already waiting on the closure waitable, then we do not want to try scheduling
    // it again, let's just wait for the existing one to be resolved.
    if (waitingOnClosureWritableAlready) {
      return closureWaitable.whenResolved(js);
    }
    waitingOnClosureWritableAlready = true;
    auto promise = closureWaitable.then(js, [markAsHandled, this](jsg::Lock& js) {
      return closeImpl(js, markAsHandled);
    }, [](jsg::Lock& js, jsg::Value) {
      // Ignore rejection as it will be reported in the Socket's `closed`/`opened` promises
      // instead.
      return js.resolvedPromise();
    });
    maybeClosureWaitable = promise.whenResolved(js);
    return kj::mv(promise);
  } else {
    return closeImpl(js, markAsHandled);
  }
}

jsg::Promise<void> WritableStreamInternalController::flush(jsg::Lock& js, bool markAsHandled) {
  if (isClosedOrClosing()) {
    auto reason = js.v8TypeError("This WritableStream has been closed."_kj);
    return rejectedMaybeHandledPromise<void>(js, reason, markAsHandled);
  }
  if (isPiping()) {
    auto reason = js.v8TypeError("This WritableStream is currently being piped to."_kj);
    return rejectedMaybeHandledPromise<void>(js, reason, markAsHandled);
  }

  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      // Handled by isClosedOrClosing().
      KJ_UNREACHABLE;
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      auto reason = errored.getHandle(js);
      return rejectedMaybeHandledPromise<void>(js, reason, markAsHandled);
    }
    KJ_CASE_ONEOF(writable, IoOwn<Writable>) {
      auto prp = js.newPromiseAndResolver<void>();
      if (markAsHandled) {
        prp.promise.markAsHandled(js);
      }
      queue.push_back(
          WriteEvent{.outputLock = IoContext::current().waitForOutputLocksIfNecessaryIoOwn(),
            .event = Flush{.promise = kj::mv(prp.resolver)}});
      ensureWriting(js);
      return kj::mv(prp.promise);
    }
  }

  KJ_UNREACHABLE;
}

jsg::Promise<void> WritableStreamInternalController::abort(
    jsg::Lock& js, jsg::Optional<v8::Local<v8::Value>> maybeReason) {
  // While it may be confusing to users to throw `undefined` rather than a more helpful Error here,
  // doing so is required by the relevant spec:
  // https://streams.spec.whatwg.org/#writable-stream-abort
  return doAbort(js, maybeReason.orDefault(js.v8Undefined()));
}

jsg::Promise<void> WritableStreamInternalController::doAbort(
    jsg::Lock& js, v8::Local<v8::Value> reason, AbortOptions options) {
  // If maybePendingAbort is set, then the returned abort promise will be rejected
  // with the specified error once the abort is completed, otherwise the promise will
  // be resolved with undefined.

  // If there is already an abort pending, return that pending promise
  // instead of trying to schedule another.
  KJ_IF_SOME(pendingAbort, maybePendingAbort) {
    pendingAbort->reject = options.reject;
    auto promise = pendingAbort->whenResolved(js);
    if (options.handled) {
      promise.markAsHandled(js);
    }
    return kj::mv(promise);
  }

  KJ_IF_SOME(writable, state.tryGet<IoOwn<Writable>>()) {
    auto exception = js.exceptionToKj(js.v8Ref(reason));

    if (FeatureFlags::get(js).getInternalWritableStreamAbortClearsQueue()) {
      // If this flag is set, we will clear the queue proactively and immediately
      // error the stream rather than handling the abort lazily. In this case, the
      // stream will be put into an errored state immediately after draining the
      // queue. All pending writes and other operations in the queue will be rejected
      // immediately and an immediately resolved or rejected promise will be returned.
      writable->abort(kj::cp(exception));
      drain(js, reason);
      return options.reject ? rejectedMaybeHandledPromise<void>(js, reason, options.handled)
                            : js.resolvedPromise();
    }

    if (queue.empty()) {
      writable->abort(kj::cp(exception));
      doError(js, reason);
      return options.reject ? rejectedMaybeHandledPromise<void>(js, reason, options.handled)
                            : js.resolvedPromise();
    }

    maybePendingAbort = kj::heap<PendingAbort>(js, reason, options.reject);
    auto promise = KJ_ASSERT_NONNULL(maybePendingAbort)->whenResolved(js);
    if (options.handled) {
      promise.markAsHandled(js);
    }
    return kj::mv(promise);
  }

  return options.reject ? rejectedMaybeHandledPromise<void>(js, reason, options.handled)
                        : js.resolvedPromise();
}

kj::Maybe<jsg::Promise<void>> WritableStreamInternalController::tryPipeFrom(
    jsg::Lock& js, jsg::Ref<ReadableStream> source, PipeToOptions options) {

  // The ReadableStream source here can be either a JavaScript-backed ReadableStream
  // or ReadableStreamSource-backed.
  //
  // If the source is ReadableStreamSource-backed, then we can use kj's low level mechanisms
  // for piping the data. If the source is JavaScript-backed, then we need to rely on the
  // JavaScript-based Promise API for piping the data.

  auto preventAbort = options.preventAbort.orDefault(false);
  auto preventClose = options.preventClose.orDefault(false);
  auto preventCancel = options.preventCancel.orDefault(false);
  auto pipeThrough = options.pipeThrough;

  if (isPiping()) {
    auto reason = js.v8TypeError("This WritableStream is currently being piped to."_kj);
    return rejectedMaybeHandledPromise<void>(js, reason, pipeThrough);
  }

  // If a signal is provided, we need to check that it is not already triggered. If it
  // is, we return a rejected promise using the signal's reason.
  KJ_IF_SOME(signal, options.signal) {
    if (signal->getAborted(js)) {
      return rejectedMaybeHandledPromise<void>(js, signal->getReason(js), pipeThrough);
    }
  }

  // With either type of source, our first step is to acquire the source pipe lock. This
  // will help abstract most of the details of which type of source we're working with.
  auto& sourceLock = KJ_ASSERT_NONNULL(source->getController().tryPipeLock());

  // Let's also acquire the destination pipe lock.
  writeState = PipeLocked{*source};

  // If the source has errored, the spec requires us to reject the pipe promise and, if preventAbort
  // is false, error the destination (Propagate error forward). The errored source will be unlocked
  // immediately. The destination will be unlocked once the abort completes.
  KJ_IF_SOME(errored, sourceLock.tryGetErrored(js)) {
    sourceLock.release(js);
    if (!preventAbort) {
      if (state.tryGet<IoOwn<Writable>>() != kj::none) {
        return doAbort(js, errored, {.reject = true, .handled = pipeThrough});
      }
    }

    // If preventAbort was true, we're going to unlock the destination now.
    writeState.init<Unlocked>();
    return rejectedMaybeHandledPromise<void>(js, errored, pipeThrough);
  }

  // If the destination has errored, the spec requires us to reject the pipe promise and, if
  // preventCancel is false, error the source (Propagate error backward). The errored destination
  // will be unlocked immediately.
  KJ_IF_SOME(errored, state.tryGet<StreamStates::Errored>()) {
    writeState.init<Unlocked>();
    if (!preventCancel) {
      sourceLock.release(js, errored.getHandle(js));
    } else {
      sourceLock.release(js);
    }
    return rejectedMaybeHandledPromise<void>(js, errored.getHandle(js), pipeThrough);
  }

  // If the source has closed, the spec requires us to close the destination if preventClose
  // is false (Propagate closing forward). The source is unlocked immediately. The destination
  // will be unlocked as soon as the close completes.
  if (sourceLock.isClosed()) {
    sourceLock.release(js);
    if (!preventClose) {
      // The spec would have us check to see if `destination` is errored and, if so, return its
      // stored error. But if `destination` were errored, we would already have caught that case
      // above. The spec is probably concerned about cases where the readable and writable sides
      // transition to such states in a racey way. But our pump implementation will take care of
      // this naively.
      KJ_ASSERT(!state.is<StreamStates::Errored>());
      if (!isClosedOrClosing()) {
        return close(js);
      }
    }
    writeState.init<Unlocked>();
    return js.resolvedPromise();
  }

  // If the destination has closed, the spec requires us to close the source if
  // preventCancel is false (Propagate closing backward).
  if (isClosedOrClosing()) {
    auto destClosed = js.v8TypeError("This destination writable stream is closed."_kj);
    writeState.init<Unlocked>();

    if (!preventCancel) {
      sourceLock.release(js, destClosed);
    } else {
      sourceLock.release(js);
    }

    return rejectedMaybeHandledPromise<void>(js, destClosed, pipeThrough);
  }

  // The pipe will continue until either the source closes or errors, or until the destination
  // closes or errors. In either case, both will end up being closed or errored, which will
  // release the locks on both.
  //
  // For either type of source, our next step is to wait for the write loop to process the
  // pending Pipe event we queue below.
  auto prp = js.newPromiseAndResolver<void>();
  if (pipeThrough) {
    prp.promise.markAsHandled(js);
  }
  queue.push_back(WriteEvent{
    .outputLock = IoContext::current().waitForOutputLocksIfNecessaryIoOwn(),
    .event = Pipe{.parent = *this,
      .source = sourceLock,
      .promise = kj::mv(prp.resolver),
      .preventAbort = preventAbort,
      .preventClose = preventClose,
      .preventCancel = preventCancel,
      .maybeSignal = kj::mv(options.signal)},
  });
  ensureWriting(js);
  return kj::mv(prp.promise);
}

kj::Maybe<kj::Own<WritableStreamSink>> WritableStreamInternalController::removeSink(jsg::Lock& js) {
  JSG_REQUIRE(
      !isLockedToWriter(), TypeError, "This WritableStream is currently locked to a writer.");
  JSG_REQUIRE(!isClosedOrClosing(), TypeError, "This WritableStream is closed.");

  writeState.init<Locked>();

  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      // Handled by the isClosedOrClosing() check above;
      KJ_UNREACHABLE;
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      kj::throwFatalException(js.exceptionToKj(errored.addRef(js)));
    }
    KJ_CASE_ONEOF(writable, IoOwn<Writable>) {
      auto result = kj::mv(writable->sink);
      state.init<StreamStates::Closed>();
      return kj::Maybe<kj::Own<WritableStreamSink>>(kj::mv(result));
    }
  }

  KJ_UNREACHABLE;
}

void WritableStreamInternalController::detach(jsg::Lock& js) {
  JSG_REQUIRE(
      !isLockedToWriter(), TypeError, "This WritableStream is currently locked to a writer.");
  JSG_REQUIRE(!isClosedOrClosing(), TypeError, "This WritableStream is closed.");

  writeState.init<Locked>();

  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      // Handled by the isClosedOrClosing() check above;
      KJ_UNREACHABLE;
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      kj::throwFatalException(js.exceptionToKj(errored.addRef(js)));
    }
    KJ_CASE_ONEOF(writable, IoOwn<Writable>) {
      state.init<StreamStates::Closed>();
      return;
    }
  }

  KJ_UNREACHABLE;
}

kj::Maybe<int> WritableStreamInternalController::getDesiredSize() {
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      return 0;
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      return kj::none;
    }
    KJ_CASE_ONEOF(writable, IoOwn<Writable>) {
      KJ_IF_SOME(highWaterMark, maybeHighWaterMark) {
        return highWaterMark - currentWriteBufferSize;
      }
      return 1;
    }
  }

  KJ_UNREACHABLE;
}

bool WritableStreamInternalController::lockWriter(jsg::Lock& js, Writer& writer) {
  if (isLockedToWriter()) {
    return false;
  }

  auto closedPrp = js.newPromiseAndResolver<void>();
  closedPrp.promise.markAsHandled(js);

  auto readyPrp = js.newPromiseAndResolver<void>();
  readyPrp.promise.markAsHandled(js);

  auto lock = WriterLocked(writer, kj::mv(closedPrp.resolver), kj::mv(readyPrp.resolver));

  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      maybeResolvePromise(js, lock.getClosedFulfiller());
      maybeResolvePromise(js, lock.getReadyFulfiller());
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      maybeRejectPromise<void>(js, lock.getClosedFulfiller(), errored.getHandle(js));
      maybeRejectPromise<void>(js, lock.getReadyFulfiller(), errored.getHandle(js));
    }
    KJ_CASE_ONEOF(writable, IoOwn<Writable>) {
      maybeResolvePromise(js, lock.getReadyFulfiller());
    }
  }

  writeState = kj::mv(lock);
  writer.attach(*this, kj::mv(closedPrp.promise), kj::mv(readyPrp.promise));
  return true;
}

void WritableStreamInternalController::releaseWriter(
    Writer& writer, kj::Maybe<jsg::Lock&> maybeJs) {
  KJ_IF_SOME(locked, writeState.tryGet<WriterLocked>()) {
    KJ_ASSERT(&locked.getWriter() == &writer);
    KJ_IF_SOME(js, maybeJs) {
      maybeRejectPromise<void>(js, locked.getClosedFulfiller(),
          js.v8TypeError("This WritableStream writer has been released."_kj));
    }
    locked.clear();

    // When maybeJs is nullptr, that means releaseWriter was called when the writer is
    // being deconstructed and not as the result of explicitly calling releaseLock and
    // we do not have an isolate lock. In that case, we don't want to change the lock
    // state itself. Clearing the lock above will free the lock state while keeping the
    // WritableStream marked as locked.
    if (maybeJs != kj::none) {
      writeState.template init<Unlocked>();
    }
  }
}

bool WritableStreamInternalController::isClosedOrClosing() {

  bool isClosing = !queue.empty() && queue.back().event.is<Close>();
  bool isFlushing = !queue.empty() && queue.back().event.is<Flush>();
  return state.is<StreamStates::Closed>() || isClosing || isFlushing;
}

bool WritableStreamInternalController::isPiping() {
  return state.is<IoOwn<Writable>>() && !queue.empty() && queue.back().event.is<Pipe>();
}

bool WritableStreamInternalController::isErrored() {
  return state.is<StreamStates::Errored>();
}

void WritableStreamInternalController::doClose(jsg::Lock& js) {
  state.init<StreamStates::Closed>();
  KJ_IF_SOME(locked, writeState.tryGet<WriterLocked>()) {
    maybeResolvePromise(js, locked.getClosedFulfiller());
    maybeResolvePromise(js, locked.getReadyFulfiller());
    writeState.init<Locked>();
  } else if (writeState.tryGet<PipeLocked>() != kj::none) {
    writeState.init<Unlocked>();
  }
  PendingAbort::dequeue(maybePendingAbort);
}

void WritableStreamInternalController::doError(jsg::Lock& js, v8::Local<v8::Value> reason) {
  state.init<StreamStates::Errored>(js.v8Ref(reason));
  KJ_IF_SOME(locked, writeState.tryGet<WriterLocked>()) {
    maybeRejectPromise<void>(js, locked.getClosedFulfiller(), reason);
    maybeResolvePromise(js, locked.getReadyFulfiller());
    writeState.init<Locked>();
  } else if (writeState.tryGet<PipeLocked>() != kj::none) {
    writeState.init<Unlocked>();
  }
  PendingAbort::dequeue(maybePendingAbort);
}

void WritableStreamInternalController::ensureWriting(jsg::Lock& js) {
  auto& ioContext = IoContext::current();
  if (queue.size() == 1) {
    ioContext.addTask(ioContext.awaitJs(js, writeLoop(js, ioContext)).attach(addRef()));
  }
}

jsg::Promise<void> WritableStreamInternalController::writeLoop(
    jsg::Lock& js, IoContext& ioContext) {
  if (queue.empty()) {
    return js.resolvedPromise();
  } else KJ_IF_SOME(promise, queue.front().outputLock) {
    return ioContext.awaitIo(js, kj::mv(*promise),
        [this](jsg::Lock& js) -> jsg::Promise<void> { return writeLoopAfterFrontOutputLock(js); });
  } else {
    return writeLoopAfterFrontOutputLock(js);
  }
}

void WritableStreamInternalController::finishClose(jsg::Lock& js) {
  KJ_IF_SOME(pendingAbort, PendingAbort::dequeue(maybePendingAbort)) {
    pendingAbort->complete(js);
  }

  doClose(js);
}

void WritableStreamInternalController::finishError(jsg::Lock& js, v8::Local<v8::Value> reason) {
  KJ_IF_SOME(pendingAbort, PendingAbort::dequeue(maybePendingAbort)) {
    // In this case, and only this case, we ignore any pending rejection
    // that may be stored in the pendingAbort. The current exception takes
    // precedence.
    pendingAbort->fail(js, reason);
  }

  doError(js, reason);
}

jsg::Promise<void> WritableStreamInternalController::writeLoopAfterFrontOutputLock(jsg::Lock& js) {
  auto& ioContext = IoContext::current();

  // This helper function is just used to enhance the assert logging when checking
  // that the request in flight is the one we expect.
  static constexpr auto inspectQueue = [](auto& queue, kj::StringPtr name) {
    if (queue.size() > 1) {
      kj::Vector<kj::String> events;
      for (auto& event: queue) {
        KJ_SWITCH_ONEOF(event.event) {
          KJ_CASE_ONEOF(write, Write) {
            events.add(kj::str("Write"));
          }
          KJ_CASE_ONEOF(flush, Flush) {
            events.add(kj::str("Flush"));
          }
          KJ_CASE_ONEOF(close, Close) {
            events.add(kj::str("Close"));
          }
          KJ_CASE_ONEOF(pipe, Pipe) {
            events.add(kj::str("Pipe"));
          }
        }
      }
      return kj::str("Too many events in internal writablestream queue: ",
          kj::delimited(kj::mv(events), ", "));
    }
    return kj::String();
  };

  const auto makeChecker = [this](auto& request) {
    // Make a helper function that asserts that the queue did not change state during a write/close
    // operation. We normally only pop/drain the queue after write/close completion. We drain the
    // queue concurrently during finalization, but finalization would also have canceled our
    // write/close promise. The helper function also helpfully returns a reference to the current
    // request in flight.

    using Request = kj::Decay<decltype(request)>;

    return [this, &request]() -> decltype(auto) {
      if constexpr (kj::isSameType<Request, Write>() || kj::isSameType<Request, Flush>()) {
        // Write and flush requests can have any number of requests backed up after them.
        KJ_ASSERT(!queue.empty());
      } else if constexpr (kj::isSameType<Request, Close>()) {
        // Pipe and Close requests are always the last one in the queue.
        KJ_ASSERT(queue.size() == 1, queue.size(), inspectQueue(queue, "Pipe"));
      } else if constexpr (kj::isSameType<Request, Pipe>()) {
        // Pipe and Close requests are always the last one in the queue.
        KJ_ASSERT(queue.size() == 1, queue.size(), inspectQueue(queue, "Pipe"));
      }

      // The front of the queue is what we expect it to be.
      KJ_ASSERT(&request == &queue.front().event.get<Request>());

      return request;
    };
  };

  const auto maybeAbort = [this](jsg::Lock& js, auto& request) -> bool {
    auto& writable = KJ_ASSERT_NONNULL(state.tryGet<IoOwn<Writable>>());
    KJ_IF_SOME(pendingAbort, WritableStreamController::PendingAbort::dequeue(maybePendingAbort)) {
      auto ex = js.exceptionToKj(pendingAbort->reason.addRef(js));
      writable->abort(kj::mv(ex));
      drain(js, pendingAbort->reason.getHandle(js));
      pendingAbort->complete(js);
      return true;
    }
    return false;
  };

  KJ_SWITCH_ONEOF(queue.front().event) {
    KJ_CASE_ONEOF(request, Write) {
      if (request.bytes.size() == 0) {
        // Zero-length writes are no-ops with a pending event. If we allowed them, we'd have a hard
        // time distinguishing between disconnections and zero-length reads on the other end of the
        // TransformStream.
        maybeResolvePromise(js, request.promise);
        queue.pop_front();

        // Note: we don't bother checking for an abort() here because either this write was just
        //   queued, in which case abort() cannot have been called yet, or this write was processed
        //   immediately after a previous write, in which case we just checked for an abort().
        return writeLoop(js, ioContext);
      }

      // writeLoop() is only called with the sink in the Writable state.
      auto& writable = state.get<IoOwn<Writable>>();
      auto check = makeChecker(request);

      auto amountToWrite = request.bytes.size();

      auto promise = writable->sink->write(request.bytes).attach(kj::mv(request.ownBytes));

      // TODO(soon): We use awaitIoLegacy() here because if the stream terminates in JavaScript in
      // this same isolate, then the promise may actually be waiting on JavaScript to do something,
      // and so should not be considered waiting on external I/O. We will need to use
      // registerPendingEvent() manually when reading from an external stream. Ideally, we would
      // refactor the implementation so that when waiting on a JavaScript stream, we strictly use
      // jsg::Promises and not kj::Promises, so that it doesn't look like I/O at all, and there's
      // no need to drop the isolate lock and take it again every time some data is read/written.
      // That's a larger refactor, though.
      return ioContext.awaitIoLegacy(js, writable->canceler.wrap(kj::mv(promise)))
          .then(js,
              ioContext.addFunctor(
                  [this, check, maybeAbort, amountToWrite](jsg::Lock& js) -> jsg::Promise<void> {
        // Under some conditions, the clean up has already happened.
        if (queue.empty()) return js.resolvedPromise();
        auto& request = check();
        maybeResolvePromise(js, request.promise);
        decreaseCurrentWriteBufferSize(js, amountToWrite);
        KJ_IF_SOME(o, observer) {
          o->onChunkDequeued(amountToWrite);
        }
        queue.pop_front();
        maybeAbort(js, request);
        return writeLoop(js, IoContext::current());
      }),
              ioContext.addFunctor([this, check, maybeAbort, amountToWrite](
                                       jsg::Lock& js, jsg::Value reason) -> jsg::Promise<void> {
        // Under some conditions, the clean up has already happened.
        if (queue.empty()) return js.resolvedPromise();
        auto handle = reason.getHandle(js);
        auto& request = check();
        auto& writable = state.get<IoOwn<Writable>>();
        decreaseCurrentWriteBufferSize(js, amountToWrite);
        KJ_IF_SOME(o, observer) {
          o->onChunkDequeued(amountToWrite);
        }
        maybeRejectPromise<void>(js, request.promise, handle);
        queue.pop_front();
        if (!maybeAbort(js, request)) {
          auto ex = js.exceptionToKj(reason.addRef(js));
          writable->abort(kj::mv(ex));
          drain(js, handle);
        }
        return js.resolvedPromise();
      }));
    }
    KJ_CASE_ONEOF(request, Pipe) {
      // The destination should still be Writable, because the only way to transition to an
      // errored state would have been if a write request in the queue ahead of us encountered an
      // error. But in that case, the queue would already have been drained and we wouldn't be here.
      auto& writable = state.get<IoOwn<Writable>>();

      if (request.checkSignal(js)) {
        // If the signal is triggered, checkSignal will handle erroring the source and destination.
        return js.resolvedPromise();
      }

      // The readable side should *should* still be readable here but let's double check, just
      // to be safe, both for closed state and errored states.
      if (request.source.isClosed()) {
        request.source.release(js);
        // If the source is closed, the spec requires us to close the destination unless the
        // preventClose option is true.
        if (!request.preventClose && !isClosedOrClosing()) {
          doClose(js);
        } else {
          writeState.init<Unlocked>();
        }
        return js.resolvedPromise();
      }

      KJ_IF_SOME(errored, request.source.tryGetErrored(js)) {
        request.source.release(js);
        // If the source is errored, the spec requires us to error the destination unless the
        // preventAbort option is true.
        if (!request.preventAbort) {
          auto ex = js.exceptionToKj(js.v8Ref(errored));
          writable->abort(kj::mv(ex));
          drain(js, errored);
        } else {
          writeState.init<Unlocked>();
        }
        return js.resolvedPromise();
      }

      // Up to this point, we really don't know what kind of ReadableStream source we're dealing
      // with. If the source is backed by a ReadableStreamSource, then the call to tryPumpTo below
      // will return a kj::Promise that will be resolved once the kj mechanisms for piping have
      // completed. From there, the only thing left to do is resolve the JavaScript pipe promise,
      // unlock things, and continue on. If the call to tryPumpTo returns nullptr, however, the
      // ReadableStream is JavaScript-backed and we need to setup a JavaScript-promise read/write
      // loop to pass the data into the destination.

      const auto handlePromise = [this, &ioContext, check = makeChecker(request),
                                     preventAbort = request.preventAbort](
                                     jsg::Lock& js, auto promise) {
        return promise.then(js, ioContext.addFunctor([this, check](jsg::Lock& js) mutable {
          // Under some conditions, the clean up has already happened.
          if (queue.empty()) return js.resolvedPromise();

          auto& request = check();

          // It's possible we got here because the source errored but preventAbort was set.
          // In that case, we need to treat preventAbort the same as preventClose. Be
          // sure to check this before calling sourceLock.close() or the error detail will
          // be lost.
          KJ_IF_SOME(errored, request.source.tryGetErrored(js)) {
            if (request.preventAbort) request.preventClose = true;
            // Even through we're not going to close the destination, we still want the
            // pipe promise itself to be rejected in this case.
            maybeRejectPromise<void>(js, request.promise, errored);
          } else KJ_IF_SOME(errored, state.tryGet<StreamStates::Errored>()) {
            maybeRejectPromise<void>(js, request.promise, errored.getHandle(js));
          } else {
            maybeResolvePromise(js, request.promise);
          }

          // Always transition the readable side to the closed state, because we read until EOF.
          // Note that preventClose (below) means "don't close the writable side", i.e. don't
          // call end().
          request.source.close(js);
          auto preventClose = request.preventClose;
          queue.pop_front();

          if (!preventClose) {
            // Note: unlike a real Close request, it's not possible for us to have been aborted.
            return close(js, true);
          } else {
            writeState.init<Unlocked>();
          }
          return js.resolvedPromise();
        }),
            ioContext.addFunctor(
                [this, check, preventAbort](jsg::Lock& js, jsg::Value reason) mutable {
          auto handle = reason.getHandle(js);
          auto& request = check();
          maybeRejectPromise<void>(js, request.promise, handle);
          // TODO(conform): Remember all those checks we performed in ReadableStream::pipeTo()?
          // We're supposed to perform the same checks continually, e.g., errored writes should
          // cancel the readable side unless preventCancel is truthy... This would require
          // deeper integration with the implementation of pumpTo(). Oh well. One consequence
          // of this is that if there is an error on the writable side, we error the readable
          // side, rather than close (cancel) it, which is what the spec would have us do.
          // TODO(now): Warn on the console about this.
          request.source.error(js, handle);
          queue.pop_front();
          if (!preventAbort) {
            return abort(js, handle);
          }
          doError(js, handle);
          return js.resolvedPromise();
        }));
      };

      KJ_IF_SOME(promise, request.source.tryPumpTo(*writable->sink, !request.preventClose)) {
        return handlePromise(js,
            ioContext.awaitIo(js,
                writable->canceler.wrap(
                    AbortSignal::maybeCancelWrap(js, request.maybeSignal, kj::mv(promise)))));
      }

      // The ReadableStream is JavaScript-backed. We can still pipe the data but it's going to be
      // a bit slower because we will be relying on JavaScript promises when reading the data
      // from the ReadableStream, then waiting on kj::Promises to write the data. We will keep
      // reading until either the source or destination errors or until the source signals that
      // it is done.
      return handlePromise(js, request.pipeLoop(js));
    }
    KJ_CASE_ONEOF(request, Close) {
      // writeLoop() is only called with the sink in the Writable state.
      auto& writable = state.get<IoOwn<Writable>>();
      auto check = makeChecker(request);

      return ioContext.awaitIo(js, writable->canceler.wrap(writable->sink->end()))
          .then(js, ioContext.addFunctor([this, check](jsg::Lock& js) {
        // Under some conditions, the clean up has already happened.
        if (queue.empty()) return;
        auto& request = check();
        maybeResolvePromise(js, request.promise);
        queue.pop_front();
        finishClose(js);
      }),
              ioContext.addFunctor([this, check](jsg::Lock& js, jsg::Value reason) {
        // Under some conditions, the clean up has already happened.
        if (queue.empty()) return;
        auto handle = reason.getHandle(js);
        auto& request = check();
        maybeRejectPromise<void>(js, request.promise, handle);
        queue.pop_front();
        finishError(js, handle);
      }));
    }
    KJ_CASE_ONEOF(request, Flush) {
      // This is not a standards-defined state for a WritableStream and is only used internally
      // for Socket's startTls call.
      //
      // Flushing is similar to closing the stream, the main difference is that `finishClose`
      // and `writable->end()` are never called.
      auto check = makeChecker(request);

      auto& checkReq = check();
      maybeResolvePromise(js, checkReq.promise);
      queue.pop_front();

      return js.resolvedPromise();
    }
  }

  KJ_UNREACHABLE;
}

bool WritableStreamInternalController::Pipe::checkSignal(jsg::Lock& js) {
  KJ_IF_SOME(signal, maybeSignal) {
    if (signal->getAborted(js)) {
      auto reason = signal->getReason(js);

      // abort process might call parent.drain which will delete this,
      // move/copy everything we need after into temps.
      auto& parent = this->parent;
      auto& source = this->source;
      auto preventCancel = this->preventCancel;
      auto promise = kj::mv(this->promise);

      if (!preventAbort) {
        KJ_IF_SOME(writable, parent.state.tryGet<IoOwn<Writable>>()) {
          auto ex = js.exceptionToKj(reason);
          writable->abort(kj::mv(ex));
          parent.drain(js, reason);
        } else {
          parent.writeState.init<Unlocked>();
        }
      } else {
        parent.writeState.init<Unlocked>();
      }
      if (!preventCancel) {
        source.release(js, v8::Local<v8::Value>(reason));
      } else {
        source.release(js);
      }
      maybeRejectPromise<void>(js, promise, reason);
      return true;
    }
  }
  return false;
}

jsg::Promise<void> WritableStreamInternalController::Pipe::write(v8::Local<v8::Value> handle) {
  auto& writable = parent.state.get<IoOwn<Writable>>();
  // TODO(soon): Once jsg::BufferSource lands and we're able to use it, this can be simplified.
  KJ_ASSERT(handle->IsArrayBuffer() || handle->IsArrayBufferView());
  std::shared_ptr<v8::BackingStore> store;
  size_t byteLength = 0;
  size_t byteOffset = 0;
  if (handle->IsArrayBuffer()) {
    auto buffer = handle.template As<v8::ArrayBuffer>();
    store = buffer->GetBackingStore();
    byteLength = buffer->ByteLength();
  } else {
    auto view = handle.template As<v8::ArrayBufferView>();
    store = view->Buffer()->GetBackingStore();
    byteLength = view->ByteLength();
    byteOffset = view->ByteOffset();
  }
  kj::byte* data = reinterpret_cast<kj::byte*>(store->Data()) + byteOffset;
  // TODO(cleanup): Have this method accept a jsg::Lock& from the caller instead of using
  // v8::Isolate::GetCurrent();
  auto& js = jsg::Lock::current();
  return IoContext::current().awaitIo(js,
      writable->canceler.wrap(writable->sink->write(kj::arrayPtr(data, byteLength)))
          .attach(js.v8Ref(v8::ArrayBuffer::New(js.v8Isolate, store))),
      [](jsg::Lock&) {});
}

jsg::Promise<void> WritableStreamInternalController::Pipe::pipeLoop(jsg::Lock& js) {
  // This is a bit of dance. We got here because the source ReadableStream does not support
  // the internal, more efficient kj pipe (which means it is a JavaScript-backed ReadableStream).
  // We need to call read() on the source which returns a JavaScript Promise, wait on it to resolve,
  // then call write() which returns a kj::Promise. Before each iteration we check to see if either
  // the source or the destination have errored or closed and handle accordingly. At some point we
  // should explore if there are ways of making this more efficient. For the most part, however,
  // every read from the source must call into JavaScript to advance the ReadableStream.

  auto& ioContext = IoContext::current();

  if (checkSignal(js)) {
    // If the signal is triggered, checkSignal will handle erroring the source and destination.
    return js.resolvedPromise();
  }

  // Here we check the closed and errored states of both the source and the destination,
  // propagating those states to the other based on the options. This check must be
  // performed at the start of each iteration in the pipe loop.
  //
  // TODO(soon): These are the same checks made before we entered the loop. Try to
  // unify the code to reduce duplication.

  KJ_IF_SOME(errored, source.tryGetErrored(js)) {
    source.release(js);
    if (!preventAbort) {
      KJ_IF_SOME(writable, parent.state.tryGet<IoOwn<Writable>>()) {
        auto ex = js.exceptionToKj(js.v8Ref(errored));
        writable->abort(kj::mv(ex));
        return js.rejectedPromise<void>(errored);
      }
    }

    // If preventAbort was true, we're going to unlock the destination now.
    // We are not going to propagate the error here tho.
    parent.writeState.init<Unlocked>();
    return js.resolvedPromise();
  }

  KJ_IF_SOME(errored, parent.state.tryGet<StreamStates::Errored>()) {
    parent.writeState.init<Unlocked>();
    if (!preventCancel) {
      auto reason = errored.getHandle(js);
      source.release(js, reason);
      return js.rejectedPromise<void>(reason);
    }
    source.release(js);
    return js.resolvedPromise();
  }

  if (source.isClosed()) {
    source.release(js);
    if (!preventClose) {
      KJ_ASSERT(!parent.state.is<StreamStates::Errored>());
      if (!parent.isClosedOrClosing()) {
        // We'll only be here if the sink is in the Writable state.
        auto& ioContext = IoContext::current();
        return ioContext
            .awaitIo(js, parent.state.get<IoOwn<Writable>>()->sink->end(), [](jsg::Lock&) {})
            .then(js, ioContext.addFunctor([this](jsg::Lock& js) { parent.finishClose(js); }),
                ioContext.addFunctor([this](jsg::Lock& js, jsg::Value reason) {
          parent.finishError(js, reason.getHandle(js));
        }));
      }
      parent.writeState.init<Unlocked>();
    }
    return js.resolvedPromise();
  }

  if (parent.isClosedOrClosing()) {
    auto destClosed = js.v8TypeError("This destination writable stream is closed."_kj);
    parent.writeState.init<Unlocked>();

    if (!preventCancel) {
      source.release(js, destClosed);
    } else {
      source.release(js);
    }

    return js.rejectedPromise<void>(destClosed);
  }

  return source.read(js).then(js,
      ioContext.addFunctor([this](jsg::Lock& js, ReadResult result) -> jsg::Promise<void> {
    if (checkSignal(js) || result.done) {
      return js.resolvedPromise();
    }

    // WritableStreamInternalControllers only support byte data. If we can't
    // interpret the result.value as bytes, then we error the pipe; otherwise
    // we sent those bytes on to the WritableStreamSink.
    KJ_IF_SOME(value, result.value) {
      auto handle = value.getHandle(js);
      if (handle->IsArrayBuffer() || handle->IsArrayBufferView()) {
        return write(handle).then(js, [this](jsg::Lock& js) -> jsg::Promise<void> {
          // The signal will be checked again at the start of the next loop iteration.
          return pipeLoop(js);
        }, [this](jsg::Lock& js, jsg::Value reason) -> jsg::Promise<void> {
          parent.doError(js, reason.getHandle(js));
          return pipeLoop(js);
        });
      }
    }
    // Undefined and null are perfectly valid values to pass through a ReadableStream,
    // but we can't interpret them as bytes so if we get them here, we error the pipe.
    auto error = js.v8TypeError("This WritableStream only supports writing byte types."_kj);
    auto& writable = parent.state.get<IoOwn<Writable>>();
    auto ex = js.exceptionToKj(js.v8Ref(error));
    writable->abort(kj::mv(ex));
    // The error condition will be handled at the start of the next iteration.
    return pipeLoop(js);
  }),
      ioContext.addFunctor([this](jsg::Lock& js, jsg::Value reason) -> jsg::Promise<void> {
    // The error will be processed and propagated in the next iteration.
    return pipeLoop(js);
  }));
}

void WritableStreamInternalController::drain(jsg::Lock& js, v8::Local<v8::Value> reason) {
  doError(js, reason);
  while (!queue.empty()) {
    KJ_SWITCH_ONEOF(queue.front().event) {
      KJ_CASE_ONEOF(writeRequest, Write) {
        maybeRejectPromise<void>(js, writeRequest.promise, reason);
      }
      KJ_CASE_ONEOF(pipeRequest, Pipe) {
        if (!pipeRequest.preventCancel) {
          pipeRequest.source.cancel(js, reason);
        }
        maybeRejectPromise<void>(js, pipeRequest.promise, reason);
      }
      KJ_CASE_ONEOF(closeRequest, Close) {
        maybeRejectPromise<void>(js, closeRequest.promise, reason);
      }
      KJ_CASE_ONEOF(flushRequest, Flush) {
        maybeRejectPromise<void>(js, flushRequest.promise, reason);
      }
    }
    queue.pop_front();
  }
}

void WritableStreamInternalController::visitForGc(jsg::GcVisitor& visitor) {
  for (auto& event: queue) {
    KJ_SWITCH_ONEOF(event.event) {
      KJ_CASE_ONEOF(write, Write) {
        visitor.visit(write.promise);
      }
      KJ_CASE_ONEOF(close, Close) {
        visitor.visit(close.promise);
      }
      KJ_CASE_ONEOF(flush, Flush) {
        visitor.visit(flush.promise);
      }
      KJ_CASE_ONEOF(pipe, Pipe) {
        visitor.visit(pipe.maybeSignal, pipe.promise);
      }
    }
  }
  KJ_IF_SOME(locked, writeState.tryGet<WriterLocked>()) {
    visitor.visit(locked);
  }
  KJ_IF_SOME(pendingAbort, maybePendingAbort) {
    visitor.visit(*pendingAbort);
  }
}

void ReadableStreamInternalController::visitForGc(jsg::GcVisitor& visitor) {
  KJ_IF_SOME(locked, readState.tryGet<ReaderLocked>()) {
    visitor.visit(locked);
  }
}

kj::Maybe<ReadableStreamController::PipeController&> ReadableStreamInternalController::
    tryPipeLock() {
  if (isLockedToReader()) {
    return kj::none;
  }
  readState.init<PipeLocked>(*this);
  return readState.get<PipeLocked>();
}

bool ReadableStreamInternalController::PipeLocked::isClosed() {
  return inner.state.is<StreamStates::Closed>();
}

kj::Maybe<v8::Local<v8::Value>> ReadableStreamInternalController::PipeLocked::tryGetErrored(
    jsg::Lock& js) {
  KJ_IF_SOME(errored, inner.state.tryGet<StreamStates::Errored>()) {
    return errored.getHandle(js);
  }
  return kj::none;
}

void ReadableStreamInternalController::PipeLocked::cancel(
    jsg::Lock& js, v8::Local<v8::Value> reason) {
  if (inner.state.is<Readable>()) {
    inner.doCancel(js, reason);
  }
}

void ReadableStreamInternalController::PipeLocked::close(jsg::Lock& js) {
  inner.doClose(js);
}

void ReadableStreamInternalController::PipeLocked::error(
    jsg::Lock& js, v8::Local<v8::Value> reason) {
  inner.doError(js, reason);
}

void ReadableStreamInternalController::PipeLocked::release(
    jsg::Lock& js, kj::Maybe<v8::Local<v8::Value>> maybeError) {
  KJ_IF_SOME(error, maybeError) {
    cancel(js, error);
  }
  inner.readState.init<Unlocked>();
}

kj::Maybe<kj::Promise<void>> ReadableStreamInternalController::PipeLocked::tryPumpTo(
    WritableStreamSink& sink, bool end) {
  // This is safe because the caller should have already checked isClosed and tryGetErrored
  // and handled those before calling tryPumpTo.
  auto& readable = KJ_ASSERT_NONNULL(inner.state.tryGet<Readable>());
  return IoContext::current().waitForDeferredProxy(readable->pumpTo(sink, end));
}

jsg::Promise<ReadResult> ReadableStreamInternalController::PipeLocked::read(jsg::Lock& js) {
  return KJ_ASSERT_NONNULL(inner.read(js, kj::none));
}

jsg::Promise<jsg::BufferSource> ReadableStreamInternalController::readAllBytes(
    jsg::Lock& js, uint64_t limit) {
  if (isLockedToReader()) {
    return js.rejectedPromise<jsg::BufferSource>(KJ_EXCEPTION(
        FAILED, "jsg.TypeError: This ReadableStream is currently locked to a reader."));
  }
  if (isPendingClosure) {
    return js.rejectedPromise<jsg::BufferSource>(
        js.v8TypeError("This ReadableStream belongs to an object that is closing."_kj));
  }
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      auto backing = jsg::BackingStore::alloc<v8::ArrayBuffer>(js, 0);
      return js.resolvedPromise(jsg::BufferSource(js, kj::mv(backing)));
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      return js.rejectedPromise<jsg::BufferSource>(errored.addRef(js));
    }
    KJ_CASE_ONEOF(readable, Readable) {
      auto source = KJ_ASSERT_NONNULL(removeSource(js));
      auto& context = IoContext::current();
      // TODO(perf): v8 sandboxing will require that backing stores are allocated within
      // the sandbox. This will require a change to the API of ReadableStreamSource::readAllBytes.
      // For now, we'll read and allocate into a proper backing store.
      return context.awaitIoLegacy(js, source->readAllBytes(limit).attach(kj::mv(source)))
          .then(js, [](jsg::Lock& js, kj::Array<kj::byte> bytes) -> jsg::BufferSource {
        auto backing = jsg::BackingStore::alloc<v8::ArrayBuffer>(js, bytes.size());
        backing.asArrayPtr().copyFrom(bytes);
        return jsg::BufferSource(js, kj::mv(backing));
      });
    }
  }
  KJ_UNREACHABLE;
}

jsg::Promise<kj::String> ReadableStreamInternalController::readAllText(
    jsg::Lock& js, uint64_t limit) {
  if (isLockedToReader()) {
    return js.rejectedPromise<kj::String>(KJ_EXCEPTION(
        FAILED, "jsg.TypeError: This ReadableStream is currently locked to a reader."));
  }
  if (isPendingClosure) {
    return js.rejectedPromise<kj::String>(
        js.v8TypeError("This ReadableStream belongs to an object that is closing."_kj));
  }
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      return js.resolvedPromise(kj::String());
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      return js.rejectedPromise<kj::String>(errored.addRef(js));
    }
    KJ_CASE_ONEOF(readable, Readable) {
      auto source = KJ_ASSERT_NONNULL(removeSource(js));
      auto& context = IoContext::current();
      return context.awaitIoLegacy(js, source->readAllText(limit).attach(kj::mv(source)));
    }
  }
  KJ_UNREACHABLE;
}

kj::Maybe<uint64_t> ReadableStreamInternalController::tryGetLength(StreamEncoding encoding) {
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      return uint64_t(0);
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      return kj::none;
    }
    KJ_CASE_ONEOF(readable, Readable) {
      return readable->tryGetLength(encoding);
    }
  }
  KJ_UNREACHABLE;
}

kj::Own<ReadableStreamController> ReadableStreamInternalController::detach(
    jsg::Lock& js, bool ignoreDetached) {
  return newReadableStreamInternalController(
      IoContext::current(), KJ_ASSERT_NONNULL(removeSource(js, ignoreDetached)));
}

kj::Promise<DeferredProxy<void>> ReadableStreamInternalController::pumpTo(
    jsg::Lock& js, kj::Own<WritableStreamSink> sink, bool end) {
  auto source = KJ_ASSERT_NONNULL(removeSource(js));

  struct Holder: public kj::Refcounted {
    kj::Own<WritableStreamSink> sink;
    kj::Own<ReadableStreamSource> source;
    bool done = false;

    Holder(kj::Own<WritableStreamSink> sink, kj::Own<ReadableStreamSource> source)
        : sink(kj::mv(sink)),
          source(kj::mv(source)) {}
    ~Holder() noexcept(false) {
      if (!done) {
        // It appears the pump was canceled. We should make sure this propagates back to the
        // source stream. This is important in particular when we're implementing the response
        // pump for an HTTP event (see Response::send()). Presumably it was canceled because the
        // client disconnected. If we don't cancel the source, then if the source is one end of
        // a TransformStream, the write end will just hang. Of course, this is fine if there are
        // no waitUntil()s running, because the whole I/O context will be canceled anyway. But if
        // there are waitUntil()s, then the application probably expects to get an exception from
        // the write() on cancellation, rather than have it hang.
        source->cancel(KJ_EXCEPTION(DISCONNECTED, "pump canceled"));
      }
    }
  };

  auto holder = kj::refcounted<Holder>(kj::mv(sink), kj::mv(source));
  return holder->source->pumpTo(*holder->sink, end)
      .then([&holder = *holder](DeferredProxy<void> proxy) mutable -> DeferredProxy<void> {
    proxy.proxyTask = proxy.proxyTask.attach(kj::addRef(holder));
    holder.done = true;
    return kj::mv(proxy);
  }, [&holder = *holder](kj::Exception&& ex) mutable {
    holder.sink->abort(kj::cp(ex));
    holder.source->cancel(kj::cp(ex));
    holder.done = true;
    return kj::mv(ex);
  }).attach(kj::mv(holder));
}

StreamEncoding ReadableStreamInternalController::getPreferredEncoding() {
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      return StreamEncoding::IDENTITY;
    }
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      return StreamEncoding::IDENTITY;
    }
    KJ_CASE_ONEOF(readable, Readable) {
      return readable->getPreferredEncoding();
    }
  }
  KJ_UNREACHABLE;
}

kj::Promise<size_t> IdentityTransformStreamImpl::tryRead(
    void* buffer, size_t minBytes, size_t maxBytes) {
  size_t total = 0;
  while (total < minBytes) {
    // TODO(perf): tryReadInternal was written assuming minBytes would always be 1 but we've now
    // introduced an API for user to specify a larger minBytes. For now, this is implemented as a
    // naive loop dispatching to the 1 byte version but would be better to bake it deeper into
    // the implementation where it can be more efficient.
    auto amount = co_await tryReadInternal(buffer, maxBytes);
    KJ_ASSERT(amount <= maxBytes);
    if (amount == 0) {
      // EOF.
      break;
    }

    total += amount;
    buffer = reinterpret_cast<char*>(buffer) + amount;
    maxBytes -= amount;
  }

  co_return total;
}

kj::Promise<size_t> IdentityTransformStreamImpl::tryReadInternal(void* buffer, size_t maxBytes) {
  auto promise = readHelper(kj::arrayPtr(static_cast<kj::byte*>(buffer), maxBytes));

  KJ_IF_SOME(l, limit) {
    promise = promise.then([this, &l = l](size_t amount) -> kj::Promise<size_t> {
      if (amount > l) {
        auto exception = JSG_KJ_EXCEPTION(
            FAILED, TypeError, "Attempt to write too many bytes through a FixedLengthStream.");
        cancel(exception);
        return kj::mv(exception);
      } else if (amount == 0 && l != 0) {
        auto exception = JSG_KJ_EXCEPTION(
            FAILED, TypeError, "FixedLengthStream did not see all expected bytes before close().");
        cancel(exception);
        return kj::mv(exception);
      }
      l -= amount;
      return amount;
    });
  }

  return promise;
}

kj::Promise<DeferredProxy<void>> IdentityTransformStreamImpl::pumpTo(
    WritableStreamSink& output, bool end) {
#ifdef KJ_NO_RTTI
  // Yes, I'm paranoid.
  static_assert(!KJ_NO_RTTI, "Need RTTI for correctness");
#endif

  // HACK: If `output` is another TransformStream, we don't allow pumping to it, in order to
  //   guarantee that we can't create cycles.
  JSG_REQUIRE(kj::dynamicDowncastIfAvailable<IdentityTransformStreamImpl>(output) == kj::none,
      TypeError, "Inter-TransformStream ReadableStream.pipeTo() is not implemented.");

  return ReadableStreamSource::pumpTo(output, end);
}

kj::Maybe<uint64_t> IdentityTransformStreamImpl::tryGetLength(StreamEncoding encoding) {
  if (encoding == StreamEncoding::IDENTITY) {
    return limit;
  } else {
    return kj::none;
  }
}

void IdentityTransformStreamImpl::cancel(kj::Exception reason) {
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(idle, Idle) {
      // This is fine.
    }
    KJ_CASE_ONEOF(request, ReadRequest) {
      request.fulfiller->fulfill(size_t(0));
    }
    KJ_CASE_ONEOF(request, WriteRequest) {
      request.fulfiller->reject(kj::cp(reason));
    }
    KJ_CASE_ONEOF(exception, kj::Exception) {
      // Already errored.
      return;
    }
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      // Already closed by writable side.
      return;
    }
  }

  state = kj::mv(reason);

  // TODO(conform): Proactively put WritableStream into Errored state.
}

kj::Promise<void> IdentityTransformStreamImpl::write(kj::ArrayPtr<const byte> buffer) {
  if (buffer == nullptr) {
    return kj::READY_NOW;
  }
  return writeHelper(buffer);
}

kj::Promise<void> IdentityTransformStreamImpl::write(
    kj::ArrayPtr<const kj::ArrayPtr<const kj::byte>> pieces) {
  KJ_UNIMPLEMENTED("IdentityTransformStreamImpl piecewise write() not currently supported");
  // TODO(soon): This will be called by TeeBranch::pumpTo(). We disallow that anyway, since we
  //   disallow inter-TransformStream pumping.
}

kj::Promise<void> IdentityTransformStreamImpl::end() {
  // If we're already closed, there's nothing else we need to do here.
  if (state.is<StreamStates::Closed>()) return kj::READY_NOW;

  return writeHelper(kj::ArrayPtr<const kj::byte>());
}

void IdentityTransformStreamImpl::abort(kj::Exception reason) {
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(idle, Idle) {
      // This is fine.
    }
    KJ_CASE_ONEOF(request, ReadRequest) {
      request.fulfiller->reject(kj::cp(reason));
    }
    KJ_CASE_ONEOF(request, WriteRequest) {
      // IF the fulfiller is not waiting, the write promise was already
      // canceled and no one is waiting on it.
      KJ_ASSERT(!request.fulfiller->isWaiting(),
          "abort() is supposed to wait for any pending write() to finish");
    }
    KJ_CASE_ONEOF(exception, kj::Exception) {
      // Already errored.
      return;
    }
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      // If we're in the pending close state... it should be OK to just switch
      // the state to errored below.
    }
  }

  state = kj::mv(reason);

  // TODO(conform): Proactively put ReadableStream into Errored state.
}

kj::Promise<size_t> IdentityTransformStreamImpl::readHelper(kj::ArrayPtr<kj::byte> bytes) {
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(idle, Idle) {
      // No outstanding write request, switch to ReadRequest state.

      auto paf = kj::newPromiseAndFulfiller<size_t>();
      state = ReadRequest{bytes, kj::mv(paf.fulfiller)};
      return kj::mv(paf.promise);
    }
    KJ_CASE_ONEOF(request, ReadRequest) {
      KJ_FAIL_ASSERT("read operation already in flight");
    }
    KJ_CASE_ONEOF(request, WriteRequest) {
      if (bytes.size() >= request.bytes.size()) {
        // The write buffer will entirely fit into our read buffer; fulfill both requests.
        memcpy(bytes.begin(), request.bytes.begin(), request.bytes.size());
        auto result = request.bytes.size();
        request.fulfiller->fulfill();

        // Switch to idle state.
        state = Idle();

        return result;
      }

      // The write buffer won't quite fit into our read buffer; fulfill only the read request.
      memcpy(bytes.begin(), request.bytes.begin(), bytes.size());
      request.bytes = request.bytes.slice(bytes.size(), request.bytes.size());
      return bytes.size();
    }
    KJ_CASE_ONEOF(exception, kj::Exception) {
      return kj::cp(exception);
    }
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      return size_t(0);
    }
  }

  KJ_UNREACHABLE;
}

kj::Promise<void> IdentityTransformStreamImpl::writeHelper(kj::ArrayPtr<const kj::byte> bytes) {
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(idle, Idle) {
      if (bytes.size() == 0) {
        // This is a close operation.
        state = StreamStates::Closed();
        return kj::READY_NOW;
      }

      auto paf = kj::newPromiseAndFulfiller<void>();
      state = WriteRequest{bytes, kj::mv(paf.fulfiller)};
      return kj::mv(paf.promise);
    }
    KJ_CASE_ONEOF(request, ReadRequest) {
      if (!request.fulfiller->isWaiting()) {
        // Oops, the request was canceled. Currently, this happen in particular when pumping a
        // response body to the client, and the client disconnects, cancelling the pump. In this
        // specific case, we want to propagate the error back to the write end of the transform
        // stream. In theory, though, there could be other cases where propagation is incorrect.
        //
        // TODO(cleanup): This cancellation should probably be handled at a higher level, e.g.
        //   in pumpTo(), but I need a quick fix.
        state = KJ_EXCEPTION(DISCONNECTED, "reader canceled");

        // I was going to use a `goto` but Harris choked on his bagel. Recursion it is.
        return writeHelper(bytes);
      }

      if (bytes.size() == 0) {
        // This is a close operation.
        request.fulfiller->fulfill(size_t(0));
        state = StreamStates::Closed();
        return kj::READY_NOW;
      }

      KJ_ASSERT(request.bytes.size() > 0);

      if (request.bytes.size() >= bytes.size()) {
        // Our write buffer will entirely fit into the read buffer; fulfill both requests.
        memcpy(request.bytes.begin(), bytes.begin(), bytes.size());
        request.fulfiller->fulfill(bytes.size());
        state = Idle();
        return kj::READY_NOW;
      }

      // Our write buffer won't quite fit into the read buffer; fulfill only the read request.
      memcpy(request.bytes.begin(), bytes.begin(), request.bytes.size());
      bytes = bytes.slice(request.bytes.size(), bytes.size());
      request.fulfiller->fulfill(request.bytes.size());

      auto paf = kj::newPromiseAndFulfiller<void>();
      state = WriteRequest{bytes, kj::mv(paf.fulfiller)};
      return kj::mv(paf.promise);
    }
    KJ_CASE_ONEOF(request, WriteRequest) {
      KJ_FAIL_ASSERT("write operation already in flight");
    }
    KJ_CASE_ONEOF(exception, kj::Exception) {
      return kj::cp(exception);
    }
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {
      KJ_FAIL_ASSERT("close operation already in flight");
    }
  }

  KJ_UNREACHABLE;
}

kj::Own<ReadableStreamController> newReadableStreamInternalController(
    IoContext& ioContext, kj::Own<ReadableStreamSource> source) {
  return kj::heap<ReadableStreamInternalController>(ioContext.addObject(kj::mv(source)));
}

kj::Own<WritableStreamController> newWritableStreamInternalController(IoContext& ioContext,
    kj::Own<WritableStreamSink> sink,
    kj::Maybe<kj::Own<ByteStreamObserver>> observer,
    kj::Maybe<uint64_t> maybeHighWaterMark,
    kj::Maybe<jsg::Promise<void>> maybeClosureWaitable) {
  return kj::heap<WritableStreamInternalController>(
      kj::mv(sink), kj::mv(observer), maybeHighWaterMark, kj::mv(maybeClosureWaitable));
}

kj::StringPtr WritableStreamInternalController::jsgGetMemoryName() const {
  return "WritableStreamInternalController"_kjc;
}

size_t WritableStreamInternalController::jsgGetMemorySelfSize() const {
  return sizeof(WritableStreamInternalController);
}
void WritableStreamInternalController::jsgGetMemoryInfo(jsg::MemoryTracker& tracker) const {
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {}
    KJ_CASE_ONEOF(errored, StreamStates::Errored) {
      tracker.trackField("error", errored);
    }
    KJ_CASE_ONEOF(_, IoOwn<Writable>) {
      // Ideally we'd be able to track the size of any pending writes held in the sink's
      // queue but since it is behind an IoOwn and we won't be holding the IoContext here,
      // we can't.
      tracker.trackFieldWithSize("IoOwn<WritableStreamSink>", sizeof(IoOwn<WritableStreamSink>));
    }
  }
  KJ_IF_SOME(writerLocked, writeState.tryGet<WriterLocked>()) {
    tracker.trackField("writerLocked", writerLocked);
  }
  tracker.trackField("pendingAbort", maybePendingAbort);
  tracker.trackField("maybeClosureWaitable", maybeClosureWaitable);

  for (auto& event: queue) {
    tracker.trackField("event", event);
  }
}

kj::StringPtr ReadableStreamInternalController::jsgGetMemoryName() const {
  return "ReadableStreamInternalController"_kjc;
}

size_t ReadableStreamInternalController::jsgGetMemorySelfSize() const {
  return sizeof(ReadableStreamInternalController);
}

void ReadableStreamInternalController::jsgGetMemoryInfo(jsg::MemoryTracker& tracker) const {
  KJ_SWITCH_ONEOF(state) {
    KJ_CASE_ONEOF(closed, StreamStates::Closed) {}
    KJ_CASE_ONEOF(error, StreamStates::Errored) {
      tracker.trackField("error", error);
    }
    KJ_CASE_ONEOF(readable, Readable) {
      // Ideally we'd be able to track the size of any pending reads held in the source's
      // queue but since it is behind an IoOwn and we won't be holding the IoContext here,
      // we can't.
      tracker.trackFieldWithSize(
          "IoOwn<ReadableStreamSource>", sizeof(IoOwn<ReadableStreamSource>));
    }
  }
  KJ_SWITCH_ONEOF(readState) {
    KJ_CASE_ONEOF(unlocked, Unlocked) {}
    KJ_CASE_ONEOF(locked, Locked) {}
    KJ_CASE_ONEOF(pipeLocked, PipeLocked) {}
    KJ_CASE_ONEOF(readerLocked, ReaderLocked) {
      tracker.trackField("readerLocked", readerLocked);
    }
  }
}

}  // namespace workerd::api
