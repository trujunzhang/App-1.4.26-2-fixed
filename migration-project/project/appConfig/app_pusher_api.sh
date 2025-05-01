#!/bin/bash

function app_pusher_copy() {
    fileName=$1

    sourceFolder="AppIconsSplash/Pusher"
    destFolder="src/libs/Pusher"

    sourceFile="${sourceFolder}/${fileName}.txt"
    destFile="${destFolder}/${fileName}.ts"

   if [ -f "$DEST_PROJECT/${destFile}" ]; then
       mv -rf "$DEST_PROJECT/${destFile}" 
   fi

   cp -Rvp "$SOURCE_PROJECT/${sourceFile}" "${DEST_PROJECT}/${destFile}"
}

function EDIT_app_pusher_api() {
    step=$((step + 1))
    info "Start editing pusher api"

    app_pusher_copy "index.native"
    app_pusher_copy "index"
}
