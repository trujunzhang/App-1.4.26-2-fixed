#!/bin/bash

function lib_firebase-dependencies() {
    run_npm_install

    third_dependencies=(
        # firebase
        "timeago.js"
        "blueimp-md5"
        "ngeohash"
        "crypto-js"
        "react-firebase-hooks"

        # "react-firebase-hooks": "^5.1.1",
        # "react-firebase-pagination-hooks": "github:trujunzhang/react-firebase-pagination-hooks",
    )
	install_dependencies_with_array "latest" "dependencies" "${third_dependencies[@]}"
    check_and_add_dependencies_keys   \
            "github:trujunzhang/react-firebase-pagination-hooks"    \
            '["dependencies"]["react-firebase-pagination-hooks"]'       \
            "react-firebase-pagination-hooks"

    third_dev_dependencies=(
        "@types/blueimp-md5"
    )
	install_dependencies_with_array "latest" "devDependencies" "${third_dev_dependencies[@]}"
}

function lib_firebase-config() {
    config_js="src/libs/Firebase/firebaseWebConfig.ts"

    check_replace_lines_in_file \
         "$config_js" \
         'FIREBASE_WEB_CONFIGURE' \
         "const firebaseConfig = Config.FIREBASE_WEB_CONFIG;" \
         "const firebaseConfig = Config.FIREBASE_WEB_CONFIGURE;"  
}

function PROJECT_ieatta_lib_firebase() {
    step=$((step + 1))
    info "Start copying ieatta lib firebase"

    lib_firebase_folders=(
        # libs
        "src/libs/actions/Firebase"
        "src/libs/FirebaseIeatta"
        "src/components/Firebase"
        # types
        "src/types/firebase"
    )
	copy_folders_with_array  "${lib_firebase_folders[@]}"


    lib_firebase-dependencies
    lib_firebase-config
}
