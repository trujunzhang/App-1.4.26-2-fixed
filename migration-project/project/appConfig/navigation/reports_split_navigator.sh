#!/bin/bash

function navigation_reports_split_navigator() {
    foldName=$1

    js_file="src/libs/$foldName/AppNavigator/Navigators/ReportsSplitNavigator.tsx"
    node "$SOURCE_PROJECT/migration-project/js/comment-file.js" "$DEST_PROJECT/$js_file" "withReturn|FreezeWrapper|singleLine"
}

function EDIT_reports_split_navigator() {
    step=$((step + 1))
    info "Start editing reports split navigator"

    navigation_reports_split_navigator "Navigation"
    navigation_reports_split_navigator "NavigationLast"
}
