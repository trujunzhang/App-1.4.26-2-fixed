#!/bin/bash

function EDIT_project_plugins() {
    step=$((step + 1))
    info "Start editing project_plugins"

    check_and_install_dependencies "latest" "dependencies" '"color"' "color"
    copy_folder_from_source_to_dest "plugins"
}
