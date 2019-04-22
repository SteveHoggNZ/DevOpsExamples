#!/usr/bin/env bash

if [[ -z ${ENV} ]]; then
  echo "Error: ENV environment var is not set"
  echo
  exit 2
fi

ENV_FILE="env/${ENV}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Error: ${ENV_FILE} environment file is missing"
  echo
  exit 2
fi

set -euxo pipefail

source "${ENV_FILE}"

if [[ -z $DEPLOYMENT_BUCKET ]]; then
  echo "Error: DEPLOYMENT_BUCKET env var is not set"
  echo
  exit
fi

mkdir -p ./build
npm run webpack
cp package.json .webpack/
cd .webpack
zip ../build/package.zip -r .
cd ..
