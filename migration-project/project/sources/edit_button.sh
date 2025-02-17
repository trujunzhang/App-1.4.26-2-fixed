#!/bin/bash

function EDIT_button_js() {
    step=$((step + 1))
    info "Start editing button"

    button_js="src/components/Button/index.tsx"

    add_lines_in_file            \
        "$button_js"             \
        "import variables" \
        "import CONST from '@src/CONST';"   \
        "import variables from '@styles/variables';" \
        "check"

    define_line="iconRightStyles?: StyleProp<ViewStyle>;"
    define_rules_lines=(
        ""
        "    /** The width of the icon. */"
        "    iconWidth?: number;"
        ""
        "    /** The height of the icon. */"
        "    iconHeight?: number;"
    )
    join_by define_rules_string "\n" "${define_rules_lines[@]}"

    add_lines_in_file \
         "$button_js" \
         "iconWidth?: number;" \
         "$define_line" \
         "$define_rules_string"  \
         "check"


    params_line="iconRightStyles = \[\]\,"
    params_rules_lines=(
        ""
        "        iconWidth = variables.iconSizeSmall,"
        "        iconHeight = variables.iconSizeSmall,"
        ""
    )
    join_by params_rules_string "\n" "${params_rules_lines[@]}"

    add_lines_in_file \
         "$button_js" \
         "iconWidth = variables" \
         "$params_line" \
         "$params_rules_string"  \
         "check"


    icon_line="large={large}"
    icon_rules_lines=(
        "                                    width={iconWidth}"
        "                                    height={iconHeight}"
    )
    join_by icon_rules_string "\n" "${icon_rules_lines[@]}"

    add_lines_in_file \
         "$button_js" \
         "width={iconWidth}" \
         "$icon_line" \
         "$icon_rules_string"  \
         "check"

}
