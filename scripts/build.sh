#!/usr/bin/env bash

if [[ $1 == "frontend" ]]; then
  ./scripts/build-frontend.sh
elif [[ $1 == "server" ]]; then
  ./scripts/build-server.sh
elif [[ $1 == "lambdas" ]]; then
  ./scripts/build-lambdas.sh
elif [[ $1 == "test-reporter" ]]; then
  ./scripts/build-test-reporter.sh
else
  echo "Not a valid package"
  exit 1
fi
