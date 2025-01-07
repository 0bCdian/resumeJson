#!/bin/env bash
# Ensure docker compose is brought down on exit
trap 'docker compose down' EXIT

# Start Docker Compose services and wait for them to be ready
docker compose up -d --wait

# Run the tests and capture their exit status
bun run test:run
test_status=$?

# Exit with the same status as the tests
exit $test_status
