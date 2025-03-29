#!/bin/bash

function ieatta_theme_edit_variables_js() {
    import_header_lines=(
        "import ieattaVariables from './ieatta/ieatta-variables';"
    )
    join_by import_header_strings "\n" "${import_header_lines[@]}"
    add_lines_in_file \
        'src/styles/variables.ts' \
        "import ieattaVariables" \
        "import {PixelRatio} from 'react-native';" \
        "$import_header_strings" \
        


    import_code_lines=(
        ""
        "    ...ieattaVariables,"
    )
    join_by import_code_strings "\n" "${import_code_lines[@]}"
    add_lines_in_file \
        'src/styles/variables.ts' \
        "...ieattaVariables," \
        "w191: 191," \
        "$import_code_strings" \
        
}

function ieatta_theme_edit_index_js() {
    import_header_lines=(
        "import IEATTAStyles from './ieatta';"
        "import {tailwindFontSize, tailwindFontWeight, tailwindShadow} from './tailwindcss';"
    )
    join_by import_header_strings "\n" "${import_header_lines[@]}"
    add_lines_in_file \
        'src/styles/index.ts' \
        "import IEATTAStyles from './ieatta';" \
        "import CONST from '@src/CONST';" \
        "$import_header_strings" \
        

    import_code_lines=(
        "        // Tailwind style shadows"
        "        ...tailwindShadow,"
        "        ...tailwindFontSize,"
        "        ...tailwindFontWeight,"
        "        ...IEATTAStyles,"
        ""
        "        backgroundComponentBG: {"
        "            backgroundColor: theme.componentBG,"
        "        },"
        ""
        "        backgroundHoverComponentBG: {"
        "            backgroundColor: theme.hoverComponentBG,"
        "        },"
        ""
        "        backgroundBorder: {"
        "            backgroundColor: theme.border,"
        "        },"
        ""
        "        colorText: {"
        "            color: theme.text,"
        "        },"
        ""
        "        colorTextSupporting: {"
        "            color: theme.textSupporting,"
        "        },"
        ""
        "        borderColorBorder: {"
        "            borderColor: theme.border,"
        "        },"
        ""
    )
    join_by import_code_strings "\n" "${import_code_lines[@]}"
    add_lines_in_file \
        'src/styles/index.ts' \
        "// Tailwind style shadows"  \
        "...textDecorationLine," \
        "$import_code_strings" \
        
}

function ieatta_theme_text_underline() {
    underline_type_js="src/styles/utils/textUnderline/types.ts"
    underline_native_js="src/styles/utils/textUnderline/index.native.ts"
    underline_js="src/styles/utils/textUnderline/index.ts"

    add_lines_in_file \
        "$underline_type_js"   \
        "textUnderline: Pick"  \
        "textDecorationSkipInkNone: Pick<TextStyle, 'textDecorationSkipInk'>;"  \
        "    textUnderline: Pick<TextStyle, 'textDecorationLine'>;"   \
        

    add_lines_in_file \
        "$underline_native_js"   \
        "    textUnderline:"   \
        "textDecorationSkipInkNone: {}," \
        "    textUnderline: {},"   \
        

    add_lines_in_file \
        "$underline_js"   \
        "{textDecorationLine: 'underline'}" \
        "const textUnderline: TextUnderlineStyles = {"  \
        "    textUnderline: {textDecorationLine: 'underline'}," \
        

}

function ieatta_theme_colors() {
    keys_type_line="    // Additional keys"
    app_type_keys_lines=(
        ""
        "    divideBG: Color;"
        "    textInverse: Color;"
        ""
        "$keys_type_line"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file \
         "src/styles/theme/types.ts" \
         "divideBG: Color" \
         "$keys_type_line" \
         "$app_type_keys_strings"  

    keys_type_line="// Additional keys"
    app_type_keys_lines=(
        "    divideBG: '#DFE4EA',"
        "    textInverse: colors.black,"
        ""
        "$keys_type_line"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file \
         "src/styles/theme/themes/light.ts" \
         "textInverse" \
         "$keys_type_line" \
         "$app_type_keys_strings"  

    keys_type_line="// Additional keys"
    app_type_keys_lines=(
        "    divideBG: TailwindColors.gray700,"
        "    textInverse: colors.white,"
        ""
        "$keys_type_line"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file \
         "src/styles/theme/themes/dark.ts" \
         "textInverse"  \
         "$keys_type_line" \
         "$app_type_keys_strings"  

    add_lines_in_file \
         "src/styles/theme/themes/dark.ts" \
         "import TailwindColors" \
         "import colors from '@styles/theme/colors';"  \
         "import TailwindColors from '@styles/tailwindcss/colors';" \
         
}

function PROJECT_ieatta_theme() {
    step=$((step + 1))
    info "Start copying ieatta theme"

    theme_folders=(
        "src/styles/ieatta"
        "src/styles/tailwindcss"
    )
	copy_folders_with_array  "${theme_folders[@]}"

    ieatta_theme_edit_index_js
    ieatta_theme_edit_variables_js
    ieatta_theme_text_underline
    ieatta_theme_colors
}
