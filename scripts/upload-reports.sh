#!/usr/bin/env bash

HASH=$(git rev-parse --short HEAD)
gcloud config set project "$GCP_PROJECT"
gcloud storage cp ./html gs://"$REPORTER_BUCKET/reports/$HASH"
echo "$REPORTER_URL/$HASH"
