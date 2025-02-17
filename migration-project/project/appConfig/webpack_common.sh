#!/bin/bash

function webpack_index_html() {
    index_html_file="web/index.html"

    forms_line=" .animation {"
    form_keys_lines=(
        ".splash-logo > svg {"
        "            width: 552px;"
        "            height: 852px;"
        "        }"
        ""
        "        @media screen and (min-width: 480px) {"
        "            .splash-logo > svg {"
        "                /*width: 104px;*/"
        "                /*height: 104px;*/"
        "            }"
        "        }"
        ""
        "        @media screen and (max-width: 479px) {"
        "            .splash-logo > svg {"
        "                width: 352px;"
        "                height: 552px;"
        "            }"
        "        }"
        ""
        "        #splash {/* ieatta's splash */"
        "            position: absolute;"
        "            bottom: 0;"
        "            left: 0;"
        "            right: 0;"
        "            top: 0;"
        "            /*background-color: #03D47C;*/"
        "            background-color: #ffffff;"
        "            width: 100%;"
        "            height: 100%;"
        "            display: flex;"
        "            justify-content: center;"
        "            align-items: center;"
        "            transition-duration: 250ms;"
        "            transition-property: opacity;"
        "        }"
        ""
        "        ${forms_line}"
    )
    join_by form_keys_strings "\n" "${form_keys_lines[@]}"

    check_replace_lines_in_file  \
         "$index_html_file"        \
         "ieatta's splash"     \
         "$forms_line"       \
         "$form_keys_strings"  
}

function EDIT_webpack_common() {
    step=$((step + 1))
    info "Start editing webpack common"

    config_js="config/webpack/webpack.common.ts"

    forms_line="const includeModules = \["
    form_keys_lines=(
        "    'react-native-toast-message',"
    )
    join_by form_keys_strings "\n" "${form_keys_lines[@]}"

    add_lines_in_file \
         "$config_js" \
         "react-native-toast-message"  \
         "$forms_line" \
         "$form_keys_strings"  \
         "check"

    check_replace_lines_in_file  \
        "$config_js" \
        "assets/ieatta/splash/splash"  \
        "assets/images/new-expensify"  \
        "assets/ieatta/splash/splash"  

    webpack_index_html
}
