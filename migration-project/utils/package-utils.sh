#!/bin/bash

# remove_keys_in_package_json "['dependencies']['@expo/metro-runtime']"
function remove_keys_in_package_json() {
   status=$1
   json_file="$DEST_PROJECT/package.json"

   node -e "let pkg=require('${json_file}'); delete pkg${status}; require('fs').writeFileSync('${json_file}', JSON.stringify(pkg, null, 2));"
}

function removed_dependencies_in_package_json() {
	dependencies=("$@")
    for ((i = 0; i < ${#dependencies[@]}; i = i + 2)); do
        checkString=${dependencies[$i]} 
        library_name=${dependencies[$i + 1]} 
   
        info "  Removing ${library_name}"
        check_and_remove_keys_in_package_json "$checkString" "['dependencies']['${library_name}']"
    done
}

function check_and_remove_keys_in_package_json() {
    checkString=$1
    status=$2

    json_file="$DEST_PROJECT/package.json"
 
    if  grep "$checkString" $json_file; then
        error "  $checkString already exists in $json_file"
        remove_keys_in_package_json "$status"
    else
        success "  $checkString not exists in $json_file"
    fi
}

function run_npm_install() {
    if [ ! -d "$DEST_PROJECT/node_modules" ]; then
        npm install --prefix "$DEST_PROJECT"
    fi
}

function install_third_dependencies() {
    dependenciesType=$1
    library=$2

    if [ "$dependenciesType" == "devDependencies" ] ; then
        npm install --save-dev $library --prefix "$DEST_PROJECT"
    else
        npm install --save $library --prefix "$DEST_PROJECT"
    fi
}

function check_and_install_dependencies() {
    dependenciesType=$1
    checkString=$2
    library=$3

    json_file="$DEST_PROJECT/package.json"
 
    if  grep "$checkString" $json_file; then
        error "  $checkString already exists in $json_file"
    else
        success "  $checkString not exists in $json_file"

        install_third_dependencies $dependenciesType $library
    fi
}

function check_and_install_third_dependencies() {
    dependenciesType=$1
    library=$2

    json_file="$DEST_PROJECT/package.json"
 
    if  grep "$library" $json_file; then
        error "  $library already exists in $json_file"
    else
        success "  $library not exists in $json_file"

        install_third_dependencies $dependenciesType $library
    fi
}

function install_dependencies_in_package_json() {
    dependenciesType=$1
	dependencies=("$@")

    for ((i = 1; i < ${#dependencies[@]}; i = i + 1)); do
        library_name=${dependencies[$i]} 
   
        info "  Installing ${library_name}"
        check_and_install_third_dependencies "${dependenciesType}" "${library_name}" 
    done
}

function overrides_keys_in_package_json() {
   json_value=$1
   overrides_key=$2

   json_file="$DEST_PROJECT/package.json"

   node -e "let pkg=require('${json_file}'); pkg${overrides_key}=pkg${json_value}; require('fs').writeFileSync('${json_file}', JSON.stringify(pkg, null, 2));"
}

function add_keys_in_package_json() {
   json_value=$1
   overrides_key=$2

   json_file="$DEST_PROJECT/package.json"

   # info "==================  add_keys_in_package_json ========================"
   # info "  json_value: $json_value"
   # info "  overrides_key: $overrides_key"
   # info "====================================================================="

   node -e "let pkg=require('${json_file}'); pkg${overrides_key}='${json_value}'; require('fs').writeFileSync('${json_file}', JSON.stringify(pkg, null, 2));"
}


function check_and_add_keys_in_package_json() {
    json_value=$1
    overrides_key=$2
    checkString=$3

    json_file="$DEST_PROJECT/package.json"
 
    if  grep "$checkString" $json_file; then
        error "  $checkString already exists in $json_file"
    else
        success "  $checkString not exists in $json_file"
        add_keys_in_package_json "$json_value" "$overrides_key"
    fi
}

function check_and_add_dependencies_keys() {
    json_key=$1
    overrides_key=$2
    checkString=$3

    json_file="$DEST_PROJECT/package.json"
 
    if  grep "$checkString" $json_file; then
        error "  $checkString already exists in $json_file"
    else
        success "  $checkString not exists in $json_file"

        node -e "let pkg=require('${json_file}'); pkg${overrides_key}='${json_key}'; require('fs').writeFileSync('${json_file}', JSON.stringify(pkg, null, 2));"
    fi
}


