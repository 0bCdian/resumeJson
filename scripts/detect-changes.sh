#!/usr/bin/env bash
set -euo pipefail

DIR=$1
REF=$2

if [[ -z "$DIR" ]]; then
  echo "Empty dir"
  exit 1
fi

if [[ -z "$REF" ]]; then
  echo "Empty ref"
  exit 1
fi

if [[ "$DIR" == "frontend" ]]; then
  DIR="packages/frontend packages/frontend_server"
else
  DIR="packages/$DIR"
fi

if git diff --quiet HEAD "$REF" -- "$DIR"; then
  echo "CHANGED=false" >>"$GITHUB_ENV"
else
  echo "CHANGED=true" >>"$GITHUB_ENV"
fi
