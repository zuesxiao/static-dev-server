#!/usr/bin/env bash

if [[ "$(docker ps -q -f ancestor=static-dev-server)" -ne "" ]]; then
  docker rm -f static-dev-server
fi

docker run -d \
  -p 3000:3000 \
  --restart=always \
  --name=static-dev-server \
  static-dev-server:latest
