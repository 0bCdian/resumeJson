#!/usr/bin/env bash
echo "Upload reports"
HASH=$(git rev-parse --short HEAD)
echo "This is the hash $HASH"
gcloud config set project "$GCLOUD_PROJECT"
gcloud storage cp ./html gs://"$REPORTER_BUCKET/reports/$HASH"
ls
echo "This is the hash $GCLOUD_PROJECT"
echo "$REPORTER_URL/$HASH"
