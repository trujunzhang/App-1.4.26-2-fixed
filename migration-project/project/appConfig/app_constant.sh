
#!/bin/bash

function EDIT_app_constant() {
    step=$((step + 1))
    info "Start editing app constant"

    config_js="src/CONST.ts"

    add_lines_in_file           \
        "$config_js"            \
        "import appConst from"  \
        "import type {ValueOf} from 'type-fest';"  \
        "import appConst from './appConfig/appConst';" \
        "check"

    add_lines_in_file         \
        "$config_js"          \
        "...appConst,"        \
        "const CONST = {"     \
        "    ...appConst,"    \
        "check"

}
