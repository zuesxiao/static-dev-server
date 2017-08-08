#!/usr/bin/env bash

IMAGE_NAME="query-service"
CONTAINER_NAME="query-service"

if [ "$(docker ps -q -f ancestor=$CONTAINER_NAME)" ]; then
  docker rm -f $CONTAINER_NAME
fi

docker run -d \
  -p 3000:3000 \
  --restart=always \
  --name=$CONTAINER_NAME \
  $IMAGE_NAME:latest
