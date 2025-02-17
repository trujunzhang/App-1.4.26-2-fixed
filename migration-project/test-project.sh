#!/bin/bash

source utils/import-utils.sh
source edit/import-edit.sh

function remove_dependencies_in_expensify() {
    info "Start removing dependencies in package.json"

    removed_dependencies=(
        "react-native-pdf"        "react-native-pdf"
        # "@onfido/react-native-sdk"        "@onfido/react-native-sdk"
        # "onfido-sdk-ui"        "onfido-sdk-ui"
    )

	removed_dependencies_in_package_json "${removed_dependencies[@]}"
        
    # npm install --prefix "$DEST_PROJECT"

    # EDIT_react-native-live-markdown
}

remove_dependencies_in_expensify

# EDIT_react-native-plaid-link-sdk
