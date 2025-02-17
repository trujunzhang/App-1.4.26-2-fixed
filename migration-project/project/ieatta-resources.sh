#!/bin/bash

function ieatta_resources_copy_radar() {
    radar_js="src/components/LottieAnimations/index.tsx"

    keys_type_line="const DotLottieAnimations = {"
    app_type_keys_lines=(
        "    SyncFirebase: {"
        "        file: require<LottieViewProps['source']>('@assets/animations/Sync_Firebase.lottie'),"
        "        w: 375,"
        "        h: 240,"
        "    },"
        "    Radar: {"
        "        file: require<LottieViewProps['source']>('@assets/animations/Radar.lottie'),"
        "        w: 375,"
        "        h: 240,"
        "    },"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$radar_js" \
         "Radar:" \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         "check"
}

function PROJECT_ieatta_resources() {
    step=$((step + 1))
    info "Start copying ieatta resources"

    copy_folder_from_source_to_dest "assets/ieatta"
    copy_folder_from_source_to_dest "assets/appIcons"

    copy_file_from_source_to_dest "assets/animations/Radar.lottie"
    copy_file_from_source_to_dest "assets/animations/Sync_Firebase.lottie"

    ieatta_resources_copy_radar
}
