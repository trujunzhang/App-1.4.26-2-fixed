#!/bin/bash

function EDIT_react-native-firebase-dependencies() {
    run_npm_install

    # firebaseVersion="21.11.0"
    firebaseVersion="latest"

    third_dependencies=(
        # firebase
        "@react-native-firebase/app" 
        "@react-native-firebase/auth" 
        "@react-native-firebase/firestore" 
        "@react-native-firebase/perf" 
        "@react-native-firebase/analytics" 
        "@react-native-firebase/crashlytics"
    )
	install_dependencies_with_array "$firebaseVersion" "dependencies" "${third_dependencies[@]}"
}

function EDIT_react-native-firebase() {
   info "Start editing react-native-firebase"

    removed_dependencies=(
        # firebase
        '"@react-native-firebase/analytics": "^12'          "@react-native-firebase/analytics"
        '"@react-native-firebase/app": "^12'                "@react-native-firebase/app"
        '"@react-native-firebase/crashlytics": "^12'        "@react-native-firebase/crashlytics"
        '"@react-native-firebase/perf": "^12'               "@react-native-firebase/perf"

        "@firebase/app"                "@firebase/app"
        "@firebase/performance"        "@firebase/performance"
    )
	removed_dependencies_in_package_json "${removed_dependencies[@]}"
        
    # all firebase libraries
    remove_patches_by_name "@react-native-firebase" 
}


function CHECK_react-native-firebase-dependencies() {
    checkString="@react-native-firebase/crashlytics"
    if  grep "$checkString" $json_file; then
       success "  $checkString already exists in $json_file"
    else
        error "  $checkString not exists in $json_file"
    fi
}
