#!/usr/bin/env bash

if [ "$(docker images | grep "^<none>")" ]; then
  docker rmi -f $(docker images | grep "^<none>" | awk "{print $3}")
fi

if [ "$(docker ps -q -f ancestor=static-dev-server)" ]; then
  docker rm -f static-dev-server
fi

if [ "$(docker images -q static-dev-server)" ]; then
  docker rmi -f static-dev-server
fi

docker build --tag static-dev-server .
