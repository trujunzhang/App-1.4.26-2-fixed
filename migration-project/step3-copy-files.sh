#!/bin/bash

source ../scripts/shellUtils.sh

# import utils
source "./utils/constant.sh"
source "./utils/file-utils.sh"
source "./utils/package-utils.sh"
source "./utils/scan-folder-utils.sh"

# import project
source "./project/ieatta-theme.sh"
source "./project/ieatta-android.sh"
source "./project/ieatta-resources.sh"
source "./project/ieatta-lib-firebase.sh"
source "./project/ieatta-lib-realm.sh"
source "./project/ieatta-lib-ieatta.sh"
source "./project/ieatta-pages.sh"
source "./project/ieatta-project.sh"
source "./project/ieatta-storybook.sh"
source "./project/ieatta-iconset.sh"
source "./project/eslint.sh"
source "./project/project_plugins.sh"
# import project(appConfig)
source "./project/appConfig/webpack_common.sh"
source "./project/appConfig/app_config.sh"
source "./project/appConfig/app_constant.sh"
source "./project/appConfig/app_onyxkeys.sh"
source "./project/appConfig/app_routes.sh"
source "./project/appConfig/app_screens.sh"
source "./project/appConfig/person_details_types.sh"
source "./project/appConfig/app_languages.sh"
source "./project/appConfig/navigation/central_panel_screen.sh"
source "./project/appConfig/navigation/modal_stack_navigator.sh"
source "./project/appConfig/navigation/right_modal_navigator.sh"
source "./project/appConfig/navigation/navigation_file.sh"
source "./project/appConfig/navigation/navigation_types.sh"
source "./project/appConfig/navigation/navigation_utils.sh"
source "./project/appConfig/navigation/linking_config.sh"
source "./project/appConfig/navigation/auth_screen.sh"
source "./project/appConfig/navigation/link_to.sh"
source "./project/appConfig/navigation/public_screen.sh"
# import project(sources)
source "./project/sources/edit_app.sh"
source "./project/sources/edit_expensify.sh"
source "./project/sources/edit_button.sh"
source "./project/sources/edit_header.sh"
source "./project/sources/edit_modal.sh"
source "./project/sources/edit_avatar.sh"
source "./project/sources/edit_get_current_position.sh"
source "./project/sources/edit_header_with_back_button.sh"

function step1_copy_project() {
    info "Start copying ieatta project"

    PROJECT_ieatta_project
    PROJECT_ieatta_android
    PROJECT_ieatta_resources
    PROJECT_ieatta_theme
    PROJECT_ieatta_storybook
    PROJECT_ieatta_iconset
    EDIT_eslint_js

    EDIT_project_plugins
    EDIT_webpack_common
    EDIT_app_config
    EDIT_app_constant
    EDIT_app_languages
    EDIT_type_person_details
    EDIT_app_onyxkeys
    EDIT_app_routes
    EDIT_app_screens
    EDIT_app_modal_stack_navigator
    EDIT_app_right_modal_navigator
    EDIT_central_panel_screen
    EDIT_app_navigation_types
    EDIT_app_navigation_utils
    EDIT_app_navigation_file
    EDIT_app_linking_config
    EDIT_link_to
    EDIT_app_auth_screen
    EDIT_app_public_screen
}

function step2_copy_src() {
    info "Start copying src"

    PROJECT_ieatta_lib_firebase
    PROJECT_ieatta_lib_realm
    PROJECT_ieatta_lib_ieatta
    PROJECT_ieatta_lib_pages
}

function step3_edit_src() {
    info "Start Editing src"

    EDIT_app_js
    EDIT_expensify_js
    EDIT_button_js
    EDIT_header_js
    EDIT_header_with_back_button_js
    EDIT_modal_js
    EDIT_avatar_js
    EDIT_get_current_position
}

function test_project() {
    info "Start testing project"

    # PROJECT_ieatta_iconset

    # EDIT_webpack_common
    # EDIT_link_to
    PROJECT_ieatta_project
}

step1_copy_project
step2_copy_src
step3_edit_src

# test_project

function summary_check() {
    info "================ summary check ========================="

    CHECK_ieatta_iconset

    info "========================================="
}

summary_check
summary_end $step "38"
