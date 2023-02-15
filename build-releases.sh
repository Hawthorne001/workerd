#! /bin/bash
set -euo pipefail

if [[ $(uname -m) == 'x86_64' ]]; then
  echo "This _must_ be run on an Apple Silicon machine, since the macOS ARM build cannot be dockerised due to macOS license restrictions"
  exit 1
fi

rm -f workerd-darwin-arm64
rm -f workerd-linux-arm64

# Get the tag associated with the latest release, to ensure parity between binaries
TAG_NAME=$(curl -sL https://api.github.com/repos/cloudflare/workerd/releases/latest | jq -r ".tag_name")

git checkout $TAG_NAME

# Build macOS binary
pnpm exec bazelisk build --disk_cache=./.bazel-cache -c opt //src/workerd/server:workerd

cp bazel-bin/src/workerd/server/workerd ./workerd-darwin-arm64

docker buildx build --platform linux/arm64 -f Dockerfile.release -t workerd:$TAG_NAME --target=artifact --output type=local,dest=$(pwd) .
