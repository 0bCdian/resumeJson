#!/usr/bin/env bash
set -euo

IMAGE="$(cat "$PWD/frontend-docker-image.txt")"
SERVICE="resumejson-frontend-$ENV"
VARS="GCLOUD_PROJECT=$GCLOUD_PROJECT,DB_ID=$DB_ID"

if [[ -z "$IMAGE" ]]; then
  echo "no image found"
  exit 1
fi

gcloud config set project "$GCLOUD_PROJECT"

SERVICE_URL=$(
  gcloud run deploy "$SERVICE" \
    --image "$IMAGE" \
    --set-env-vars "$VARS" \
    --platform managed \
    --service-account "$FRONTEND_SERVICE_ACCOUNT" \
    --allow-unauthenticated \
    --memory 512M \
    --format='value(status.url)'
)

echo "$SERVICE_URL" >frontend-url.txt
echo "$SERVICE_URL"
