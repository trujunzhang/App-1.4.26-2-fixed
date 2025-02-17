#!/bin/bash

function app_auth_screen_add_components() {
    auth_screen_js="src/libs/Navigation/AppNavigator/AuthScreens.tsx"

    function_line="<RootStack.Navigator"
    function_export_lines=(
        "                {isDevelopment \&\& <DebugAndSwitchRouter />}"
        "$function_line"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$auth_screen_js" \
         "<DebugAndSwitchRouter />" \
         "$function_line" \
         "$function_export_strings"  


    function_line="component={BottomTabNavigator}"
    function_export_lines=(
        "                        // component={BottomTabNavigator}"
        "                        getComponent={loadHomeScreen}"
        "                    />"
        "                    <RootStack.Screen"
        "                        name={SCREENS.CENTER_IEATTA.PHOTO_GRID_VIEW}"
        "                        options={rootNavigatorOptions.fullScreen}"
        "                        getComponent={() => require<ReactComponentModule>('@pages/photos/online/FBPhotosGridView').default}"
        "                    />"
        "                    <RootStack.Screen"
        "                        name={SCREENS.CENTER_IEATTA.PHOTO_PAGE_VIEW}"
        "                        options={rootNavigatorOptions.fullScreen}"
        "                        getComponent={() => {"
        "                            const screen = require<ReactComponentModule>('@pages/photos/online/FBPhotosPageView').default;"
        "                            return screen;"
        "                        }}"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$auth_screen_js" \
         "{loadHomeScreen}" \
         "$function_line" \
         "$function_export_strings"  


    function_line="<SearchRouterModal />"
    function_export_lines=(
        "                {/* <SearchRouterModal /> */}"
        "                <SearchRestaurantsModal />"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$auth_screen_js" \
         "<SearchRestaurantsModal />" \
         "$function_line" \
         "$function_export_strings"  
}

function app_auth_screen_toggle_search_restaurants_router() {
    auth_screen_js="src/libs/Navigation/AppNavigator/AuthScreens.tsx"

    function_line="const {toggleSearch} = useSearchRouterContext();"
    function_export_lines=(
        "// eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth"
        "    const {isSmallScreenWidth} = useResponsiveLayout();"
        "// const {toggleSearch} = useSearchRouterContext();"
        "    const {toggleSearchRestaurantsRouter} = useSearchRestaurantsRouterContext();"
        ""
        "    const loadHomeScreen = useMemo(() => {"
        "        return isSmallScreenWidth ? loadNativeHomeScreen : loadWebHomeScreen;"
        "    }, [isSmallScreenWidth]);"
        ""
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$auth_screen_js" \
         "{toggleSearchRestaurantsRouter}" \
         "$function_line" \
         "$function_export_strings"  


    function_line="toggleSearch();"
    function_export_lines=(
        "                    // toggleSearch();"
        "                    toggleSearchRestaurantsRouter();"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$auth_screen_js" \
         "toggleSearchRestaurantsRouter();" \
         "$function_line" \
         "$function_export_strings"  
}

function EDIT_app_auth_screen() {
    step=$((step + 1))
    info "Start editing app auth screen"

    auth_screen_js="src/libs/Navigation/AppNavigator/AuthScreens.tsx"

    define_line="import CONFIG from '@src/CONFIG';" 
    define_rules_lines=(
        "import {loadNativeHomeScreen, loadWebHomeScreen} from '@src/appConfig/navigation/home';" 
        "import useEnvironment from '@hooks/useEnvironment';"
        "import DebugAndSwitchRouter from '@components/Debug/DebugAndSwitchRouter';"
        "import SearchRestaurantsModal from '@pages/searchPages/restaurants';"
        "import {useSearchRestaurantsRouterContext} from '@pages/searchPages/restaurants/SearchRouter/SearchRestaurantsRouterContext';"       
    )
    join_by define_rules_string "\n" "${define_rules_lines[@]}"

    add_lines_in_file \
         "$auth_screen_js" \
         "import {loadNativeHomeScreen, loadWebHomeScreen}" \
         "$define_line" \
         "$define_rules_string"  \
         "check"


    add_lines_in_file \
         "$auth_screen_js" \
         "const {isDevelopment}" \
         "const styles = useThemeStyles();"   \
         "    const {isDevelopment} = useEnvironment();" \
         "check"


    app_auth_screen_toggle_search_restaurants_router
    app_auth_screen_add_components
}


