#!/bin/bash


# Use functions and variables from the utils script
source scripts/shellUtils.sh

SRC_DIR="src/types/firebase"
OUT_DIR="src/pages/proptypes"

function build:proptypes:all {
#     NODE_ENV=coding
    CODING_GENERATE=true npx babel "${SRC_DIR}" --extensions '.ts,.tsx,.js,.jsx' --out-dir "${OUT_DIR}"
    info "build:proptypes:all"
}

function build:proptypes:single {
#  "NODE_ENV=production npx babel src/models/user.tsx --extensions '.ts,.tsx,.js,.jsx' --out-dir lib/models"
    info "build:proptypes:single"
}


# build:proptypes:single

build:proptypes:all

