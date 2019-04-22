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

CMD="aws cloudformation deploy --template-file ./build/index.cf.yaml \
  --stack-name ${SERVICE_NAME}-${ENV} \
  --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND \
  --parameter-overrides Env=${ENV}"

if [[ ! -z $SERVICE_NAME ]]; then
  CMD="${CMD} ServiceName=${SERVICE_NAME}"
fi

echo
echo "${CMD}"
eval "${CMD}"
echo
