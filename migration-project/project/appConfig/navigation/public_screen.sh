#!/bin/bash

function EDIT_app_public_screen() {
    step=$((step + 1))
    info "Start editing app public screen"

    public_screen_js="src/libs/Navigation/AppNavigator/PublicScreens.tsx"

    check_replace_lines_in_file \
         "$public_screen_js" \
         "@pages/signin/SignInPage" \
         "import SignInPage from '@expPages/signin/SignInPage';" \
         "import SignInPage from '@pages/signin/SignInPage';"  

    check_replace_lines_in_file \
         "$public_screen_js" \
         "@pages/signin/GoogleSignInDesktopPage" \
         "import GoogleSignInDesktopPage from '@expPages/signin/GoogleSignInDesktopPage';" \
         "import GoogleSignInDesktopPage from '@pages/signin/GoogleSignInDesktopPage';"  

    check_replace_lines_in_file \
         "$public_screen_js" \
         "@pages/LogInWithShortLivedAuthTokenPage" \
         "import LogInWithShortLivedAuthTokenPage from '@expPages/LogInWithShortLivedAuthTokenPage';" \
         "import LogInWithShortLivedAuthTokenPage from '@pages/LogInWithShortLivedAuthTokenPage';"  

    function_line="component={NativeModules.HybridAppModule ? SessionExpiredPage : SignInPage}"
    function_export_lines=(
        "                // component={NativeModules.HybridAppModule ? SessionExpiredPage : SignInPage}"
        "                component={SignInPage}"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$public_screen_js" \
         "component={SignInPage}" \
         "$function_line" \
         "$function_export_strings"  

}
