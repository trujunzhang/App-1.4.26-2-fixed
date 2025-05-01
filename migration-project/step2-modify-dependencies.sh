#!/bin/bash

source ../scripts/shellUtils.sh

# import utils
source "./utils/constant.sh"
source "./utils/file-utils.sh"
source "./utils/package-utils.sh"
source "./utils/scan-folder-utils.sh"

# import edit
source "./edit/react-native-background-task.sh"
source "./edit/react-native-live-markdown.sh"
source "./edit/react-native-plaid-link-sdk.sh"
source "./edit/react-native-firebase.sh"
source "./edit/react-native-pdf.sh"

# import project
source "./project/metro-config.sh"
source "./project/ieatta-ios.sh"

function modify_package_json() {
    step=$((step + 1))
    info "Start modifying dependencies in package.json"

    delete_line_in_file "package.json"  '"expo-constants",'
    delete_line_in_file "package.json"  '"expo-file-system",'

    check_and_remove_keys_in_package_json '"engines"' '["engines"]'
   
    overrides_keys_in_package_json "['dependencies']['react-native-svg']" "['overrides']['react-native-svg']"
    overrides_keys_in_package_json "['dependencies']['react']" "['overrides']['react']"
    overrides_keys_in_package_json "['dependencies']['react-dom']" "['overrides']['react-dom']"
}

function step1_build_project() {
    modify_package_json
}

function step2_build_project() {
    PROJECT_ieatta_ios

    EDIT_react-native-firebase
    EDIT_react-native-firebase-dependencies

    EDIT_react_native_background_task

    EDIT_react-native-plaid-link-sdk
    EDIT_react-native-pdf

}

function step3_config_project() {
    EDIT_metro_config_js
}

step1_build_project
step2_build_project
step3_config_project

function summary_check() {
    info "================ summary check ========================="

    CHECK_react-native-firebase-dependencies

    info "========================================="
}

summary_check
summary_end $step "2"
