#!/usr/bin/env bash

IMAGE_NAME="static-dev-server"
CONTAINER_NAME="static-dev-server"

if [ "$(docker images | grep "^<none>")" ]; then
  docker rmi -f $(docker images | grep "^<none>" | awk "{print $3}")
fi

if [ "$(docker ps -q -f ancestor=$CONTAINER_NAME)" ]; then
  docker rm -f $CONTAINER_NAME
fi

if [ "$(docker images -q $IMAGE_NAME)" ]; then
  docker rmi -f $IMAGE_NAME
fi

docker build --tag static-dev-server .
