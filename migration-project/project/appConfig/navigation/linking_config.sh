#!/bin/bash

function EDIT_app_linking_config() {
    step=$((step + 1))
    info "Start editing app linking config"

    modal_js="src/libs/Navigation/linkingConfig/config.ts"

    add_lines_in_file            \
        "$modal_js"              \
        "import {LinkingCommonScreens, LinkingRightModal}"  \
        "import ROUTES from '@src/ROUTES';"    \
        "import {LinkingCommonScreens, LinkingRightModal} from '@src/appConfig/navigation/myLinkingConfig';" \
        "check"

    add_lines_in_file            \
        "$modal_js"              \
        "// Common Ieatta's Screens"   \
        "// Main Routes"  \
        "        ...LinkingCommonScreens, // Common Ieatta's Screens"   \
        "check"


    right_settings_line="\[SCREENS\.RIGHT_MODAL\.SETTINGS\]\: {"
    right_modal_lines=(
        "                ...LinkingRightModal, // Ieatta Edit pages"
        "                [SCREENS\.RIGHT_MODAL\.SETTINGS]: {"
    )
    join_by right_modal_strings "\n" "${right_modal_lines[@]}"

    check_replace_lines_in_file \
         "$modal_js" \
         "// Ieatta Edit pages" \
         "$right_settings_line" \
         "$right_modal_strings"  


}


















