#!/bin/bash

function get_current_position_type_js() {
    keys_type_line="export type {GeolocationSuccessCallback, GeolocationErrorCallback, GeolocationOptions, GetCurrentPosition, GeolocationErrorCodeType};"
    app_type_keys_lines=(
        "type WatchCurrentPosition = (success: GeolocationSuccessCallback, error: GeolocationErrorCallback, options?: GeolocationOptions) => void;"
        "export type {GeolocationSuccessCallback, GeolocationErrorCallback, GeolocationOptions, GetCurrentPosition, WatchCurrentPosition, GeolocationErrorCodeType};"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file \
         "src/libs/getCurrentPosition/getCurrentPosition.types.ts" \
         "WatchCurrentPosition, GeolocationErrorCodeType" \
         "$keys_type_line" \
         "$app_type_keys_strings"  
}

function get_current_position_index_js() {
    keys_type_line="const getCurrentPosition: GetCurrentPosition = (success, error, options) => {"
    app_type_keys_lines=(
        "const watchCurrentPosition: WatchCurrentPosition = (success, error, options) => {"
        "    if (navigator === undefined \|\| !('geolocation' in navigator)) {"
        "        error({"
        "            code: GeolocationErrorCode.NOT_SUPPORTED,"
        "            message: 'Geolocation is not supported by this environment.',"
        "            PERMISSION_DENIED: GeolocationErrorCode.PERMISSION_DENIED,"
        "            POSITION_UNAVAILABLE: GeolocationErrorCode.POSITION_UNAVAILABLE,"
        "            TIMEOUT: GeolocationErrorCode.TIMEOUT,"
        "            NOT_SUPPORTED: GeolocationErrorCode.NOT_SUPPORTED,"
        "        });"
        "        return;"
        "    }"
        ""
        "    navigator.geolocation.getCurrentPosition(success, error, options);"
        "};"
        ""
        "$keys_type_line"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file \
         "src/libs/getCurrentPosition/index.ts" \
         "watchCurrentPosition: WatchCurrentPosition" \
         "$keys_type_line" \
         "$app_type_keys_strings"  
}

function get_current_position_index_android_js() {
    keys_type_line="const getCurrentPosition: GetCurrentPosition = (success, error, config) => {"
    app_type_keys_lines=(
        "const watchCurrentPosition: WatchCurrentPosition = (success, error, config) => {"
        "    // Prompt's the user to enable geolocation permission with yes/no options"
        "    // If the user selects yes, then this module would enable the native system location"
        "    // Otherwise if user selects no, or we have an issue displaying the prompt, it will return an error"
        "    promptForEnableLocationIfNeeded({"
        "        interval: 2000, // This updates location after every 2 seconds (required prop). We don't depend on this as we only use the location once."
        "    })"
        "        .then((permissionState) => {"
        "            if (permissionState === 'enabled') {"
        "                // If the user just enabled the permission by clicking 'Ok', sometimes we need to wait before"
        "                // the native system location/gps is setup, this is usually device specific, but a wait of a few"
        "                // milliseconds will be enough. Currently its using 500ms, it seemed enough for Android 12 test"
        "                // device. In rare cases when the device takes longer than 500ms, then Geolocation.getCurrentPosition"
        "                // will throw an error in which case the user can always call the action again to retry (but its rare)."
        "                setTimeout(() => {"
        "                    Geolocation.watchPosition(success, error, config);"
        "                }, 500);"
        "                return;"
        "            }"
        ""
        "            // if location permission is 'already-enabled', then directly get the updated location."
        "            Geolocation.watchPosition(success, error, config);"
        "        })"
        "        .catch(() => {"
        "            // An error here can be because of these reasons"
        "            // 1. User denied location permission"
        "            // 2. Failure to open the permission dialog"
        "            // 3. Device location settings can't be changed or the device doesn't support some location settings"
        "            // 4. Any internal error"
        "            // For all of these we will return a permission denied error."
        "            error({"
        "                code: GeolocationErrorCode.PERMISSION_DENIED,"
        "                message: 'Geolocation is not supported by this environment.',"
        "                PERMISSION_DENIED: GeolocationErrorCode.PERMISSION_DENIED,"
        "                POSITION_UNAVAILABLE: GeolocationErrorCode.POSITION_UNAVAILABLE,"
        "                TIMEOUT: GeolocationErrorCode.TIMEOUT,"
        "                NOT_SUPPORTED: GeolocationErrorCode.NOT_SUPPORTED,"
        "            });"
        "        });"
        "};"
        ""
        "$keys_type_line"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file \
         "src/libs/getCurrentPosition/index.android.ts" \
         "watchCurrentPosition: WatchCurrentPosition" \
         "$keys_type_line" \
         "$app_type_keys_strings"  
}

function get_current_position_index_ios_js() {
    keys_type_line="const getCurrentPosition: GetCurrentPosition = (success, error, config) => {"
    app_type_keys_lines=(
        "const watchCurrentPosition: WatchCurrentPosition = (success, error, config) => {"
        "    Geolocation.watchPosition(success, error, config);"
        "};"
        ""
        "$keys_type_line"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file \
         "src/libs/getCurrentPosition/index.ios.ts" \
         "watchCurrentPosition: WatchCurrentPosition" \
         "$keys_type_line" \
         "$app_type_keys_strings"  
}

function get_current_position_import_watch_current_position() {
    filePath=$1

    keys_type_line="import type {GetCurrentPosition} from './getCurrentPosition.types';"
    app_type_keys_lines=(
        "import type {GetCurrentPosition, WatchCurrentPosition} from './getCurrentPosition.types';"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file \
         "$filePath" \
         "GetCurrentPosition, WatchCurrentPosition"  \
         "$keys_type_line" \
         "$app_type_keys_strings"  
}

function get_current_position_export_watch_current_position() {
    filePath=$1

    keys_type_line="export default getCurrentPosition;"
    app_type_keys_lines=(
        "export {watchCurrentPosition};"
        "$keys_type_line"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file \
         "$filePath" \
         "export {watchCurrentPosition}"  \
         "$keys_type_line" \
         "$app_type_keys_strings"  
}

function EDIT_get_current_position() {
    step=$((step + 1))
    info "Start editing get current position"

    get_current_position_type_js

    get_current_position_index_js
    get_current_position_import_watch_current_position  "src/libs/getCurrentPosition/index.ts"
    get_current_position_export_watch_current_position  "src/libs/getCurrentPosition/index.ts"

    get_current_position_index_android_js
    get_current_position_import_watch_current_position  "src/libs/getCurrentPosition/index.android.ts"
    get_current_position_export_watch_current_position  "src/libs/getCurrentPosition/index.android.ts"

    get_current_position_index_ios_js
    get_current_position_import_watch_current_position  "src/libs/getCurrentPosition/index.ios.ts"
    get_current_position_export_watch_current_position  "src/libs/getCurrentPosition/index.ios.ts"
}
