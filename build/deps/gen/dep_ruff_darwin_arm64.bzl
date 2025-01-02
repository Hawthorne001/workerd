# WARNING: THIS FILE IS AUTOGENERATED BY update-deps.py DO NOT EDIT

load("@//:build/http.bzl", "http_archive")

TAG_NAME = "0.8.3"
URL = "https://github.com/astral-sh/ruff/releases/download/0.8.3/ruff-aarch64-apple-darwin.tar.gz"
STRIP_PREFIX = "ruff-aarch64-apple-darwin"
SHA256 = "b99da0f689b01d5b556fe2f66a756c99fe85b78cebd19f73817de7315438d53e"
TYPE = "tgz"

def dep_ruff_darwin_arm64():
    http_archive(
        name = "ruff-darwin-arm64",
        url = URL,
        strip_prefix = STRIP_PREFIX,
        type = TYPE,
        sha256 = SHA256,
        build_file_content = "filegroup(name='file', srcs=glob(['**']))",
    )