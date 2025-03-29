#!/bin/bash

function ieatta_android_root() {
    root_build_gradle="android/build.gradle"

    keys_type_line='RNMapboxMapsImpl = "mapbox"'
    app_type_keys_lines=(
        ''
        '        // https://react-native-google-signin.github.io/docs/setting-up/android'
        '        googlePlayServicesAuthVersion = "20.7.0" // <--- use this version or newer'
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$root_build_gradle" \
         "react-native-google-signin.github.io" \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         

    keys_type_line='classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")'
    app_type_keys_lines=(
        "        // for google login"
        "        classpath 'com.google.gms:google-services:4.4.2' // <--- use this version or newer"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$root_build_gradle" \
         "for google login" \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         
}

function ieatta_android_app() {
    app_build_gradle="android/app/build.gradle"

    keys_type_line="apply from: project(':react-native-config').projectDir.getPath() + \"/dotenv.gradle\""
    app_type_keys_lines=(
        ""
        "// google gms services"
        "apply plugin: 'com.google.gms.google-services'"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$app_build_gradle" \
         "// google gms services" \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         

    function_line="def enableProguardInReleaseBuilds = true"
    function_export_lines=(
        "//def enableProguardInReleaseBuilds = true"
        "def enableProguardInReleaseBuilds = false"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$app_build_gradle" \
         "//def enableProguardInReleaseBuilds = true" \
         "$function_line" \
         "$function_export_strings"  

    # ========================================================
    # ======================= release ========================
    function_line="storePassword System.getenv('MYAPP_UPLOAD_STORE_PASSWORD')"
    function_export_lines=(
        "// storePassword System.getenv('MYAPP_UPLOAD_STORE_PASSWORD')"
        "            storePassword 'ieatta' // store password of ieatta"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$app_build_gradle" \
         "store password of ieatta" \
         "$function_line" \
         "$function_export_strings"  

    function_line="keyAlias MYAPP_UPLOAD_KEY_ALIAS"
    function_export_lines=(
        "// keyAlias MYAPP_UPLOAD_KEY_ALIAS"
        "            keyAlias 'keyieatta' // key alias of ieatta"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$app_build_gradle" \
         "key alias of ieatta" \
         "$function_line" \
         "$function_export_strings"  


    function_line="keyPassword System.getenv('MYAPP_UPLOAD_KEY_PASSWORD')"
    function_export_lines=(
        "// keyPassword System.getenv('MYAPP_UPLOAD_KEY_PASSWORD')"
        "            keyPassword 'kieatta' // key password of ieatta"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$app_build_gradle" \
         "key password of ieatta" \
         "$function_line" \
         "$function_export_strings"  
}

function PROJECT_ieatta_android() {
    step=$((step + 1))
    info "Start copying ieatta android"

    ieatta_android_root
    ieatta_android_app
}
