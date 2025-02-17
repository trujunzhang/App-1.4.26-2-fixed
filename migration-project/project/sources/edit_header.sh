#!/bin/bash

function EDIT_header_js() {
    step=$((step + 1))
    info "Start editing header js"

    header_js="src/components/Header.tsx"

    keys_type_line="type HeaderProps = {"
    app_type_keys_lines=(
        "    /** Anchor of the title (left/middle) */"
        "    titleAnchor?: 'left' \| 'middle';"
        ""
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$header_js" \
         "titleAnchor?" \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         "check"

    check_replace_lines_in_file \
         "$header_js" \
         "titleAnchor = 'middle'" \
         "Header({title = ''" \
         "Header({titleAnchor = 'middle', title = ''" 


    inner_type_line="    return ("
    inner_define_keys_lines=(
        ""
        "    const innerStyles = useMemo(() => {"
        "        return titleAnchor === 'left' ? [styles.justifyContentStart, styles.alignItemsStart] : [styles.justifyContentCenter, styles.alignItemsCenter];"
        "    }, [titleAnchor, styles.justifyContentStart, styles.alignItemsStart, styles.justifyContentCenter, styles.alignItemsCenter]);"
        ""
        "$inner_type_line"
    )
    join_by inner_define_keys_strings "\n" "${inner_define_keys_lines[@]}"

    check_replace_lines_in_file  \
         "$header_js" \
         "const innerStyles" \
         "$inner_type_line" \
         "$inner_define_keys_strings "  \

    check_replace_lines_in_file \
         "$header_js" \
         "innerStyles\]" \
         "View style={\[styles\.mw100, style\]}" \
         "View style={\[styles\.flex1, styles\.mw100, innerStyles\]}" 

}
