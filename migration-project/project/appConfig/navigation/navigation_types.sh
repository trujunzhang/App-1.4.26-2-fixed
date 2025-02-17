
#!/bin/bash

function EDIT_app_navigation_types() {
    step=$((step + 1))
    info "Start editing app navigation types"


    app_navigation_types_import "Navigation"
    app_navigation_types_import "NavigationLast"
}

function app_navigation_types_import() {
    foldName=$1
    modal_js="src/libs/${foldName}/types.ts"

    add_lines_in_file            \
        "$modal_js"              \
        "import type {IeattaCentralPaneScreensParamList"  \
        "import type CONST from '@src/CONST';"   \
        "import type {IeattaCentralPaneScreensParamList, IeattaFullPaneScreensParamList, RightIeattaNavigatorParamList} from '@src/appConfig/navigation/types';"  \
        "check"

    check_replace_lines_in_file                 \
        "$modal_js"                             \
        "IeattaCentralPaneScreensParamList \&"   \
        "type CentralPaneScreensParamList = {"  \
        "type CentralPaneScreensParamList = IeattaCentralPaneScreensParamList \& {"  

    auth_params_line="type AuthScreensParamList = CentralPaneScreensParamList \&"
    auth_add_lines=(
        "type AuthScreensParamList = IeattaFullPaneScreensParamList \&"
        "    CentralPaneScreensParamList \&"
    )
    join_by auth_add_strings "\n" "${auth_add_lines[@]}"

    check_replace_lines_in_file \
         "$modal_js" \
         "IeattaFullPaneScreensParamList &" \
         "$auth_params_line" \
         "$auth_add_strings"  

    add_lines_in_file            \
        "$modal_js"              \
        "NavigatorScreenParams<RightIeattaNavigatorParamList>"  \
        "type RightModalNavigatorParamList = {"   \
        "    [SCREENS\.RIGHT_MODAL\.EDIT_IEATTA]: NavigatorScreenParams<RightIeattaNavigatorParamList>;" \
        "check"

    add_lines_in_file            \
        "$modal_js"              \
        "    RightIeattaNavigatorParamList,"  \
        "    DebugParamList,"                 \
        "    RightIeattaNavigatorParamList,"  \
        "check"
}


















