/*! *****************************************************************************
Copyright (c) Cloudflare. All rights reserved.
Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* eslint-disable */
// noinspection JSUnusedGlobalSymbols
export declare var onmessage: never;
/**
 * An abnormal event (called an exception) which occurs as a result of calling a method or accessing a property of a web API.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException)
 */
export declare class DOMException extends Error {
  constructor(message?: string, name?: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException/message) */
  readonly message: string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException/name) */
  readonly name: string;
  /**
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/DOMException/code)
   */
  readonly code: number;
  static readonly INDEX_SIZE_ERR: number;
  static readonly DOMSTRING_SIZE_ERR: number;
  static readonly HIERARCHY_REQUEST_ERR: number;
  static readonly WRONG_DOCUMENT_ERR: number;
  static readonly INVALID_CHARACTER_ERR: number;
  static readonly NO_DATA_ALLOWED_ERR: number;
  static readonly NO_MODIFICATION_ALLOWED_ERR: number;
  static readonly NOT_FOUND_ERR: number;
  static readonly NOT_SUPPORTED_ERR: number;
  static readonly INUSE_ATTRIBUTE_ERR: number;
  static readonly INVALID_STATE_ERR: number;
  static readonly SYNTAX_ERR: number;
  static readonly INVALID_MODIFICATION_ERR: number;
  static readonly NAMESPACE_ERR: number;
  static readonly INVALID_ACCESS_ERR: number;
  static readonly VALIDATION_ERR: number;
  static readonly TYPE_MISMATCH_ERR: number;
  static readonly SECURITY_ERR: number;
  static readonly NETWORK_ERR: number;
  static readonly ABORT_ERR: number;
  static readonly URL_MISMATCH_ERR: number;
  static readonly QUOTA_EXCEEDED_ERR: number;
  static readonly TIMEOUT_ERR: number;
  static readonly INVALID_NODE_TYPE_ERR: number;
  static readonly DATA_CLONE_ERR: number;
  get stack(): any;
  set stack(value: any);
}
export type WorkerGlobalScopeEventMap = {
  fetch: FetchEvent;
  scheduled: ScheduledEvent;
  queue: QueueEvent;
  unhandledrejection: PromiseRejectionEvent;
  rejectionhandled: PromiseRejectionEvent;
};
export declare abstract class WorkerGlobalScope extends EventTarget<WorkerGlobalScopeEventMap> {
  EventTarget: typeof EventTarget;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console) */
export interface Console {
  "assert"(condition?: boolean, ...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/clear_static) */
  clear(): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/count_static) */
  count(label?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/countReset_static) */
  countReset(label?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/debug_static) */
  debug(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dir_static) */
  dir(item?: any, options?: any): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dirxml_static) */
  dirxml(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/error_static) */
  error(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/group_static) */
  group(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupCollapsed_static) */
  groupCollapsed(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupEnd_static) */
  groupEnd(): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/info_static) */
  info(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/log_static) */
  log(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/table_static) */
  table(tabularData?: any, properties?: string[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/time_static) */
  time(label?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeEnd_static) */
  timeEnd(label?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeLog_static) */
  timeLog(label?: string, ...data: any[]): void;
  timeStamp(label?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/trace_static) */
  trace(...data: any[]): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/warn_static) */
  warn(...data: any[]): void;
}
export declare const console: Console;
export type BufferSource = ArrayBufferView | ArrayBuffer;
export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;
export declare namespace WebAssembly {
  class CompileError extends Error {
    constructor(message?: string);
  }
  class RuntimeError extends Error {
    constructor(message?: string);
  }
  type ValueType =
    | "anyfunc"
    | "externref"
    | "f32"
    | "f64"
    | "i32"
    | "i64"
    | "v128";
  interface GlobalDescriptor {
    value: ValueType;
    mutable?: boolean;
  }
  class Global {
    constructor(descriptor: GlobalDescriptor, value?: any);
    value: any;
    valueOf(): any;
  }
  type ImportValue = ExportValue | number;
  type ModuleImports = Record<string, ImportValue>;
  type Imports = Record<string, ModuleImports>;
  type ExportValue = Function | Global | Memory | Table;
  type Exports = Record<string, ExportValue>;
  class Instance {
    constructor(module: Module, imports?: Imports);
    readonly exports: Exports;
  }
  interface MemoryDescriptor {
    initial: number;
    maximum?: number;
    shared?: boolean;
  }
  class Memory {
    constructor(descriptor: MemoryDescriptor);
    readonly buffer: ArrayBuffer;
    grow(delta: number): number;
  }
  type ImportExportKind = "function" | "global" | "memory" | "table";
  interface ModuleExportDescriptor {
    kind: ImportExportKind;
    name: string;
  }
  interface ModuleImportDescriptor {
    kind: ImportExportKind;
    module: string;
    name: string;
  }
  abstract class Module {
    static customSections(module: Module, sectionName: string): ArrayBuffer[];
    static exports(module: Module): ModuleExportDescriptor[];
    static imports(module: Module): ModuleImportDescriptor[];
  }
  type TableKind = "anyfunc" | "externref";
  interface TableDescriptor {
    element: TableKind;
    initial: number;
    maximum?: number;
  }
  class Table {
    constructor(descriptor: TableDescriptor, value?: any);
    readonly length: number;
    get(index: number): any;
    grow(delta: number, value?: any): number;
    set(index: number, value?: any): void;
  }
  function instantiate(module: Module, imports?: Imports): Promise<Instance>;
  function validate(bytes: BufferSource): boolean;
}
/**
 * This ServiceWorker API interface represents the global execution context of a service worker.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope)
 */
export interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  DOMException: typeof DOMException;
  WorkerGlobalScope: typeof WorkerGlobalScope;
  btoa(data: string): string;
  atob(data: string): string;
  setTimeout(callback: (...args: any[]) => void, msDelay?: number): number;
  setTimeout<Args extends any[]>(
    callback: (...args: Args) => void,
    msDelay?: number,
    ...args: Args
  ): number;
  clearTimeout(timeoutId: number | null): void;
  setInterval(callback: (...args: any[]) => void, msDelay?: number): number;
  setInterval<Args extends any[]>(
    callback: (...args: Args) => void,
    msDelay?: number,
    ...args: Args
  ): number;
  clearInterval(timeoutId: number | null): void;
  queueMicrotask(task: Function): void;
  structuredClone<T>(value: T, options?: StructuredSerializeOptions): T;
  reportError(error: any): void;
  fetch(
    input: RequestInfo | URL,
    init?: RequestInit<RequestInitCfProperties>,
  ): Promise<Response>;
  self: ServiceWorkerGlobalScope;
  crypto: Crypto;
  caches: CacheStorage;
  scheduler: Scheduler;
  performance: Performance;
  Cloudflare: Cloudflare;
  readonly origin: string;
  Event: typeof Event;
  ExtendableEvent: typeof ExtendableEvent;
  CustomEvent: typeof CustomEvent;
  PromiseRejectionEvent: typeof PromiseRejectionEvent;
  FetchEvent: typeof FetchEvent;
  TailEvent: typeof TailEvent;
  TraceEvent: typeof TailEvent;
  ScheduledEvent: typeof ScheduledEvent;
  MessageEvent: typeof MessageEvent;
  CloseEvent: typeof CloseEvent;
  ReadableStreamDefaultReader: typeof ReadableStreamDefaultReader;
  ReadableStreamBYOBReader: typeof ReadableStreamBYOBReader;
  ReadableStream: typeof ReadableStream;
  WritableStream: typeof WritableStream;
  WritableStreamDefaultWriter: typeof WritableStreamDefaultWriter;
  TransformStream: typeof TransformStream;
  ByteLengthQueuingStrategy: typeof ByteLengthQueuingStrategy;
  CountQueuingStrategy: typeof CountQueuingStrategy;
  ErrorEvent: typeof ErrorEvent;
  MessageChannel: typeof MessageChannel;
  MessagePort: typeof MessagePort;
  FileSystemHandle: typeof FileSystemHandle;
  FileSystemFileHandle: typeof FileSystemFileHandle;
  FileSystemDirectoryHandle: typeof FileSystemDirectoryHandle;
  FileSystemWritableFileStream: typeof FileSystemWritableFileStream;
  StorageManager: typeof StorageManager;
  EventSource: typeof EventSource;
  ReadableStreamBYOBRequest: typeof ReadableStreamBYOBRequest;
  ReadableStreamDefaultController: typeof ReadableStreamDefaultController;
  ReadableByteStreamController: typeof ReadableByteStreamController;
  WritableStreamDefaultController: typeof WritableStreamDefaultController;
  TransformStreamDefaultController: typeof TransformStreamDefaultController;
  CompressionStream: typeof CompressionStream;
  DecompressionStream: typeof DecompressionStream;
  TextEncoderStream: typeof TextEncoderStream;
  TextDecoderStream: typeof TextDecoderStream;
  Headers: typeof Headers;
  Body: typeof Body;
  Request: typeof Request;
  Response: typeof Response;
  WebSocket: typeof WebSocket;
  WebSocketPair: typeof WebSocketPair;
  WebSocketRequestResponsePair: typeof WebSocketRequestResponsePair;
  AbortController: typeof AbortController;
  AbortSignal: typeof AbortSignal;
  TextDecoder: typeof TextDecoder;
  TextEncoder: typeof TextEncoder;
  navigator: Navigator;
  Navigator: typeof Navigator;
  URL: typeof URL;
  URLSearchParams: typeof URLSearchParams;
  URLPattern: typeof URLPattern;
  Blob: typeof Blob;
  File: typeof File;
  FormData: typeof FormData;
  Crypto: typeof Crypto;
  SubtleCrypto: typeof SubtleCrypto;
  CryptoKey: typeof CryptoKey;
  CacheStorage: typeof CacheStorage;
  Cache: typeof Cache;
  FixedLengthStream: typeof FixedLengthStream;
  IdentityTransformStream: typeof IdentityTransformStream;
  HTMLRewriter: typeof HTMLRewriter;
}
export declare function addEventListener<
  Type extends keyof WorkerGlobalScopeEventMap,
>(
  type: Type,
  handler: EventListenerOrEventListenerObject<WorkerGlobalScopeEventMap[Type]>,
  options?: EventTargetAddEventListenerOptions | boolean,
): void;
export declare function removeEventListener<
  Type extends keyof WorkerGlobalScopeEventMap,
>(
  type: Type,
  handler: EventListenerOrEventListenerObject<WorkerGlobalScopeEventMap[Type]>,
  options?: EventTargetEventListenerOptions | boolean,
): void;
/**
 * Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)
 */
export declare function dispatchEvent(
  event: WorkerGlobalScopeEventMap[keyof WorkerGlobalScopeEventMap],
): boolean;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/btoa) */
export declare function btoa(data: string): string;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/atob) */
export declare function atob(data: string): string;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setTimeout) */
export declare function setTimeout(
  callback: (...args: any[]) => void,
  msDelay?: number,
): number;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setTimeout) */
export declare function setTimeout<Args extends any[]>(
  callback: (...args: Args) => void,
  msDelay?: number,
  ...args: Args
): number;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/clearTimeout) */
export declare function clearTimeout(timeoutId: number | null): void;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setInterval) */
export declare function setInterval(
  callback: (...args: any[]) => void,
  msDelay?: number,
): number;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/setInterval) */
export declare function setInterval<Args extends any[]>(
  callback: (...args: Args) => void,
  msDelay?: number,
  ...args: Args
): number;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/clearInterval) */
export declare function clearInterval(timeoutId: number | null): void;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/queueMicrotask) */
export declare function queueMicrotask(task: Function): void;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/structuredClone) */
export declare function structuredClone<T>(
  value: T,
  options?: StructuredSerializeOptions,
): T;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/reportError) */
export declare function reportError(error: any): void;
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch) */
export declare function fetch(
  input: RequestInfo | URL,
  init?: RequestInit<RequestInitCfProperties>,
): Promise<Response>;
export declare const self: ServiceWorkerGlobalScope;
/**
 * The Web Crypto API provides a set of low-level functions for common cryptographic tasks.
 * The Workers runtime implements the full surface of this API, but with some differences in
 * the [supported algorithms](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#supported-algorithms)
 * compared to those implemented in most browsers.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/)
 */
export declare const crypto: Crypto;
/**
 * The Cache API allows fine grained control of reading and writing from the Cloudflare global network cache.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/)
 */
export declare const caches: CacheStorage;
export declare const scheduler: Scheduler;
/**
 * The Workers runtime supports a subset of the Performance API, used to measure timing and performance,
 * as well as timing of subrequests and other operations.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performance/)
 */
export declare const performance: Performance;
export declare const Cloudflare: Cloudflare;
export declare const origin: string;
export declare const navigator: Navigator;
export interface TestController {}
export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
  exports: any;
  props: any;
  abort(reason?: any): void;
}
export type ExportedHandlerFetchHandler<
  Env = unknown,
  CfHostMetadata = unknown,
> = (
  request: Request<CfHostMetadata, IncomingRequestCfProperties<CfHostMetadata>>,
  env: Env,
  ctx: ExecutionContext,
) => Response | Promise<Response>;
export type ExportedHandlerTailHandler<Env = unknown> = (
  events: TraceItem[],
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
export type ExportedHandlerTraceHandler<Env = unknown> = (
  traces: TraceItem[],
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
export type ExportedHandlerTailStreamHandler<Env = unknown> = (
  event: TailStream.TailEvent<TailStream.Onset>,
  env: Env,
  ctx: ExecutionContext,
) => TailStream.TailEventHandlerType | Promise<TailStream.TailEventHandlerType>;
export type ExportedHandlerScheduledHandler<Env = unknown> = (
  controller: ScheduledController,
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
export type ExportedHandlerQueueHandler<Env = unknown, Message = unknown> = (
  batch: MessageBatch<Message>,
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
export type ExportedHandlerTestHandler<Env = unknown> = (
  controller: TestController,
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
export interface ExportedHandler<
  Env = unknown,
  QueueHandlerMessage = unknown,
  CfHostMetadata = unknown,
> {
  fetch?: ExportedHandlerFetchHandler<Env, CfHostMetadata>;
  tail?: ExportedHandlerTailHandler<Env>;
  trace?: ExportedHandlerTraceHandler<Env>;
  tailStream?: ExportedHandlerTailStreamHandler<Env>;
  scheduled?: ExportedHandlerScheduledHandler<Env>;
  test?: ExportedHandlerTestHandler<Env>;
  email?: EmailExportedHandler<Env>;
  queue?: ExportedHandlerQueueHandler<Env, QueueHandlerMessage>;
}
export interface StructuredSerializeOptions {
  transfer?: any[];
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/PromiseRejectionEvent) */
export declare abstract class PromiseRejectionEvent extends Event {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/PromiseRejectionEvent/promise) */
  readonly promise: Promise<any>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/PromiseRejectionEvent/reason) */
  readonly reason: any;
}
export declare abstract class Navigator {
  sendBeacon(
    url: string,
    body?:
      | ReadableStream
      | string
      | (ArrayBuffer | ArrayBufferView)
      | Blob
      | FormData
      | URLSearchParams
      | URLSearchParams,
  ): boolean;
  readonly userAgent: string;
  readonly hardwareConcurrency: number;
  readonly language: string;
  readonly languages: string[];
  readonly storage: StorageManager;
}
/**
 * The Workers runtime supports a subset of the Performance API, used to measure timing and performance,
 * as well as timing of subrequests and other operations.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performance/)
 */
export interface Performance {
  /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performance/#performancetimeorigin) */
  readonly timeOrigin: number;
  /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/performance/#performancenow) */
  now(): number;
}
export interface AlarmInvocationInfo {
  readonly isRetry: boolean;
  readonly retryCount: number;
}
export interface Cloudflare {
  readonly compatibilityFlags: Record<string, boolean>;
}
export interface DurableObject {
  fetch(request: Request): Response | Promise<Response>;
  alarm?(alarmInfo?: AlarmInvocationInfo): void | Promise<void>;
  webSocketMessage?(
    ws: WebSocket,
    message: string | ArrayBuffer,
  ): void | Promise<void>;
  webSocketClose?(
    ws: WebSocket,
    code: number,
    reason: string,
    wasClean: boolean,
  ): void | Promise<void>;
  webSocketError?(ws: WebSocket, error: unknown): void | Promise<void>;
}
export type DurableObjectStub<
  T extends Rpc.DurableObjectBranded | undefined = undefined,
> = Fetcher<
  T,
  "alarm" | "webSocketMessage" | "webSocketClose" | "webSocketError"
> & {
  readonly id: DurableObjectId;
  readonly name?: string;
};
export interface DurableObjectId {
  toString(): string;
  equals(other: DurableObjectId): boolean;
  readonly name?: string;
}
export interface DurableObjectNamespace<
  T extends Rpc.DurableObjectBranded | undefined = undefined,
> {
  newUniqueId(
    options?: DurableObjectNamespaceNewUniqueIdOptions,
  ): DurableObjectId;
  idFromName(name: string): DurableObjectId;
  idFromString(id: string): DurableObjectId;
  get(
    id: DurableObjectId,
    options?: DurableObjectNamespaceGetDurableObjectOptions,
  ): DurableObjectStub<T>;
  getExisting(
    id: DurableObjectId,
    options?: DurableObjectNamespaceGetDurableObjectOptions,
  ): DurableObjectStub<T>;
  jurisdiction(
    jurisdiction: DurableObjectJurisdiction,
  ): DurableObjectNamespace<T>;
}
export type DurableObjectJurisdiction = "eu" | "fedramp" | "fedramp-high";
export interface DurableObjectNamespaceNewUniqueIdOptions {
  jurisdiction?: DurableObjectJurisdiction;
}
export type DurableObjectLocationHint =
  | "wnam"
  | "enam"
  | "sam"
  | "weur"
  | "eeur"
  | "apac"
  | "oc"
  | "afr"
  | "me";
export interface DurableObjectNamespaceGetDurableObjectOptions {
  locationHint?: DurableObjectLocationHint;
}
export interface DurableObjectClass {}
export interface DurableObjectState {
  waitUntil(promise: Promise<any>): void;
  exports: any;
  readonly id: DurableObjectId;
  readonly storage: DurableObjectStorage;
  container?: Container;
  facets: DurableObjectFacets;
  blockConcurrencyWhile<T>(callback: () => Promise<T>): Promise<T>;
  acceptWebSocket(ws: WebSocket, tags?: string[]): void;
  getWebSockets(tag?: string): WebSocket[];
  setWebSocketAutoResponse(maybeReqResp?: WebSocketRequestResponsePair): void;
  getWebSocketAutoResponse(): WebSocketRequestResponsePair | null;
  getWebSocketAutoResponseTimestamp(ws: WebSocket): Date | null;
  setHibernatableWebSocketEventTimeout(timeoutMs?: number): void;
  getHibernatableWebSocketEventTimeout(): number | null;
  getTags(ws: WebSocket): string[];
  abort(reason?: string): void;
}
export interface DurableObjectTransaction {
  get<T = unknown>(
    key: string,
    options?: DurableObjectGetOptions,
  ): Promise<T | undefined>;
  get<T = unknown>(
    keys: string[],
    options?: DurableObjectGetOptions,
  ): Promise<Map<string, T>>;
  list<T = unknown>(
    options?: DurableObjectListOptions,
  ): Promise<Map<string, T>>;
  put<T>(
    key: string,
    value: T,
    options?: DurableObjectPutOptions,
  ): Promise<void>;
  put<T>(
    entries: Record<string, T>,
    options?: DurableObjectPutOptions,
  ): Promise<void>;
  delete(key: string, options?: DurableObjectPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectPutOptions): Promise<number>;
  rollback(): void;
  getAlarm(options?: DurableObjectGetAlarmOptions): Promise<number | null>;
  setAlarm(
    scheduledTime: number | Date,
    options?: DurableObjectSetAlarmOptions,
  ): Promise<void>;
  deleteAlarm(options?: DurableObjectSetAlarmOptions): Promise<void>;
}
export interface DurableObjectStorage {
  get<T = unknown>(
    key: string,
    options?: DurableObjectGetOptions,
  ): Promise<T | undefined>;
  get<T = unknown>(
    keys: string[],
    options?: DurableObjectGetOptions,
  ): Promise<Map<string, T>>;
  list<T = unknown>(
    options?: DurableObjectListOptions,
  ): Promise<Map<string, T>>;
  put<T>(
    key: string,
    value: T,
    options?: DurableObjectPutOptions,
  ): Promise<void>;
  put<T>(
    entries: Record<string, T>,
    options?: DurableObjectPutOptions,
  ): Promise<void>;
  delete(key: string, options?: DurableObjectPutOptions): Promise<boolean>;
  delete(keys: string[], options?: DurableObjectPutOptions): Promise<number>;
  deleteAll(options?: DurableObjectPutOptions): Promise<void>;
  transaction<T>(
    closure: (txn: DurableObjectTransaction) => Promise<T>,
  ): Promise<T>;
  getAlarm(options?: DurableObjectGetAlarmOptions): Promise<number | null>;
  setAlarm(
    scheduledTime: number | Date,
    options?: DurableObjectSetAlarmOptions,
  ): Promise<void>;
  deleteAlarm(options?: DurableObjectSetAlarmOptions): Promise<void>;
  sync(): Promise<void>;
  sql: SqlStorage;
  transactionSync<T>(closure: () => T): T;
  getCurrentBookmark(): Promise<string>;
  getBookmarkForTime(timestamp: number | Date): Promise<string>;
  onNextSessionRestoreBookmark(bookmark: string): Promise<string>;
  waitForBookmark(bookmark: string): Promise<void>;
  readonly primary?: DurableObjectStub;
  ensureReplicas(): void;
  disableReplicas(): void;
}
export interface DurableObjectListOptions {
  start?: string;
  startAfter?: string;
  end?: string;
  prefix?: string;
  reverse?: boolean;
  limit?: number;
  allowConcurrency?: boolean;
  noCache?: boolean;
}
export interface DurableObjectGetOptions {
  allowConcurrency?: boolean;
  noCache?: boolean;
}
export interface DurableObjectGetAlarmOptions {
  allowConcurrency?: boolean;
}
export interface DurableObjectPutOptions {
  allowConcurrency?: boolean;
  allowUnconfirmed?: boolean;
  noCache?: boolean;
}
export interface DurableObjectSetAlarmOptions {
  allowConcurrency?: boolean;
  allowUnconfirmed?: boolean;
}
export declare class WebSocketRequestResponsePair {
  constructor(request: string, response: string);
  get request(): string;
  get response(): string;
}
export interface DurableObjectFacets {
  get(
    name: string,
    getStartupOptions: () =>
      | DurableObjectFacetsStartupOptions
      | Promise<DurableObjectFacetsStartupOptions>,
  ): Fetcher;
  abort(name: string, reason: any): void;
  delete(name: string): void;
}
export interface DurableObjectFacetsStartupOptions {
  $class: DurableObjectClass;
  id?: DurableObjectId | string;
}
export interface AnalyticsEngineDataset {
  writeDataPoint(event?: AnalyticsEngineDataPoint): void;
}
export interface AnalyticsEngineDataPoint {
  indexes?: ((ArrayBuffer | string) | null)[];
  doubles?: number[];
  blobs?: ((ArrayBuffer | string) | null)[];
}
/**
 * An event which takes place in the DOM.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event)
 */
export declare class Event {
  constructor(type: string, init?: EventInit);
  /**
   * Returns the type of event, e.g. "click", "hashchange", or "submit".
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/type)
   */
  get type(): string;
  /**
   * Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/eventPhase)
   */
  get eventPhase(): number;
  /**
   * Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composed)
   */
  get composed(): boolean;
  /**
   * Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/bubbles)
   */
  get bubbles(): boolean;
  /**
   * Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelable)
   */
  get cancelable(): boolean;
  /**
   * Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/defaultPrevented)
   */
  get defaultPrevented(): boolean;
  /**
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/returnValue)
   */
  get returnValue(): boolean;
  /**
   * Returns the object whose event listener's callback is currently being invoked.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/currentTarget)
   */
  get currentTarget(): EventTarget | null;
  /**
   * Returns the object to which event is dispatched (its target).
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/target)
   */
  get target(): EventTarget | undefined;
  /**
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/srcElement)
   */
  get srcElement(): EventTarget | undefined;
  /**
   * Returns the event's timestamp as the number of milliseconds measured relative to the time origin.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/timeStamp)
   */
  get timeStamp(): number;
  /**
   * Returns true if event was dispatched by the user agent, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/isTrusted)
   */
  readonly isTrusted: boolean;
  /**
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)
   */
  get cancelBubble(): boolean;
  /**
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/cancelBubble)
   */
  set cancelBubble(value: boolean);
  /**
   * Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopImmediatePropagation)
   */
  stopImmediatePropagation(): void;
  /**
   * If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/preventDefault)
   */
  preventDefault(): void;
  /**
   * When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation)
   */
  stopPropagation(): void;
  /**
   * Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Event/composedPath)
   */
  composedPath(): EventTarget[];
  static readonly NONE: number;
  static readonly CAPTURING_PHASE: number;
  static readonly AT_TARGET: number;
  static readonly BUBBLING_PHASE: number;
}
export interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}
export type EventListener<EventType extends Event = Event> = (
  event: EventType,
) => void;
export interface EventListenerObject<EventType extends Event = Event> {
  handleEvent(event: EventType): void;
}
export type EventListenerOrEventListenerObject<
  EventType extends Event = Event,
> = EventListener<EventType> | EventListenerObject<EventType>;
/**
 * EventTarget is a DOM interface implemented by objects that can receive events and may have listeners for them.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget)
 */
export declare class EventTarget<
  EventMap extends Record<string, Event> = Record<string, Event>,
> {
  constructor();
  /**
   * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
   *
   * The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
   *
   * When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.
   *
   * When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.
   *
   * When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.
   *
   * If an AbortSignal is passed for options's signal, then the event listener will be removed when signal is aborted.
   *
   * The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)
   */
  addEventListener<Type extends keyof EventMap>(
    type: Type,
    handler: EventListenerOrEventListenerObject<EventMap[Type]>,
    options?: EventTargetAddEventListenerOptions | boolean,
  ): void;
  /**
   * Removes the event listener in target's event listener list with the same type, callback, and options.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)
   */
  removeEventListener<Type extends keyof EventMap>(
    type: Type,
    handler: EventListenerOrEventListenerObject<EventMap[Type]>,
    options?: EventTargetEventListenerOptions | boolean,
  ): void;
  /**
   * Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)
   */
  dispatchEvent(event: EventMap[keyof EventMap]): boolean;
}
export interface EventTargetEventListenerOptions {
  capture?: boolean;
}
export interface EventTargetAddEventListenerOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
  signal?: AbortSignal;
}
export interface EventTargetHandlerObject {
  handleEvent: (event: Event) => any | undefined;
}
/**
 * A controller object that allows you to abort one or more DOM requests as and when desired.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController)
 */
export declare class AbortController {
  constructor();
  /**
   * Returns the AbortSignal object associated with this object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController/signal)
   */
  get signal(): AbortSignal;
  /**
   * Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that the associated activity is to be aborted.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortController/abort)
   */
  abort(reason?: any): void;
}
/**
 * A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal)
 */
export declare abstract class AbortSignal extends EventTarget {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_static) */
  static abort(reason?: any): AbortSignal;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/timeout_static) */
  static timeout(delay: number): AbortSignal;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/any_static) */
  static any(signals: AbortSignal[]): AbortSignal;
  /**
   * Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/aborted)
   */
  get aborted(): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/reason) */
  get reason(): any;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_event) */
  get onabort(): any | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/abort_event) */
  set onabort(value: any | null);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/AbortSignal/throwIfAborted) */
  throwIfAborted(): void;
}
export interface Scheduler {
  wait(delay: number, maybeOptions?: SchedulerWaitOptions): Promise<void>;
}
export interface SchedulerWaitOptions {
  signal?: AbortSignal;
}
/**
 * Extends the lifetime of the install and activate events dispatched on the global scope as part of the service worker lifecycle. This ensures that any functional events (like FetchEvent) are not dispatched until it upgrades database schemas and deletes the outdated cache entries.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ExtendableEvent)
 */
