#!/usr/bin/env bash
set -e
IMAGE="$(cat "$PWD/test-reporter-docker-image.txt")"
SERVICE="resumeJsonErrorReporter-$ENV"
if [[ -z "$IMAGE" ]]; then
  echo "no image found"
  exit 1
fi

gcloud config set project "$GCP_PROJECT"

SERVICE_URL=$(
  gcloud run deploy "$SERVICE" \
    --image "$IMAGE" \
    --platform managed \
    --allow-unauthenticated \
    --memory 512M \
    --format='value(status.url)'
)

echo "$SERVICE_URL" >test-reporter-url.txt
echo "$SERVICE_URL"
