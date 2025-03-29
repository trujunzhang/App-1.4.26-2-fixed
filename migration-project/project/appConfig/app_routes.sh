#!/bin/bash

function EDIT_app_routes() {
    step=$((step + 1))
    info "Start editing app routes"

    routes_js="src/ROUTES.ts"

    add_lines_in_file            \
        "$routes_js"             \
        "import appRoutes"       \
        "import type CONST from './CONST';"               \
        "import appRoutes from './appConfig/appRoutes';"  \
        


    add_lines_in_file            \
        "$routes_js"             \
        "appRoutes,"             \
        "const ROUTES = {"       \
        "    ...appRoutes,"      \
        

    check_replace_lines_in_file                 \
        "$routes_js"                             \
        "'exp_settings"   \
        "'settings"  \
        "'exp_settings"  

    check_replace_lines_in_file                 \
        "$routes_js"                             \
        "\`exp_settings"   \
        "\`settings"  \
        "\`exp_settings"  

}