export declare abstract class ExtendableEvent extends Event {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil) */
  waitUntil(promise: Promise<any>): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomEvent) */
export declare class CustomEvent<T = any> extends Event {
  constructor(type: string, init?: CustomEventCustomEventInit);
  /**
   * Returns any custom data event was created with. Typically used for synthetic events.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CustomEvent/detail)
   */
  get detail(): T;
}
export interface CustomEventCustomEventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail?: any;
}
/**
 * A file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob)
 */
export declare class Blob {
  constructor(
    type?: ((ArrayBuffer | ArrayBufferView) | string | Blob)[],
    options?: BlobOptions,
  );
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/size) */
  get size(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/type) */
  get type(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/slice) */
  slice(start?: number, end?: number, type?: string): Blob;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/arrayBuffer) */
  arrayBuffer(): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/bytes) */
  bytes(): Promise<Uint8Array>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/text) */
  text(): Promise<string>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Blob/stream) */
  stream(): ReadableStream;
}
export interface BlobOptions {
  type?: string;
}
/**
 * Provides information about files and allows JavaScript in a web page to access their content.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/File)
 */
export declare class File extends Blob {
  constructor(
    bits: ((ArrayBuffer | ArrayBufferView) | string | Blob)[] | undefined,
    name: string,
    options?: FileOptions,
  );
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/name) */
  get name(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/lastModified) */
  get lastModified(): number;
}
export interface FileOptions {
  type?: string;
  lastModified?: number;
}
/**
 * The Cache API allows fine grained control of reading and writing from the Cloudflare global network cache.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/)
 */
export declare abstract class CacheStorage {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CacheStorage/open) */
  open(cacheName: string): Promise<Cache>;
  readonly default: Cache;
}
/**
 * The Cache API allows fine grained control of reading and writing from the Cloudflare global network cache.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/)
 */
export declare abstract class Cache {
  /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/#delete) */
  delete(
    request: RequestInfo | URL,
    options?: CacheQueryOptions,
  ): Promise<boolean>;
  /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/#match) */
  match(
    request: RequestInfo | URL,
    options?: CacheQueryOptions,
  ): Promise<Response | undefined>;
  /* [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/cache/#put) */
  put(request: RequestInfo | URL, response: Response): Promise<void>;
}
export interface CacheQueryOptions {
  ignoreMethod?: boolean;
}
/**
 * The Web Crypto API provides a set of low-level functions for common cryptographic tasks.
 * The Workers runtime implements the full surface of this API, but with some differences in
 * the [supported algorithms](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#supported-algorithms)
 * compared to those implemented in most browsers.
 *
 * [Cloudflare Docs Reference](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/)
 */
export declare abstract class Crypto {
  /**
   * Available only in secure contexts.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Crypto/subtle)
   */
  get subtle(): SubtleCrypto;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Crypto/getRandomValues) */
  getRandomValues<
    T extends
      | Int8Array
      | Uint8Array
      | Int16Array
      | Uint16Array
      | Int32Array
      | Uint32Array
      | BigInt64Array
      | BigUint64Array,
  >(buffer: T): T;
  /**
   * Available only in secure contexts.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Crypto/randomUUID)
   */
  randomUUID(): string;
  DigestStream: typeof DigestStream;
}
/**
 * This Web Crypto API interface provides a number of low-level cryptographic functions. It is accessed via the Crypto.subtle properties available in a window context (via Window.crypto).
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto)
 */
export declare abstract class SubtleCrypto {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/encrypt) */
  encrypt(
    algorithm: string | SubtleCryptoEncryptAlgorithm,
    key: CryptoKey,
    plainText: ArrayBuffer | ArrayBufferView,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/decrypt) */
  decrypt(
    algorithm: string | SubtleCryptoEncryptAlgorithm,
    key: CryptoKey,
    cipherText: ArrayBuffer | ArrayBufferView,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/sign) */
  sign(
    algorithm: string | SubtleCryptoSignAlgorithm,
    key: CryptoKey,
    data: ArrayBuffer | ArrayBufferView,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/verify) */
  verify(
    algorithm: string | SubtleCryptoSignAlgorithm,
    key: CryptoKey,
    signature: ArrayBuffer | ArrayBufferView,
    data: ArrayBuffer | ArrayBufferView,
  ): Promise<boolean>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/digest) */
  digest(
    algorithm: string | SubtleCryptoHashAlgorithm,
    data: ArrayBuffer | ArrayBufferView,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/generateKey) */
  generateKey(
    algorithm: string | SubtleCryptoGenerateKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[],
  ): Promise<CryptoKey | CryptoKeyPair>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/deriveKey) */
  deriveKey(
    algorithm: string | SubtleCryptoDeriveKeyAlgorithm,
    baseKey: CryptoKey,
    derivedKeyAlgorithm: string | SubtleCryptoImportKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[],
  ): Promise<CryptoKey>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/deriveBits) */
  deriveBits(
    algorithm: string | SubtleCryptoDeriveKeyAlgorithm,
    baseKey: CryptoKey,
    length?: number | null,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/importKey) */
  importKey(
    format: string,
    keyData: (ArrayBuffer | ArrayBufferView) | JsonWebKey,
    algorithm: string | SubtleCryptoImportKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[],
  ): Promise<CryptoKey>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/exportKey) */
  exportKey(format: string, key: CryptoKey): Promise<ArrayBuffer | JsonWebKey>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/wrapKey) */
  wrapKey(
    format: string,
    key: CryptoKey,
    wrappingKey: CryptoKey,
    wrapAlgorithm: string | SubtleCryptoEncryptAlgorithm,
  ): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/SubtleCrypto/unwrapKey) */
  unwrapKey(
    format: string,
    wrappedKey: ArrayBuffer | ArrayBufferView,
    unwrappingKey: CryptoKey,
    unwrapAlgorithm: string | SubtleCryptoEncryptAlgorithm,
    unwrappedKeyAlgorithm: string | SubtleCryptoImportKeyAlgorithm,
    extractable: boolean,
    keyUsages: string[],
  ): Promise<CryptoKey>;
  timingSafeEqual(
    a: ArrayBuffer | ArrayBufferView,
    b: ArrayBuffer | ArrayBufferView,
  ): boolean;
}
/**
 * The CryptoKey dictionary of the Web Crypto API represents a cryptographic key.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey)
 */
export declare abstract class CryptoKey {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/type) */
  readonly type: string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/extractable) */
  readonly extractable: boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/algorithm) */
  readonly algorithm:
    | CryptoKeyKeyAlgorithm
    | CryptoKeyAesKeyAlgorithm
    | CryptoKeyHmacKeyAlgorithm
    | CryptoKeyRsaKeyAlgorithm
    | CryptoKeyEllipticKeyAlgorithm
    | CryptoKeyArbitraryKeyAlgorithm;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CryptoKey/usages) */
  readonly usages: string[];
}
export interface CryptoKeyPair {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}
export interface JsonWebKey {
  kty: string;
  use?: string;
  key_ops?: string[];
  alg?: string;
  ext?: boolean;
  crv?: string;
  x?: string;
  y?: string;
  d?: string;
  n?: string;
  e?: string;
  p?: string;
  q?: string;
  dp?: string;
  dq?: string;
  qi?: string;
  oth?: RsaOtherPrimesInfo[];
  k?: string;
}
export interface RsaOtherPrimesInfo {
  r?: string;
  d?: string;
  t?: string;
}
export interface SubtleCryptoDeriveKeyAlgorithm {
  name: string;
  salt?: ArrayBuffer | ArrayBufferView;
  iterations?: number;
  hash?: string | SubtleCryptoHashAlgorithm;
  $public?: CryptoKey;
  info?: ArrayBuffer | ArrayBufferView;
}
export interface SubtleCryptoEncryptAlgorithm {
  name: string;
  iv?: ArrayBuffer | ArrayBufferView;
  additionalData?: ArrayBuffer | ArrayBufferView;
  tagLength?: number;
  counter?: ArrayBuffer | ArrayBufferView;
  length?: number;
  label?: ArrayBuffer | ArrayBufferView;
}
export interface SubtleCryptoGenerateKeyAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  modulusLength?: number;
  publicExponent?: ArrayBuffer | ArrayBufferView;
  length?: number;
  namedCurve?: string;
}
export interface SubtleCryptoHashAlgorithm {
  name: string;
}
export interface SubtleCryptoImportKeyAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  length?: number;
  namedCurve?: string;
  compressed?: boolean;
}
export interface SubtleCryptoSignAlgorithm {
  name: string;
  hash?: string | SubtleCryptoHashAlgorithm;
  dataLength?: number;
  saltLength?: number;
}
export interface CryptoKeyKeyAlgorithm {
  name: string;
}
export interface CryptoKeyAesKeyAlgorithm {
  name: string;
  length: number;
}
export interface CryptoKeyHmacKeyAlgorithm {
  name: string;
  hash: CryptoKeyKeyAlgorithm;
  length: number;
}
export interface CryptoKeyRsaKeyAlgorithm {
  name: string;
  modulusLength: number;
  publicExponent: ArrayBuffer | ArrayBufferView;
  hash?: CryptoKeyKeyAlgorithm;
}
export interface CryptoKeyEllipticKeyAlgorithm {
  name: string;
  namedCurve: string;
}
export interface CryptoKeyArbitraryKeyAlgorithm {
  name: string;
  hash?: CryptoKeyKeyAlgorithm;
  namedCurve?: string;
  length?: number;
}
export declare class DigestStream extends WritableStream<
  ArrayBuffer | ArrayBufferView
> {
  constructor(algorithm: string | SubtleCryptoHashAlgorithm);
  readonly digest: Promise<ArrayBuffer>;
  get bytesWritten(): number | bigint;
}
/**
 * A decoder for a specific method, that is a specific character encoding, like utf-8, iso-8859-2, koi8, cp1261, gbk, etc. A decoder takes a stream of bytes as input and emits a stream of code points. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoder)
 */
export declare class TextDecoder {
  constructor(label?: string, options?: TextDecoderConstructorOptions);
  /**
   * Returns the result of running encoding's decoder. The method can be invoked zero or more times with options's stream set to true, and then once without options's stream (or set to false), to process a fragmented input. If the invocation without options's stream (or set to false) has no input, it's clearest to omit both arguments.
   *
   * ```
   * var string = "", decoder = new TextDecoder(encoding), buffer;
   * while(buffer = next_chunk()) {
   *   string += decoder.decode(buffer, {stream:true});
   * }
   * string += decoder.decode(); // end-of-queue
   * ```
   *
   * If the error mode is "fatal" and encoding's decoder returns error, throws a TypeError.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoder/decode)
   */
  decode(
    input?: ArrayBuffer | ArrayBufferView,
    options?: TextDecoderDecodeOptions,
  ): string;
  get encoding(): string;
  get fatal(): boolean;
  get ignoreBOM(): boolean;
}
/**
 * TextEncoder takes a stream of code points as input and emits a stream of bytes. For a more scalable, non-native library, see StringView – a C-like representation of strings based on typed arrays.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder)
 */
export declare class TextEncoder {
  constructor();
  /**
   * Returns the result of running UTF-8's encoder.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder/encode)
   */
  encode(input?: string): Uint8Array;
  /**
   * Runs the UTF-8 encoder on source, stores the result of that operation into destination, and returns the progress made as an object wherein read is the number of converted code units of source and written is the number of bytes modified in destination.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoder/encodeInto)
   */
  encodeInto(
    input: string,
    buffer: ArrayBuffer | ArrayBufferView,
  ): TextEncoderEncodeIntoResult;
  get encoding(): string;
}
export interface TextDecoderConstructorOptions {
  fatal: boolean;
  ignoreBOM: boolean;
}
export interface TextDecoderDecodeOptions {
  stream: boolean;
}
export interface TextEncoderEncodeIntoResult {
  read: number;
  written: number;
}
/**
 * Events providing information related to errors in scripts or in files.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent)
 */
export declare class ErrorEvent extends Event {
  constructor(type: string, init?: ErrorEventErrorEventInit);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent/filename) */
  get filename(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent/message) */
  get message(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent/lineno) */
  get lineno(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent/colno) */
  get colno(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ErrorEvent/error) */
  get error(): any;
}
export interface ErrorEventErrorEventInit {
  message?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: any;
}
/**
 * A message received by a target object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent)
 */
export declare class MessageEvent extends Event {
  constructor(type: string, initializer: MessageEventInit);
  /**
   * Returns the data of the message.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/data)
   */
  readonly data: any;
  /**
   * Returns the origin of the message, for server-sent events and cross-document messaging.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/origin)
   */
  readonly origin: string | null;
  /**
   * Returns the last event ID string, for server-sent events.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/lastEventId)
   */
  readonly lastEventId: string;
  /**
   * Returns the WindowProxy of the source window, for cross-document messaging, and the MessagePort being attached, in the connect event fired at SharedWorkerGlobalScope objects.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/source)
   */
  readonly source: MessagePort | null;
  /**
   * Returns the MessagePort array sent with the message, for cross-document messaging and channel messaging.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageEvent/ports)
   */
  readonly ports: MessagePort[];
}
export interface MessageEventInit {
  data: ArrayBuffer | string;
}
/**
 * Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData)
 */
export declare class FormData {
  constructor();
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/append) */
  append(name: string, value: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/append) */
  append(name: string, value: Blob, filename?: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/delete) */
  delete(name: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/get) */
  get(name: string): (File | string) | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/getAll) */
  getAll(name: string): (File | string)[];
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/has) */
  has(name: string): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/set) */
  set(name: string, value: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FormData/set) */
  set(name: string, value: Blob, filename?: string): void;
  /* Returns an array of key, value pairs for every entry in the list. */
  entries(): IterableIterator<[key: string, value: File | string]>;
  /* Returns a list of keys in the list. */
  keys(): IterableIterator<string>;
  /* Returns a list of values in the list. */
  values(): IterableIterator<File | string>;
  forEach<This = unknown>(
    callback: (
      this: This,
      value: File | string,
      key: string,
      parent: FormData,
    ) => void,
    thisArg?: This,
  ): void;
  [Symbol.iterator](): IterableIterator<[key: string, value: File | string]>;
}
export interface ContentOptions {
  html?: boolean;
}
export declare class HTMLRewriter {
  constructor();
  on(
    selector: string,
    handlers: HTMLRewriterElementContentHandlers,
  ): HTMLRewriter;
  onDocument(handlers: HTMLRewriterDocumentContentHandlers): HTMLRewriter;
  transform(response: Response): Response;
}
export interface HTMLRewriterElementContentHandlers {
  element?(element: Element): void | Promise<void>;
  comments?(comment: Comment): void | Promise<void>;
  text?(element: Text): void | Promise<void>;
}
export interface HTMLRewriterDocumentContentHandlers {
  doctype?(doctype: Doctype): void | Promise<void>;
  comments?(comment: Comment): void | Promise<void>;
  text?(text: Text): void | Promise<void>;
  end?(end: DocumentEnd): void | Promise<void>;
}
export interface Doctype {
  readonly name: string | null;
  readonly publicId: string | null;
  readonly systemId: string | null;
}
export interface Element {
  tagName: string;
  readonly attributes: IterableIterator<string[]>;
  readonly removed: boolean;
  readonly namespaceURI: string;
  getAttribute(name: string): string | null;
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: string): Element;
  removeAttribute(name: string): Element;
  before(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  after(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  prepend(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  append(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  replace(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  remove(): Element;
  removeAndKeepContent(): Element;
  setInnerContent(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Element;
  onEndTag(handler: (tag: EndTag) => void | Promise<void>): void;
}
export interface EndTag {
  name: string;
  before(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): EndTag;
  after(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): EndTag;
  remove(): EndTag;
}
export interface Comment {
  text: string;
  readonly removed: boolean;
  before(content: string, options?: ContentOptions): Comment;
  after(content: string, options?: ContentOptions): Comment;
  replace(content: string, options?: ContentOptions): Comment;
  remove(): Comment;
}
export interface Text {
  readonly text: string;
  readonly lastInTextNode: boolean;
  readonly removed: boolean;
  before(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Text;
  after(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Text;
  replace(
    content: string | ReadableStream | Response,
    options?: ContentOptions,
  ): Text;
  remove(): Text;
}
export interface DocumentEnd {
  append(content: string, options?: ContentOptions): DocumentEnd;
}
/**
 * This is the event type for fetch events dispatched on the service worker global scope. It contains information about the fetch, including the request and how the receiver will treat the response. It provides the event.respondWith() method, which allows us to provide a response to this fetch.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent)
 */
export declare abstract class FetchEvent extends ExtendableEvent {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent/request) */
  readonly request: Request;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent/respondWith) */
  respondWith(promise: Response | Promise<Response>): void;
  passThroughOnException(): void;
}
export type HeadersInit =
  | Headers
  | Iterable<Iterable<string>>
  | Record<string, string>;
/**
 * This Fetch API interface allows you to perform various actions on HTTP request and response headers. These actions include retrieving, setting, adding to, and removing. A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.  You can add to this using methods like append() (see Examples.) In all methods of this interface, header names are matched by case-insensitive byte sequence.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers)
 */
export declare class Headers {
  constructor(init?: HeadersInit);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/get) */
  get(name: string): string | null;
  getAll(name: string): string[];
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/getSetCookie) */
  getSetCookie(): string[];
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/has) */
  has(name: string): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/set) */
  set(name: string, value: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/append) */
  append(name: string, value: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Headers/delete) */
  delete(name: string): void;
  forEach<This = unknown>(
    callback: (this: This, value: string, key: string, parent: Headers) => void,
    thisArg?: This,
  ): void;
  /* Returns an iterator allowing to go through all key/value pairs contained in this object. */
  entries(): IterableIterator<[key: string, value: string]>;
  /* Returns an iterator allowing to go through all keys of the key/value pairs contained in this object. */
  keys(): IterableIterator<string>;
  /* Returns an iterator allowing to go through all values of the key/value pairs contained in this object. */
  values(): IterableIterator<string>;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;
}
export type BodyInit =
  | ReadableStream<Uint8Array>
  | string
  | ArrayBuffer
  | ArrayBufferView
  | Blob
  | URLSearchParams
  | FormData;
export declare abstract class Body {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/body) */
  get body(): ReadableStream | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bodyUsed) */
  get bodyUsed(): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/arrayBuffer) */
  arrayBuffer(): Promise<ArrayBuffer>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/bytes) */
  bytes(): Promise<Uint8Array>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/text) */
  text(): Promise<string>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/json) */
  json<T>(): Promise<T>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/formData) */
  formData(): Promise<FormData>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/blob) */
  blob(): Promise<Blob>;
}
/**
 * This Fetch API interface represents the response to a request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response)
 */
export declare var Response: {
  prototype: Response;
  new (body?: BodyInit | null, init?: ResponseInit): Response;
  error(): Response;
  redirect(url: string, status?: number): Response;
  json(any: any, maybeInit?: ResponseInit | Response): Response;
};
/**
 * This Fetch API interface represents the response to a request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response)
 */
export interface Response extends Body {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/clone) */
  clone(): Response;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/status) */
  status: number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/statusText) */
  statusText: string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/headers) */
  headers: Headers;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/ok) */
  ok: boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/redirected) */
  redirected: boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/url) */
  url: string;
  webSocket: WebSocket | null;
  cf: any | undefined;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Response/type) */
  type: "default" | "error";
}
export interface ResponseInit {
  status?: number;
  statusText?: string;
  headers?: HeadersInit;
  cf?: any;
  webSocket?: WebSocket | null;
  encodeBody?: "automatic" | "manual";
}
export type RequestInfo<
  CfHostMetadata = unknown,
  Cf = CfProperties<CfHostMetadata>,
> = Request<CfHostMetadata, Cf> | string;
/**
 * This Fetch API interface represents a resource request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request)
 */
export declare var Request: {
  prototype: Request;
  new <CfHostMetadata = unknown, Cf = CfProperties<CfHostMetadata>>(
    input: RequestInfo<CfProperties> | URL,
    init?: RequestInit<Cf>,
  ): Request<CfHostMetadata, Cf>;
};
/**
 * This Fetch API interface represents a resource request.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request)
 */
export interface Request<
  CfHostMetadata = unknown,
  Cf = CfProperties<CfHostMetadata>,
> extends Body {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/clone) */
  clone(): Request<CfHostMetadata, Cf>;
  /**
   * Returns request's HTTP method, which is "GET" by default.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/method)
   */
  method: string;
  /**
   * Returns the URL of request as a string.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/url)
   */
  url: string;
  /**
   * Returns a Headers object consisting of the headers associated with request. Note that headers added in the network layer by the user agent will not be accounted for in this object, e.g., the "Host" header.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/headers)
   */
  headers: Headers;
  /**
   * Returns the redirect mode associated with request, which is a string indicating how redirects for the request will be handled during fetching. A request will follow redirects by default.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/redirect)
   */
  redirect: string;
  fetcher: Fetcher | null;
  /**
   * Returns the signal associated with request, which is an AbortSignal object indicating whether or not request has been aborted, and its abort event handler.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/signal)
   */
  signal: AbortSignal;
  cf: Cf | undefined;
  /**
   * Returns request's subresource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI]
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/integrity)
   */
  integrity: string;
  /**
   * Returns a boolean indicating whether or not request can outlive the global in which it was created.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/keepalive)
   */
  keepalive: boolean;
  /**
   * Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Request/cache)
   */
  cache?: "no-store" | "no-cache";
}
export interface RequestInit<Cf = CfProperties> {
  /* A string to set request's method. */
  method?: string;
  /* A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
  headers?: HeadersInit;
  /* A BodyInit object or null to set request's body. */
  body?: BodyInit | null;
  /* A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
  redirect?: string;
  fetcher?: Fetcher | null;
  cf?: Cf;
  /* A string indicating how the request will interact with the browser's cache to set request's cache. */
  cache?: "no-store" | "no-cache";
  /* A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
  integrity?: string;
  /* An AbortSignal to set request's signal. */
  signal?: AbortSignal | null;
  encodeResponseBody?: "automatic" | "manual";
}
export type Service<
  T extends
    | (new (...args: any[]) => Rpc.WorkerEntrypointBranded)
    | Rpc.WorkerEntrypointBranded
    | ExportedHandler<any, any, any>
    | undefined = undefined,
> = T extends new (...args: any[]) => Rpc.WorkerEntrypointBranded
  ? Fetcher<InstanceType<T>>
  : T extends Rpc.WorkerEntrypointBranded
    ? Fetcher<T>
    : T extends Exclude<Rpc.EntrypointBranded, Rpc.WorkerEntrypointBranded>
      ? never
      : Fetcher<undefined>;
export type Fetcher<
  T extends Rpc.EntrypointBranded | undefined = undefined,
  Reserved extends string = never,
> = (T extends Rpc.EntrypointBranded
  ? Rpc.Provider<T, Reserved | "fetch" | "connect" | "queue" | "scheduled">
  : unknown) & {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  connect(address: SocketAddress | string, options?: SocketOptions): Socket;
  queue(
    queueName: string,
    messages: ServiceBindingQueueMessage[],
  ): Promise<FetcherQueueResult>;
  scheduled(options?: FetcherScheduledOptions): Promise<FetcherScheduledResult>;
};
export interface FetcherScheduledOptions {
  scheduledTime?: Date;
  cron?: string;
}
export interface FetcherScheduledResult {
  outcome: string;
  noRetry: boolean;
}
export interface FetcherQueueResult {
  outcome: string;
  ackAll: boolean;
  retryBatch: QueueRetryBatch;
  explicitAcks: string[];
  retryMessages: QueueRetryMessage[];
}
export type ServiceBindingQueueMessage<Body = unknown> = {
  id: string;
  timestamp: Date;
  attempts: number;
} & (
  | {
      body: Body;
    }
  | {
      serializedBody: ArrayBuffer | ArrayBufferView;
    }
);
export interface KVNamespaceListKey<Metadata, Key extends string = string> {
  name: Key;
  expiration?: number;
  metadata?: Metadata;
}
export type KVNamespaceListResult<Metadata, Key extends string = string> =
  | {
      list_complete: false;
      keys: KVNamespaceListKey<Metadata, Key>[];
      cursor: string;
      cacheStatus: string | null;
    }
  | {
      list_complete: true;
      keys: KVNamespaceListKey<Metadata, Key>[];
      cacheStatus: string | null;
    };
