
#!/bin/bash

function lib_realm-dependencies() {
    run_npm_install

    third_dependencies=(
        "@realm/react"
    )
	install_dependencies_in_package_json "dependencies" "${third_dependencies[@]}"
    check_and_install_dependencies "dependencies" '"realm"' "realm@community"

    third_dev_dependencies=(

    )
	install_dependencies_in_package_json "devDependencies" "${third_dev_dependencies[@]}"
}

function PROJECT_ieatta_lib_realm() {
    step=$((step + 1))
    info "Start copying ieatta lib realm"

    lib_realm_folders=(
        "src/libs/Realm"
        "src/components/Realm"
    )
	copy_folders_with_array  "${lib_realm_folders[@]}"


    lib_realm-dependencies
}
