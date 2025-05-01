#!/bin/bash

function lib_page-dependencies() {
    run_npm_install

    third_dependencies=(
        "@sentry/react-native"
        "@react-oauth/google"
        "react-datetime"
        "moment"
        "@likashefqet/react-native-image-zoom"
    )
	install_dependencies_with_array "latest" "dependencies" "${third_dependencies[@]}"

    date_picker_version="5.0.10"
    # date_picker_version="latest"
    # version:
       # v5.0.11: ios app can not be compiled
    check_and_install_dependencies "$date_picker_version" "dependencies" "react-native-date-picker" "react-native-date-picker"

    third_dev_dependencies=(

    )
	install_dependencies_with_array "latest" "devDependencies" "${third_dev_dependencies[@]}"
}

function PROJECT_ieatta_lib_pages() {
    step=$((step + 1))
    info "Start copying ieatta lib pages"

    lib_page_folders=(
        "src/pages"
        # components
        "src/components/SignInButtons/GoogleSignButton"
        "src/components/AppHeader"
        "src/components/Debug"
        "src/libs/getRoutePathForDebug"
        "src/libs/getWatchPosition"
        "src/components/ImagePlaceholder"
    )
	copy_folders_with_array  "${lib_page_folders[@]}"

    copy_file_from_source_to_dest "src/components/Icon/Ieattaicons.ts"
    copy_file_from_source_to_dest "src/components/Icon/IeattaStars.ts"
    copy_file_from_source_to_dest "src/components/Icon/IconMenuSvg.tsx"

    lib_page-dependencies
}
