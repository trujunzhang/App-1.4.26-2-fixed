#!/bin/bash

function PROJECT_ieatta_desktop() {
    step=$((step + 1))
    info "Start setting desktop"

    rm -rf "$DEST_PROJECT/src/components/DeeplinkWrapper"

    check_replace_lines_in_file \
         "src/Expensify.tsx" \
         "components/Ieatta/components/DeeplinkWrapper" \
         "import DeeplinkWrapper from './components/DeeplinkWrapper';" \
         "import DeeplinkWrapper from './components/Ieatta/components/DeeplinkWrapper';"  

    check_replace_lines_in_file \
         "src/expPages/signin/DesktopRedirectPage.tsx" \
         "components/Ieatta/components/DeeplinkWrapper/DeeplinkRedirectLoadingIndicator" \
         "import DeeplinkRedirectLoadingIndicator from '@components/DeeplinkWrapper/DeeplinkRedirectLoadingIndicator';" \
         "import DeeplinkRedirectLoadingIndicator from '@components/Ieatta/components/DeeplinkWrapper/DeeplinkRedirectLoadingIndicator';"  

    keys_type_line="browserWindow = new BrowserWindow({"
    app_type_keys_lines=(
        "                // Register the app protocol on the production app"
        "                app.setAsDefaultProtocolClient(appProtocol);"
        ""
        "$keys_type_line"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    check_replace_lines_in_file \
         "desktop/main.ts" \
         "Register the app protocol on the production app" \
         "$keys_type_line" \
         "$app_type_keys_strings"  
}

