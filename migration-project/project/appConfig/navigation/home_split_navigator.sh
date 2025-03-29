#!/bin/bash

function EDIT_home_split_navigator() {
    step=$((step + 1))
    info "Start editing home split navigator"

    # check_replace_lines_in_file \
    #      "src/libs/Navigation/linkingConfig/config.ts" \
    #      "// path: ROUTES.ROOT" \
    #      "path: ROUTES.ROOT," \
    #      "// path: ROUTES.ROOT,"  \

    check_replace_lines_in_file \
         "src/libs/Navigation/AppNavigator/createRootStackNavigator/index.tsx" \
         "// ExtraContent" \
         "ExtraContent: TopLevelBottomTabBar," \
         "// ExtraContent: TopLevelBottomTabBar,"  \

}
