#!/bin/bash
git submodule sync
git submodule update --init --recursive --remote || true

# Kalau masih gagal, pakai token
git submodule update --init --recursive