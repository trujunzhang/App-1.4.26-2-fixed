#!/bin/bash

function app_navigation_fullscreen_to_tabs() {
    foldName=$1
    modal_js="src/libs/$foldName/linkingConfig/RELATIONS/FULLSCREEN_TO_TAB.ts"
}

function app_navigation_types_import() {
    foldName=$1
    modal_js="src/libs/${foldName}/types.ts"

    add_lines_in_file            \
        "$modal_js"              \
        "import type {IeattaFullPaneScreensParamList"  \
        "import type CONST from '@src/CONST';"   \
        "import type {IeattaFullPaneScreensParamList, ReportsSplitNavigatorParamList, RightIeattaNavigatorParamList} from '@src/appConfig/navigation/types';" \
        

    check_replace_lines_in_file                 \
        "$modal_js"                             \
        "IeattaFullPaneScreensParamList \&"   \
        "type AuthScreensParamList = "  \
        "type AuthScreensParamList = IeattaFullPaneScreensParamList \& "  

    add_lines_in_file            \
        "$modal_js"              \
        "NavigatorScreenParams<RightIeattaNavigatorParamList>"  \
        "type RightModalNavigatorParamList = {"   \
        "    [SCREENS\.RIGHT_MODAL\.EDIT_IEATTA]: NavigatorScreenParams<RightIeattaNavigatorParamList>;" \
        

    add_lines_in_file            \
        "$modal_js"              \
        "    RightIeattaNavigatorParamList,"  \
        "    DebugParamList,"                 \
        "    RightIeattaNavigatorParamList,"  \
        

    check_replace_lines_in_file                 \
        "$modal_js"                             \
        "ReportsSplitNavigatorParamListxxx"   \
        "type ReportsSplitNavigatorParamList = {"  \
        "type ReportsSplitNavigatorParamListxxx = {"  
}

function EDIT_app_navigation_types() {
    step=$((step + 1))
    info "Start editing app navigation types"

    app_navigation_types_import "Navigation"
    app_navigation_types_import "NavigationLast"

    app_navigation_fullscreen_to_tabs "Navigation"
    app_navigation_fullscreen_to_tabs "NavigationLast"
}


