export interface KVNamespace<Key extends string = string> {
  get(
    key: Key,
    options?: Partial<KVNamespaceGetOptions<undefined>>,
  ): Promise<string | null>;
  get(key: Key, type: "text"): Promise<string | null>;
  get<ExpectedValue = unknown>(
    key: Key,
    type: "json",
  ): Promise<ExpectedValue | null>;
  get(key: Key, type: "arrayBuffer"): Promise<ArrayBuffer | null>;
  get(key: Key, type: "stream"): Promise<ReadableStream | null>;
  get(
    key: Key,
    options?: KVNamespaceGetOptions<"text">,
  ): Promise<string | null>;
  get<ExpectedValue = unknown>(
    key: Key,
    options?: KVNamespaceGetOptions<"json">,
  ): Promise<ExpectedValue | null>;
  get(
    key: Key,
    options?: KVNamespaceGetOptions<"arrayBuffer">,
  ): Promise<ArrayBuffer | null>;
  get(
    key: Key,
    options?: KVNamespaceGetOptions<"stream">,
  ): Promise<ReadableStream | null>;
  get(key: Array<Key>, type: "text"): Promise<Map<string, string | null>>;
  get<ExpectedValue = unknown>(
    key: Array<Key>,
    type: "json",
  ): Promise<Map<string, ExpectedValue | null>>;
  get(
    key: Array<Key>,
    options?: Partial<KVNamespaceGetOptions<undefined>>,
  ): Promise<Map<string, string | null>>;
  get(
    key: Array<Key>,
    options?: KVNamespaceGetOptions<"text">,
  ): Promise<Map<string, string | null>>;
  get<ExpectedValue = unknown>(
    key: Array<Key>,
    options?: KVNamespaceGetOptions<"json">,
  ): Promise<Map<string, ExpectedValue | null>>;
  list<Metadata = unknown>(
    options?: KVNamespaceListOptions,
  ): Promise<KVNamespaceListResult<Metadata, Key>>;
  put(
    key: Key,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
    options?: KVNamespacePutOptions,
  ): Promise<void>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options?: Partial<KVNamespaceGetOptions<undefined>>,
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    type: "text",
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: Key,
    type: "json",
  ): Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    type: "arrayBuffer",
  ): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    type: "stream",
  ): Promise<KVNamespaceGetWithMetadataResult<ReadableStream, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<"text">,
  ): Promise<KVNamespaceGetWithMetadataResult<string, Metadata>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<"json">,
  ): Promise<KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<"arrayBuffer">,
  ): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Key,
    options: KVNamespaceGetOptions<"stream">,
  ): Promise<KVNamespaceGetWithMetadataResult<ReadableStream, Metadata>>;
  getWithMetadata<Metadata = unknown>(
    key: Array<Key>,
    type: "text",
  ): Promise<Map<string, KVNamespaceGetWithMetadataResult<string, Metadata>>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: Array<Key>,
    type: "json",
  ): Promise<
    Map<string, KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>
  >;
  getWithMetadata<Metadata = unknown>(
    key: Array<Key>,
    options?: Partial<KVNamespaceGetOptions<undefined>>,
  ): Promise<Map<string, KVNamespaceGetWithMetadataResult<string, Metadata>>>;
  getWithMetadata<Metadata = unknown>(
    key: Array<Key>,
    options?: KVNamespaceGetOptions<"text">,
  ): Promise<Map<string, KVNamespaceGetWithMetadataResult<string, Metadata>>>;
  getWithMetadata<ExpectedValue = unknown, Metadata = unknown>(
    key: Array<Key>,
    options?: KVNamespaceGetOptions<"json">,
  ): Promise<
    Map<string, KVNamespaceGetWithMetadataResult<ExpectedValue, Metadata>>
  >;
  delete(key: Key): Promise<void>;
  deleteBulk(keys: Key | Key[]): Promise<void>;
}
export interface KVNamespaceListOptions {
  limit?: number;
  prefix?: string | null;
  cursor?: string | null;
}
export interface KVNamespaceGetOptions<Type> {
  type: Type;
  cacheTtl?: number;
}
export interface KVNamespacePutOptions {
  expiration?: number;
  expirationTtl?: number;
  metadata?: any | null;
}
export interface KVNamespaceGetWithMetadataResult<Value, Metadata> {
  value: Value | null;
  metadata: Metadata | null;
  cacheStatus: string | null;
}
export type QueueContentType = "text" | "bytes" | "json" | "v8";
export interface Queue<Body = unknown> {
  send(message: Body, options?: QueueSendOptions): Promise<void>;
  sendBatch(
    messages: Iterable<MessageSendRequest<Body>>,
    options?: QueueSendBatchOptions,
  ): Promise<void>;
}
export interface QueueSendOptions {
  contentType?: QueueContentType;
  delaySeconds?: number;
}
export interface QueueSendBatchOptions {
  delaySeconds?: number;
}
export interface MessageSendRequest<Body = unknown> {
  body: Body;
  contentType?: QueueContentType;
  delaySeconds?: number;
}
export interface QueueRetryBatch {
  retry: boolean;
  delaySeconds?: number;
}
export interface QueueRetryMessage {
  msgId: string;
  delaySeconds?: number;
}
export interface QueueRetryOptions {
  delaySeconds?: number;
}
export interface Message<Body = unknown> {
  readonly id: string;
  readonly timestamp: Date;
  readonly body: Body;
  readonly attempts: number;
  retry(options?: QueueRetryOptions): void;
  ack(): void;
}
export interface QueueEvent<Body = unknown> extends ExtendableEvent {
  readonly messages: readonly Message<Body>[];
  readonly queue: string;
  retryAll(options?: QueueRetryOptions): void;
  ackAll(): void;
}
export interface MessageBatch<Body = unknown> {
  readonly messages: readonly Message<Body>[];
  readonly queue: string;
  retryAll(options?: QueueRetryOptions): void;
  ackAll(): void;
}
export interface R2Error extends Error {
  readonly name: string;
  readonly code: number;
  readonly message: string;
  readonly action: string;
  readonly stack: any;
}
export interface R2ListOptions {
  limit?: number;
  prefix?: string;
  cursor?: string;
  delimiter?: string;
  startAfter?: string;
  include?: ("httpMetadata" | "customMetadata")[];
}
export declare abstract class R2Bucket {
  head(key: string): Promise<R2Object | null>;
  get(
    key: string,
    options: R2GetOptions & {
      onlyIf: R2Conditional | Headers;
    },
  ): Promise<R2ObjectBody | R2Object | null>;
  get(key: string, options?: R2GetOptions): Promise<R2ObjectBody | null>;
  put(
    key: string,
    value:
      | ReadableStream
      | ArrayBuffer
      | ArrayBufferView
      | string
      | null
      | Blob,
    options?: R2PutOptions & {
      onlyIf: R2Conditional | Headers;
    },
  ): Promise<R2Object | null>;
  put(
    key: string,
    value:
      | ReadableStream
      | ArrayBuffer
      | ArrayBufferView
      | string
      | null
      | Blob,
    options?: R2PutOptions,
  ): Promise<R2Object>;
  createMultipartUpload(
    key: string,
    options?: R2MultipartOptions,
  ): Promise<R2MultipartUpload>;
  resumeMultipartUpload(key: string, uploadId: string): R2MultipartUpload;
  delete(keys: string | string[]): Promise<void>;
  list(options?: R2ListOptions): Promise<R2Objects>;
}
export interface R2MultipartUpload {
  readonly key: string;
  readonly uploadId: string;
  uploadPart(
    partNumber: number,
    value: ReadableStream | (ArrayBuffer | ArrayBufferView) | string | Blob,
    options?: R2UploadPartOptions,
  ): Promise<R2UploadedPart>;
  abort(): Promise<void>;
  complete(uploadedParts: R2UploadedPart[]): Promise<R2Object>;
}
export interface R2UploadedPart {
  partNumber: number;
  etag: string;
}
export declare abstract class R2Object {
  readonly key: string;
  readonly version: string;
  readonly size: number;
  readonly etag: string;
  readonly httpEtag: string;
  readonly checksums: R2Checksums;
  readonly uploaded: Date;
  readonly httpMetadata?: R2HTTPMetadata;
  readonly customMetadata?: Record<string, string>;
  readonly range?: R2Range;
  readonly storageClass: string;
  readonly ssecKeyMd5?: string;
  writeHttpMetadata(headers: Headers): void;
}
export interface R2ObjectBody extends R2Object {
  get body(): ReadableStream;
  get bodyUsed(): boolean;
  arrayBuffer(): Promise<ArrayBuffer>;
  bytes(): Promise<Uint8Array>;
  text(): Promise<string>;
  json<T>(): Promise<T>;
  blob(): Promise<Blob>;
}
export type R2Range =
  | {
      offset: number;
      length?: number;
    }
  | {
      offset?: number;
      length: number;
    }
  | {
      suffix: number;
    };
export interface R2Conditional {
  etagMatches?: string;
  etagDoesNotMatch?: string;
  uploadedBefore?: Date;
  uploadedAfter?: Date;
  secondsGranularity?: boolean;
}
export interface R2GetOptions {
  onlyIf?: R2Conditional | Headers;
  range?: R2Range | Headers;
  ssecKey?: ArrayBuffer | string;
}
export interface R2PutOptions {
  onlyIf?: R2Conditional | Headers;
  httpMetadata?: R2HTTPMetadata | Headers;
  customMetadata?: Record<string, string>;
  md5?: (ArrayBuffer | ArrayBufferView) | string;
  sha1?: (ArrayBuffer | ArrayBufferView) | string;
  sha256?: (ArrayBuffer | ArrayBufferView) | string;
  sha384?: (ArrayBuffer | ArrayBufferView) | string;
  sha512?: (ArrayBuffer | ArrayBufferView) | string;
  storageClass?: string;
  ssecKey?: ArrayBuffer | string;
}
export interface R2MultipartOptions {
  httpMetadata?: R2HTTPMetadata | Headers;
  customMetadata?: Record<string, string>;
  storageClass?: string;
  ssecKey?: ArrayBuffer | string;
}
export interface R2Checksums {
  readonly md5?: ArrayBuffer;
  readonly sha1?: ArrayBuffer;
  readonly sha256?: ArrayBuffer;
  readonly sha384?: ArrayBuffer;
  readonly sha512?: ArrayBuffer;
  toJSON(): R2StringChecksums;
}
export interface R2StringChecksums {
  md5?: string;
  sha1?: string;
  sha256?: string;
  sha384?: string;
  sha512?: string;
}
export interface R2HTTPMetadata {
  contentType?: string;
  contentLanguage?: string;
  contentDisposition?: string;
  contentEncoding?: string;
  cacheControl?: string;
  cacheExpiry?: Date;
}
export type R2Objects = {
  objects: R2Object[];
  delimitedPrefixes: string[];
} & (
  | {
      truncated: true;
      cursor: string;
    }
  | {
      truncated: false;
    }
);
export interface R2UploadPartOptions {
  ssecKey?: ArrayBuffer | string;
}
export declare abstract class JsRpcPromise {
  then(handler: Function, errorHandler?: Function): any;
  catch(errorHandler: Function): any;
  finally(onFinally: Function): any;
}
export declare abstract class JsRpcProperty {
  then(handler: Function, errorHandler?: Function): any;
  catch(errorHandler: Function): any;
  finally(onFinally: Function): any;
}
export declare abstract class ScheduledEvent extends ExtendableEvent {
  readonly scheduledTime: number;
  readonly cron: string;
  noRetry(): void;
}
export interface ScheduledController {
  readonly scheduledTime: number;
  readonly cron: string;
  noRetry(): void;
}
export interface QueuingStrategy<T = any> {
  highWaterMark?: number | bigint;
  size?: (chunk: T) => number | bigint;
}
export interface UnderlyingSink<W = any> {
  type?: string;
  start?: (controller: WritableStreamDefaultController) => void | Promise<void>;
  write?: (
    chunk: W,
    controller: WritableStreamDefaultController,
  ) => void | Promise<void>;
  abort?: (reason: any) => void | Promise<void>;
  close?: () => void | Promise<void>;
}
export interface UnderlyingByteSource {
  type: "bytes";
  autoAllocateChunkSize?: number;
  start?: (controller: ReadableByteStreamController) => void | Promise<void>;
  pull?: (controller: ReadableByteStreamController) => void | Promise<void>;
  cancel?: (reason: any) => void | Promise<void>;
}
export interface UnderlyingSource<R = any> {
  type?: "" | undefined;
  start?: (
    controller: ReadableStreamDefaultController<R>,
  ) => void | Promise<void>;
  pull?: (
    controller: ReadableStreamDefaultController<R>,
  ) => void | Promise<void>;
  cancel?: (reason: any) => void | Promise<void>;
  expectedLength?: number | bigint;
}
export interface Transformer<I = any, O = any> {
  readableType?: string;
  writableType?: string;
  start?: (
    controller: TransformStreamDefaultController<O>,
  ) => void | Promise<void>;
  transform?: (
    chunk: I,
    controller: TransformStreamDefaultController<O>,
  ) => void | Promise<void>;
  flush?: (
    controller: TransformStreamDefaultController<O>,
  ) => void | Promise<void>;
  cancel?: (reason: any) => void | Promise<void>;
  expectedLength?: number;
}
export interface StreamPipeOptions {
  /**
   * Pipes this readable stream to a given writable stream destination. The way in which the piping process behaves under various error conditions can be customized with a number of passed options. It returns a promise that fulfills when the piping process completes successfully, or rejects if any errors were encountered.
   *
   * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
   *
   * Errors and closures of the source and destination streams propagate as follows:
   *
   * An error in this source readable stream will abort destination, unless preventAbort is truthy. The returned promise will be rejected with the source's error, or with any error that occurs during aborting the destination.
   *
   * An error in destination will cancel this source readable stream, unless preventCancel is truthy. The returned promise will be rejected with the destination's error, or with any error that occurs during canceling the source.
   *
   * When this source readable stream closes, destination will be closed, unless preventClose is truthy. The returned promise will be fulfilled once this process completes, unless an error is encountered while closing the destination, in which case it will be rejected with that error.
   *
   * If destination starts out closed or closing, this source readable stream will be canceled, unless preventCancel is true. The returned promise will be rejected with an error indicating piping to a closed stream failed, or with any error that occurs during canceling the source.
   *
   * The signal option can be set to an AbortSignal to allow aborting an ongoing pipe operation via the corresponding AbortController. In this case, this source readable stream will be canceled, and destination aborted, unless the respective options preventCancel or preventAbort are set.
   */
  preventClose?: boolean;
  preventAbort?: boolean;
  preventCancel?: boolean;
  signal?: AbortSignal;
}
export type ReadableStreamReadResult<R = any> =
  | {
      done: false;
      value: R;
    }
  | {
      done: true;
      value?: undefined;
    };
/**
 * This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream)
 */
export interface ReadableStream<R = any> {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/locked) */
  get locked(): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/cancel) */
  cancel(reason?: any): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/getReader) */
  getReader(): ReadableStreamDefaultReader<R>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/getReader) */
  getReader(options: ReadableStreamGetReaderOptions): ReadableStreamBYOBReader;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/pipeThrough) */
  pipeThrough<T>(
    transform: ReadableWritablePair<T, R>,
    options?: StreamPipeOptions,
  ): ReadableStream<T>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/pipeTo) */
  pipeTo(
    destination: WritableStream<R>,
    options?: StreamPipeOptions,
  ): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream/tee) */
  tee(): [ReadableStream<R>, ReadableStream<R>];
  values(options?: ReadableStreamValuesOptions): AsyncIterableIterator<R>;
  [Symbol.asyncIterator](
    options?: ReadableStreamValuesOptions,
  ): AsyncIterableIterator<R>;
}
/**
 * This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStream)
 */
export declare const ReadableStream: {
  prototype: ReadableStream;
  new (
    underlyingSource: UnderlyingByteSource,
    strategy?: QueuingStrategy<Uint8Array>,
  ): ReadableStream<Uint8Array>;
  new <R = any>(
    underlyingSource?: UnderlyingSource<R>,
    strategy?: QueuingStrategy<R>,
  ): ReadableStream<R>;
};
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultReader) */
export declare class ReadableStreamDefaultReader<R = any> {
  constructor(stream: ReadableStream);
  get closed(): Promise<void>;
  cancel(reason?: any): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultReader/read) */
  read(): Promise<ReadableStreamReadResult<R>>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultReader/releaseLock) */
  releaseLock(): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader) */
export declare class ReadableStreamBYOBReader {
  constructor(stream: ReadableStream);
  get closed(): Promise<void>;
  cancel(reason?: any): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/read) */
  read<T extends ArrayBufferView>(
    view: T,
  ): Promise<ReadableStreamReadResult<T>>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBReader/releaseLock) */
  releaseLock(): void;
  readAtLeast<T extends ArrayBufferView>(
    minElements: number,
    view: T,
  ): Promise<ReadableStreamReadResult<T>>;
}
export interface ReadableStreamBYOBReaderReadableStreamBYOBReaderReadOptions {
  min?: number;
}
export interface ReadableStreamGetReaderOptions {
  /**
   * Creates a ReadableStreamBYOBReader and locks the stream to the new reader.
   *
   * This call behaves the same way as the no-argument variant, except that it only works on readable byte streams, i.e. streams which were constructed specifically with the ability to handle "bring your own buffer" reading. The returned BYOB reader provides the ability to directly read individual chunks from the stream via its read() method, into developer-supplied buffers, allowing more precise control over allocation.
   */
  mode: "byob";
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest) */
export declare abstract class ReadableStreamBYOBRequest {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/view) */
  get view(): Uint8Array | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/respond) */
  respond(bytesWritten: number): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamBYOBRequest/respondWithNewView) */
  respondWithNewView(view: ArrayBuffer | ArrayBufferView): void;
  get atLeast(): number | null;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController) */
export declare abstract class ReadableStreamDefaultController<R = any> {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/desiredSize) */
  get desiredSize(): number | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/close) */
  close(): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/enqueue) */
  enqueue(chunk?: R): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableStreamDefaultController/error) */
  error(reason: any): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController) */
export declare abstract class ReadableByteStreamController {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/byobRequest) */
  get byobRequest(): ReadableStreamBYOBRequest | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/desiredSize) */
  get desiredSize(): number | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/close) */
  close(): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/enqueue) */
  enqueue(chunk: ArrayBuffer | ArrayBufferView): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ReadableByteStreamController/error) */
  error(reason: any): void;
}
/**
 * This Streams API interface represents a controller allowing control of a WritableStream's state. When constructing a WritableStream, the underlying sink is given a corresponding WritableStreamDefaultController instance to manipulate.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController)
 */
export declare abstract class WritableStreamDefaultController {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController/signal) */
  get signal(): AbortSignal;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultController/error) */
  error(reason?: any): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController) */
export declare abstract class TransformStreamDefaultController<O = any> {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/desiredSize) */
  get desiredSize(): number | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/enqueue) */
  enqueue(chunk?: O): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/error) */
  error(reason: any): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStreamDefaultController/terminate) */
  terminate(): void;
}
export interface ReadableWritablePair<R = any, W = any> {
  /**
   * Provides a convenient, chainable way of piping this readable stream through a transform stream (or any other { writable, readable } pair). It simply pipes the stream into the writable side of the supplied pair, and returns the readable side for further use.
   *
   * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
   */
  writable: WritableStream<W>;
  readable: ReadableStream<R>;
}
/**
 * This Streams API interface provides a standard abstraction for writing streaming data to a destination, known as a sink. This object comes with built-in backpressure and queuing.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream)
 */
export declare class WritableStream<W = any> {
  constructor(
    underlyingSink?: UnderlyingSink,
    queuingStrategy?: QueuingStrategy,
  );
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/locked) */
  get locked(): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/abort) */
  abort(reason?: any): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/close) */
  close(): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStream/getWriter) */
  getWriter(): WritableStreamDefaultWriter<W>;
}
/**
 * This Streams API interface is the object returned by WritableStream.getWriter() and once created locks the < writer to the WritableStream ensuring that no other streams can write to the underlying sink.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter)
 */
export declare class WritableStreamDefaultWriter<W = any> {
  constructor(stream: WritableStream);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/closed) */
  get closed(): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/ready) */
  get ready(): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/desiredSize) */
  get desiredSize(): number | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/abort) */
  abort(reason?: any): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/close) */
  close(): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/write) */
  write(chunk?: W): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/WritableStreamDefaultWriter/releaseLock) */
  releaseLock(): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStream) */
export declare class TransformStream<I = any, O = any> {
  constructor(
    transformer?: Transformer<I, O>,
    writableStrategy?: QueuingStrategy<I>,
    readableStrategy?: QueuingStrategy<O>,
  );
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStream/readable) */
  get readable(): ReadableStream<O>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TransformStream/writable) */
  get writable(): WritableStream<I>;
}
export declare class FixedLengthStream extends IdentityTransformStream {
  constructor(
    expectedLength: number | bigint,
    queuingStrategy?: IdentityTransformStreamQueuingStrategy,
  );
}
export declare class IdentityTransformStream extends TransformStream<
  ArrayBuffer | ArrayBufferView,
  Uint8Array
> {
  constructor(queuingStrategy?: IdentityTransformStreamQueuingStrategy);
}
export interface IdentityTransformStreamQueuingStrategy {
  highWaterMark?: number | bigint;
}
export interface ReadableStreamValuesOptions {
  preventCancel?: boolean;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CompressionStream) */
export declare class CompressionStream extends TransformStream<
  ArrayBuffer | ArrayBufferView,
  Uint8Array
> {
  constructor(format: "gzip" | "deflate" | "deflate-raw");
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/DecompressionStream) */
export declare class DecompressionStream extends TransformStream<
  ArrayBuffer | ArrayBufferView,
  Uint8Array
> {
  constructor(format: "gzip" | "deflate" | "deflate-raw");
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextEncoderStream) */
export declare class TextEncoderStream extends TransformStream<
  string,
  Uint8Array
> {
  constructor();
  get encoding(): string;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/TextDecoderStream) */
export declare class TextDecoderStream extends TransformStream<
  ArrayBuffer | ArrayBufferView,
  string
> {
  constructor(label?: string, options?: TextDecoderStreamTextDecoderStreamInit);
  get encoding(): string;
  get fatal(): boolean;
  get ignoreBOM(): boolean;
}
export interface TextDecoderStreamTextDecoderStreamInit {
  fatal?: boolean;
  ignoreBOM?: boolean;
}
/**
 * This Streams API interface provides a built-in byte length queuing strategy that can be used when constructing streams.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/ByteLengthQueuingStrategy)
 */
export declare class ByteLengthQueuingStrategy
  implements QueuingStrategy<ArrayBufferView>
{
  constructor(init: QueuingStrategyInit);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ByteLengthQueuingStrategy/highWaterMark) */
  get highWaterMark(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/ByteLengthQueuingStrategy/size) */
  get size(): (chunk?: any) => number;
}
/**
 * This Streams API interface provides a built-in byte length queuing strategy that can be used when constructing streams.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CountQueuingStrategy)
 */
export declare class CountQueuingStrategy implements QueuingStrategy {
  constructor(init: QueuingStrategyInit);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CountQueuingStrategy/highWaterMark) */
  get highWaterMark(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/CountQueuingStrategy/size) */
  get size(): (chunk?: any) => number;
}
export interface QueuingStrategyInit {
  /**
   * Creates a new ByteLengthQueuingStrategy with the provided high water mark.
   *
   * Note that the provided high water mark will not be validated ahead of time. Instead, if it is negative, NaN, or not a number, the resulting ByteLengthQueuingStrategy will cause the corresponding stream constructor to throw.
   */
  highWaterMark: number;
}
export interface ScriptVersion {
  id?: string;
  tag?: string;
  message?: string;
}
export declare abstract class TailEvent extends ExtendableEvent {
  readonly events: TraceItem[];
  readonly traces: TraceItem[];
}
export interface TraceItem {
  readonly event:
    | (
        | TraceItemFetchEventInfo
        | TraceItemJsRpcEventInfo
        | TraceItemScheduledEventInfo
        | TraceItemAlarmEventInfo
        | TraceItemQueueEventInfo
        | TraceItemEmailEventInfo
        | TraceItemTailEventInfo
        | TraceItemCustomEventInfo
        | TraceItemHibernatableWebSocketEventInfo
      )
    | null;
  readonly eventTimestamp: number | null;
  readonly logs: TraceLog[];
  readonly spans: OTelSpan[];
  readonly exceptions: TraceException[];
  readonly diagnosticsChannelEvents: TraceDiagnosticChannelEvent[];
  readonly scriptName: string | null;
  readonly entrypoint?: string;
  readonly scriptVersion?: ScriptVersion;
  readonly dispatchNamespace?: string;
  readonly scriptTags?: string[];
  readonly outcome: string;
  readonly executionModel: string;
  readonly truncated: boolean;
  readonly cpuTime: number;
  readonly wallTime: number;
}
export interface TraceItemAlarmEventInfo {
  readonly scheduledTime: Date;
}
export interface TraceItemCustomEventInfo {}
export interface TraceItemScheduledEventInfo {
  readonly scheduledTime: number;
  readonly cron: string;
}
export interface TraceItemQueueEventInfo {
  readonly queue: string;
  readonly batchSize: number;
}
export interface TraceItemEmailEventInfo {
  readonly mailFrom: string;
  readonly rcptTo: string;
  readonly rawSize: number;
}
export interface TraceItemTailEventInfo {
  readonly consumedEvents: TraceItemTailEventInfoTailItem[];
}
export interface TraceItemTailEventInfoTailItem {
  readonly scriptName: string | null;
}
export interface TraceItemFetchEventInfo {
  readonly response?: TraceItemFetchEventInfoResponse;
  readonly request: TraceItemFetchEventInfoRequest;
}
export interface TraceItemFetchEventInfoRequest {
  readonly cf?: any;
  readonly headers: Record<string, string>;
  readonly method: string;
  readonly url: string;
  getUnredacted(): TraceItemFetchEventInfoRequest;
}
export interface TraceItemFetchEventInfoResponse {
  readonly status: number;
}
export interface TraceItemJsRpcEventInfo {
  readonly rpcMethod: string;
}
export interface TraceItemHibernatableWebSocketEventInfo {
  readonly getWebSocketEvent:
    | TraceItemHibernatableWebSocketEventInfoMessage
    | TraceItemHibernatableWebSocketEventInfoClose
    | TraceItemHibernatableWebSocketEventInfoError;
}
export interface TraceItemHibernatableWebSocketEventInfoMessage {
  readonly webSocketEventType: string;
}
export interface TraceItemHibernatableWebSocketEventInfoClose {
  readonly webSocketEventType: string;
  readonly code: number;
  readonly wasClean: boolean;
}
export interface TraceItemHibernatableWebSocketEventInfoError {
  readonly webSocketEventType: string;
}
export interface TraceLog {
  readonly timestamp: number;
  readonly level: string;
  readonly message: any;
}
export interface OTelSpan {
  readonly spanId: string;
  readonly parentSpanId: string;
  readonly operation: string;
  readonly tags: OTelSpanTag[];
  readonly startTime: Date;
  readonly endTime: Date;
}
export interface OTelSpanTag {
  key: string;
  value: string | boolean | number | (number | bigint);
}
export interface TraceException {
  readonly timestamp: number;
  readonly message: string;
  readonly name: string;
  readonly stack?: string;
}
export interface TraceDiagnosticChannelEvent {
  readonly timestamp: number;
  readonly channel: string;
  readonly message: any;
}
export interface TraceMetrics {
  readonly cpuTime: number;
  readonly wallTime: number;
}
export interface UnsafeTraceMetrics {
  fromTrace(item: TraceItem): TraceMetrics;
}
/**
 * The URL interface represents an object providing static methods used for creating object URLs.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL)
 */
