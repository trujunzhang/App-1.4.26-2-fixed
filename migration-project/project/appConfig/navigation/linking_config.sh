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
        

    right_modal_lines=(
        "        ...(LinkingCommonScreens as any), // Common Ieatta's Screens"
    )

    join_by right_modal_strings "\n" "${right_modal_lines[@]}"

    add_lines_in_file            \
        "$modal_js"              \
        "// Common Ieatta's Screens"   \
        "// Main Routes"  \
        "$right_modal_strings"  \
        


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

    check_add_line_in_header_in_file \
         "$modal_js" \
         "no-unsafe-assignment" \
         "/* eslint-disable @typescript-eslint/no-unsafe-assignment */"

    node "$SOURCE_PROJECT/migration-project/js/comment-key-in-dict.js" "$DEST_PROJECT/$modal_js" "NAVIGATORS.REPORTS_SPLIT_NAVIGATOR"
}


















