#!/bin/env bash

docker build --file "$PWD/Dockerfile.build" -t build:1.0 .
