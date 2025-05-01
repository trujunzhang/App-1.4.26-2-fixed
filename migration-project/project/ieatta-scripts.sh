#!/bin/bash

function PROJECT_ieatta_scripts() {
    step=$((step + 1))
    info "Start setting scripts files"

    node "$SOURCE_PROJECT/migration-project/js/comment-bash.js" "$DEST_PROJECT/scripts/is-hybrid-app.sh" "jq --version"

    node "$SOURCE_PROJECT/migration-project/js/comment-bash.js" "$DEST_PROJECT/scripts/pod-install.sh" "bundle --version"
    node "$SOURCE_PROJECT/migration-project/js/comment-bash.js" "$DEST_PROJECT/scripts/pod-install.sh" "jq --version"
    node "$SOURCE_PROJECT/migration-project/js/comment-bash.js" "$DEST_PROJECT/scripts/pod-install.sh" "yq --version"
}
