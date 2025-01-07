#!/bin/env bash

docker build --file "$PWD/Dockerfile.build" -t build:latest .
