#!/bin/bash

source ../scripts/shellUtils.sh

# import utils
source "./utils/constant.sh"
source "./utils/file-utils.sh"
source "./utils/package-utils.sh"
source "./utils/scan-folder-utils.sh"

# scrapy
# https://docs.sentry.io/platforms/react-native/

# npx @sentry/wizard@latest -i reactNative

function install_scrapy() {
    step=$((step + 1))
    info "Start installing scrapy"
    info "Dest project: $DEST_PROJECT"

    # npx @sentry/wizard@latest -i reactNative 
    # npm exec @sentry/wizard@latest -i reactNative --prefix "$DEST_PROJECT"
    # npm exec --prefix "$DEST_PROJECT" @sentry/wizard@latest -i reactNative
}

function add_scrapy_in_app_tsx() {
    step=$((step + 1))
    info "Start adding scrapy in app.tsx"

    function_line="function App({url}: AppProps) {"
    function_export_lines=(
        "// throw new Error('My first Sentry error!');"
        ""
        "$function_line"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "src/App.tsx" \
         "// throw new Error" \
         "$function_line" \
         "$function_export_strings"  

    check_replace_lines_in_file \
         "src/App.tsx" \
         "Sentry.wrap(App)"  \
         "export default App;" \
         "export default Sentry.wrap(App);"  
}

function add_scrapy_in_metro_config() {
   function_export_lines=(
        "// const {getDefaultConfig: getReactNativeDefaultConfig} = require('@react-native/metro-config');"
        "const {getSentryExpoConfig: getSentryExpoDefaultConfig} = require('@sentry/react-native/metro');"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "metro.config.js" \
        "// const {getDefaultConfig"   \
        "const {getDefaultConfig: getReactNativeDefaultConfig} = require('@react-native/metro-config');"   \
         "$function_export_strings"  

   function_export_lines=(
        "// const defaultConfig = getReactNativeDefaultConfig(__dirname);"
        "const defaultConfig = getSentryExpoDefaultConfig(__dirname);"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "metro.config.js" \
         "// const defaultConfig" \
         "const defaultConfig = getReactNativeDefaultConfig(__dirname);"  \
         "$function_export_strings"  
}

# install_scrapy
add_scrapy_in_app_tsx
add_scrapy_in_metro_config

    

