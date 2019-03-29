#!/bin/sh
tag=$(date +"%Y-%m-%d-%H-%M")

tar -cvf ./docker/build.tar docker/ src/ view/ www/ build.sh package.json production.js docker-entrypoint.sh
IMAGE="spiderpuppet:$tag"
cd ./docker
docker build -t $IMAGE -f ./Dockerfile ./
if [ $? != 0 ]; then
  exit 1;
fi
rm ./build.tar
