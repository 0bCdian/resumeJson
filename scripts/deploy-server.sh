#!/usr/bin/env bash
set -euo

IMAGE="$(cat "$PWD/server-docker-image.txt")"
SERVICE="resumejson-server-$ENV"
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
    --update-secrets=OPEN_AI_API_KEY=OPEN_AI_API_KEY:latest \
    --service-account "$SERVER_SERVICE_ACCOUNT" \
    --platform managed \
    --allow-unauthenticated \
    --format='value(status.url)'
)

echo "$SERVICE_URL" >server-url.txt
echo "$SERVICE_URL"
