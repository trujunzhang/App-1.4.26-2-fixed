#!/bin/bash

function EDIT_app_js() {
    step=$((step + 1))
    info "Start editing app js"

    app_js="src/App.tsx"

    keys_type_line="import {LogBox} from 'react-native';"
    app_type_keys_lines=(
        "import FirebaseSync from './components/Firebase/sync';"
        "import AppNotify from './components/Ieatta/components/Notify';"
        "import RealmLocalProvider from './components/Realm/provider';"
        "import {SearchRestaurantsRouterContextProvider} from './pages/searchPages/restaurants/SearchRouter/SearchRestaurantsRouterContext';"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$app_js" \
         "import FirebaseSync" \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         


    add_lines_in_file \
         "$app_js" \
         "Require cycle" \
         "'Setting a timer for a long period of time',"  \
         "'Require cycle:',"  \
         


    components_line="HTMLEngineProvider,"
    components_add_lines=(
        "                                SearchRestaurantsRouterContextProvider,"
        "                                RealmLocalProvider,"
    )
    join_by components_add_strings "\n" "${components_add_lines[@]}"

    add_lines_in_file \
         "$app_js" \
         "RealmLocalProvider," \
         "$components_line" \
         "$components_add_strings "  \
         


    views_line="</ErrorBoundary>"
    views_add_lines=(
        "                            <FirebaseSync />"
        "                            <AppNotify />"
    )
    join_by views_add_strings "\n" "${views_add_lines[@]}"

    add_lines_in_file \
         "$app_js" \
         "<FirebaseSync" \
         "$views_line" \
         "$views_add_strings  "  \
         
}
