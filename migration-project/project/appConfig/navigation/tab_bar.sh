#!/bin/bash

function EDIT_root_tab_bar() {
    step=$((step + 1))
    info "Start editing root navigator extra content"

    # check_replace_lines_in_file \
    #      "src/libs/Navigation/AppNavigator/createRootStackNavigator/index.tsx" \
    #      "// ExtraContent" \
    #      "ExtraContent: TopLevelBottomTabBar," \
    #      "// ExtraContent: TopLevelBottomTabBar,"  

    # check_replace_lines_in_file \
    #      "src/components/Navigation/RootNavigatorExtraContent.tsx" \
    #      "<TopLevelBottomTabBar state={state} /> no need on the ieatta" \
    #      "<TopLevelBottomTabBar state={state} />" \
    #      "{/* <TopLevelBottomTabBar state={state} /> no need on the ieatta */}"  

    check_replace_lines_in_file \
         "src/components/Navigation/RootNavigatorExtraContent.tsx" \
         "<TopLevelNavigationTabBar state={state} /> no need on the ieatta" \
         "<TopLevelNavigationTabBar state={state} />" \
         "{/* <TopLevelNavigationTabBar state={state} /> no need on the ieatta */}"  
}
