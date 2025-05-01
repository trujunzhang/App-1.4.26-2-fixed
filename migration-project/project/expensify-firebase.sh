#!/bin/bash

function PROJECT_expensify_setCrashlyticsUserId() {
    js_file="src/libs/setCrashlyticsUserId/index.native.ts"

    check_replace_lines_in_file \
         "$js_file" \
         "// crashlytics().setUserId" \
         "crashlytics().setUserId" \
         "// crashlytics().setUserId"  
}

function PROJECT_expensify_platformSetup() {
    js_file="src/setup/platformSetup/index.native.ts"

    check_replace_lines_in_file \
         "$js_file" \
         "// crashlytics().setCrashlyticsCollectionEnabled" \
         "crashlytics().setCrashlyticsCollectionEnabled" \
         "// crashlytics().setCrashlyticsCollectionEnabled"  
}

function PROJECT_expensify_ErrorBoundary() {
    js_file="src/components/ErrorBoundary/index.native.tsx"

    check_replace_lines_in_file \
         "$js_file" \
         "// crashlytics().log" \
         "crashlytics().log" \
         "// crashlytics().log" 

    check_replace_lines_in_file \
         "$js_file" \
         "// crashlytics().recordError" \
         "crashlytics().recordError" \
         "// crashlytics().recordError"  
}

function PROJECT_expensify_firebase() {
    step=$((step + 1))
    info "Start edit expensify firebase"

    check_replace_lines_in_file \
         "src/libs/actions/Timing.ts" \
         "// Firebase.startTrace" \
         "Firebase.startTrace(eventName);" \
         "// Firebase.startTrace(eventName);"  

    check_replace_lines_in_file \
         "src/libs/actions/Timing.ts" \
         "// Firebase.stopTrace" \
         "Firebase.stopTrace(eventName);" \
         "// Firebase.stopTrace(eventName);"  

    check_replace_lines_in_file \
         "src/libs/Firebase/index.native.ts" \
         "// crashlytics().log" \
         "crashlytics().log(action);" \
         "// crashlytics().log(action);"  


PROJECT_expensify_setCrashlyticsUserId
PROJECT_expensify_platformSetup
PROJECT_expensify_ErrorBoundary
}

