#!/usr/bin/env bash
#
# Destroy CloudFormation stacks.
#
# Usage:
#     ./bin/destroy-stacks.sh [stack] [stack] ...
# e.g.,
#     ./bin/destroy-stacks.sh         # Destroy all stacks.
#     ./bin/destroy-stacks.sh eni     # Destroy stack eni only.
#     ./bin/destroy-stacks.sh vpc     # Destroy stack vpc only.
#     ./bin/destroy-stacks.sh eni vpc # Destroy multiple selected stacks.
#

set -e
set +x

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${CURRENT_DIR}/.."

if [[ $# -eq 0 ]] ; then
  stacks=(
    "roles"
    "eni"
    "vpc"
  )
else
  stacks=("$@")
fi

if [[ -z "${AWS_STACK_PREFIX}" ]]; then
  AWS_STACK_PREFIX=test-
fi

# Iterate over the array variable $stacks
for stack in "${stacks[@]}" ; do
    (set -x; cdk destroy "${AWS_STACK_PREFIX}${stack}" --force)
done
