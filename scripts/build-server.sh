#!/bin/env bash
set -e
TAG="$(git rev-parse --short HEAD)"
REGISTRY="$REGISTRY_NAME"
SERVER_IMAGE="$REGISTRY/server:$TAG"
docker build --file "$PWD/Dockerfile.server" -t "$SERVER_IMAGE" .
echo "$SERVER_IMAGE" >server-docker-image.txt
