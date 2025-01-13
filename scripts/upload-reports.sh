#!/usr/bin/env bash
HASH=$(git rev-parse --short HEAD)
gcloud config set project "$GCLOUD_PROJECT"
gcloud storage cp --recursive ./html gs://"$REPORTER_BUCKET/reports/$HASH"
echo "REPORT_URL=$REPORTER_URL/$HASH/#/" >>"$GITHUB_ENV"
