#!/usr/bin/env bash

# CAPABILITY_IAM required for Lambda roles
# CAPABILITY_AUTO_EXPAND required for nested stacks
CAPABILITIES="CAPABILITY_IAM CAPABILITY_AUTO_EXPAND"

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

aws cloudformation package --template-file 0-template.yaml \
  --s3-bucket ${DEPLOYMENT_BUCKET} \
  --output-template-file ./build/template.cf.yaml

aws cloudformation deploy --template-file ./build/template.cf.yaml \
  --stack-name ${PRODUCT_NAME}-${ENV} \
  --capabilities ${CAPABILITIES} \
  --parameter-overrides Env=${ENV} ProductName=${PRODUCT_NAME} \
    ProductName=${PRODUCT_NAME} Version=${VERSION}
