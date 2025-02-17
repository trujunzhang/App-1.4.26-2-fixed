#!/bin/bash

function PROJECT_ieatta_files() {
    copy_file_from_source_to_dest "vercel.json"
    copy_file_from_source_to_dest "netlify.toml"
    copy_file_from_source_to_dest "maintain_dependencies.sh"
    copy_file_from_source_to_dest "maintain_update.sh"
    copy_file_from_source_to_dest ".developing"
    copy_file_from_source_to_dest "issues.md"
    copy_file_from_source_to_dest "Jenkinsfile"
}

function PROJECT_ieatta_project() {
    step=$((step + 1))
    info "Start copying ieatta project files and folders"

    # copy_folder_from_source_to_dest "assets/ieatta"

    PROJECT_ieatta_files
}
