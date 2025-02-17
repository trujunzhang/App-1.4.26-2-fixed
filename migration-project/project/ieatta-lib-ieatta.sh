#!/bin/bash

function lib_ieatta-dependencies() {
    run_npm_install

    third_dependencies=(
        'react-toastify'
        'react-native-toast-message'
    )
	install_dependencies_in_package_json "dependencies" "${third_dependencies[@]}"

    third_dev_dependencies=(

    )
	install_dependencies_in_package_json "devDependencies" "${third_dev_dependencies[@]}"
}

function PROJECT_ieatta_lib_ieatta() {
    step=$((step + 1))
    info "Start copying ieatta lib ieatta"

    lib_ieatta_folders=(
        "src/components/Ieatta"
        "src/libs/ieatta"
        "src/libs/actions/ieatta"
    )
	copy_folders_with_array  "${lib_ieatta_folders[@]}"


    lib_ieatta-dependencies
}