export declare class URL {
  constructor(url: string | URL, base?: string | URL);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/origin) */
  get origin(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/href) */
  get href(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/href) */
  set href(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/protocol) */
  get protocol(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/protocol) */
  set protocol(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/username) */
  get username(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/username) */
  set username(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/password) */
  get password(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/password) */
  set password(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/host) */
  get host(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/host) */
  set host(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/hostname) */
  get hostname(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/hostname) */
  set hostname(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/port) */
  get port(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/port) */
  set port(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/pathname) */
  get pathname(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/pathname) */
  set pathname(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/search) */
  get search(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/search) */
  set search(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/hash) */
  get hash(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/hash) */
  set hash(value: string);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/searchParams) */
  get searchParams(): URLSearchParams;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/toJSON) */
  toJSON(): string;
  /*function toString() { [native code] }*/
  toString(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/canParse_static) */
  static canParse(url: string, base?: string): boolean;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/parse_static) */
  static parse(url: string, base?: string): URL | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/createObjectURL_static) */
  static createObjectURL(object: File | Blob): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URL/revokeObjectURL_static) */
  static revokeObjectURL(object_url: string): void;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams) */
export declare class URLSearchParams {
  constructor(
    init?: Iterable<Iterable<string>> | Record<string, string> | string,
  );
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/size) */
  get size(): number;
  /**
   * Appends a specified key/value pair as a new search parameter.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/append)
   */
  append(name: string, value: string): void;
  /**
   * Deletes the given search parameter, and its associated value, from the list of all search parameters.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/delete)
   */
  delete(name: string, value?: string): void;
  /**
   * Returns the first value associated to the given search parameter.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/get)
   */
  get(name: string): string | null;
  /**
   * Returns all the values association with a given search parameter.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/getAll)
   */
  getAll(name: string): string[];
  /**
   * Returns a Boolean indicating if such a search parameter exists.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/has)
   */
  has(name: string, value?: string): boolean;
  /**
   * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/set)
   */
  set(name: string, value: string): void;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/sort) */
  sort(): void;
  /* Returns an array of key, value pairs for every entry in the search params. */
  entries(): IterableIterator<[key: string, value: string]>;
  /* Returns a list of keys in the search params. */
  keys(): IterableIterator<string>;
  /* Returns a list of values in the search params. */
  values(): IterableIterator<string>;
  forEach<This = unknown>(
    callback: (
      this: This,
      value: string,
      key: string,
      parent: URLSearchParams,
    ) => void,
    thisArg?: This,
  ): void;
  /*function toString() { [native code] } Returns a string containing a query string suitable for use in a URL. Does not include the question mark. */
  toString(): string;
  [Symbol.iterator](): IterableIterator<[key: string, value: string]>;
}
export declare class URLPattern {
  constructor(
    input?: string | URLPatternInit,
    baseURL?: string | URLPatternOptions,
    patternOptions?: URLPatternOptions,
  );
  get protocol(): string;
  get username(): string;
  get password(): string;
  get hostname(): string;
  get port(): string;
  get pathname(): string;
  get search(): string;
  get hash(): string;
  get hasRegExpGroups(): boolean;
  test(input?: string | URLPatternInit, baseURL?: string): boolean;
  exec(
    input?: string | URLPatternInit,
    baseURL?: string,
  ): URLPatternResult | null;
}
export interface URLPatternInit {
  protocol?: string;
  username?: string;
  password?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  baseURL?: string;
}
export interface URLPatternComponentResult {
  input: string;
  groups: Record<string, string>;
}
export interface URLPatternResult {
  inputs: (string | URLPatternInit)[];
  protocol: URLPatternComponentResult;
  username: URLPatternComponentResult;
  password: URLPatternComponentResult;
  hostname: URLPatternComponentResult;
  port: URLPatternComponentResult;
  pathname: URLPatternComponentResult;
  search: URLPatternComponentResult;
  hash: URLPatternComponentResult;
}
export interface URLPatternOptions {
  ignoreCase?: boolean;
}
/**
 * A CloseEvent is sent to clients using WebSockets when the connection is closed. This is delivered to the listener indicated by the WebSocket object's onclose attribute.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent)
 */
export declare class CloseEvent extends Event {
  constructor(type: string, initializer?: CloseEventInit);
  /**
   * Returns the WebSocket connection close code provided by the server.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent/code)
   */
  readonly code: number;
  /**
   * Returns the WebSocket connection close reason provided by the server.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent/reason)
   */
  readonly reason: string;
  /**
   * Returns true if the connection closed cleanly; false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CloseEvent/wasClean)
   */
  readonly wasClean: boolean;
}
export interface CloseEventInit {
  code?: number;
  reason?: string;
  wasClean?: boolean;
}
export type WebSocketEventMap = {
  close: CloseEvent;
  message: MessageEvent;
  open: Event;
  error: ErrorEvent;
};
/**
 * Provides the API for creating and managing a WebSocket connection to a server, as well as for sending and receiving data on the connection.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket)
 */
export declare var WebSocket: {
  prototype: WebSocket;
  new (url: string, protocols?: string[] | string): WebSocket;
  readonly READY_STATE_CONNECTING: number;
  readonly CONNECTING: number;
  readonly READY_STATE_OPEN: number;
  readonly OPEN: number;
  readonly READY_STATE_CLOSING: number;
  readonly CLOSING: number;
  readonly READY_STATE_CLOSED: number;
  readonly CLOSED: number;
};
/**
 * Provides the API for creating and managing a WebSocket connection to a server, as well as for sending and receiving data on the connection.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket)
 */
export interface WebSocket extends EventTarget<WebSocketEventMap> {
  accept(): void;
  /**
   * Transmits data using the WebSocket connection. data can be a string, a Blob, an ArrayBuffer, or an ArrayBufferView.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/send)
   */
  send(message: (ArrayBuffer | ArrayBufferView) | string): void;
  /**
   * Closes the WebSocket connection, optionally using code as the the WebSocket connection close code and reason as the the WebSocket connection close reason.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/close)
   */
  close(code?: number, reason?: string): void;
  serializeAttachment(attachment: any): void;
  deserializeAttachment(): any | null;
  /**
   * Returns the state of the WebSocket object's connection. It can have the values described below.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/readyState)
   */
  readyState: number;
  /**
   * Returns the URL that was used to establish the WebSocket connection.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/url)
   */
  url: string | null;
  /**
   * Returns the subprotocol selected by the server, if any. It can be used in conjunction with the array form of the constructor's second argument to perform subprotocol negotiation.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/protocol)
   */
  protocol: string | null;
  /**
   * Returns the extensions selected by the server, if any.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/WebSocket/extensions)
   */
  extensions: string | null;
}
export declare const WebSocketPair: {
  new (): {
    0: WebSocket;
    1: WebSocket;
  };
};
export interface SqlStorage {
  exec<T extends Record<string, SqlStorageValue>>(
    query: string,
    ...bindings: any[]
  ): SqlStorageCursor<T>;
  prepare(query: string): SqlStorageStatement;
  ingest(query: string): SqlStorageIngestResult;
  setMaxPageCountForTest(count: number): void;
  get databaseSize(): number;
  Cursor: typeof SqlStorageCursor;
  Statement: typeof SqlStorageStatement;
}
export declare abstract class SqlStorageStatement {}
export type SqlStorageValue = ArrayBuffer | string | number | null;
export declare abstract class SqlStorageCursor<
  T extends Record<string, SqlStorageValue>,
> {
  next():
    | {
        done?: false;
        value: T;
      }
    | {
        done: true;
        value?: never;
      };
  toArray(): T[];
  one(): T;
  raw<U extends SqlStorageValue[]>(): IterableIterator<U>;
  columnNames: string[];
  get rowsRead(): number;
  get rowsWritten(): number;
  get reusedCachedQueryForTest(): boolean;
  [Symbol.iterator](): IterableIterator<T>;
}
export interface SqlStorageIngestResult {
  remainder: string;
  rowsRead: number;
  rowsWritten: number;
  statementCount: number;
}
export interface Socket {
  get readable(): ReadableStream;
  get writable(): WritableStream;
  get closed(): Promise<void>;
  get opened(): Promise<SocketInfo>;
  get upgraded(): boolean;
  get secureTransport(): "on" | "off" | "starttls";
  close(): Promise<void>;
  startTls(options?: TlsOptions): Socket;
}
export interface SocketOptions {
  secureTransport?: string;
  allowHalfOpen: boolean;
  highWaterMark?: number | bigint;
}
export interface SocketAddress {
  hostname: string;
  port: number;
}
export interface TlsOptions {
  expectedServerHostname?: string;
}
export interface SocketInfo {
  remoteAddress?: string;
  localAddress?: string;
}
/* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource) */
export declare class EventSource extends EventTarget {
  constructor(url: string, init?: EventSourceEventSourceInit);
  /**
   * Aborts any instances of the fetch algorithm started for this EventSource object, and sets the readyState attribute to CLOSED.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/close)
   */
  close(): void;
  /**
   * Returns the URL providing the event stream.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/url)
   */
  get url(): string;
  /**
   * Returns true if the credentials mode for connection requests to the URL providing the event stream is set to "include", and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/withCredentials)
   */
  get withCredentials(): boolean;
  /**
   * Returns the state of this EventSource object's connection. It can have the values described below.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/readyState)
   */
  get readyState(): number;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/open_event) */
  get onopen(): any | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/open_event) */
  set onopen(value: any | null);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/message_event) */
  get onmessage(): any | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/message_event) */
  set onmessage(value: any | null);
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/error_event) */
  get onerror(): any | null;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/error_event) */
  set onerror(value: any | null);
  static readonly CONNECTING: number;
  static readonly OPEN: number;
  static readonly CLOSED: number;
  static from(stream: ReadableStream): EventSource;
}
export interface EventSourceEventSourceInit {
  withCredentials?: boolean;
  fetcher?: Fetcher;
}
export interface Container {
  get running(): boolean;
  start(options?: ContainerStartupOptions): void;
  monitor(): Promise<void>;
  destroy(error?: any): Promise<void>;
  signal(signo: number): void;
  getTcpPort(port: number): Fetcher;
}
export interface ContainerStartupOptions {
  entrypoint?: string[];
  enableInternet: boolean;
  env?: Record<string, string>;
}
/**
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemHandle)
 */
export declare abstract class FileSystemHandle {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemHandle/kind) */
  get kind(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemHandle/name) */
  get name(): string;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemHandle/isSameEntry) */
  isSameEntry(other: FileSystemHandle): Promise<boolean>;
  getUniqueId(): Promise<string>;
  remove(options?: FileSystemHandleRemoveOptions): Promise<void>;
}
/**
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemFileHandle)
 */
export declare abstract class FileSystemFileHandle extends FileSystemHandle {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemFileHandle/getFile) */
  getFile(): Promise<File>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemFileHandle/createWritable) */
  createWritable(
    options?: FileSystemFileHandleFileSystemCreateWritableOptions,
  ): Promise<FileSystemWritableFileStream>;
}
/**
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryHandle)
 */
export declare abstract class FileSystemDirectoryHandle extends FileSystemHandle {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryHandle/getFileHandle) */
  getFileHandle(
    name: string,
    options?: FileSystemDirectoryHandleFileSystemGetFileOptions,
  ): Promise<FileSystemFileHandle>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryHandle/getDirectoryHandle) */
  getDirectoryHandle(
    name: string,
    options?: FileSystemDirectoryHandleFileSystemGetDirectoryOptions,
  ): Promise<FileSystemDirectoryHandle>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryHandle/removeEntry) */
  removeEntry(
    name: string,
    options?: FileSystemDirectoryHandleFileSystemRemoveOptions,
  ): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemDirectoryHandle/resolve) */
  resolve(possibleDescendant: FileSystemHandle): Promise<string[]>;
  entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
  keys(): AsyncIterableIterator<string>;
  values(): AsyncIterableIterator<FileSystemHandle>;
  forEach(
    callback: (
      param0: string,
      param1: FileSystemHandle,
      param2: FileSystemDirectoryHandle,
    ) => void,
    thisArg?: any,
  ): void;
  [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemHandle]>;
}
/**
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemWritableFileStream)
 */
export declare abstract class FileSystemWritableFileStream extends WritableStream {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemWritableFileStream/write) */
  write(
    data:
      | Blob
      | (ArrayBuffer | ArrayBufferView)
      | string
      | FileSystemFileWriteParams,
  ): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemWritableFileStream/seek) */
  seek(position: number): Promise<void>;
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemWritableFileStream/truncate) */
  truncate(size: number): Promise<void>;
}
/**
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/StorageManager)
 */
export declare abstract class StorageManager {
  /* [MDN Reference](https://developer.mozilla.org/docs/Web/API/StorageManager/getDirectory) */
  getDirectory(): Promise<FileSystemDirectoryHandle>;
}
export interface FileSystemFileHandleFileSystemCreateWritableOptions {
  keepExistingData?: boolean;
}
export interface FileSystemDirectoryHandleFileSystemGetFileOptions {
  create: boolean;
}
export interface FileSystemDirectoryHandleFileSystemGetDirectoryOptions {
  create: boolean;
}
export interface FileSystemDirectoryHandleFileSystemRemoveOptions {
  recursive: boolean;
}
export interface FileSystemFileWriteParams {
  type: string;
  size?: number;
  position?: number;
  data?: (Blob | (ArrayBuffer | ArrayBufferView) | string) | null;
}
export interface FileSystemHandleRemoveOptions {
  recursive?: boolean;
}
/**
 * This Channel Messaging API interface represents one of the two ports of a MessageChannel, allowing messages to be sent from one port and listening out for them arriving at the other.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessagePort)
 */
export declare abstract class MessagePort extends EventTarget {
  /**
   * Posts a message through the channel. Objects listed in transfer are transferred, not just cloned, meaning that they are no longer usable on the sending side.
   *
   * Throws a "DataCloneError" DOMException if transfer contains duplicate objects or port, or if message could not be cloned.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessagePort/postMessage)
   */
  postMessage(
    data?: any,
    options?: any[] | MessagePortPostMessageOptions,
  ): void;
  /**
   * Disconnects the port, so that it is no longer active.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessagePort/close)
   */
  close(): void;
  /**
   * Begins dispatching messages received on the port.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessagePort/start)
   */
  start(): void;
  get onmessage(): any | null;
  set onmessage(value: any | null);
}
/**
 * This Channel Messaging API interface allows us to create a new message channel and send data through it via its two MessagePort properties.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageChannel)
 */
export declare class MessageChannel {
  constructor();
  /**
   * Returns the first MessagePort object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageChannel/port1)
   */
  readonly port1: MessagePort;
  /**
   * Returns the second MessagePort object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/MessageChannel/port2)
   */
  readonly port2: MessagePort;
}
export interface MessagePortPostMessageOptions {
  transfer?: any[];
}
export type AiImageClassificationInput = {
  image: number[];
};
export type AiImageClassificationOutput = {
  score?: number;
  label?: string;
}[];
export declare abstract class BaseAiImageClassification {
  inputs: AiImageClassificationInput;
  postProcessedOutputs: AiImageClassificationOutput;
}
export type AiImageToTextInput = {
  image: number[];
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  seed?: number;
  repetition_penalty?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  raw?: boolean;
  messages?: RoleScopedChatInput[];
};
export type AiImageToTextOutput = {
  description: string;
};
export declare abstract class BaseAiImageToText {
  inputs: AiImageToTextInput;
  postProcessedOutputs: AiImageToTextOutput;
}
export type AiImageTextToTextInput = {
  image: string;
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
  ignore_eos?: boolean;
  top_p?: number;
  top_k?: number;
  seed?: number;
  repetition_penalty?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  raw?: boolean;
  messages?: RoleScopedChatInput[];
};
export type AiImageTextToTextOutput = {
  description: string;
};
export declare abstract class BaseAiImageTextToText {
  inputs: AiImageTextToTextInput;
  postProcessedOutputs: AiImageTextToTextOutput;
}
export type AiObjectDetectionInput = {
  image: number[];
};
export type AiObjectDetectionOutput = {
  score?: number;
  label?: string;
}[];
export declare abstract class BaseAiObjectDetection {
  inputs: AiObjectDetectionInput;
  postProcessedOutputs: AiObjectDetectionOutput;
}
export type AiSentenceSimilarityInput = {
  source: string;
  sentences: string[];
};
export type AiSentenceSimilarityOutput = number[];
export declare abstract class BaseAiSentenceSimilarity {
  inputs: AiSentenceSimilarityInput;
  postProcessedOutputs: AiSentenceSimilarityOutput;
}
export type AiAutomaticSpeechRecognitionInput = {
  audio: number[];
};
export type AiAutomaticSpeechRecognitionOutput = {
  text?: string;
  words?: {
    word: string;
    start: number;
    end: number;
  }[];
  vtt?: string;
};
export declare abstract class BaseAiAutomaticSpeechRecognition {
  inputs: AiAutomaticSpeechRecognitionInput;
  postProcessedOutputs: AiAutomaticSpeechRecognitionOutput;
}
export type AiSummarizationInput = {
  input_text: string;
  max_length?: number;
};
export type AiSummarizationOutput = {
  summary: string;
};
export declare abstract class BaseAiSummarization {
  inputs: AiSummarizationInput;
  postProcessedOutputs: AiSummarizationOutput;
}
export type AiTextClassificationInput = {
  text: string;
};
export type AiTextClassificationOutput = {
  score?: number;
  label?: string;
}[];
export declare abstract class BaseAiTextClassification {
  inputs: AiTextClassificationInput;
  postProcessedOutputs: AiTextClassificationOutput;
}
export type AiTextEmbeddingsInput = {
  text: string | string[];
};
export type AiTextEmbeddingsOutput = {
  shape: number[];
  data: number[][];
};
export declare abstract class BaseAiTextEmbeddings {
  inputs: AiTextEmbeddingsInput;
  postProcessedOutputs: AiTextEmbeddingsOutput;
}
export type RoleScopedChatInput = {
  role:
    | "user"
    | "assistant"
    | "system"
    | "tool"
    | (string & NonNullable<unknown>);
  content: string;
  name?: string;
};
export type AiTextGenerationToolLegacyInput = {
  name: string;
  description: string;
  parameters?: {
    type: "object" | (string & NonNullable<unknown>);
    properties: {
      [key: string]: {
        type: string;
        description?: string;
      };
    };
    required: string[];
  };
};
export type AiTextGenerationToolInput = {
  type: "function" | (string & NonNullable<unknown>);
  function: {
    name: string;
    description: string;
    parameters?: {
      type: "object" | (string & NonNullable<unknown>);
      properties: {
        [key: string]: {
          type: string;
          description?: string;
        };
      };
      required: string[];
    };
  };
};
export type AiTextGenerationFunctionsInput = {
  name: string;
  code: string;
};
export type AiTextGenerationResponseFormat = {
  type: string;
  json_schema?: any;
};
export type AiTextGenerationInput = {
  prompt?: string;
  raw?: boolean;
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  seed?: number;
  repetition_penalty?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  messages?: RoleScopedChatInput[];
  response_format?: AiTextGenerationResponseFormat;
  tools?:
    | AiTextGenerationToolInput[]
    | AiTextGenerationToolLegacyInput[]
    | (object & NonNullable<unknown>);
  functions?: AiTextGenerationFunctionsInput[];
};
export type AiTextGenerationOutput = {
  response?: string;
  tool_calls?: {
    name: string;
    arguments: unknown;
  }[];
};
export declare abstract class BaseAiTextGeneration {
  inputs: AiTextGenerationInput;
  postProcessedOutputs: AiTextGenerationOutput;
}
export type AiTextToSpeechInput = {
  prompt: string;
  lang?: string;
};
export type AiTextToSpeechOutput =
  | Uint8Array
  | {
      audio: string;
    };
export declare abstract class BaseAiTextToSpeech {
  inputs: AiTextToSpeechInput;
  postProcessedOutputs: AiTextToSpeechOutput;
}
export type AiTextToImageInput = {
  prompt: string;
  negative_prompt?: string;
  height?: number;
  width?: number;
  image?: number[];
  image_b64?: string;
  mask?: number[];
  num_steps?: number;
  strength?: number;
  guidance?: number;
  seed?: number;
};
export type AiTextToImageOutput = ReadableStream<Uint8Array>;
export declare abstract class BaseAiTextToImage {
  inputs: AiTextToImageInput;
  postProcessedOutputs: AiTextToImageOutput;
}
export type AiTranslationInput = {
  text: string;
  target_lang: string;
  source_lang?: string;
};
export type AiTranslationOutput = {
  translated_text?: string;
};
export declare abstract class BaseAiTranslation {
  inputs: AiTranslationInput;
  postProcessedOutputs: AiTranslationOutput;
}
export type Ai_Cf_Baai_Bge_Base_En_V1_5_Input =
  | {
      text: string | string[];
      /**
       * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
       */
      pooling?: "mean" | "cls";
    }
  | {
      /**
       * Batch of the embeddings requests to run using async-queue
       */
      requests: {
        text: string | string[];
        /**
         * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
         */
        pooling?: "mean" | "cls";
      }[];
    };
export type Ai_Cf_Baai_Bge_Base_En_V1_5_Output =
  | {
      shape?: number[];
      /**
       * Embeddings of the requested text values
       */
      data?: number[][];
      /**
       * The pooling method used in the embedding process.
       */
      pooling?: "mean" | "cls";
    }
  | AsyncResponse;
export interface AsyncResponse {
  /**
   * The async request id that can be used to obtain the results.
   */
  request_id?: string;
}
export declare abstract class Base_Ai_Cf_Baai_Bge_Base_En_V1_5 {
  inputs: Ai_Cf_Baai_Bge_Base_En_V1_5_Input;
  postProcessedOutputs: Ai_Cf_Baai_Bge_Base_En_V1_5_Output;
}
export type Ai_Cf_Openai_Whisper_Input =
  | string
  | {
      /**
       * An array of integers that represent the audio data constrained to 8-bit unsigned integer values
       */
      audio: number[];
    };
export interface Ai_Cf_Openai_Whisper_Output {
  /**
   * The transcription
   */
  text: string;
  word_count?: number;
  words?: {
    word?: string;
    /**
     * The second this word begins in the recording
     */
    start?: number;
    /**
     * The ending second when the word completes
     */
    end?: number;
  }[];
  vtt?: string;
}
export declare abstract class Base_Ai_Cf_Openai_Whisper {
  inputs: Ai_Cf_Openai_Whisper_Input;
  postProcessedOutputs: Ai_Cf_Openai_Whisper_Output;
}
export type Ai_Cf_Meta_M2M100_1_2B_Input =
  | {
      /**
       * The text to be translated
       */
      text: string;
      /**
       * The language code of the source text (e.g., 'en' for English). Defaults to 'en' if not specified
       */
      source_lang?: string;
      /**
       * The language code to translate the text into (e.g., 'es' for Spanish)
       */
      target_lang: string;
    }
  | {
      /**
       * Batch of the embeddings requests to run using async-queue
       */
      requests: {
        /**
         * The text to be translated
         */
        text: string;
        /**
         * The language code of the source text (e.g., 'en' for English). Defaults to 'en' if not specified
         */
        source_lang?: string;
        /**
         * The language code to translate the text into (e.g., 'es' for Spanish)
         */
        target_lang: string;
      }[];
    };
export type Ai_Cf_Meta_M2M100_1_2B_Output =
  | {
      /**
       * The translated text in the target language
       */
      translated_text?: string;
    }
  | AsyncResponse;
export declare abstract class Base_Ai_Cf_Meta_M2M100_1_2B {
  inputs: Ai_Cf_Meta_M2M100_1_2B_Input;
  postProcessedOutputs: Ai_Cf_Meta_M2M100_1_2B_Output;
}
export type Ai_Cf_Baai_Bge_Small_En_V1_5_Input =
  | {
      text: string | string[];
      /**
       * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
       */
      pooling?: "mean" | "cls";
    }
  | {
      /**
       * Batch of the embeddings requests to run using async-queue
       */
      requests: {
        text: string | string[];
        /**
         * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
         */
        pooling?: "mean" | "cls";
      }[];
    };
export type Ai_Cf_Baai_Bge_Small_En_V1_5_Output =
  | {
      shape?: number[];
      /**
       * Embeddings of the requested text values
       */
      data?: number[][];
      /**
       * The pooling method used in the embedding process.
       */
      pooling?: "mean" | "cls";
    }
  | AsyncResponse;
export declare abstract class Base_Ai_Cf_Baai_Bge_Small_En_V1_5 {
  inputs: Ai_Cf_Baai_Bge_Small_En_V1_5_Input;
  postProcessedOutputs: Ai_Cf_Baai_Bge_Small_En_V1_5_Output;
}
export type Ai_Cf_Baai_Bge_Large_En_V1_5_Input =
  | {
      text: string | string[];
      /**
       * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
       */
      pooling?: "mean" | "cls";
    }
  | {
      /**
       * Batch of the embeddings requests to run using async-queue
       */
      requests: {
        text: string | string[];
        /**
         * The pooling method used in the embedding process. `cls` pooling will generate more accurate embeddings on larger inputs - however, embeddings created with cls pooling are not compatible with embeddings generated with mean pooling. The default pooling method is `mean` in order for this to not be a breaking change, but we highly suggest using the new `cls` pooling for better accuracy.
         */
        pooling?: "mean" | "cls";
      }[];
    };
export type Ai_Cf_Baai_Bge_Large_En_V1_5_Output =
  | {
      shape?: number[];
      /**
       * Embeddings of the requested text values
       */
      data?: number[][];
      /**
       * The pooling method used in the embedding process.
       */
      pooling?: "mean" | "cls";
    }
  | AsyncResponse;
