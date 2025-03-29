#!/bin/bash

function PROJECT_ieatta_iconset() {
    step=$((step + 1))
    info "Start copying ieatta icon set for ios and android"

    copy_file_from_source_to_dest "scripts/create-appicon.sh"
    
    check_and_add_keys_in_package_json      \
           "scripts/create-appicon.sh"      \
           '["scripts"]["create-appicon"]'  \
           '"create-appicon"'

    check_and_install_dependencies  \
        "latest"             \
        "devDependencies"     \
        '"icon-set-creator"'  \
        "icon-set-creator"
}

function CHECK_ieatta_iconset() {
    checkString='"icon-set-creator"'  
    if  grep "$checkString" $json_file; then
       success "  $checkString already exists in $json_file"
    else
        error "  $checkString not exists in $json_file"
    fi

}
