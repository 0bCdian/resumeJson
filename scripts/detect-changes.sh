#!/usr/bin/env bash
set -euo pipefail

DIR=$1
CURRENT_REF=$2
PREVIOUS_REF=$3

if [[ -z "$DIR" ]]; then
  echo "Empty dir"
  exit 1
fi

if [[ "$DIR" == "frontend" ]]; then
  DIR="packages/frontend packages/frontend_server"
if [[ "$DIR" == "test-reporter" ]];then
  DIR="./Dockerfile.reporter ./nginx.conf"
else
  DIR="packages/$DIR"
fi

if git diff --quiet "$CURRENT_REF" "$PREVIOUS_REF"  -- "$DIR"; then
  echo "CHANGED=false" >>"$GITHUB_ENV"
else
  echo "CHANGED=true" >>"$GITHUB_ENV"
fi