export declare abstract class Base_Ai_Cf_Baai_Bge_Large_En_V1_5 {
  inputs: Ai_Cf_Baai_Bge_Large_En_V1_5_Input;
  postProcessedOutputs: Ai_Cf_Baai_Bge_Large_En_V1_5_Output;
}
export type Ai_Cf_Unum_Uform_Gen2_Qwen_500M_Input =
  | string
  | {
      /**
       * The input text prompt for the model to generate a response.
       */
      prompt?: string;
      /**
       * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
       */
      raw?: boolean;
      /**
       * Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
       */
      top_p?: number;
      /**
       * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
       */
      top_k?: number;
      /**
       * Random seed for reproducibility of the generation.
       */
      seed?: number;
      /**
       * Penalty for repeated tokens; higher values discourage repetition.
       */
      repetition_penalty?: number;
      /**
       * Decreases the likelihood of the model repeating the same lines verbatim.
       */
      frequency_penalty?: number;
      /**
       * Increases the likelihood of the model introducing new topics.
       */
      presence_penalty?: number;
      image: number[] | (string & NonNullable<unknown>);
      /**
       * The maximum number of tokens to generate in the response.
       */
      max_tokens?: number;
    };
export interface Ai_Cf_Unum_Uform_Gen2_Qwen_500M_Output {
  description?: string;
}
export declare abstract class Base_Ai_Cf_Unum_Uform_Gen2_Qwen_500M {
  inputs: Ai_Cf_Unum_Uform_Gen2_Qwen_500M_Input;
  postProcessedOutputs: Ai_Cf_Unum_Uform_Gen2_Qwen_500M_Output;
}
export type Ai_Cf_Openai_Whisper_Tiny_En_Input =
  | string
  | {
      /**
       * An array of integers that represent the audio data constrained to 8-bit unsigned integer values
       */
      audio: number[];
    };
export interface Ai_Cf_Openai_Whisper_Tiny_En_Output {
  /**
   * The transcription
   */
  text: string;
  word_count?: number;
  words?: {
    word?: string;
    /**
     * The second this word begins in the recording
     */
    start?: number;
    /**
     * The ending second when the word completes
     */
    end?: number;
  }[];
  vtt?: string;
}
export declare abstract class Base_Ai_Cf_Openai_Whisper_Tiny_En {
  inputs: Ai_Cf_Openai_Whisper_Tiny_En_Input;
  postProcessedOutputs: Ai_Cf_Openai_Whisper_Tiny_En_Output;
}
export interface Ai_Cf_Openai_Whisper_Large_V3_Turbo_Input {
  /**
   * Base64 encoded value of the audio data.
   */
  audio: string;
  /**
   * Supported tasks are 'translate' or 'transcribe'.
   */
  task?: string;
  /**
   * The language of the audio being transcribed or translated.
   */
  language?: string;
  /**
   * Preprocess the audio with a voice activity detection model.
   */
  vad_filter?: boolean;
  /**
   * A text prompt to help provide context to the model on the contents of the audio.
   */
  initial_prompt?: string;
  /**
   * The prefix it appended the the beginning of the output of the transcription and can guide the transcription result.
   */
  prefix?: string;
}
export interface Ai_Cf_Openai_Whisper_Large_V3_Turbo_Output {
  transcription_info?: {
    /**
     * The language of the audio being transcribed or translated.
     */
    language?: string;
    /**
     * The confidence level or probability of the detected language being accurate, represented as a decimal between 0 and 1.
     */
    language_probability?: number;
    /**
     * The total duration of the original audio file, in seconds.
     */
    duration?: number;
    /**
     * The duration of the audio after applying Voice Activity Detection (VAD) to remove silent or irrelevant sections, in seconds.
     */
    duration_after_vad?: number;
  };
  /**
   * The complete transcription of the audio.
   */
  text: string;
  /**
   * The total number of words in the transcription.
   */
  word_count?: number;
  segments?: {
    /**
     * The starting time of the segment within the audio, in seconds.
     */
    start?: number;
    /**
     * The ending time of the segment within the audio, in seconds.
     */
    end?: number;
    /**
     * The transcription of the segment.
     */
    text?: string;
    /**
     * The temperature used in the decoding process, controlling randomness in predictions. Lower values result in more deterministic outputs.
     */
    temperature?: number;
    /**
     * The average log probability of the predictions for the words in this segment, indicating overall confidence.
     */
    avg_logprob?: number;
    /**
     * The compression ratio of the input to the output, measuring how much the text was compressed during the transcription process.
     */
    compression_ratio?: number;
    /**
     * The probability that the segment contains no speech, represented as a decimal between 0 and 1.
     */
    no_speech_prob?: number;
    words?: {
      /**
       * The individual word transcribed from the audio.
       */
      word?: string;
      /**
       * The starting time of the word within the audio, in seconds.
       */
      start?: number;
      /**
       * The ending time of the word within the audio, in seconds.
       */
      end?: number;
    }[];
  }[];
  /**
   * The transcription in WebVTT format, which includes timing and text information for use in subtitles.
   */
  vtt?: string;
}
export declare abstract class Base_Ai_Cf_Openai_Whisper_Large_V3_Turbo {
  inputs: Ai_Cf_Openai_Whisper_Large_V3_Turbo_Input;
  postProcessedOutputs: Ai_Cf_Openai_Whisper_Large_V3_Turbo_Output;
}
export type Ai_Cf_Baai_Bge_M3_Input =
  | BGEM3InputQueryAndContexts
  | BGEM3InputEmbedding
  | {
      /**
       * Batch of the embeddings requests to run using async-queue
       */
      requests: (BGEM3InputQueryAndContexts1 | BGEM3InputEmbedding1)[];
    };
export interface BGEM3InputQueryAndContexts {
  /**
   * A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts
   */
  query?: string;
  /**
   * List of provided contexts. Note that the index in this array is important, as the response will refer to it.
   */
  contexts: {
    /**
     * One of the provided context content
     */
    text?: string;
  }[];
  /**
   * When provided with too long context should the model error out or truncate the context to fit?
   */
  truncate_inputs?: boolean;
}
export interface BGEM3InputEmbedding {
  text: string | string[];
  /**
   * When provided with too long context should the model error out or truncate the context to fit?
   */
  truncate_inputs?: boolean;
}
export interface BGEM3InputQueryAndContexts1 {
  /**
   * A query you wish to perform against the provided contexts. If no query is provided the model with respond with embeddings for contexts
   */
  query?: string;
  /**
   * List of provided contexts. Note that the index in this array is important, as the response will refer to it.
   */
  contexts: {
    /**
     * One of the provided context content
     */
    text?: string;
  }[];
  /**
   * When provided with too long context should the model error out or truncate the context to fit?
   */
  truncate_inputs?: boolean;
}
export interface BGEM3InputEmbedding1 {
  text: string | string[];
  /**
   * When provided with too long context should the model error out or truncate the context to fit?
   */
  truncate_inputs?: boolean;
}
export type Ai_Cf_Baai_Bge_M3_Output =
  | BGEM3OuputQuery
  | BGEM3OutputEmbeddingForContexts
  | BGEM3OuputEmbedding
  | AsyncResponse;
export interface BGEM3OuputQuery {
  response?: {
    /**
     * Index of the context in the request
     */
    id?: number;
    /**
     * Score of the context under the index.
     */
    score?: number;
  }[];
}
export interface BGEM3OutputEmbeddingForContexts {
  response?: number[][];
  shape?: number[];
  /**
   * The pooling method used in the embedding process.
   */
  pooling?: "mean" | "cls";
}
export interface BGEM3OuputEmbedding {
  shape?: number[];
  /**
   * Embeddings of the requested text values
   */
  data?: number[][];
  /**
   * The pooling method used in the embedding process.
   */
  pooling?: "mean" | "cls";
}
export declare abstract class Base_Ai_Cf_Baai_Bge_M3 {
  inputs: Ai_Cf_Baai_Bge_M3_Input;
  postProcessedOutputs: Ai_Cf_Baai_Bge_M3_Output;
}
export interface Ai_Cf_Black_Forest_Labs_Flux_1_Schnell_Input {
  /**
   * A text description of the image you want to generate.
   */
  prompt: string;
  /**
   * The number of diffusion steps; higher values can improve quality but take longer.
   */
  steps?: number;
}
export interface Ai_Cf_Black_Forest_Labs_Flux_1_Schnell_Output {
  /**
   * The generated image in Base64 format.
   */
  image?: string;
}
export declare abstract class Base_Ai_Cf_Black_Forest_Labs_Flux_1_Schnell {
  inputs: Ai_Cf_Black_Forest_Labs_Flux_1_Schnell_Input;
  postProcessedOutputs: Ai_Cf_Black_Forest_Labs_Flux_1_Schnell_Output;
}
export type Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct_Input = Prompt | Messages;
export interface Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  image?: number[] | (string & NonNullable<unknown>);
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
  /**
   * Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.
   */
  lora?: string;
}
export interface Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role?: string;
    /**
     * The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001
     */
    tool_call_id?: string;
    content?:
      | string
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        }[]
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        };
  }[];
  image?: number[] | (string & NonNullable<unknown>);
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  /**
   * If true, the response will be streamed back incrementally.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Controls the creativity of the AI's responses by adjusting how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export type Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct_Output = {
  /**
   * The generated text response from the model
   */
  response?: string;
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The arguments passed to be passed to the tool call request
     */
    arguments?: object;
    /**
     * The name of the tool to be called
     */
    name?: string;
  }[];
};
export declare abstract class Base_Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct {
  inputs: Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct_Input;
  postProcessedOutputs: Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct_Output;
}
export type Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Input =
  | Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Prompt
  | Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Messages
  | AsyncBatch;
export interface Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.
   */
  lora?: string;
  response_format?: JSONMode;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export interface JSONMode {
  type?: "json_object" | "json_schema";
  json_schema?: unknown;
}
export interface Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role: string;
    /**
     * The content of the message as a string.
     */
    content: string;
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  response_format?: JSONMode;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export interface AsyncBatch {
  requests?: {
    /**
     * User-supplied reference. This field will be present in the response as well it can be used to reference the request and response. It's NOT validated to be unique.
     */
    external_reference?: string;
    /**
     * Prompt for the text generation model
     */
    prompt?: string;
    /**
     * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
     */
    stream?: boolean;
    /**
     * The maximum number of tokens to generate in the response.
     */
    max_tokens?: number;
    /**
     * Controls the randomness of the output; higher values produce more random results.
     */
    temperature?: number;
    /**
     * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
     */
    top_p?: number;
    /**
     * Random seed for reproducibility of the generation.
     */
    seed?: number;
    /**
     * Penalty for repeated tokens; higher values discourage repetition.
     */
    repetition_penalty?: number;
    /**
     * Decreases the likelihood of the model repeating the same lines verbatim.
     */
    frequency_penalty?: number;
    /**
     * Increases the likelihood of the model introducing new topics.
     */
    presence_penalty?: number;
    response_format?: JSONMode;
  }[];
}
export type Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Output =
  | {
      /**
       * The generated text response from the model
       */
      response: string;
      /**
       * Usage statistics for the inference request
       */
      usage?: {
        /**
         * Total number of tokens in input
         */
        prompt_tokens?: number;
        /**
         * Total number of tokens in output
         */
        completion_tokens?: number;
        /**
         * Total number of input and output tokens
         */
        total_tokens?: number;
      };
      /**
       * An array of tool calls requests made during the response generation
       */
      tool_calls?: {
        /**
         * The arguments passed to be passed to the tool call request
         */
        arguments?: object;
        /**
         * The name of the tool to be called
         */
        name?: string;
      }[];
    }
  | AsyncResponse;
export declare abstract class Base_Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast {
  inputs: Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Input;
  postProcessedOutputs: Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast_Output;
}
export interface Ai_Cf_Meta_Llama_Guard_3_8B_Input {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender must alternate between 'user' and 'assistant'.
     */
    role: "user" | "assistant";
    /**
     * The content of the message as a string.
     */
    content: string;
  }[];
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Dictate the output format of the generated response.
   */
  response_format?: {
    /**
     * Set to json_object to process and output generated text as JSON.
     */
    type?: string;
  };
}
export interface Ai_Cf_Meta_Llama_Guard_3_8B_Output {
  response?:
    | string
    | {
        /**
         * Whether the conversation is safe or not.
         */
        safe?: boolean;
        /**
         * A list of what hazard categories predicted for the conversation, if the conversation is deemed unsafe.
         */
        categories?: string[];
      };
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
}
export declare abstract class Base_Ai_Cf_Meta_Llama_Guard_3_8B {
  inputs: Ai_Cf_Meta_Llama_Guard_3_8B_Input;
  postProcessedOutputs: Ai_Cf_Meta_Llama_Guard_3_8B_Output;
}
export interface Ai_Cf_Baai_Bge_Reranker_Base_Input {
  /**
   * A query you wish to perform against the provided contexts.
   */
  query: string;
  /**
   * Number of returned results starting with the best score.
   */
  top_k?: number;
  /**
   * List of provided contexts. Note that the index in this array is important, as the response will refer to it.
   */
  contexts: {
    /**
     * One of the provided context content
     */
    text?: string;
  }[];
}
export interface Ai_Cf_Baai_Bge_Reranker_Base_Output {
  response?: {
    /**
     * Index of the context in the request
     */
    id?: number;
    /**
     * Score of the context under the index.
     */
    score?: number;
  }[];
}
export declare abstract class Base_Ai_Cf_Baai_Bge_Reranker_Base {
  inputs: Ai_Cf_Baai_Bge_Reranker_Base_Input;
  postProcessedOutputs: Ai_Cf_Baai_Bge_Reranker_Base_Output;
}
export type Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct_Input =
  | Qwen2_5_Coder_32B_Instruct_Prompt
  | Qwen2_5_Coder_32B_Instruct_Messages;
export interface Qwen2_5_Coder_32B_Instruct_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * Name of the LoRA (Low-Rank Adaptation) model to fine-tune the base model.
   */
  lora?: string;
  response_format?: JSONMode;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export interface Qwen2_5_Coder_32B_Instruct_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role: string;
    /**
     * The content of the message as a string.
     */
    content: string;
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  response_format?: JSONMode;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export type Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct_Output = {
  /**
   * The generated text response from the model
   */
  response: string;
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The arguments passed to be passed to the tool call request
     */
    arguments?: object;
    /**
     * The name of the tool to be called
     */
    name?: string;
  }[];
};
export declare abstract class Base_Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct {
  inputs: Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct_Input;
  postProcessedOutputs: Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct_Output;
}
export type Ai_Cf_Qwen_Qwq_32B_Input =
  | Qwen_Qwq_32B_Prompt
  | Qwen_Qwq_32B_Messages;
export interface Qwen_Qwq_32B_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * JSON schema that should be fulfilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export interface Qwen_Qwq_32B_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role?: string;
    /**
     * The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001
     */
    tool_call_id?: string;
    content?:
      | string
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        }[]
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        };
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  /**
   * JSON schema that should be fufilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export type Ai_Cf_Qwen_Qwq_32B_Output = {
  /**
   * The generated text response from the model
   */
  response: string;
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The arguments passed to be passed to the tool call request
     */
    arguments?: object;
    /**
     * The name of the tool to be called
     */
    name?: string;
  }[];
};
export declare abstract class Base_Ai_Cf_Qwen_Qwq_32B {
  inputs: Ai_Cf_Qwen_Qwq_32B_Input;
  postProcessedOutputs: Ai_Cf_Qwen_Qwq_32B_Output;
}
export type Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct_Input =
  | Mistral_Small_3_1_24B_Instruct_Prompt
  | Mistral_Small_3_1_24B_Instruct_Messages;
export interface Mistral_Small_3_1_24B_Instruct_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * JSON schema that should be fulfilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export interface Mistral_Small_3_1_24B_Instruct_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role?: string;
    /**
     * The tool call id. Must be supplied for tool calls for Mistral-3. If you don't know what to put here you can fall back to 000000001
     */
    tool_call_id?: string;
    content?:
      | string
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        }[]
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        };
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  /**
   * JSON schema that should be fufilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export type Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct_Output = {
  /**
   * The generated text response from the model
   */
  response: string;
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The arguments passed to be passed to the tool call request
     */
    arguments?: object;
    /**
     * The name of the tool to be called
     */
    name?: string;
  }[];
};
export declare abstract class Base_Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct {
  inputs: Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct_Input;
  postProcessedOutputs: Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct_Output;
}
export type Ai_Cf_Google_Gemma_3_12B_It_Input =
  | Google_Gemma_3_12B_It_Prompt
  | Google_Gemma_3_12B_It_Messages;
export interface Google_Gemma_3_12B_It_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * JSON schema that should be fufilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export interface Google_Gemma_3_12B_It_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role?: string;
    content?:
      | string
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        }[]
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        };
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  /**
   * JSON schema that should be fufilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export type Ai_Cf_Google_Gemma_3_12B_It_Output = {
  /**
   * The generated text response from the model
   */
  response: string;
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The arguments passed to be passed to the tool call request
     */
    arguments?: object;
    /**
     * The name of the tool to be called
     */
    name?: string;
  }[];
};
export declare abstract class Base_Ai_Cf_Google_Gemma_3_12B_It {
  inputs: Ai_Cf_Google_Gemma_3_12B_It_Input;
  postProcessedOutputs: Ai_Cf_Google_Gemma_3_12B_It_Output;
}
export type Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct_Input =
  | Ai_Cf_Meta_Llama_4_Prompt
  | Ai_Cf_Meta_Llama_4_Messages;
export interface Ai_Cf_Meta_Llama_4_Prompt {
  /**
   * The input text prompt for the model to generate a response.
   */
  prompt: string;
  /**
   * JSON schema that should be fulfilled for the response.
   */
  guided_json?: object;
  response_format?: JSONMode;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export interface Ai_Cf_Meta_Llama_4_Messages {
  /**
   * An array of message objects representing the conversation history.
   */
  messages: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant', 'system', 'tool').
     */
    role?: string;
    /**
     * The tool call id. If you don't know what to put here you can fall back to 000000001
     */
    tool_call_id?: string;
    content?:
      | string
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        }[]
      | {
          /**
           * Type of the content provided
           */
          type?: string;
          text?: string;
          image_url?: {
            /**
             * image uri with data (e.g. data:image/jpeg;base64,/9j/...). HTTP URL will not be accepted
             */
            url?: string;
          };
        };
  }[];
  functions?: {
    name: string;
    code: string;
  }[];
  /**
   * A list of tools available for the assistant to use.
   */
  tools?: (
    | {
        /**
         * The name of the tool. More descriptive the better.
         */
        name: string;
        /**
         * A brief description of what the tool does.
         */
        description: string;
        /**
         * Schema defining the parameters accepted by the tool.
         */
        parameters: {
          /**
           * The type of the parameters object (usually 'object').
           */
          type: string;
          /**
           * List of required parameter names.
           */
          required?: string[];
          /**
           * Definitions of each parameter.
           */
          properties: {
            [k: string]: {
              /**
               * The data type of the parameter.
               */
              type: string;
              /**
               * A description of the expected parameter.
               */
              description: string;
            };
          };
        };
      }
    | {
        /**
         * Specifies the type of tool (e.g., 'function').
         */
        type: string;
        /**
         * Details of the function tool.
         */
        function: {
          /**
           * The name of the function.
           */
          name: string;
          /**
           * A brief description of what the function does.
           */
          description: string;
          /**
           * Schema defining the parameters accepted by the function.
           */
          parameters: {
            /**
             * The type of the parameters object (usually 'object').
             */
            type: string;
            /**
             * List of required parameter names.
             */
            required?: string[];
            /**
             * Definitions of each parameter.
             */
            properties: {
              [k: string]: {
                /**
                 * The data type of the parameter.
                 */
                type: string;
                /**
                 * A description of the expected parameter.
                 */
                description: string;
              };
            };
          };
        };
      }
  )[];
  response_format?: JSONMode;
  /**
   * JSON schema that should be fufilled for the response.
   */
  guided_json?: object;
  /**
   * If true, a chat template is not applied and you must adhere to the specific model's expected formatting.
   */
  raw?: boolean;
  /**
   * If true, the response will be streamed back incrementally using SSE, Server Sent Events.
   */
  stream?: boolean;
  /**
   * The maximum number of tokens to generate in the response.
   */
  max_tokens?: number;
  /**
   * Controls the randomness of the output; higher values produce more random results.
   */
  temperature?: number;
  /**
   * Adjusts the creativity of the AI's responses by controlling how many possible words it considers. Lower values make outputs more predictable; higher values allow for more varied and creative responses.
   */
  top_p?: number;
  /**
   * Limits the AI to choose from the top 'k' most probable words. Lower values make responses more focused; higher values introduce more variety and potential surprises.
   */
  top_k?: number;
  /**
   * Random seed for reproducibility of the generation.
   */
  seed?: number;
  /**
   * Penalty for repeated tokens; higher values discourage repetition.
   */
  repetition_penalty?: number;
  /**
   * Decreases the likelihood of the model repeating the same lines verbatim.
   */
  frequency_penalty?: number;
  /**
   * Increases the likelihood of the model introducing new topics.
   */
  presence_penalty?: number;
}
export type Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct_Output = {
  /**
   * The generated text response from the model
   */
  response: string;
  /**
   * Usage statistics for the inference request
   */
  usage?: {
    /**
     * Total number of tokens in input
     */
    prompt_tokens?: number;
    /**
     * Total number of tokens in output
     */
    completion_tokens?: number;
    /**
     * Total number of input and output tokens
     */
    total_tokens?: number;
  };
  /**
   * An array of tool calls requests made during the response generation
   */
  tool_calls?: {
    /**
     * The tool call id.
     */
    id?: string;
    /**
     * Specifies the type of tool (e.g., 'function').
     */
    type?: string;
    /**
     * Details of the function tool.
     */
    function?: {
      /**
       * The name of the tool to be called
       */
      name?: string;
      /**
       * The arguments passed to be passed to the tool call request
       */
      arguments?: object;
    };
  }[];
};
export declare abstract class Base_Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct {
  inputs: Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct_Input;
  postProcessedOutputs: Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct_Output;
}
export interface AiModels {
  "@cf/huggingface/distilbert-sst-2-int8": BaseAiTextClassification;
  "@cf/stabilityai/stable-diffusion-xl-base-1.0": BaseAiTextToImage;
  "@cf/runwayml/stable-diffusion-v1-5-inpainting": BaseAiTextToImage;
  "@cf/runwayml/stable-diffusion-v1-5-img2img": BaseAiTextToImage;
  "@cf/lykon/dreamshaper-8-lcm": BaseAiTextToImage;
  "@cf/bytedance/stable-diffusion-xl-lightning": BaseAiTextToImage;
  "@cf/myshell-ai/melotts": BaseAiTextToSpeech;
  "@cf/microsoft/resnet-50": BaseAiImageClassification;
  "@cf/facebook/detr-resnet-50": BaseAiObjectDetection;
  "@cf/meta/llama-2-7b-chat-int8": BaseAiTextGeneration;
  "@cf/mistral/mistral-7b-instruct-v0.1": BaseAiTextGeneration;
  "@cf/meta/llama-2-7b-chat-fp16": BaseAiTextGeneration;
  "@hf/thebloke/llama-2-13b-chat-awq": BaseAiTextGeneration;
  "@hf/thebloke/mistral-7b-instruct-v0.1-awq": BaseAiTextGeneration;
  "@hf/thebloke/zephyr-7b-beta-awq": BaseAiTextGeneration;
  "@hf/thebloke/openhermes-2.5-mistral-7b-awq": BaseAiTextGeneration;
  "@hf/thebloke/neural-chat-7b-v3-1-awq": BaseAiTextGeneration;
  "@hf/thebloke/llamaguard-7b-awq": BaseAiTextGeneration;
  "@hf/thebloke/deepseek-coder-6.7b-base-awq": BaseAiTextGeneration;
  "@hf/thebloke/deepseek-coder-6.7b-instruct-awq": BaseAiTextGeneration;
  "@cf/deepseek-ai/deepseek-math-7b-instruct": BaseAiTextGeneration;
  "@cf/defog/sqlcoder-7b-2": BaseAiTextGeneration;
  "@cf/openchat/openchat-3.5-0106": BaseAiTextGeneration;
  "@cf/tiiuae/falcon-7b-instruct": BaseAiTextGeneration;
  "@cf/thebloke/discolm-german-7b-v1-awq": BaseAiTextGeneration;
  "@cf/qwen/qwen1.5-0.5b-chat": BaseAiTextGeneration;
  "@cf/qwen/qwen1.5-7b-chat-awq": BaseAiTextGeneration;
  "@cf/qwen/qwen1.5-14b-chat-awq": BaseAiTextGeneration;
  "@cf/tinyllama/tinyllama-1.1b-chat-v1.0": BaseAiTextGeneration;
  "@cf/microsoft/phi-2": BaseAiTextGeneration;
  "@cf/qwen/qwen1.5-1.8b-chat": BaseAiTextGeneration;
  "@cf/mistral/mistral-7b-instruct-v0.2-lora": BaseAiTextGeneration;
  "@hf/nousresearch/hermes-2-pro-mistral-7b": BaseAiTextGeneration;
  "@hf/nexusflow/starling-lm-7b-beta": BaseAiTextGeneration;
  "@hf/google/gemma-7b-it": BaseAiTextGeneration;
  "@cf/meta-llama/llama-2-7b-chat-hf-lora": BaseAiTextGeneration;
  "@cf/google/gemma-2b-it-lora": BaseAiTextGeneration;
  "@cf/google/gemma-7b-it-lora": BaseAiTextGeneration;
  "@hf/mistral/mistral-7b-instruct-v0.2": BaseAiTextGeneration;
  "@cf/meta/llama-3-8b-instruct": BaseAiTextGeneration;
  "@cf/fblgit/una-cybertron-7b-v2-bf16": BaseAiTextGeneration;
  "@cf/meta/llama-3-8b-instruct-awq": BaseAiTextGeneration;
  "@hf/meta-llama/meta-llama-3-8b-instruct": BaseAiTextGeneration;
  "@cf/meta/llama-3.1-8b-instruct": BaseAiTextGeneration;
  "@cf/meta/llama-3.1-8b-instruct-fp8": BaseAiTextGeneration;
  "@cf/meta/llama-3.1-8b-instruct-awq": BaseAiTextGeneration;
  "@cf/meta/llama-3.2-3b-instruct": BaseAiTextGeneration;
  "@cf/meta/llama-3.2-1b-instruct": BaseAiTextGeneration;
  "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b": BaseAiTextGeneration;
  "@cf/facebook/bart-large-cnn": BaseAiSummarization;
  "@cf/llava-hf/llava-1.5-7b-hf": BaseAiImageToText;
  "@cf/baai/bge-base-en-v1.5": Base_Ai_Cf_Baai_Bge_Base_En_V1_5;
  "@cf/openai/whisper": Base_Ai_Cf_Openai_Whisper;
  "@cf/meta/m2m100-1.2b": Base_Ai_Cf_Meta_M2M100_1_2B;
  "@cf/baai/bge-small-en-v1.5": Base_Ai_Cf_Baai_Bge_Small_En_V1_5;
  "@cf/baai/bge-large-en-v1.5": Base_Ai_Cf_Baai_Bge_Large_En_V1_5;
  "@cf/unum/uform-gen2-qwen-500m": Base_Ai_Cf_Unum_Uform_Gen2_Qwen_500M;
  "@cf/openai/whisper-tiny-en": Base_Ai_Cf_Openai_Whisper_Tiny_En;
  "@cf/openai/whisper-large-v3-turbo": Base_Ai_Cf_Openai_Whisper_Large_V3_Turbo;
  "@cf/baai/bge-m3": Base_Ai_Cf_Baai_Bge_M3;
  "@cf/black-forest-labs/flux-1-schnell": Base_Ai_Cf_Black_Forest_Labs_Flux_1_Schnell;
  "@cf/meta/llama-3.2-11b-vision-instruct": Base_Ai_Cf_Meta_Llama_3_2_11B_Vision_Instruct;
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast": Base_Ai_Cf_Meta_Llama_3_3_70B_Instruct_Fp8_Fast;
  "@cf/meta/llama-guard-3-8b": Base_Ai_Cf_Meta_Llama_Guard_3_8B;
  "@cf/baai/bge-reranker-base": Base_Ai_Cf_Baai_Bge_Reranker_Base;
  "@cf/qwen/qwen2.5-coder-32b-instruct": Base_Ai_Cf_Qwen_Qwen2_5_Coder_32B_Instruct;
  "@cf/qwen/qwq-32b": Base_Ai_Cf_Qwen_Qwq_32B;
  "@cf/mistralai/mistral-small-3.1-24b-instruct": Base_Ai_Cf_Mistralai_Mistral_Small_3_1_24B_Instruct;
  "@cf/google/gemma-3-12b-it": Base_Ai_Cf_Google_Gemma_3_12B_It;
  "@cf/meta/llama-4-scout-17b-16e-instruct": Base_Ai_Cf_Meta_Llama_4_Scout_17B_16E_Instruct;
}
export type AiOptions = {
  /**
   * Send requests as an asynchronous batch job, only works for supported models
   * https://developers.cloudflare.com/workers-ai/features/batch-api
   */
  queueRequest?: boolean;
  gateway?: GatewayOptions;
  returnRawResponse?: boolean;
  prefix?: string;
  extraHeaders?: object;
};
export type ConversionResponse = {
  name: string;
  mimeType: string;
  format: "markdown";
  tokens: number;
  data: string;
};
export type AiModelsSearchParams = {
  author?: string;
  hide_experimental?: boolean;
  page?: number;
  per_page?: number;
  search?: string;
  source?: number;
  task?: string;
};
export type AiModelsSearchObject = {
  id: string;
  source: number;
  name: string;
  description: string;
  task: {
    id: string;
    name: string;
    description: string;
  };
  tags: string[];
  properties: {
    property_id: string;
    value: string;
  }[];
};
export interface InferenceUpstreamError extends Error {}
export interface AiInternalError extends Error {}
export type AiModelListType = Record<string, any>;
export declare abstract class Ai<
  AiModelList extends AiModelListType = AiModels,
