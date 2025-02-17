#!/bin/bash

function EDIT_app_modal_stack_navigator() {
    step=$((step + 1))
    info "Start editing app modal stack navigator"

    modal_js="src/libs/Navigation/AppNavigator/ModalStackNavigators/index.tsx"

    function_line="function createModalStackNavigator"
    function_export_lines=(
        "// eslint-disable-next-line rulesdir/no-inline-named-export"
        "export function createModalStackNavigator"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$modal_js" \
         "export function createModalStackNavigator" \
         "$function_line" \
         "$function_export_strings"  \


}


















