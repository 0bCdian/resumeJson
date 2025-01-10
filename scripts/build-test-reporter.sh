#!/usr/bin/env bash
set -e
TAG="$(git rev-parse --short HEAD)"
REGISTRY="$REGISTRY_NAME"
REPORTER_IMAGE="$REGISTRY/test-reporter:$TAG"
docker build --file "$PWD/Dockerfile.reporter" -t "$REPORTER_IMAGE" .
echo "$REPORTER_IMAGE" >test-reporter-docker-image.txt
