#!/bin/bash

# patch
#    from 9.1.4-0
#    to 9.1.23-6

source ../scripts/shellUtils.sh

# import utils
source "./utils/constant.sh"
source "./utils/file-utils.sh"
source "./utils/package-utils.sh"
source "./utils/scan-folder-utils.sh"

# style={styles.searchInputStyle}
function patch_project {
    step=$((step + 1))
    info "Start patching project"

    remove_keys_in_package_json "['dependencies']['react-native-webrtc']"

    walk_dir "$DEST_PROJECT/src" 

	strings_array=(
        "getSafeAreaPadding" "getPlatformSafeAreaPadding"

        "import useStyledSafeAreaInsets from '@hooks/useStyledSafeAreaInsets';"  
        "import useSafeAreaPaddings from '@hooks/useSafeAreaPaddings';"  
        "useStyledSafeAreaInsets()"  "useSafeAreaPaddings()"

        "getSearchTableColumnStyles"  "getReportTableColumnStyles"
        # ""  ""
        # ""  ""
        # ""  ""
    )

    info "Start replacing strings"

    for ((j = 0; j < ${#ARRAY[@]}; j = j + 1)); do
        dest_filePath=${ARRAY[$j]} 

        FILE=`basename "$dest_filePath"`
        NAME=`echo "$FILE" | cut -d'.' -f1`
        EXTENSION=`echo "$FILE" | cut -d'.' -f2`

        for ((i = 0; i < ${#strings_array[@]}; i = i + 2)); do
            string_to_replace=${strings_array[$i]} 
            replace_string=${strings_array[$i + 1]}

            # info "  [Replacing] {${string_to_replace}} with {${replace_string}}"
            # info "replaced file Path: $filePath, name: $NAME, extension: $EXTENSION"
    
            replace_lines_in_file_with_dest_path "$dest_filePath" "${string_to_replace}" "${replace_string}" 
        done
        
    done

    info "End replacing strings"
}



patch_project



function summary_check() {
    info "================ summary check ========================="


    info "========================================="
}

# summary_check
summary_end $step "3"




