#!/bin/bash

function EDIT_header_with_back_button_js() {
    step=$((step + 1))
    info "Start editing header with back button"

    header_with_back_button_js="src/components/HeaderWithBackButton/index.tsx"
    header_with_back_button_types_js="src/components/HeaderWithBackButton/types.ts"

    keys_type_line="titleColor?: string;"
    app_type_keys_lines=(
        ""
        "    /** Title anchor position */"
        "    titleAnchor?: 'left' \| 'middle';"
        ""
        "    /** Custom styles for the header */"
        "    headerStyles?: StyleProp<ViewStyle>;"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$header_with_back_button_types_js" \
         "titleAnchor?" \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         "check"


    params_line="function HeaderWithBackButton({" 
    params_keys_lines=(
         "    titleAnchor = 'middle'," 
         "    headerStyles = [],"
    )
    join_by params_keys_strings "\n" "${params_keys_lines[@]}"

    add_lines_in_file \
         "$header_with_back_button_js" \
         "titleAnchor = 'middle'" \
         "$params_line" \
         "$params_keys_strings"  \
         "check"

    add_lines_in_file \
         "$header_with_back_button_js" \
         "headerStyles,"      \
         "styles.headerBar,"  \
         "                headerStyles,"      \
         "check"

    add_lines_in_file \
         "$header_with_back_button_js" \
         "titleAnchor={titleAnchor}"  \
         " <Header" \
         "                titleAnchor={titleAnchor}"  \
         "check"

}
