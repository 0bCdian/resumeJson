#!/bin/env bash
set -e
IMAGE="$(cat "$PWD/frontend-docker-image.txt")"

if [[ -z "$IMAGE" ]]; then
  echo "no image found"
  exit 1
fi

gcloud config set project "$GCP_PROJECT"

docker push "$IMAGE"
