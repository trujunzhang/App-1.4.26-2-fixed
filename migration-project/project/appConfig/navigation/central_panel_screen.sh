#!/bin/bash

function EDIT_central_panel_screen() {
    step=$((step + 1))
    info "Start editing central panel screen"

    central_js="src/libs/Navigation/AppNavigator/CENTRAL_PANE_SCREENS.tsx"

    add_lines_in_file     \
        "$central_js"  \
        "{IEATTA_CENTRAL_PANE_SCREENS}"   \
        "import SCREENS from '@src/SCREENS';"  \
        "import {IEATTA_CENTRAL_PANE_SCREENS} from '@src/appConfig/navigation/myNavigators';"  \
        "check"

    add_lines_in_file     \
        "$central_js"  \
        "IEATTA_CENTRAL_PANE_SCREENS,"  \
        "const CENTRAL_PANE_SCREENS = {"  \
        "    ...IEATTA_CENTRAL_PANE_SCREENS,"  \
        "check"
}
