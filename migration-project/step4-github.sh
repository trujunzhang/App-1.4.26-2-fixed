#!/bin/bash

source ../scripts/shellUtils.sh

# import utils
source "./utils/constant.sh"
source "./utils/file-utils.sh"
source "./utils/package-utils.sh"
source "./utils/scan-folder-utils.sh"



function replace_github_dependicies() {
    step=$((step + 1))
    info "Start deleting github librairies"

    rm -rf "$DEST_PROJECT/.github"
    rm -rf "$DEST_PROJECT/scripts/symbolicate-profile.ts"

    walk_dir "$DEST_PROJECT/tests" 

	strings_array=(
        ".github/actions"
        "@github/actions"
        ".github/libs"
        "@github/libs"
    )

    info "Start deleting files contained 'github'"

    for ((j = 0; j < ${#ARRAY[@]}; j = j + 1)); do
        dest_path=${ARRAY[$j]} 

        FILE=`basename "$dest_path"`
        NAME=`echo "$FILE" | cut -d'.' -f1`
        EXTENSION=`echo "$FILE" | cut -d'.' -f2`

            
        # info "  [FILE] {${dest_path}} with {${FILE}}"

        for ((i = 0; i < ${#strings_array[@]}; i = i + 1)); do
            checkString=${strings_array[$i]} 

            # info "delete file Path: $filePath, name: $NAME, extension: $EXTENSION"

            if [ -f "$dest_path" ]; then
                if  grep "$checkString" $dest_path; then
                    error "  $checkString already exists in $dest_path"
                    rm -rf "$dest_path"
                fi
            fi
        done
        
    done

    info "End replacing strings"
}



replace_github_dependicies



function summary_check() {
    info "================ summary check ========================="


    info "========================================="
}

# summary_check
summary_end $step "3"