> {
  aiGatewayLogId: string | null;
  gateway(gatewayId: string): AiGateway;
  autorag(autoragId?: string): AutoRAG;
  run<
    Name extends keyof AiModelList,
    Options extends AiOptions,
    InputOptions extends AiModelList[Name]["inputs"],
  >(
    model: Name,
    inputs: InputOptions,
    options?: Options,
  ): Promise<
    Options extends {
      returnRawResponse: true;
    }
      ? Response
      : InputOptions extends {
            stream: true;
          }
        ? ReadableStream
        : AiModelList[Name]["postProcessedOutputs"]
  >;
  models(params?: AiModelsSearchParams): Promise<AiModelsSearchObject[]>;
  toMarkdown(
    files: {
      name: string;
      blob: Blob;
    }[],
    options?: {
      gateway?: GatewayOptions;
      extraHeaders?: object;
    },
  ): Promise<ConversionResponse[]>;
  toMarkdown(
    files: {
      name: string;
      blob: Blob;
    },
    options?: {
      gateway?: GatewayOptions;
      extraHeaders?: object;
    },
  ): Promise<ConversionResponse>;
}
export type GatewayRetries = {
  maxAttempts?: 1 | 2 | 3 | 4 | 5;
  retryDelayMs?: number;
  backoff?: "constant" | "linear" | "exponential";
};
export type GatewayOptions = {
  id: string;
  cacheKey?: string;
  cacheTtl?: number;
  skipCache?: boolean;
  metadata?: Record<string, number | string | boolean | null | bigint>;
  collectLog?: boolean;
  eventId?: string;
  requestTimeoutMs?: number;
  retries?: GatewayRetries;
};
export type AiGatewayPatchLog = {
  score?: number | null;
  feedback?: -1 | 1 | null;
  metadata?: Record<string, number | string | boolean | null | bigint> | null;
};
export type AiGatewayLog = {
  id: string;
  provider: string;
  model: string;
  model_type?: string;
  path: string;
  duration: number;
  request_type?: string;
  request_content_type?: string;
  status_code: number;
  response_content_type?: string;
  success: boolean;
  cached: boolean;
  tokens_in?: number;
  tokens_out?: number;
  metadata?: Record<string, number | string | boolean | null | bigint>;
  step?: number;
  cost?: number;
  custom_cost?: boolean;
  request_size: number;
  request_head?: string;
  request_head_complete: boolean;
  response_size: number;
  response_head?: string;
  response_head_complete: boolean;
  created_at: Date;
};
export type AIGatewayProviders =
  | "workers-ai"
  | "anthropic"
  | "aws-bedrock"
  | "azure-openai"
  | "google-vertex-ai"
  | "huggingface"
  | "openai"
  | "perplexity-ai"
  | "replicate"
  | "groq"
  | "cohere"
  | "google-ai-studio"
  | "mistral"
  | "grok"
  | "openrouter"
  | "deepseek"
  | "cerebras"
  | "cartesia"
  | "elevenlabs"
  | "adobe-firefly";
export type AIGatewayHeaders = {
  "cf-aig-metadata":
    | Record<string, number | string | boolean | null | bigint>
    | string;
  "cf-aig-custom-cost":
    | {
        per_token_in?: number;
        per_token_out?: number;
      }
    | {
        total_cost?: number;
      }
    | string;
  "cf-aig-cache-ttl": number | string;
  "cf-aig-skip-cache": boolean | string;
  "cf-aig-cache-key": string;
  "cf-aig-event-id": string;
  "cf-aig-request-timeout": number | string;
  "cf-aig-max-attempts": number | string;
  "cf-aig-retry-delay": number | string;
  "cf-aig-backoff": string;
  "cf-aig-collect-log": boolean | string;
  Authorization: string;
  "Content-Type": string;
  [key: string]: string | number | boolean | object;
};
export type AIGatewayUniversalRequest = {
  provider: AIGatewayProviders | string; // eslint-disable-line
  endpoint: string;
  headers: Partial<AIGatewayHeaders>;
  query: unknown;
};
export interface AiGatewayInternalError extends Error {}
export interface AiGatewayLogNotFound extends Error {}
export declare abstract class AiGateway {
  patchLog(logId: string, data: AiGatewayPatchLog): Promise<void>;
  getLog(logId: string): Promise<AiGatewayLog>;
  run(
    data: AIGatewayUniversalRequest | AIGatewayUniversalRequest[],
    options?: {
      gateway?: GatewayOptions;
      extraHeaders?: object;
    },
  ): Promise<Response>;
  getUrl(provider?: AIGatewayProviders | string): Promise<string>; // eslint-disable-line
}
export interface AutoRAGInternalError extends Error {}
export interface AutoRAGNotFoundError extends Error {}
export interface AutoRAGUnauthorizedError extends Error {}
export interface AutoRAGNameNotSetError extends Error {}
export type ComparisonFilter = {
  key: string;
  type: "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
  value: string | number | boolean;
};
export type CompoundFilter = {
  type: "and" | "or";
  filters: ComparisonFilter[];
};
export type AutoRagSearchRequest = {
  query: string;
  filters?: CompoundFilter | ComparisonFilter;
  max_num_results?: number;
  ranking_options?: {
    ranker?: string;
    score_threshold?: number;
  };
  rewrite_query?: boolean;
};
export type AutoRagAiSearchRequest = AutoRagSearchRequest & {
  stream?: boolean;
};
export type AutoRagAiSearchRequestStreaming = Omit<
  AutoRagAiSearchRequest,
  "stream"
> & {
  stream: true;
};
export type AutoRagSearchResponse = {
  object: "vector_store.search_results.page";
  search_query: string;
  data: {
    file_id: string;
    filename: string;
    score: number;
    attributes: Record<string, string | number | boolean | null>;
    content: {
      type: "text";
      text: string;
    }[];
  }[];
  has_more: boolean;
  next_page: string | null;
};
export type AutoRagListResponse = {
  id: string;
  enable: boolean;
  type: string;
  source: string;
  vectorize_name: string;
  paused: boolean;
  status: string;
}[];
export type AutoRagAiSearchResponse = AutoRagSearchResponse & {
  response: string;
};
export declare abstract class AutoRAG {
  list(): Promise<AutoRagListResponse>;
  search(params: AutoRagSearchRequest): Promise<AutoRagSearchResponse>;
  aiSearch(params: AutoRagAiSearchRequestStreaming): Promise<Response>;
  aiSearch(params: AutoRagAiSearchRequest): Promise<AutoRagAiSearchResponse>;
  aiSearch(
    params: AutoRagAiSearchRequest,
  ): Promise<AutoRagAiSearchResponse | Response>;
}
export interface BasicImageTransformations {
  /**
   * Maximum width in image pixels. The value must be an integer.
   */
  width?: number;
  /**
   * Maximum height in image pixels. The value must be an integer.
   */
  height?: number;
  /**
   * Resizing mode as a string. It affects interpretation of width and height
   * options:
   *  - scale-down: Similar to contain, but the image is never enlarged. If
   *    the image is larger than given width or height, it will be resized.
   *    Otherwise its original size will be kept.
   *  - contain: Resizes to maximum size that fits within the given width and
   *    height. If only a single dimension is given (e.g. only width), the
   *    image will be shrunk or enlarged to exactly match that dimension.
   *    Aspect ratio is always preserved.
   *  - cover: Resizes (shrinks or enlarges) to fill the entire area of width
   *    and height. If the image has an aspect ratio different from the ratio
   *    of width and height, it will be cropped to fit.
   *  - crop: The image will be shrunk and cropped to fit within the area
   *    specified by width and height. The image will not be enlarged. For images
   *    smaller than the given dimensions it's the same as scale-down. For
   *    images larger than the given dimensions, it's the same as cover.
   *    See also trim.
   *  - pad: Resizes to the maximum size that fits within the given width and
   *    height, and then fills the remaining area with a background color
   *    (white by default). Use of this mode is not recommended, as the same
   *    effect can be more efficiently achieved with the contain mode and the
   *    CSS object-fit: contain property.
   *  - squeeze: Stretches and deforms to the width and height given, even if it
   *    breaks aspect ratio
   */
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad" | "squeeze";
  /**
   * When cropping with fit: "cover", this defines the side or point that should
   * be left uncropped. The value is either a string
   * "left", "right", "top", "bottom", "auto", or "center" (the default),
   * or an object {x, y} containing focal point coordinates in the original
   * image expressed as fractions ranging from 0.0 (top or left) to 1.0
   * (bottom or right), 0.5 being the center. {fit: "cover", gravity: "top"} will
   * crop bottom or left and right sides as necessary, but won’t crop anything
   * from the top. {fit: "cover", gravity: {x:0.5, y:0.2}} will crop each side to
   * preserve as much as possible around a point at 20% of the height of the
   * source image.
   */
  gravity?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "center"
    | "auto"
    | "entropy"
    | BasicImageTransformationsGravityCoordinates;
  /**
   * Background color to add underneath the image. Applies only to images with
   * transparency (such as PNG). Accepts any CSS color (#RRGGBB, rgba(…),
   * hsl(…), etc.)
   */
  background?: string;
  /**
   * Number of degrees (90, 180, 270) to rotate the image by. width and height
   * options refer to axes after rotation.
   */
  rotate?: 0 | 90 | 180 | 270 | 360;
}
export interface BasicImageTransformationsGravityCoordinates {
  x?: number;
  y?: number;
  mode?: "remainder" | "box-center";
}
/**
 * In addition to the properties you can set in the RequestInit dict
 * that you pass as an argument to the Request constructor, you can
 * set certain properties of a `cf` object to control how Cloudflare
 * features are applied to that new Request.
 *
 * Note: Currently, these properties cannot be tested in the
 * playground.
 */
export interface RequestInitCfProperties extends Record<string, unknown> {
  cacheEverything?: boolean;
  /**
   * A request's cache key is what determines if two requests are
   * "the same" for caching purposes. If a request has the same cache key
   * as some previous request, then we can serve the same cached response for
   * both. (e.g. 'some-key')
   *
   * Only available for Enterprise customers.
   */
  cacheKey?: string;
  /**
   * This allows you to append additional Cache-Tag response headers
   * to the origin response without modifications to the origin server.
   * This will allow for greater control over the Purge by Cache Tag feature
   * utilizing changes only in the Workers process.
   *
   * Only available for Enterprise customers.
   */
  cacheTags?: string[];
  /**
   * Force response to be cached for a given number of seconds. (e.g. 300)
   */
  cacheTtl?: number;
  /**
   * Force response to be cached for a given number of seconds based on the Origin status code.
   * (e.g. { '200-299': 86400, '404': 1, '500-599': 0 })
   */
  cacheTtlByStatus?: Record<string, number>;
  scrapeShield?: boolean;
  apps?: boolean;
  image?: RequestInitCfPropertiesImage;
  minify?: RequestInitCfPropertiesImageMinify;
  mirage?: boolean;
  polish?: "lossy" | "lossless" | "off";
  r2?: RequestInitCfPropertiesR2;
  /**
   * Redirects the request to an alternate origin server. You can use this,
   * for example, to implement load balancing across several origins.
   * (e.g.us-east.example.com)
   *
   * Note - For security reasons, the hostname set in resolveOverride must
   * be proxied on the same Cloudflare zone of the incoming request.
   * Otherwise, the setting is ignored. CNAME hosts are allowed, so to
   * resolve to a host under a different domain or a DNS only domain first
   * declare a CNAME record within your own zone’s DNS mapping to the
   * external hostname, set proxy on Cloudflare, then set resolveOverride
   * to point to that CNAME record.
   */
  resolveOverride?: string;
}
export interface RequestInitCfPropertiesImageDraw
  extends BasicImageTransformations {
  /**
   * Absolute URL of the image file to use for the drawing. It can be any of
   * the supported file formats. For drawing of watermarks or non-rectangular
   * overlays we recommend using PNG or WebP images.
   */
  url: string;
  /**
   * Floating-point number between 0 (transparent) and 1 (opaque).
   * For example, opacity: 0.5 makes overlay semitransparent.
   */
  opacity?: number;
  /**
   * - If set to true, the overlay image will be tiled to cover the entire
   *   area. This is useful for stock-photo-like watermarks.
   * - If set to "x", the overlay image will be tiled horizontally only
   *   (form a line).
   * - If set to "y", the overlay image will be tiled vertically only
   *   (form a line).
   */
  repeat?: true | "x" | "y";
  /**
   * Position of the overlay image relative to a given edge. Each property is
   * an offset in pixels. 0 aligns exactly to the edge. For example, left: 10
   * positions left side of the overlay 10 pixels from the left edge of the
   * image it's drawn over. bottom: 0 aligns bottom of the overlay with bottom
   * of the background image.
   *
   * Setting both left & right, or both top & bottom is an error.
   *
   * If no position is specified, the image will be centered.
   */
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}
export interface RequestInitCfPropertiesImage
  extends BasicImageTransformations {
  /**
   * Device Pixel Ratio. Default 1. Multiplier for width/height that makes it
   * easier to specify higher-DPI sizes in <img srcset>.
   */
  dpr?: number;
  /**
   * Allows you to trim your image. Takes dpr into account and is performed before
   * resizing or rotation.
   *
   * It can be used as:
   * - left, top, right, bottom - it will specify the number of pixels to cut
   *   off each side
   * - width, height - the width/height you'd like to end up with - can be used
   *   in combination with the properties above
   * - border - this will automatically trim the surroundings of an image based on
   *   it's color. It consists of three properties:
   *    - color: rgb or hex representation of the color you wish to trim (todo: verify the rgba bit)
   *    - tolerance: difference from color to treat as color
   *    - keep: the number of pixels of border to keep
   */
  trim?:
    | "border"
    | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
        width?: number;
        height?: number;
        border?:
          | boolean
          | {
              color?: string;
              tolerance?: number;
              keep?: number;
            };
      };
  /**
   * Quality setting from 1-100 (useful values are in 60-90 range). Lower values
   * make images look worse, but load faster. The default is 85. It applies only
   * to JPEG and WebP images. It doesn’t have any effect on PNG.
   */
  quality?: number | "low" | "medium-low" | "medium-high" | "high";
  /**
   * Output format to generate. It can be:
   *  - avif: generate images in AVIF format.
   *  - webp: generate images in Google WebP format. Set quality to 100 to get
   *    the WebP-lossless format.
   *  - json: instead of generating an image, outputs information about the
   *    image, in JSON format. The JSON object will contain image size
   *    (before and after resizing), source image’s MIME type, file size, etc.
   * - jpeg: generate images in JPEG format.
   * - png: generate images in PNG format.
   */
  format?:
    | "avif"
    | "webp"
    | "json"
    | "jpeg"
    | "png"
    | "baseline-jpeg"
    | "png-force"
    | "svg";
  /**
   * Whether to preserve animation frames from input files. Default is true.
   * Setting it to false reduces animations to still images. This setting is
   * recommended when enlarging images or processing arbitrary user content,
   * because large GIF animations can weigh tens or even hundreds of megabytes.
   * It is also useful to set anim:false when using format:"json" to get the
   * response quicker without the number of frames.
   */
  anim?: boolean;
  /**
   * What EXIF data should be preserved in the output image. Note that EXIF
   * rotation and embedded color profiles are always applied ("baked in" into
   * the image), and aren't affected by this option. Note that if the Polish
   * feature is enabled, all metadata may have been removed already and this
   * option may have no effect.
   *  - keep: Preserve most of EXIF metadata, including GPS location if there's
   *    any.
   *  - copyright: Only keep the copyright tag, and discard everything else.
   *    This is the default behavior for JPEG files.
   *  - none: Discard all invisible EXIF metadata. Currently WebP and PNG
   *    output formats always discard metadata.
   */
  metadata?: "keep" | "copyright" | "none";
  /**
   * Strength of sharpening filter to apply to the image. Floating-point
   * number between 0 (no sharpening, default) and 10 (maximum). 1.0 is a
   * recommended value for downscaled images.
   */
  sharpen?: number;
  /**
   * Radius of a blur filter (approximate gaussian). Maximum supported radius
   * is 250.
   */
  blur?: number;
  /**
   * Overlays are drawn in the order they appear in the array (last array
   * entry is the topmost layer).
   */
  draw?: RequestInitCfPropertiesImageDraw[];
  /**
   * Fetching image from authenticated origin. Setting this property will
   * pass authentication headers (Authorization, Cookie, etc.) through to
   * the origin.
   */
  "origin-auth"?: "share-publicly";
  /**
   * Adds a border around the image. The border is added after resizing. Border
   * width takes dpr into account, and can be specified either using a single
   * width property, or individually for each side.
   */
  border?:
    | {
        color: string;
        width: number;
      }
    | {
        color: string;
        top: number;
        right: number;
        bottom: number;
        left: number;
      };
  /**
   * Increase brightness by a factor. A value of 1.0 equals no change, a value
   * of 0.5 equals half brightness, and a value of 2.0 equals twice as bright.
   * 0 is ignored.
   */
  brightness?: number;
  /**
   * Increase contrast by a factor. A value of 1.0 equals no change, a value of
   * 0.5 equals low contrast, and a value of 2.0 equals high contrast. 0 is
   * ignored.
   */
  contrast?: number;
  /**
   * Increase exposure by a factor. A value of 1.0 equals no change, a value of
   * 0.5 darkens the image, and a value of 2.0 lightens the image. 0 is ignored.
   */
  gamma?: number;
  /**
   * Increase contrast by a factor. A value of 1.0 equals no change, a value of
   * 0.5 equals low contrast, and a value of 2.0 equals high contrast. 0 is
   * ignored.
   */
  saturation?: number;
  /**
   * Flips the images horizontally, vertically, or both. Flipping is applied before
   * rotation, so if you apply flip=h,rotate=90 then the image will be flipped
   * horizontally, then rotated by 90 degrees.
   */
  flip?: "h" | "v" | "hv";
  /**
   * Slightly reduces latency on a cache miss by selecting a
   * quickest-to-compress file format, at a cost of increased file size and
   * lower image quality. It will usually override the format option and choose
   * JPEG over WebP or AVIF. We do not recommend using this option, except in
   * unusual circumstances like resizing uncacheable dynamically-generated
   * images.
   */
  compression?: "fast";
}
export interface RequestInitCfPropertiesImageMinify {
  javascript?: boolean;
  css?: boolean;
  html?: boolean;
}
export interface RequestInitCfPropertiesR2 {
  /**
   * Colo id of bucket that an object is stored in
   */
  bucketColoId?: number;
}
/**
 * Request metadata provided by Cloudflare's edge.
 */
export type IncomingRequestCfProperties<HostMetadata = unknown> =
  IncomingRequestCfPropertiesBase &
    IncomingRequestCfPropertiesBotManagementEnterprise &
    IncomingRequestCfPropertiesCloudflareForSaaSEnterprise<HostMetadata> &
    IncomingRequestCfPropertiesGeographicInformation &
    IncomingRequestCfPropertiesCloudflareAccessOrApiShield;
export interface IncomingRequestCfPropertiesBase
  extends Record<string, unknown> {
  /**
   * [ASN](https://www.iana.org/assignments/as-numbers/as-numbers.xhtml) of the incoming request.
   *
   * @example 395747
   */
  asn?: number;
  /**
   * The organization which owns the ASN of the incoming request.
   *
   * @example "Google Cloud"
   */
  asOrganization?: string;
  /**
   * The original value of the `Accept-Encoding` header if Cloudflare modified it.
   *
   * @example "gzip, deflate, br"
   */
  clientAcceptEncoding?: string;
  /**
   * The number of milliseconds it took for the request to reach your worker.
   *
   * @example 22
   */
  clientTcpRtt?: number;
  /**
   * The three-letter [IATA](https://en.wikipedia.org/wiki/IATA_airport_code)
   * airport code of the data center that the request hit.
   *
   * @example "DFW"
   */
  colo: string;
  /**
   * Represents the upstream's response to a
   * [TCP `keepalive` message](https://tldp.org/HOWTO/TCP-Keepalive-HOWTO/overview.html)
   * from cloudflare.
   *
   * For workers with no upstream, this will always be `1`.
   *
   * @example 3
   */
  edgeRequestKeepAliveStatus: IncomingRequestCfPropertiesEdgeRequestKeepAliveStatus;
  /**
   * The HTTP Protocol the request used.
   *
   * @example "HTTP/2"
   */
  httpProtocol: string;
  /**
   * The browser-requested prioritization information in the request object.
   *
   * If no information was set, defaults to the empty string `""`
   *
   * @example "weight=192;exclusive=0;group=3;group-weight=127"
   * @default ""
   */
  requestPriority: string;
  /**
   * The TLS version of the connection to Cloudflare.
   * In requests served over plaintext (without TLS), this property is the empty string `""`.
   *
   * @example "TLSv1.3"
   */
  tlsVersion: string;
  /**
   * The cipher for the connection to Cloudflare.
   * In requests served over plaintext (without TLS), this property is the empty string `""`.
   *
   * @example "AEAD-AES128-GCM-SHA256"
   */
  tlsCipher: string;
  /**
   * Metadata containing the [`HELLO`](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.1.2) and [`FINISHED`](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.9) messages from this request's TLS handshake.
   *
   * If the incoming request was served over plaintext (without TLS) this field is undefined.
   */
  tlsExportedAuthenticator?: IncomingRequestCfPropertiesExportedAuthenticatorMetadata;
}
export interface IncomingRequestCfPropertiesBotManagementBase {
  /**
   * Cloudflare’s [level of certainty](https://developers.cloudflare.com/bots/concepts/bot-score/) that a request comes from a bot,
   * represented as an integer percentage between `1` (almost certainly a bot) and `99` (almost certainly human).
   *
   * @example 54
   */
  score: number;
  /**
   * A boolean value that is true if the request comes from a good bot, like Google or Bing.
   * Most customers choose to allow this traffic. For more details, see [Traffic from known bots](https://developers.cloudflare.com/firewall/known-issues-and-faq/#how-does-firewall-rules-handle-traffic-from-known-bots).
   */
  verifiedBot: boolean;
  /**
   * A boolean value that is true if the request originates from a
   * Cloudflare-verified proxy service.
   */
  corporateProxy: boolean;
  /**
   * A boolean value that's true if the request matches [file extensions](https://developers.cloudflare.com/bots/reference/static-resources/) for many types of static resources.
   */
  staticResource: boolean;
  /**
   * List of IDs that correlate to the Bot Management heuristic detections made on a request (you can have multiple heuristic detections on the same request).
   */
  detectionIds: number[];
}
export interface IncomingRequestCfPropertiesBotManagement {
  /**
   * Results of Cloudflare's Bot Management analysis
   */
  botManagement: IncomingRequestCfPropertiesBotManagementBase;
  /**
   * Duplicate of `botManagement.score`.
   *
   * @deprecated
   */
  clientTrustScore: number;
}
export interface IncomingRequestCfPropertiesBotManagementEnterprise
  extends IncomingRequestCfPropertiesBotManagement {
  /**
   * Results of Cloudflare's Bot Management analysis
   */
  botManagement: IncomingRequestCfPropertiesBotManagementBase & {
    /**
     * A [JA3 Fingerprint](https://developers.cloudflare.com/bots/concepts/ja3-fingerprint/) to help profile specific SSL/TLS clients
     * across different destination IPs, Ports, and X509 certificates.
     */
    ja3Hash: string;
  };
}
export interface IncomingRequestCfPropertiesCloudflareForSaaSEnterprise<
  HostMetadata,
