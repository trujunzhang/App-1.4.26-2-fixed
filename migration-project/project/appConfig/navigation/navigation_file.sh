#!/bin/bash

function EDIT_app_navigation_file() {
    step=$((step + 1))
    info "Start editing app navigation file"

    copy_file_from_source_to_dest "src/libs/Navigation/getTopmostRestaurantId.ts"

    navigation_js="src/libs/Navigation/Navigation.ts"

    center_params_line="export default {"
    center_add_lines=(
        ""
        "// Re-exporting the getTopmostRestaurantId here to fill in default value for state. The getTopmostRestaurantId isn't defined in this file to avoid cyclic dependencies."
        "const getTopmostRestaurantId = (state = navigationRef.getState()) => originalGetTopmostRestaurantId(state);"
        ""
        "function openSideBarDrawer() {"
        "    navigationRef.current?.dispatch(DrawerActions.openDrawer());"
        "}"
        ""
        "export default {"
        "    openSideBarDrawer,"
        "    getTopmostRestaurantId,"
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
         "import originalGetTopmostRestaurantId from './getTopmostRestaurantId';"
    )
    join_by center_add_strings "\n" "${center_add_lines[@]}"

    check_replace_lines_in_file \
         "$navigation_js" \
         "DrawerActions, getPathFromState"  \
         "$center_params_line" \
         "$center_add_strings"  
}
