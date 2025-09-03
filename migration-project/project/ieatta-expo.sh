#!/bin/bash

function PROJECT_ieatta_expo() {
    step=$((step + 1))
    info "Start to setup expo config"

    function_line="    'expo-file-system',"
    function_export_lines=(
        "'expo-av',"
        "$function_line"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "config/webpack/webpack.common.ts" \
         "expo-file-system" \
         "'expo-av',"  \
         "$function_export_strings"  
}