> {
  /**
   * Custom metadata set per-host in [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/).
   *
   * This field is only present if you have Cloudflare for SaaS enabled on your account
   * and you have followed the [required steps to enable it]((https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/)).
   */
  hostMetadata?: HostMetadata;
}
export interface IncomingRequestCfPropertiesCloudflareAccessOrApiShield {
  /**
   * Information about the client certificate presented to Cloudflare.
   *
   * This is populated when the incoming request is served over TLS using
   * either Cloudflare Access or API Shield (mTLS)
   * and the presented SSL certificate has a valid
   * [Certificate Serial Number](https://ldapwiki.com/wiki/Certificate%20Serial%20Number)
   * (i.e., not `null` or `""`).
   *
   * Otherwise, a set of placeholder values are used.
   *
   * The property `certPresented` will be set to `"1"` when
   * the object is populated (i.e. the above conditions were met).
   */
  tlsClientAuth:
    | IncomingRequestCfPropertiesTLSClientAuth
    | IncomingRequestCfPropertiesTLSClientAuthPlaceholder;
}
/**
 * Metadata about the request's TLS handshake
 */
export interface IncomingRequestCfPropertiesExportedAuthenticatorMetadata {
  /**
   * The client's [`HELLO` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.1.2), encoded in hexadecimal
   *
   * @example "44372ba35fa1270921d318f34c12f155dc87b682cf36a790cfaa3ba8737a1b5d"
   */
  clientHandshake: string;
  /**
   * The server's [`HELLO` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.1.2), encoded in hexadecimal
   *
   * @example "44372ba35fa1270921d318f34c12f155dc87b682cf36a790cfaa3ba8737a1b5d"
   */
  serverHandshake: string;
  /**
   * The client's [`FINISHED` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.9), encoded in hexadecimal
   *
   * @example "084ee802fe1348f688220e2a6040a05b2199a761f33cf753abb1b006792d3f8b"
   */
  clientFinished: string;
  /**
   * The server's [`FINISHED` message](https://www.rfc-editor.org/rfc/rfc5246#section-7.4.9), encoded in hexadecimal
   *
   * @example "084ee802fe1348f688220e2a6040a05b2199a761f33cf753abb1b006792d3f8b"
   */
  serverFinished: string;
}
/**
 * Geographic data about the request's origin.
 */
export interface IncomingRequestCfPropertiesGeographicInformation {
  /**
   * The [ISO 3166-1 Alpha 2](https://www.iso.org/iso-3166-country-codes.html) country code the request originated from.
   *
   * If your worker is [configured to accept TOR connections](https://support.cloudflare.com/hc/en-us/articles/203306930-Understanding-Cloudflare-Tor-support-and-Onion-Routing), this may also be `"T1"`, indicating a request that originated over TOR.
   *
   * If Cloudflare is unable to determine where the request originated this property is omitted.
   *
   * The country code `"T1"` is used for requests originating on TOR.
   *
   * @example "GB"
   */
  country?: Iso3166Alpha2Code | "T1";
  /**
   * If present, this property indicates that the request originated in the EU
   *
   * @example "1"
   */
  isEUCountry?: "1";
  /**
   * A two-letter code indicating the continent the request originated from.
   *
   * @example "AN"
   */
  continent?: ContinentCode;
  /**
   * The city the request originated from
   *
   * @example "Austin"
   */
  city?: string;
  /**
   * Postal code of the incoming request
   *
   * @example "78701"
   */
  postalCode?: string;
  /**
   * Latitude of the incoming request
   *
   * @example "30.27130"
   */
  latitude?: string;
  /**
   * Longitude of the incoming request
   *
   * @example "-97.74260"
   */
  longitude?: string;
  /**
   * Timezone of the incoming request
   *
   * @example "America/Chicago"
   */
  timezone?: string;
  /**
   * If known, the ISO 3166-2 name for the first level region associated with
   * the IP address of the incoming request
   *
   * @example "Texas"
   */
  region?: string;
  /**
   * If known, the ISO 3166-2 code for the first-level region associated with
   * the IP address of the incoming request
   *
   * @example "TX"
   */
  regionCode?: string;
  /**
   * Metro code (DMA) of the incoming request
   *
   * @example "635"
   */
  metroCode?: string;
}
/** Data about the incoming request's TLS certificate */
export interface IncomingRequestCfPropertiesTLSClientAuth {
  /** Always `"1"`, indicating that the certificate was presented */
  certPresented: "1";
  /**
   * Result of certificate verification.
   *
   * @example "FAILED:self signed certificate"
   */
  certVerified: Exclude<CertVerificationStatus, "NONE">;
  /** The presented certificate's revokation status.
   *
   * - A value of `"1"` indicates the certificate has been revoked
   * - A value of `"0"` indicates the certificate has not been revoked
   */
  certRevoked: "1" | "0";
  /**
   * The certificate issuer's [distinguished name](https://knowledge.digicert.com/generalinformation/INFO1745.html)
   *
   * @example "CN=cloudflareaccess.com, C=US, ST=Texas, L=Austin, O=Cloudflare"
   */
  certIssuerDN: string;
  /**
   * The certificate subject's [distinguished name](https://knowledge.digicert.com/generalinformation/INFO1745.html)
   *
   * @example "CN=*.cloudflareaccess.com, C=US, ST=Texas, L=Austin, O=Cloudflare"
   */
  certSubjectDN: string;
  /**
   * The certificate issuer's [distinguished name](https://knowledge.digicert.com/generalinformation/INFO1745.html) ([RFC 2253](https://www.rfc-editor.org/rfc/rfc2253.html) formatted)
   *
   * @example "CN=cloudflareaccess.com, C=US, ST=Texas, L=Austin, O=Cloudflare"
   */
  certIssuerDNRFC2253: string;
  /**
   * The certificate subject's [distinguished name](https://knowledge.digicert.com/generalinformation/INFO1745.html) ([RFC 2253](https://www.rfc-editor.org/rfc/rfc2253.html) formatted)
   *
   * @example "CN=*.cloudflareaccess.com, C=US, ST=Texas, L=Austin, O=Cloudflare"
   */
  certSubjectDNRFC2253: string;
  /** The certificate issuer's distinguished name (legacy policies) */
  certIssuerDNLegacy: string;
  /** The certificate subject's distinguished name (legacy policies) */
  certSubjectDNLegacy: string;
  /**
   * The certificate's serial number
   *
   * @example "00936EACBE07F201DF"
   */
  certSerial: string;
  /**
   * The certificate issuer's serial number
   *
   * @example "2489002934BDFEA34"
   */
  certIssuerSerial: string;
  /**
   * The certificate's Subject Key Identifier
   *
   * @example "BB:AF:7E:02:3D:FA:A6:F1:3C:84:8E:AD:EE:38:98:EC:D9:32:32:D4"
   */
  certSKI: string;
  /**
   * The certificate issuer's Subject Key Identifier
   *
   * @example "BB:AF:7E:02:3D:FA:A6:F1:3C:84:8E:AD:EE:38:98:EC:D9:32:32:D4"
   */
  certIssuerSKI: string;
  /**
   * The certificate's SHA-1 fingerprint
   *
   * @example "6b9109f323999e52259cda7373ff0b4d26bd232e"
   */
  certFingerprintSHA1: string;
  /**
   * The certificate's SHA-256 fingerprint
   *
   * @example "acf77cf37b4156a2708e34c4eb755f9b5dbbe5ebb55adfec8f11493438d19e6ad3f157f81fa3b98278453d5652b0c1fd1d71e5695ae4d709803a4d3f39de9dea"
   */
  certFingerprintSHA256: string;
  /**
   * The effective starting date of the certificate
   *
   * @example "Dec 22 19:39:00 2018 GMT"
   */
  certNotBefore: string;
  /**
   * The effective expiration date of the certificate
   *
   * @example "Dec 22 19:39:00 2018 GMT"
   */
  certNotAfter: string;
}
/** Placeholder values for TLS Client Authorization */
export interface IncomingRequestCfPropertiesTLSClientAuthPlaceholder {
  certPresented: "0";
  certVerified: "NONE";
  certRevoked: "0";
  certIssuerDN: "";
  certSubjectDN: "";
  certIssuerDNRFC2253: "";
  certSubjectDNRFC2253: "";
  certIssuerDNLegacy: "";
  certSubjectDNLegacy: "";
  certSerial: "";
  certIssuerSerial: "";
  certSKI: "";
  certIssuerSKI: "";
  certFingerprintSHA1: "";
  certFingerprintSHA256: "";
  certNotBefore: "";
  certNotAfter: "";
}
/** Possible outcomes of TLS verification */
export declare type CertVerificationStatus =
  /** Authentication succeeded */
  | "SUCCESS"
  /** No certificate was presented */
  | "NONE"
  /** Failed because the certificate was self-signed */
  | "FAILED:self signed certificate"
  /** Failed because the certificate failed a trust chain check */
  | "FAILED:unable to verify the first certificate"
  /** Failed because the certificate not yet valid */
  | "FAILED:certificate is not yet valid"
  /** Failed because the certificate is expired */
  | "FAILED:certificate has expired"
  /** Failed for another unspecified reason */
  | "FAILED";
/**
 * An upstream endpoint's response to a TCP `keepalive` message from Cloudflare.
 */
export declare type IncomingRequestCfPropertiesEdgeRequestKeepAliveStatus =
  | 0 /** Unknown */
  | 1 /** no keepalives (not found) */
  | 2 /** no connection re-use, opening keepalive connection failed */
  | 3 /** no connection re-use, keepalive accepted and saved */
  | 4 /** connection re-use, refused by the origin server (`TCP FIN`) */
  | 5; /** connection re-use, accepted by the origin server */
/** ISO 3166-1 Alpha-2 codes */
export declare type Iso3166Alpha2Code =
  | "AD"
  | "AE"
  | "AF"
  | "AG"
  | "AI"
  | "AL"
  | "AM"
  | "AO"
  | "AQ"
  | "AR"
  | "AS"
  | "AT"
  | "AU"
  | "AW"
  | "AX"
  | "AZ"
  | "BA"
  | "BB"
  | "BD"
  | "BE"
  | "BF"
  | "BG"
  | "BH"
  | "BI"
  | "BJ"
  | "BL"
  | "BM"
  | "BN"
  | "BO"
  | "BQ"
  | "BR"
  | "BS"
  | "BT"
  | "BV"
  | "BW"
  | "BY"
  | "BZ"
  | "CA"
  | "CC"
  | "CD"
  | "CF"
  | "CG"
  | "CH"
  | "CI"
  | "CK"
  | "CL"
  | "CM"
  | "CN"
  | "CO"
  | "CR"
  | "CU"
  | "CV"
  | "CW"
  | "CX"
  | "CY"
  | "CZ"
  | "DE"
  | "DJ"
  | "DK"
  | "DM"
  | "DO"
  | "DZ"
  | "EC"
  | "EE"
  | "EG"
  | "EH"
  | "ER"
  | "ES"
  | "ET"
  | "FI"
  | "FJ"
  | "FK"
  | "FM"
  | "FO"
  | "FR"
  | "GA"
  | "GB"
  | "GD"
  | "GE"
  | "GF"
  | "GG"
  | "GH"
  | "GI"
  | "GL"
  | "GM"
  | "GN"
  | "GP"
  | "GQ"
  | "GR"
  | "GS"
  | "GT"
  | "GU"
  | "GW"
  | "GY"
  | "HK"
  | "HM"
  | "HN"
  | "HR"
  | "HT"
  | "HU"
  | "ID"
  | "IE"
  | "IL"
  | "IM"
  | "IN"
  | "IO"
  | "IQ"
  | "IR"
  | "IS"
  | "IT"
  | "JE"
  | "JM"
  | "JO"
  | "JP"
  | "KE"
  | "KG"
  | "KH"
  | "KI"
  | "KM"
  | "KN"
  | "KP"
  | "KR"
  | "KW"
  | "KY"
  | "KZ"
  | "LA"
  | "LB"
  | "LC"
  | "LI"
  | "LK"
  | "LR"
  | "LS"
  | "LT"
  | "LU"
  | "LV"
  | "LY"
  | "MA"
  | "MC"
  | "MD"
  | "ME"
  | "MF"
  | "MG"
  | "MH"
  | "MK"
  | "ML"
  | "MM"
  | "MN"
  | "MO"
  | "MP"
  | "MQ"
  | "MR"
  | "MS"
  | "MT"
  | "MU"
  | "MV"
  | "MW"
  | "MX"
  | "MY"
  | "MZ"
  | "NA"
  | "NC"
  | "NE"
  | "NF"
  | "NG"
  | "NI"
  | "NL"
  | "NO"
  | "NP"
  | "NR"
  | "NU"
  | "NZ"
  | "OM"
  | "PA"
  | "PE"
  | "PF"
  | "PG"
  | "PH"
  | "PK"
  | "PL"
  | "PM"
  | "PN"
  | "PR"
  | "PS"
  | "PT"
  | "PW"
  | "PY"
  | "QA"
  | "RE"
  | "RO"
  | "RS"
  | "RU"
  | "RW"
  | "SA"
  | "SB"
  | "SC"
  | "SD"
  | "SE"
  | "SG"
  | "SH"
  | "SI"
  | "SJ"
  | "SK"
  | "SL"
  | "SM"
  | "SN"
  | "SO"
  | "SR"
  | "SS"
  | "ST"
  | "SV"
  | "SX"
  | "SY"
  | "SZ"
  | "TC"
  | "TD"
  | "TF"
  | "TG"
  | "TH"
  | "TJ"
  | "TK"
  | "TL"
  | "TM"
  | "TN"
  | "TO"
  | "TR"
  | "TT"
  | "TV"
  | "TW"
  | "TZ"
  | "UA"
  | "UG"
  | "UM"
  | "US"
  | "UY"
  | "UZ"
  | "VA"
  | "VC"
  | "VE"
  | "VG"
  | "VI"
  | "VN"
  | "VU"
  | "WF"
  | "WS"
  | "YE"
  | "YT"
  | "ZA"
  | "ZM"
  | "ZW";
/** The 2-letter continent codes Cloudflare uses */
export declare type ContinentCode =
  | "AF"
  | "AN"
  | "AS"
  | "EU"
  | "NA"
  | "OC"
  | "SA";
export type CfProperties<HostMetadata = unknown> =
  | IncomingRequestCfProperties<HostMetadata>
  | RequestInitCfProperties;
export interface D1Meta {
  duration: number;
  size_after: number;
  rows_read: number;
  rows_written: number;
  last_row_id: number;
  changed_db: boolean;
  changes: number;
  /**
   * The region of the database instance that executed the query.
   */
  served_by_region?: string;
  /**
   * True if-and-only-if the database instance that executed the query was the primary.
   */
  served_by_primary?: boolean;
  timings?: {
    /**
     * The duration of the SQL query execution by the database instance. It doesn't include any network time.
     */
    sql_duration_ms: number;
  };
}
export interface D1Response {
  success: true;
  meta: D1Meta & Record<string, unknown>;
  error?: never;
}
export type D1Result<T = unknown> = D1Response & {
  results: T[];
};
export interface D1ExecResult {
  count: number;
  duration: number;
}
export type D1SessionConstraint =
  // Indicates that the first query should go to the primary, and the rest queries
  // using the same D1DatabaseSession will go to any replica that is consistent with
  // the bookmark maintained by the session (returned by the first query).
  | "first-primary"
  // Indicates that the first query can go anywhere (primary or replica), and the rest queries
  // using the same D1DatabaseSession will go to any replica that is consistent with
  // the bookmark maintained by the session (returned by the first query).
  | "first-unconstrained";
export type D1SessionBookmark = string;
export declare abstract class D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
  /**
   * Creates a new D1 Session anchored at the given constraint or the bookmark.
   * All queries executed using the created session will have sequential consistency,
   * meaning that all writes done through the session will be visible in subsequent reads.
   *
   * @param constraintOrBookmark Either the session constraint or the explicit bookmark to anchor the created session.
   */
  withSession(
    constraintOrBookmark?: D1SessionBookmark | D1SessionConstraint,
  ): D1DatabaseSession;
  /**
   * @deprecated dump() will be removed soon, only applies to deprecated alpha v1 databases.
   */
  dump(): Promise<ArrayBuffer>;
}
export declare abstract class D1DatabaseSession {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  /**
   * @returns The latest session bookmark across all executed queries on the session.
   *          If no query has been executed yet, `null` is returned.
   */
  getBookmark(): D1SessionBookmark | null;
}
export declare abstract class D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName: string): Promise<T | null>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  raw<T = unknown[]>(options: {
    columnNames: true;
  }): Promise<[string[], ...T[]]>;
  raw<T = unknown[]>(options?: { columnNames?: false }): Promise<T[]>;
}
// `Disposable` was added to TypeScript's standard lib types in version 5.2.
// To support older TypeScript versions, define an empty `Disposable` interface.
// Users won't be able to use `using`/`Symbol.dispose` without upgrading to 5.2,
// but this will ensure type checking on older versions still passes.
// TypeScript's interface merging will ensure our empty interface is effectively
// ignored when `Disposable` is included in the standard lib.
export interface Disposable {}
/**
 * An email message that can be sent from a Worker.
 */
export interface EmailMessage {
  /**
   * Envelope From attribute of the email message.
   */
  readonly from: string;
  /**
   * Envelope To attribute of the email message.
   */
  readonly to: string;
}
/**
 * An email message that is sent to a consumer Worker and can be rejected/forwarded.
 */
export interface ForwardableEmailMessage extends EmailMessage {
  /**
   * Stream of the email message content.
   */
  readonly raw: ReadableStream<Uint8Array>;
  /**
   * An [Headers object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).
   */
  readonly headers: Headers;
  /**
   * Size of the email message content.
   */
  readonly rawSize: number;
  /**
   * Reject this email message by returning a permanent SMTP error back to the connecting client including the given reason.
   * @param reason The reject reason.
   * @returns void
   */
  setReject(reason: string): void;
  /**
   * Forward this email message to a verified destination address of the account.
   * @param rcptTo Verified destination address.
   * @param headers A [Headers object](https://developer.mozilla.org/en-US/docs/Web/API/Headers).
   * @returns A promise that resolves when the email message is forwarded.
   */
  forward(rcptTo: string, headers?: Headers): Promise<void>;
  /**
   * Reply to the sender of this email message with a new EmailMessage object.
   * @param message The reply message.
   * @returns A promise that resolves when the email message is replied.
   */
  reply(message: EmailMessage): Promise<void>;
}
/**
 * A binding that allows a Worker to send email messages.
 */
export interface SendEmail {
  send(message: EmailMessage): Promise<void>;
}
export declare abstract class EmailEvent extends ExtendableEvent {
  readonly message: ForwardableEmailMessage;
}
export declare type EmailExportedHandler<Env = unknown> = (
  message: ForwardableEmailMessage,
  env: Env,
  ctx: ExecutionContext,
) => void | Promise<void>;
/**
 * Hello World binding to serve as an explanatory example. DO NOT USE
 */
export interface HelloWorldBinding {
  /**
   * Retrieve the current stored value
   */
  get(): Promise<{
    value: string;
    ms?: number;
  }>;
  /**
   * Set a new stored value
   */
  set(value: string): Promise<void>;
}
export interface Hyperdrive {
  /**
   * Connect directly to Hyperdrive as if it's your database, returning a TCP socket.
   *
   * Calling this method returns an idential socket to if you call
   * `connect("host:port")` using the `host` and `port` fields from this object.
   * Pick whichever approach works better with your preferred DB client library.
   *
   * Note that this socket is not yet authenticated -- it's expected that your
   * code (or preferably, the client library of your choice) will authenticate
   * using the information in this class's readonly fields.
   */
  connect(): Socket;
  /**
   * A valid DB connection string that can be passed straight into the typical
   * client library/driver/ORM. This will typically be the easiest way to use
   * Hyperdrive.
   */
  readonly connectionString: string;
  /*
   * A randomly generated hostname that is only valid within the context of the
   * currently running Worker which, when passed into `connect()` function from
   * the "cloudflare:sockets" module, will connect to the Hyperdrive instance
   * for your database.
   */
  readonly host: string;
  /*
   * The port that must be paired the the host field when connecting.
   */
  readonly port: number;
  /*
   * The username to use when authenticating to your database via Hyperdrive.
   * Unlike the host and password, this will be the same every time
   */
  readonly user: string;
  /*
   * The randomly generated password to use when authenticating to your
   * database via Hyperdrive. Like the host field, this password is only valid
   * within the context of the currently running Worker instance from which
   * it's read.
   */
  readonly password: string;
  /*
   * The name of the database to connect to.
   */
  readonly database: string;
}
// Copyright (c) 2024 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0
export type ImageInfoResponse =
  | {
      format: "image/svg+xml";
    }
  | {
      format: string;
      fileSize: number;
      width: number;
      height: number;
    };
export type ImageTransform = {
  width?: number;
  height?: number;
  background?: string;
  blur?: number;
  border?:
    | {
        color?: string;
        width?: number;
      }
    | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
  brightness?: number;
  contrast?: number;
  fit?: "scale-down" | "contain" | "pad" | "squeeze" | "cover" | "crop";
  flip?: "h" | "v" | "hv";
  gamma?: number;
  gravity?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "center"
    | "auto"
    | "entropy"
    | {
        x?: number;
        y?: number;
        mode: "remainder" | "box-center";
      };
  rotate?: 0 | 90 | 180 | 270;
  saturation?: number;
  sharpen?: number;
  trim?:
    | "border"
    | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
        width?: number;
        height?: number;
        border?:
          | boolean
          | {
              color?: string;
              tolerance?: number;
              keep?: number;
            };
      };
};
export type ImageDrawOptions = {
  opacity?: number;
  repeat?: boolean | string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
};
export type ImageInputOptions = {
  encoding?: "base64";
};
export type ImageOutputOptions = {
  format:
    | "image/jpeg"
    | "image/png"
    | "image/gif"
    | "image/webp"
    | "image/avif"
    | "rgb"
    | "rgba";
  quality?: number;
  background?: string;
};
export interface ImagesBinding {
  /**
   * Get image metadata (type, width and height)
   * @throws {@link ImagesError} with code 9412 if input is not an image
   * @param stream The image bytes
   */
  info(
    stream: ReadableStream<Uint8Array>,
    options?: ImageInputOptions,
  ): Promise<ImageInfoResponse>;
  /**
   * Begin applying a series of transformations to an image
   * @param stream The image bytes
   * @returns A transform handle
   */
  input(
    stream: ReadableStream<Uint8Array>,
    options?: ImageInputOptions,
  ): ImageTransformer;
}
export interface ImageTransformer {
  /**
   * Apply transform next, returning a transform handle.
   * You can then apply more transformations, draw, or retrieve the output.
   * @param transform
   */
  transform(transform: ImageTransform): ImageTransformer;
  /**
   * Draw an image on this transformer, returning a transform handle.
   * You can then apply more transformations, draw, or retrieve the output.
   * @param image The image (or transformer that will give the image) to draw
   * @param options The options configuring how to draw the image
   */
  draw(
    image: ReadableStream<Uint8Array> | ImageTransformer,
    options?: ImageDrawOptions,
  ): ImageTransformer;
  /**
   * Retrieve the image that results from applying the transforms to the
   * provided input
   * @param options Options that apply to the output e.g. output format
   */
  output(options: ImageOutputOptions): Promise<ImageTransformationResult>;
}
export type ImageTransformationOutputOptions = {
  encoding?: "base64";
};
export interface ImageTransformationResult {
  /**
   * The image as a response, ready to store in cache or return to users
   */
  response(): Response;
  /**
   * The content type of the returned image
   */
  contentType(): string;
  /**
   * The bytes of the response
   */
  image(options?: ImageTransformationOutputOptions): ReadableStream<Uint8Array>;
}
export interface ImagesError extends Error {
  readonly code: number;
  readonly message: string;
  readonly stack?: string;
}
export type Params<P extends string = any> = Record<P, string | string[]>;
export type EventContext<Env, P extends string, Data> = {
  request: Request<unknown, IncomingRequestCfProperties<unknown>>;
  functionPath: string;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env & {
    ASSETS: {
      fetch: typeof fetch;
    };
  };
  params: Params<P>;
  data: Data;
};
export type PagesFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = (context: EventContext<Env, Params, Data>) => Response | Promise<Response>;
export type EventPluginContext<Env, P extends string, Data, PluginArgs> = {
  request: Request<unknown, IncomingRequestCfProperties<unknown>>;
  functionPath: string;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env & {
    ASSETS: {
      fetch: typeof fetch;
    };
  };
  params: Params<P>;
  data: Data;
  pluginArgs: PluginArgs;
};
export type PagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>,
  PluginArgs = unknown,
