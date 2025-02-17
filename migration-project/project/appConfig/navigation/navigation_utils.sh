#!/bin/bash

function EDIT_app_navigation_utils() {
    step=$((step + 1))
    info "Start editing app navigation utils"

    utils_js="src/libs/NavigationUtils.ts"

    center_params_line="const CENTRAL_PANE_SCREEN_NAMES = new Set(\["
    center_add_lines=(
        "    SCREENS.RESTAURANT,"
        "    SCREENS.EVENT,"
        "    SCREENS.RECIPE,"
    )
    join_by center_add_strings "\n" "${center_add_lines[@]}"

    add_lines_in_file \
         "$utils_js" \
         "SCREENS.RESTAURANT,"  \
         "$center_params_line" \
         "$center_add_strings"  \
         "check"


}
