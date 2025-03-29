#!/bin/bash

function app_en_languages() {
    en_js="src/languages/en.ts"

    add_lines_in_file            \
        "$en_js"             \
        "import appEnLanguage"  \
        "import CONST from '@src/CONST';"   \
        "import appEnLanguage from '@src/appConfig/languages/en';" \
        


    add_lines_in_file             \
        "$en_js"                  \
        "...appEnLanguage,"       \
        "const translations = {"  \
        "    ...appEnLanguage,"   \
        

}

function app_es_languages() {
    es_js="src/languages/es.ts"

    add_lines_in_file            \
        "$es_js"             \
        "import appEsLanguage"  \
        "import CONST from '@src/CONST';"   \
        "import appEsLanguage from '@src/appConfig/languages/es';"  \
        


    add_lines_in_file             \
        "$es_js"                  \
        "...appEsLanguage,"       \
        "const translations = {"  \
        "    ...appEsLanguage,"   \
        

}


function EDIT_app_languages() {
    step=$((step + 1))
    info "Start editing app languages"

    app_en_languages
    app_es_languages
}
