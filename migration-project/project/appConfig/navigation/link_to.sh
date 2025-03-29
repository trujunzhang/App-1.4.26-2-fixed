#!/bin/bash

function EDIT_link_to() {
    step=$((step + 1))
    info "Start editing link to"

    linkto_js="src/libs/Navigation/linkTo/index.ts"

    keys_type_line="if (topmostBottomTabRoute \&\&"
    app_type_keys_lines=(
        "            if (matchingBottomTabRoute.name !== undefined) {"
        "$keys_type_line"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file                 \
         "$linkto_js" \
         "if (matchingBottomTabRoute.name !== undefined) {"  \
         "$keys_type_line" \
         "$app_type_keys_strings"  \

    keys_type_line="        if (type === CONST.NAVIGATION.TYPE.UP) {"
    app_type_keys_lines=(
        "            } // check if the matchingBottomTabRoute.name is undefined"
        ""
        "$keys_type_line"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file                 \
         "$linkto_js" \
         "check if the matchingBottomTabRoute.name is undefined"  \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         
}
