#!/bin/bash

# Use functions and variables from the utils script
# source "../../../scripts/shellUtils.sh"
# source "$SOURCE_PROJECT/scripts/shellUtils.sh"

IEATTA_ROOT="$HOME/Desktop/Migration-App"
SOURCE_PROJECT="$IEATTA_ROOT/source-project"
DEST_PROJECT="$IEATTA_ROOT/dest-project"

step=0

function summary_end() {
    total_step=$1
    excepted_step=$2

    info "step: ${total_step}"
            
    info "========================================="
    if [ "$total_step" == "$excepted_step" ] ; then
        success "Build project successfully"
    else 
        error "Build project failed"
    fi
    info "========================================="
}

function join_by  () {
    # $1 is return variable name
    # $2 is sep
    # $3... are the elements to join
    local retname=$1 sep=$2 ret=$3
    shift 3 || shift $(($#))
    printf -v "$retname" "%s" "$ret${@/#/$sep}"
}

function test_join_array() {
    FOO=( a b c )
    join_by  wh "\n" "${FOO[@]}"
    info "wh=${wh}"
}



