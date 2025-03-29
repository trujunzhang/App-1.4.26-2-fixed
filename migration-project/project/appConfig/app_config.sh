#!/bin/bash

function app_config_add_lines() {
    app_config_js="src/CONFIG.ts"

    add_lines_in_file           \
        "$app_config_js"        \
        "import appConfig from" \
        "import Config from 'react-native-config';" \
        "import appConfig from './appConfig/appConfig';" \
        

    add_lines_in_file     \
        "$app_config_js"  \
        "...appConfig,"   \
        "ENVIRONMENT,"    \
        "    ...appConfig,"   \
        

}

function EDIT_app_config() {
    step=$((step + 1))
    info "Start editing appConfig"

    copy_folder_from_source_to_dest "src/appConfig"

    app_config_add_lines
}
