#!/bin/bash

function EDIT_app_right_modal_navigator() {
    step=$((step + 1))
    info "Start editing app right modal navigator"

    modal_js="src/libs/Navigation/AppNavigator/Navigators/RightModalNavigator.tsx"

    add_lines_in_file            \
        "$modal_js"              \
        "import {RightIeattaStackNavigator}"  \
        "import NAVIGATORS from '@src/NAVIGATORS';"  \
        "import {RightIeattaStackNavigator} from '@src/appConfig/navigation/myNavigators';" \
        


    component_line="component={ModalStackNavigators.SettingsModalStackNavigator}"
    component_add_lines=(
        "                        component={ModalStackNavigators.SettingsModalStackNavigator}"
        "                    />"
        "                    <Stack.Screen"
        "                        name={SCREENS.RIGHT_MODAL.EDIT_IEATTA}"
        "                        component={RightIeattaStackNavigator}"
    )
    join_by component_add_strings "\n" "${component_add_lines[@]}"

    check_replace_lines_in_file \
         "$modal_js" \
         "name={SCREENS.RIGHT_MODAL.EDIT_IEATTA}" \
         "$component_line" \
         "$component_add_strings"  \


}


















