#!/usr/bin/env bash
set -euo pipefail

DIR=$1
CURRENT_REF=$2
PREVIOUS_REF=$3
echo "$DIR"
echo "$CURRENT_REF"
echo "$PREVIOUS_REF"
if [[ -z "$DIR" ]]; then
  echo "Empty dir"
  exit 1
fi

if [[ "$DIR" == "frontend" ]]; then
  DIR="$PWD/packages/frontend $PWD/packages/frontend_server"
elif [[ "$DIR" == "test-reporter" ]]; then
  DIR="$PWD/Dockerfile.reporter $PWD/nginx.conf"
else
  DIR="$PWD/packages/$DIR"
fi
if git diff --quiet "$CURRENT_REF" "$PREVIOUS_REF" -- "$DIR"; then
  echo "CHANGED=false" >>"$GITHUB_ENV"
else
  echo "CHANGED=true" >>"$GITHUB_ENV"
fi
