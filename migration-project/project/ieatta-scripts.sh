#!/bin/bash

function PROJECT_ieatta_scripts() {
    step=$((step + 1))
    info "Start setting scripts files"

    copy_file_from_source_to_dest "scripts/create-appicon.sh"
    copy_file_from_source_to_dest "scripts/splash-generate.sh"
    copy_file_from_source_to_dest "scripts/jenkins-stage.sh"

    node "$SOURCE_PROJECT/migration-project/js/comment-bash.js" "$DEST_PROJECT/scripts/is-hybrid-app.sh" "jq --version"

    node "$SOURCE_PROJECT/migration-project/js/comment-bash.js" "$DEST_PROJECT/scripts/pod-install.sh" "bundle --version"
    node "$SOURCE_PROJECT/migration-project/js/comment-bash.js" "$DEST_PROJECT/scripts/pod-install.sh" "jq --version"
    node "$SOURCE_PROJECT/migration-project/js/comment-bash.js" "$DEST_PROJECT/scripts/pod-install.sh" "yq --version"

    check_replace_lines_in_file \
         "scripts/build-desktop.sh" \
         'electronBuilder.config.js "$@"'  \
         'npx electron-builder --config config/electronBuilder.config.js --publish always "$@"' \
         'npx electron-builder --config config/electronBuilder.config.js "$@"'  
}
