#!/usr/bin/env bash
set -e
IMAGE="$(cat "$PWD/test-reporter-docker-image.txt")"
SERVICE="resumeJsonErrorReporter-$ENV"
if [[ -z "$IMAGE" ]]; then
  echo "no image found"
  exit 1
fi

gcloud config set project "$GCLOUD_PROJECT"

SERVICE_URL=$(
  gcloud run deploy "$SERVICE" \
    --execution-environment gen2 \
    --add-volume=name=reports,type=cloud-storage,bucket="$REPORTER_BUCKET" \
    --add-volume-mount=reports,mount-path="/reports" \
    --image "$IMAGE" \
    --service-account "$REPORTER_SERVICE_ACCOUNT" \
    --allow-unauthenticated \
    --memory 512M \
    --format='value(status.url)'
)

echo "$SERVICE_URL" >test-reporter-url.txt
echo "$SERVICE_URL"
