#!/usr/bin/env bash

if [[ "$(docker images -q static-dev-server)" -ne "" ]]; then
  docker rmi -f static-dev-server
fi
docker build --tag static-dev-server .
