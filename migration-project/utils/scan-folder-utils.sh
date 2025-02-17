#!/bin/bash

project_folder=(
".idea"
".well-known"
"help"
".jest-cache"
".bundle"
".git"
".github"
".storybook"
"node_modules"
"__mocks__"
"contributingGuides"
"vendor"
# "ios"
"xcuserdat"
"Images.xcassets"
"Pods"
"assets"
"patches"
"docs"
# build
'intermediates'
"compileDevelopmentDebugKotlin"
'tmp'
'outputs'
'cacheable'
'.gradle'
'.cxx'
"generated"
)

project_files_extension=(
    "DS_Store"
    "BUCK"
    "crt"
    "png"
    "jpg"
    "svg"
    "mp3"
    "otf"
    "ttf"
    "woff"
    "woff2"
    "keystore"
    "mobileprovision"
    ".xcprivacy"
    "xcuserstat"
    "gpg"
    "jar"
)

project_files_name_contain=(
"keystore"
"gpg"
"snapshot"
"UserInterfaceStat"
)

ARRAY=()

# SHOW_IGNORED_FILES_LOGS=true
SHOW_IGNORED_FILES_LOGS=false

walk_dir () {
    shopt -s nullglob dotglob
    for pathname in "$1"/*; do
        if [ -d "$pathname" ]; then
            base_name=$(basename ${pathname})
            # printf '%s\n' "$pathname"
            # printf '%s\n' "$base_name"

            shouldIgnoreFolder=false
            for i in "${project_folder[@]}"
            do
                if [ "$i" == "$base_name" ] ; then
                         # info ""
                         if [ "$SHOW_IGNORED_FILES_LOGS" == "true" ] ; then
                                 info "Found ignore folder"
                                 info "folder Path: $pathname, folder name: $base_name"
                                 info ""
                         fi
                         shouldIgnoreFolder=true
                fi
            done

            if [ "$shouldIgnoreFolder" == "false" ] ; then
                  # printf '%s\n' "$pathname"
                  walk_dir "$pathname" 
                  # wh="ok"
            fi

        else
            FILE=`basename "$pathname"`
            NAME=`echo "$FILE" | cut -d'.' -f1`
            EXTENSION=`echo "$FILE" | cut -d'.' -f2`

            shouldIgnoreFile=false
            for j in "${project_files_extension[@]}"
            do
                if [ "$j" == "$EXTENSION" ] ; then
                         # info ""

                         if [ "$SHOW_IGNORED_FILES_LOGS" == "true" ] ; then
                             info "Found ignore file"
                             info "filePath: $pathname, name: $NAME, extension: $EXTENSION"
                             info ""
                         fi
                         shouldIgnoreFile=true
                fi
            done

            for k in "${project_files_name_contain[@]}"
            do
                if [[ "$FILE" == *"$k"* ]]; then
                         # info ""
                         if [ "$SHOW_IGNORED_FILES_LOGS" == "true" ] ; then
                             info "Found ignore file"
                             info "filePath: $pathname, name: $NAME, extension: $EXTENSION"
                             info ""
                         fi
                         shouldIgnoreFile=true
                fi
            done


            if [ "$shouldIgnoreFile" == "false" ] ; then
                   ARRAY+=("$pathname")
            fi

        fi
    done
}

remove_patches_by_name() {
    contained_string=$1

    for pathname in "$DEST_PROJECT/patches"/*; do
        if [ -f "$pathname" ]; then
            # info "  Removing patch file: ${pathname}"
            
            if [[ "$pathname" == *"$contained_string"* ]]; then
                success "  Start Removing file: ${pathname}"
                rm -f "$pathname"
            fi
        fi
    done
}

remove_all_patches() {
	removed_patches_files=("$@")

    for pathname in "$DEST_PROJECT/patches"/*; do
        if [ -f "$pathname" ]; then
            # info "  Removing file: ${pathname}"

            for ((i = 0; i < ${#removed_patches_files[@]}; i = i + 1)); do
                contained_string=${removed_patches_files[$i]} 
                if [[ "$pathname" == *"$contained_string"* ]]; then
                    success "  Start Removing file: ${pathname}"
                    rm -f "$pathname"
                fi
            done
        fi
    done
}

