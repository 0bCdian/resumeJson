#!/bin/env bash
set -e

trap 'docker compose down' EXIT

docker compose up -d --wait

bun run test:run
test_status=$?

exit $test_status
