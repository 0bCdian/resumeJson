#!/usr/bin/env bash
set -e
IMAGE="$(cat "$PWD/frontend-docker-image.txt")"
SERVICE="resumeJsonFrontend-$ENV"
VARS="GCLOUD_PROJECT=$GCLOUD_PROJECT,DB_URL=$DB_URL"

if [[ -z "$IMAGE" ]]; then
  echo "no image found"
  exit 1
fi

gcloud config set project "$GCP_PROJECT"

SERVICE_URL=$(
  gcloud run deploy "$SERVICE" \
    --image "$IMAGE" \
    --set-env-vars "$VARS" \
    --platform managed \
    --allow-unauthenticated \
    --memory 512M \
    --format='value(status.url)'
)

echo "$SERVICE_URL" >frontend-url.txt
echo "$SERVICE_URL"
