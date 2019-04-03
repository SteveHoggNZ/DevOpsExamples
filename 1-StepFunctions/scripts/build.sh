#!/bin/bash
set -euo pipefail

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

source "${ENV_FILE}"

if [[ -z $DEPLOYMENT_BUCKET ]]; then
  echo "Error: DEPLOYMENT_BUCKET env var is not set"
  echo
  exit
fi

mkdir -p ./build
npm run webpack
cd .webpack
zip ../build/package.zip -r .
cd ..

CMD="aws cloudformation package --template-file index.sam.yaml \
  --s3-bucket ${DEPLOYMENT_BUCKET} \
  --output-template-file ./build/index.cf.yaml"

echo
echo "${CMD}"
eval "${CMD}"
echo