> = (
  context: EventPluginContext<Env, Params, Data, PluginArgs>,
) => Response | Promise<Response>;
// PubSubMessage represents an incoming PubSub message.
// The message includes metadata about the broker, the client, and the payload
// itself.
// https://developers.cloudflare.com/pub-sub/
export interface PubSubMessage {
  // Message ID
  readonly mid: number;
  // MQTT broker FQDN in the form mqtts://BROKER.NAMESPACE.cloudflarepubsub.com:PORT
  readonly broker: string;
  // The MQTT topic the message was sent on.
  readonly topic: string;
  // The client ID of the client that published this message.
  readonly clientId: string;
  // The unique identifier (JWT ID) used by the client to authenticate, if token
  // auth was used.
  readonly jti?: string;
  // A Unix timestamp (seconds from Jan 1, 1970), set when the Pub/Sub Broker
  // received the message from the client.
  readonly receivedAt: number;
  // An (optional) string with the MIME type of the payload, if set by the
  // client.
  readonly contentType: string;
  // Set to 1 when the payload is a UTF-8 string
  // https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html#_Toc3901063
  readonly payloadFormatIndicator: number;
  // Pub/Sub (MQTT) payloads can be UTF-8 strings, or byte arrays.
  // You can use payloadFormatIndicator to inspect this before decoding.
  payload: string | Uint8Array;
}
// JsonWebKey extended by kid parameter
export interface JsonWebKeyWithKid extends JsonWebKey {
  // Key Identifier of the JWK
  readonly kid: string;
}
export interface RateLimitOptions {
  key: string;
}
export interface RateLimitOutcome {
  success: boolean;
}
export interface RateLimit {
  /**
   * Rate limit a request based on the provided options.
   * @see https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
   * @returns A promise that resolves with the outcome of the rate limit.
   */
  limit(options: RateLimitOptions): Promise<RateLimitOutcome>;
}
// Namespace for RPC utility types. Unfortunately, we can't use a `module` here as these types need
// to referenced by `Fetcher`. This is included in the "importable" version of the types which
// strips all `module` blocks.
export declare namespace Rpc {
  // Branded types for identifying `WorkerEntrypoint`/`DurableObject`/`Target`s.
  // TypeScript uses *structural* typing meaning anything with the same shape as type `T` is a `T`.
  // For the classes exported by `cloudflare:workers` we want *nominal* typing (i.e. we only want to
  // accept `WorkerEntrypoint` from `cloudflare:workers`, not any other class with the same shape)
  export const __RPC_STUB_BRAND: "__RPC_STUB_BRAND";
  export const __RPC_TARGET_BRAND: "__RPC_TARGET_BRAND";
  export const __WORKER_ENTRYPOINT_BRAND: "__WORKER_ENTRYPOINT_BRAND";
  export const __DURABLE_OBJECT_BRAND: "__DURABLE_OBJECT_BRAND";
  export const __WORKFLOW_ENTRYPOINT_BRAND: "__WORKFLOW_ENTRYPOINT_BRAND";
  export interface RpcTargetBranded {
    [__RPC_TARGET_BRAND]: never;
  }
  export interface WorkerEntrypointBranded {
    [__WORKER_ENTRYPOINT_BRAND]: never;
  }
  export interface DurableObjectBranded {
    [__DURABLE_OBJECT_BRAND]: never;
  }
  export interface WorkflowEntrypointBranded {
    [__WORKFLOW_ENTRYPOINT_BRAND]: never;
  }
  export type EntrypointBranded =
    | WorkerEntrypointBranded
    | DurableObjectBranded
    | WorkflowEntrypointBranded;
  // Types that can be used through `Stub`s
  export type Stubable = RpcTargetBranded | ((...args: any[]) => any);
  // Types that can be passed over RPC
  // The reason for using a generic type here is to build a serializable subset of structured
  //   cloneable composite types. This allows types defined with the "interface" keyword to pass the
  //   serializable check as well. Otherwise, only types defined with the "type" keyword would pass.
  type Serializable<T> =
    // Structured cloneables
    | BaseType
    // Structured cloneable composites
    | Map<
        T extends Map<infer U, unknown> ? Serializable<U> : never,
        T extends Map<unknown, infer U> ? Serializable<U> : never
      >
    | Set<T extends Set<infer U> ? Serializable<U> : never>
    | ReadonlyArray<T extends ReadonlyArray<infer U> ? Serializable<U> : never>
    | {
        [K in keyof T]: K extends number | string ? Serializable<T[K]> : never;
      }
    // Special types
    | Stub<Stubable>
    // Serialized as stubs, see `Stubify`
    | Stubable;
  // Base type for all RPC stubs, including common memory management methods.
  // `T` is used as a marker type for unwrapping `Stub`s later.
  interface StubBase<T extends Stubable> extends Disposable {
    [__RPC_STUB_BRAND]: T;
    dup(): this;
  }
  export type Stub<T extends Stubable> = Provider<T> & StubBase<T>;
  // This represents all the types that can be sent as-is over an RPC boundary
  type BaseType =
    | void
    | undefined
    | null
    | boolean
    | number
    | bigint
    | string
    | TypedArray
    | ArrayBuffer
    | DataView
    | Date
    | Error
    | RegExp
    | ReadableStream<Uint8Array>
    | WritableStream<Uint8Array>
    | Request
    | Response
    | Headers;
  // Recursively rewrite all `Stubable` types with `Stub`s
  type Stubify<T> = T extends Stubable
    ? Stub<T>
    : T extends Map<infer K, infer V>
      ? Map<Stubify<K>, Stubify<V>>
      : T extends Set<infer V>
        ? Set<Stubify<V>>
        : T extends Array<infer V>
          ? Array<Stubify<V>>
          : T extends ReadonlyArray<infer V>
            ? ReadonlyArray<Stubify<V>>
            : T extends BaseType
              ? T
              : T extends {
                    [key: string | number]: any;
                  }
                ? {
                    [K in keyof T]: Stubify<T[K]>;
                  }
                : T;
  // Recursively rewrite all `Stub<T>`s with the corresponding `T`s.
  // Note we use `StubBase` instead of `Stub` here to avoid circular dependencies:
  // `Stub` depends on `Provider`, which depends on `Unstubify`, which would depend on `Stub`.
  type Unstubify<T> =
    T extends StubBase<infer V>
      ? V
      : T extends Map<infer K, infer V>
        ? Map<Unstubify<K>, Unstubify<V>>
        : T extends Set<infer V>
          ? Set<Unstubify<V>>
          : T extends Array<infer V>
            ? Array<Unstubify<V>>
            : T extends ReadonlyArray<infer V>
              ? ReadonlyArray<Unstubify<V>>
              : T extends BaseType
                ? T
                : T extends {
                      [key: string | number]: unknown;
                    }
                  ? {
                      [K in keyof T]: Unstubify<T[K]>;
                    }
                  : T;
  type UnstubifyAll<A extends any[]> = {
    [I in keyof A]: Unstubify<A[I]>;
  };
  // Utility type for adding `Provider`/`Disposable`s to `object` types only.
  // Note `unknown & T` is equivalent to `T`.
  type MaybeProvider<T> = T extends object ? Provider<T> : unknown;
  type MaybeDisposable<T> = T extends object ? Disposable : unknown;
  // Type for method return or property on an RPC interface.
  // - Stubable types are replaced by stubs.
  // - Serializable types are passed by value, with stubable types replaced by stubs
  //   and a top-level `Disposer`.
  // Everything else can't be passed over PRC.
  // Technically, we use custom thenables here, but they quack like `Promise`s.
  // Intersecting with `(Maybe)Provider` allows pipelining.
  type Result<R> = R extends Stubable
    ? Promise<Stub<R>> & Provider<R>
    : R extends Serializable<R>
      ? Promise<Stubify<R> & MaybeDisposable<R>> & MaybeProvider<R>
      : never;
  // Type for method or property on an RPC interface.
  // For methods, unwrap `Stub`s in parameters, and rewrite returns to be `Result`s.
  // Unwrapping `Stub`s allows calling with `Stubable` arguments.
  // For properties, rewrite types to be `Result`s.
  // In each case, unwrap `Promise`s.
  type MethodOrProperty<V> = V extends (...args: infer P) => infer R
    ? (...args: UnstubifyAll<P>) => Result<Awaited<R>>
    : Result<Awaited<V>>;
  // Type for the callable part of an `Provider` if `T` is callable.
  // This is intersected with methods/properties.
  type MaybeCallableProvider<T> = T extends (...args: any[]) => any
    ? MethodOrProperty<T>
    : unknown;
  // Base type for all other types providing RPC-like interfaces.
  // Rewrites all methods/properties to be `MethodOrProperty`s, while preserving callable types.
  // `Reserved` names (e.g. stub method names like `dup()`) and symbols can't be accessed over RPC.
  export type Provider<
    T extends object,
    Reserved extends string = never,
  > = MaybeCallableProvider<T> & {
    [K in Exclude<
      keyof T,
      Reserved | symbol | keyof StubBase<never>
    >]: MethodOrProperty<T[K]>;
  };
}
export declare namespace Cloudflare {
  interface Env {}
}
export interface SecretsStoreSecret {
  /**
   * Get a secret from the Secrets Store, returning a string of the secret value
   * if it exists, or throws an error if it does not exist
   */
  get(): Promise<string>;
}
export declare namespace TailStream {
  interface Header {
    readonly name: string;
    readonly value: string;
  }
  interface FetchEventInfo {
    readonly type: "fetch";
    readonly method: string;
    readonly url: string;
    readonly cfJson?: object;
    readonly headers: Header[];
  }
  interface JsRpcEventInfo {
    readonly type: "jsrpc";
    readonly methodName: string;
  }
  interface ScheduledEventInfo {
    readonly type: "scheduled";
    readonly scheduledTime: Date;
    readonly cron: string;
  }
  interface AlarmEventInfo {
    readonly type: "alarm";
    readonly scheduledTime: Date;
  }
  interface QueueEventInfo {
    readonly type: "queue";
    readonly queueName: string;
    readonly batchSize: number;
  }
  interface EmailEventInfo {
    readonly type: "email";
    readonly mailFrom: string;
    readonly rcptTo: string;
    readonly rawSize: number;
  }
  interface TraceEventInfo {
    readonly type: "trace";
    readonly traces: (string | null)[];
  }
  interface HibernatableWebSocketEventInfoMessage {
    readonly type: "message";
  }
  interface HibernatableWebSocketEventInfoError {
    readonly type: "error";
  }
  interface HibernatableWebSocketEventInfoClose {
    readonly type: "close";
    readonly code: number;
    readonly wasClean: boolean;
  }
  interface HibernatableWebSocketEventInfo {
    readonly type: "hibernatableWebSocket";
    readonly info:
      | HibernatableWebSocketEventInfoClose
      | HibernatableWebSocketEventInfoError
      | HibernatableWebSocketEventInfoMessage;
  }
  interface Resume {
    readonly type: "resume";
    readonly attachment?: any;
  }
  interface CustomEventInfo {
    readonly type: "custom";
  }
  interface FetchResponseInfo {
    readonly type: "fetch";
    readonly statusCode: number;
  }
  type EventOutcome =
    | "ok"
    | "canceled"
    | "exception"
    | "unknown"
    | "killSwitch"
    | "daemonDown"
    | "exceededCpu"
    | "exceededMemory"
    | "loadShed"
    | "responseStreamDisconnected"
    | "scriptNotFound";
  interface ScriptVersion {
    readonly id: string;
    readonly tag?: string;
    readonly message?: string;
  }
  interface Trigger {
    readonly traceId: string;
    readonly invocationId: string;
    readonly spanId: string;
  }
  interface Onset {
    readonly type: "onset";
    readonly dispatchNamespace?: string;
    readonly entrypoint?: string;
    readonly executionModel: string;
    readonly scriptName?: string;
    readonly scriptTags?: string[];
    readonly scriptVersion?: ScriptVersion;
    readonly trigger?: Trigger;
    readonly info:
      | FetchEventInfo
      | JsRpcEventInfo
      | ScheduledEventInfo
      | AlarmEventInfo
      | QueueEventInfo
      | EmailEventInfo
      | TraceEventInfo
      | HibernatableWebSocketEventInfo
      | Resume
      | CustomEventInfo;
  }
  interface Outcome {
    readonly type: "outcome";
    readonly outcome: EventOutcome;
    readonly cpuTime: number;
    readonly wallTime: number;
  }
  interface Hibernate {
    readonly type: "hibernate";
  }
  interface SpanOpen {
    readonly type: "spanOpen";
    readonly name: string;
    readonly info?: FetchEventInfo | JsRpcEventInfo | Attributes;
  }
  interface SpanClose {
    readonly type: "spanClose";
    readonly outcome: EventOutcome;
  }
  interface DiagnosticChannelEvent {
    readonly type: "diagnosticChannel";
    readonly channel: string;
    readonly message: any;
  }
  interface Exception {
    readonly type: "exception";
    readonly name: string;
    readonly message: string;
    readonly stack?: string;
  }
  interface Log {
    readonly type: "log";
    readonly level: "debug" | "error" | "info" | "log" | "warn";
    readonly message: object;
  }
  interface Return {
    readonly type: "return";
    readonly info?: FetchResponseInfo;
  }
  interface Link {
    readonly type: "link";
    readonly label?: string;
    readonly traceId: string;
    readonly invocationId: string;
    readonly spanId: string;
  }
  interface Attribute {
    readonly name: string;
    readonly value:
      | string
      | string[]
      | boolean
      | boolean[]
      | number
      | number[]
      | bigint
      | bigint[];
  }
  interface Attributes {
    readonly type: "attributes";
    readonly info: Attribute[];
  }
  type EventType =
    | Onset
    | Outcome
    | Hibernate
    | SpanOpen
    | SpanClose
    | DiagnosticChannelEvent
    | Exception
    | Log
    | Return
    | Link
    | Attributes;
  interface TailEvent<Event extends EventType> {
    readonly invocationId: string;
    readonly spanId: string;
    readonly timestamp: Date;
    readonly sequence: number;
    readonly event: Event;
  }
  type TailEventHandler<Event extends EventType = EventType> = (
    event: TailEvent<Event>,
  ) => void | Promise<void>;
  type TailEventHandlerObject = {
    outcome?: TailEventHandler<Outcome>;
    hibernate?: TailEventHandler<Hibernate>;
    spanOpen?: TailEventHandler<SpanOpen>;
    spanClose?: TailEventHandler<SpanClose>;
    diagnosticChannel?: TailEventHandler<DiagnosticChannelEvent>;
    exception?: TailEventHandler<Exception>;
    log?: TailEventHandler<Log>;
    return?: TailEventHandler<Return>;
    link?: TailEventHandler<Link>;
    attributes?: TailEventHandler<Attributes>;
  };
  type TailEventHandlerType = TailEventHandler | TailEventHandlerObject;
}
// Copyright (c) 2022-2023 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0
/**
 * Data types supported for holding vector metadata.
 */
export type VectorizeVectorMetadataValue = string | number | boolean | string[];
/**
 * Additional information to associate with a vector.
 */
export type VectorizeVectorMetadata =
  | VectorizeVectorMetadataValue
  | Record<string, VectorizeVectorMetadataValue>;
export type VectorFloatArray = Float32Array | Float64Array;
export interface VectorizeError {
  code?: number;
  error: string;
}
/**
 * Comparison logic/operation to use for metadata filtering.
 *
 * This list is expected to grow as support for more operations are released.
 */
export type VectorizeVectorMetadataFilterOp = "$eq" | "$ne";
/**
 * Filter criteria for vector metadata used to limit the retrieved query result set.
 */
export type VectorizeVectorMetadataFilter = {
  [field: string]:
    | Exclude<VectorizeVectorMetadataValue, string[]>
    | null
    | {
        [Op in VectorizeVectorMetadataFilterOp]?: Exclude<
          VectorizeVectorMetadataValue,
          string[]
        > | null;
      };
};
/**
 * Supported distance metrics for an index.
 * Distance metrics determine how other "similar" vectors are determined.
 */
export type VectorizeDistanceMetric = "euclidean" | "cosine" | "dot-product";
/**
 * Metadata return levels for a Vectorize query.
 *
 * Default to "none".
 *
 * @property all      Full metadata for the vector return set, including all fields (including those un-indexed) without truncation. This is a more expensive retrieval, as it requires additional fetching & reading of un-indexed data.
 * @property indexed  Return all metadata fields configured for indexing in the vector return set. This level of retrieval is "free" in that no additional overhead is incurred returning this data. However, note that indexed metadata is subject to truncation (especially for larger strings).
 * @property none     No indexed metadata will be returned.
 */
export type VectorizeMetadataRetrievalLevel = "all" | "indexed" | "none";
export interface VectorizeQueryOptions {
  topK?: number;
  namespace?: string;
  returnValues?: boolean;
  returnMetadata?: boolean | VectorizeMetadataRetrievalLevel;
  filter?: VectorizeVectorMetadataFilter;
}
/**
 * Information about the configuration of an index.
 */
export type VectorizeIndexConfig =
  | {
      dimensions: number;
      metric: VectorizeDistanceMetric;
    }
  | {
      preset: string; // keep this generic, as we'll be adding more presets in the future and this is only in a read capacity
    };
/**
 * Metadata about an existing index.
 *
 * This type is exclusively for the Vectorize **beta** and will be deprecated once Vectorize RC is released.
 * See {@link VectorizeIndexInfo} for its post-beta equivalent.
 */
export interface VectorizeIndexDetails {
  /** The unique ID of the index */
  readonly id: string;
  /** The name of the index. */
  name: string;
  /** (optional) A human readable description for the index. */
  description?: string;
  /** The index configuration, including the dimension size and distance metric. */
  config: VectorizeIndexConfig;
  /** The number of records containing vectors within the index. */
  vectorsCount: number;
}
/**
 * Metadata about an existing index.
 */
export interface VectorizeIndexInfo {
  /** The number of records containing vectors within the index. */
  vectorCount: number;
  /** Number of dimensions the index has been configured for. */
  dimensions: number;
  /** ISO 8601 datetime of the last processed mutation on in the index. All changes before this mutation will be reflected in the index state. */
  processedUpToDatetime: number;
  /** UUIDv4 of the last mutation processed by the index. All changes before this mutation will be reflected in the index state. */
  processedUpToMutation: number;
}
/**
 * Represents a single vector value set along with its associated metadata.
 */
export interface VectorizeVector {
  /** The ID for the vector. This can be user-defined, and must be unique. It should uniquely identify the object, and is best set based on the ID of what the vector represents. */
  id: string;
  /** The vector values */
  values: VectorFloatArray | number[];
  /** The namespace this vector belongs to. */
  namespace?: string;
  /** Metadata associated with the vector. Includes the values of other fields and potentially additional details. */
  metadata?: Record<string, VectorizeVectorMetadata>;
}
/**
 * Represents a matched vector for a query along with its score and (if specified) the matching vector information.
 */
export type VectorizeMatch = Pick<Partial<VectorizeVector>, "values"> &
  Omit<VectorizeVector, "values"> & {
    /** The score or rank for similarity, when returned as a result */
    score: number;
  };
/**
 * A set of matching {@link VectorizeMatch} for a particular query.
 */
export interface VectorizeMatches {
  matches: VectorizeMatch[];
  count: number;
}
/**
 * Results of an operation that performed a mutation on a set of vectors.
 * Here, `ids` is a list of vectors that were successfully processed.
 *
 * This type is exclusively for the Vectorize **beta** and will be deprecated once Vectorize RC is released.
 * See {@link VectorizeAsyncMutation} for its post-beta equivalent.
 */
export interface VectorizeVectorMutation {
  /* List of ids of vectors that were successfully processed. */
  ids: string[];
  /* Total count of the number of processed vectors. */
  count: number;
}
/**
 * Result type indicating a mutation on the Vectorize Index.
 * Actual mutations are processed async where the `mutationId` is the unique identifier for the operation.
 */
export interface VectorizeAsyncMutation {
  /** The unique identifier for the async mutation operation containing the changeset. */
  mutationId: string;
}
/**
 * A Vectorize Vector Search Index for querying vectors/embeddings.
 *
 * This type is exclusively for the Vectorize **beta** and will be deprecated once Vectorize RC is released.
 * See {@link Vectorize} for its new implementation.
 */
export declare abstract class VectorizeIndex {
  /**
   * Get information about the currently bound index.
   * @returns A promise that resolves with information about the current index.
   */
  public describe(): Promise<VectorizeIndexDetails>;
  /**
   * Use the provided vector to perform a similarity search across the index.
   * @param vector Input vector that will be used to drive the similarity search.
   * @param options Configuration options to massage the returned data.
   * @returns A promise that resolves with matched and scored vectors.
   */
  public query(
    vector: VectorFloatArray | number[],
    options?: VectorizeQueryOptions,
  ): Promise<VectorizeMatches>;
  /**
   * Insert a list of vectors into the index dataset. If a provided id exists, an error will be thrown.
   * @param vectors List of vectors that will be inserted.
   * @returns A promise that resolves with the ids & count of records that were successfully processed.
   */
  public insert(vectors: VectorizeVector[]): Promise<VectorizeVectorMutation>;
  /**
   * Upsert a list of vectors into the index dataset. If a provided id exists, it will be replaced with the new values.
   * @param vectors List of vectors that will be upserted.
   * @returns A promise that resolves with the ids & count of records that were successfully processed.
   */
  public upsert(vectors: VectorizeVector[]): Promise<VectorizeVectorMutation>;
  /**
   * Delete a list of vectors with a matching id.
   * @param ids List of vector ids that should be deleted.
   * @returns A promise that resolves with the ids & count of records that were successfully processed (and thus deleted).
   */
  public deleteByIds(ids: string[]): Promise<VectorizeVectorMutation>;
  /**
   * Get a list of vectors with a matching id.
   * @param ids List of vector ids that should be returned.
   * @returns A promise that resolves with the raw unscored vectors matching the id set.
   */
  public getByIds(ids: string[]): Promise<VectorizeVector[]>;
}
/**
 * A Vectorize Vector Search Index for querying vectors/embeddings.
 *
 * Mutations in this version are async, returning a mutation id.
 */
export declare abstract class Vectorize {
  /**
   * Get information about the currently bound index.
   * @returns A promise that resolves with information about the current index.
   */
  public describe(): Promise<VectorizeIndexInfo>;
  /**
   * Use the provided vector to perform a similarity search across the index.
   * @param vector Input vector that will be used to drive the similarity search.
   * @param options Configuration options to massage the returned data.
   * @returns A promise that resolves with matched and scored vectors.
   */
  public query(
    vector: VectorFloatArray | number[],
    options?: VectorizeQueryOptions,
  ): Promise<VectorizeMatches>;
  /**
   * Use the provided vector-id to perform a similarity search across the index.
   * @param vectorId Id for a vector in the index against which the index should be queried.
   * @param options Configuration options to massage the returned data.
   * @returns A promise that resolves with matched and scored vectors.
   */
  public queryById(
    vectorId: string,
    options?: VectorizeQueryOptions,
  ): Promise<VectorizeMatches>;
  /**
   * Insert a list of vectors into the index dataset. If a provided id exists, an error will be thrown.
   * @param vectors List of vectors that will be inserted.
   * @returns A promise that resolves with a unique identifier of a mutation containing the insert changeset.
   */
  public insert(vectors: VectorizeVector[]): Promise<VectorizeAsyncMutation>;
  /**
   * Upsert a list of vectors into the index dataset. If a provided id exists, it will be replaced with the new values.
   * @param vectors List of vectors that will be upserted.
   * @returns A promise that resolves with a unique identifier of a mutation containing the upsert changeset.
   */
  public upsert(vectors: VectorizeVector[]): Promise<VectorizeAsyncMutation>;
  /**
   * Delete a list of vectors with a matching id.
   * @param ids List of vector ids that should be deleted.
   * @returns A promise that resolves with a unique identifier of a mutation containing the delete changeset.
   */
  public deleteByIds(ids: string[]): Promise<VectorizeAsyncMutation>;
  /**
   * Get a list of vectors with a matching id.
   * @param ids List of vector ids that should be returned.
   * @returns A promise that resolves with the raw unscored vectors matching the id set.
   */
  public getByIds(ids: string[]): Promise<VectorizeVector[]>;
}
/**
 * The interface for "version_metadata" binding
 * providing metadata about the Worker Version using this binding.
 */
export type WorkerVersionMetadata = {
  /** The ID of the Worker Version using this binding */
  id: string;
  /** The tag of the Worker Version using this binding */
  tag: string;
  /** The timestamp of when the Worker Version was uploaded */
  timestamp: string;
};
export interface DynamicDispatchLimits {
  /**
   * Limit CPU time in milliseconds.
   */
  cpuMs?: number;
  /**
   * Limit number of subrequests.
   */
  subRequests?: number;
}
export interface DynamicDispatchOptions {
  /**
   * Limit resources of invoked Worker script.
   */
  limits?: DynamicDispatchLimits;
  /**
   * Arguments for outbound Worker script, if configured.
   */
  outbound?: {
    [key: string]: any;
  };
}
export interface DispatchNamespace {
  /**
   * @param name Name of the Worker script.
   * @param args Arguments to Worker script.
   * @param options Options for Dynamic Dispatch invocation.
   * @returns A Fetcher object that allows you to send requests to the Worker script.
   * @throws If the Worker script does not exist in this dispatch namespace, an error will be thrown.
   */
  get(
    name: string,
    args?: {
      [key: string]: any;
    },
    options?: DynamicDispatchOptions,
  ): Fetcher;
}
export declare abstract class Workflow<PARAMS = unknown> {
  /**
   * Get a handle to an existing instance of the Workflow.
   * @param id Id for the instance of this Workflow
   * @returns A promise that resolves with a handle for the Instance
   */
  public get(id: string): Promise<WorkflowInstance>;
  /**
   * Create a new instance and return a handle to it. If a provided id exists, an error will be thrown.
   * @param options Options when creating an instance including id and params
   * @returns A promise that resolves with a handle for the Instance
   */
  public create(
    options?: WorkflowInstanceCreateOptions<PARAMS>,
  ): Promise<WorkflowInstance>;
  /**
   * Create a batch of instances and return handle for all of them. If a provided id exists, an error will be thrown.
   * `createBatch` is limited at 100 instances at a time or when the RPC limit for the batch (1MiB) is reached.
   * @param batch List of Options when creating an instance including name and params
   * @returns A promise that resolves with a list of handles for the created instances.
   */
  public createBatch(
    batch: WorkflowInstanceCreateOptions<PARAMS>[],
  ): Promise<WorkflowInstance[]>;
}
export type WorkflowDurationLabel =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";
export type WorkflowSleepDuration =
  | `${number} ${WorkflowDurationLabel}${"s" | ""}`
  | number;
export type WorkflowRetentionDuration = WorkflowSleepDuration;
export interface WorkflowInstanceCreateOptions<PARAMS = unknown> {
  /**
   * An id for your Workflow instance. Must be unique within the Workflow.
   */
  id?: string;
  /**
   * The event payload the Workflow instance is triggered with
   */
  params?: PARAMS;
  /**
   * The retention policy for Workflow instance.
   * Defaults to the maximum retention period available for the owner's account.
   */
  retention?: {
    successRetention?: WorkflowRetentionDuration;
    errorRetention?: WorkflowRetentionDuration;
  };
}
export type InstanceStatus = {
  status:
    | "queued" // means that instance is waiting to be started (see concurrency limits)
    | "running"
    | "paused"
    | "errored"
    | "terminated" // user terminated the instance while it was running
    | "complete"
    | "waiting" // instance is hibernating and waiting for sleep or event to finish
    | "waitingForPause" // instance is finishing the current work to pause
    | "unknown";
  error?: string;
  output?: object;
};
export interface WorkflowError {
  code?: number;
  message: string;
}
export declare abstract class WorkflowInstance {
  public id: string;
  /**
   * Pause the instance.
   */
  public pause(): Promise<void>;
  /**
   * Resume the instance. If it is already running, an error will be thrown.
   */
  public resume(): Promise<void>;
  /**
   * Terminate the instance. If it is errored, terminated or complete, an error will be thrown.
   */
  public terminate(): Promise<void>;
  /**
   * Restart the instance.
   */
  public restart(): Promise<void>;
  /**
   * Returns the current status of the instance.
   */
  public status(): Promise<InstanceStatus>;
  /**
   * Send an event to this instance.
   */
  public sendEvent({
    type,
    payload,
  }: {
    type: string;
    payload: unknown;
  }): Promise<void>;
}
