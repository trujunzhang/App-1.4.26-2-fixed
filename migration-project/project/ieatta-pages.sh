#!/bin/bash

function lib_page-dependencies() {
    run_npm_install

    third_dependencies=(
        "@react-oauth/google"
        "react-native-date-picker"
        "react-datetime"
        "moment"
        "@likashefqet/react-native-image-zoom"
    )
	install_dependencies_in_package_json "dependencies" "${third_dependencies[@]}"

    third_dev_dependencies=(

    )
	install_dependencies_in_package_json "devDependencies" "${third_dev_dependencies[@]}"
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
        "src/components/ImagePlaceholder"
    )
	copy_folders_with_array  "${lib_page_folders[@]}"

    copy_file_from_source_to_dest "src/components/Icon/Ieattaicons.ts"
    copy_file_from_source_to_dest "src/components/Icon/IeattaStars.ts"
    copy_file_from_source_to_dest "src/components/Icon/IconMenuSvg.tsx"
    copy_file_from_source_to_dest "src/components/withCurrentRestaurantID.tsx"

    lib_page-dependencies
}
