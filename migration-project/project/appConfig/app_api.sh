#!/bin/bash

function api_network_connection() {
    app_config_js="src/libs/NetworkConnection.ts"

    check_replace_lines_in_file \
         "$app_config_js" \
         "djzhang not to subscribe" \
         "if (!CONFIG.IS_USING_LOCAL_WEB) {" \
         "if (!CONFIG.IS_USING_LOCAL_WEB \&\& false) { // TODO: djzhang not to subscribe"  
}

function EDIT_app_api() {
    step=$((step + 1))
    info "Start editing app api"

    api_network_connection
}
