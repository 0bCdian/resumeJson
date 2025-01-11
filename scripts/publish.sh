#!/usr/bin/env bash

if [[ $1 == "frontend" ]]; then
  ./scripts/publish-frontend.sh
elif [[ $1 == "server" ]]; then
  ./scripts/publish-server.sh
elif [[ $1 == "lambdas" ]]; then
  ./scripts/publish-lambdas.sh
elif [[ $1 == "test-reporter" ]]; then
  ./scripts/publish-test-reporter.sh
else
  echo "Not a valid package"
  exit 1
fi
