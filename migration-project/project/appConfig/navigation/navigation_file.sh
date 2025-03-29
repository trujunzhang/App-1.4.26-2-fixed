#!/bin/bash

function EDIT_app_navigation_file() {
    step=$((step + 1))
    info "Start editing app navigation file"

    navigation_js="src/libs/Navigation/Navigation.ts"

    center_params_line="export default {"
    center_add_lines=(
        ""
        "function openSideBarDrawer() {"
        "    navigationRef.current?.dispatch(DrawerActions.openDrawer());"
        "}"
        ""
        "function closeSideBarDrawer() {"
        "    navigationRef.current?.dispatch(DrawerActions.closeDrawer());"
        "}"
        ""
        "export default {"
        "    openSideBarDrawer,"
        "    closeSideBarDrawer,"
    )
    join_by center_add_strings "\n" "${center_add_lines[@]}"

    check_replace_lines_in_file \
         "$navigation_js" \
         "openSideBarDrawer," \
         "$center_params_line" \
         "$center_add_strings"  

    center_params_line="import {CommonActions, getPathFromState, StackActions} from '@react-navigation/native';" \
    center_add_lines=(
         "import {CommonActions, DrawerActions, getPathFromState, StackActions} from '@react-navigation/native';"  
    )
    join_by center_add_strings "\n" "${center_add_lines[@]}"

    check_replace_lines_in_file \
         "$navigation_js" \
         "DrawerActions, getPathFromState"  \
         "$center_params_line" \
         "$center_add_strings"  
}
