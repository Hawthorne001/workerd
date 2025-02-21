# WARNING: THIS FILE IS AUTOGENERATED BY update-deps.py DO NOT EDIT

load("@//:build/http.bzl", "http_archive")

TAG_NAME = "0.8.3"
URL = "https://github.com/astral-sh/ruff/releases/download/0.8.3/ruff-aarch64-unknown-linux-gnu.tar.gz"
STRIP_PREFIX = "ruff-aarch64-unknown-linux-gnu"
SHA256 = "e8fd209006dc6be4066eb1730371aa2bba0216471a7fddb57aaf07562dcf7283"
TYPE = "tgz"

def dep_ruff_linux_arm64():
    http_archive(
        name = "ruff-linux-arm64",
        url = URL,
        strip_prefix = STRIP_PREFIX,
        type = TYPE,
        sha256 = SHA256,
        build_file_content = "filegroup(name='file', srcs=glob(['**']))",
    )
