#!/bin/bash

function EDIT_app_screens() {
    step=$((step + 1))
    info "Start editing app screens"

    screens_js="src/SCREENS.ts"

    add_lines_in_file            \
        "$screens_js"             \
        "import {appSCREENS}"  \
        "import type DeepValueOf from './types/utils/DeepValueOf';" \
        "import {appSCREENS} from './appConfig/appScreens';"  \
        "check"


    add_lines_in_file             \
        "$screens_js"             \
        "appSCREENS,"             \
        "const SCREENS = {"       \
        "    ...appSCREENS,"      \
        "check"


    add_lines_in_file             \
        "$screens_js"             \
        "'EditIeatta',"           \
        "    RIGHT_MODAL: {"      \
        "        EDIT_IEATTA: 'EditIeatta'," \
        "check"


}
