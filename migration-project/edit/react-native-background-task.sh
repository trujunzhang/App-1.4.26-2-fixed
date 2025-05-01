#!/bin/bash

function EDIT_react_native_background_task() {
   info "Start editing react-native-background-task"

    removed_dependencies=(
        "@expensify/react-native-background-task"        "@expensify/react-native-background-task"
    )
	removed_dependencies_in_package_json "${removed_dependencies[@]}"

   rm -rf "$DEST_PROJECT/modules/background-task" 
   rm -rf "$DEST_PROJECT/src/setup/backgroundTask"

   app_delegate_file="ios/NewIeatta/AppDelegate.mm"
   import_background="#import <expensify-react-native-background-task/RNBackgroundTaskManager.h>"
   setup_background="\[RNBackgroundTaskManager setup\];"
   check_replace_lines_in_file  "$app_delegate_file" "// #import" "$import_background" "// $import_background"
   check_replace_lines_in_file  "$app_delegate_file" "//\[RNBackgroundTaskManager" "$setup_background" "//$setup_background"

   app_background="import './setup/backgroundTask';"
   check_replace_lines_in_file   "src/App.tsx" "// import './setup/backgroundTask" "$app_background" "// $app_background"

   check_replace_lines_in_file \
         "ios/AppDelegate.swift" \
         "// RNBackgroundTaskManager" \
         "RNBackgroundTaskManager\.setup()" \
         "// RNBackgroundTaskManager\.setup()"  

   react_native_background_task_bridging_header 'ios/NewIeatta-Bridging-Header.h'
   react_native_background_task_bridging_header 'ios/NewExpensify-Bridging-Header.h'
}

function react_native_background_task_bridging_header() {
    fileName=$1

   check_replace_lines_in_file \
         "$fileName" \
         "// #import <BackgroundTasks" \
         "#import <BackgroundTasks/BackgroundTasks\.h>" \
         "// #import <BackgroundTasks/BackgroundTasks\.h>"  

   check_replace_lines_in_file \
         "$fileName" \
         "// #import <expensify-react-native-background-task/RNBackgroundTaskManager" \
         "#import <expensify-react-native-background-task/RNBackgroundTaskManager.h>" \
         "// #import <expensify-react-native-background-task/RNBackgroundTaskManager.h>"  

}
