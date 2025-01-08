#!/bin/env bash
set -e
REQUIRED_ENVS=(
  VITE_FIREBASE_API_KEY
  VITE_FIREBASE_AUTH_DOMAIN
  VITE_FIREBASE_PROJECT_ID
  VITE_FIREBASE_STORAGE_BUCKET
  VITE_FIREBASE_MESSAGING_SENDER_ID
  VITE_FIREBASE_APP_ID
)

DOTENV_VITE="$PWD/packages/frontend/.env.production"
touch "$DOTENV_VITE"

for ENV_VAR in "${REQUIRED_ENVS[@]}"; do
  if [[ -z "${!ENV_VAR}" ]]; then
    echo "Error: Required environment variable $ENV_VAR is not set."
    exit 1
  fi
  printf '%s=%s\n' "$ENV_VAR" "${!ENV_VAR}" >>"$DOTENV_VITE"
done

TAG="$(git rev-parse --short HEAD)"
REGISTRY="$REGISTRY_NAME"
FRONTEND_IMAGE="$REGISTRY/frontend_server:$TAG"
docker build --file "$PWD/Dockerfile.frontend-server" -t "$FRONTEND_IMAGE" .
echo "$FRONTEND_IMAGE" >frontend-docker-image.txt
