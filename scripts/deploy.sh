#!/usr/bin/env bash

if [[ $1 == "frontend" ]]; then
  ./scripts/deploy-frontend.sh
elif [[ $1 == "server" ]]; then
  ./scripts/deploy-server.sh
elif [[ $1 == "lambdas" ]]; then
  ./scripts/deploy-lambdas.sh
elif [[ $1 == "test-reporter" ]]; then
  ./scripts/deploy-test-reporter.sh
else
  echo "Not a valid package"
  exit 1
fi
