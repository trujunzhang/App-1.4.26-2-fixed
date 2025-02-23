#!/bin/bash

function check_and_copy_files() {
   file=$1
   if [  -f "$DEST_PROJECT/${file}" ]; then
       rm -f "$DEST_PROJECT/${file}"
   fi

   cp "$SOURCE_PROJECT/${file}" "$DEST_PROJECT/${file}"
}

# see: https://sentry.io/answers/delete-all-lines-containing-a-string-from-a-file-in-bash/
# sed -i.bak '/NOT FOR RELEASE/d' ./info.txt
function delete_line_in_file_with_dest_path() {
    dest_path=$1
    contained_string=$2

    # sed -i.bak '/NOT FOR RELEASE/d' ./info.txt
    sed -i '' -e "/${contained_string}/d" "$dest_path" 
}

function delete_line_in_file() {
    filePath=$1
    contained_string=$2

    dest_path="$DEST_PROJECT/$filePath"

    delete_line_in_file_with_dest_path "$dest_path" "$contained_string"
}

function replace_lines_in_file_with_dest_path() {
    dest_path=$1
    oldLine=$2
    replace_string=$3

    sed -i '' -e "s|${oldLine}|${replace_string}|gI" "$dest_path" 
}

function replace_lines_in_file() {
    filePath=$1
    oldLine=$2
    replace_string=$3

    dest_path="$DEST_PROJECT/$filePath"

    replace_lines_in_file_with_dest_path "$dest_path" "$oldLine" "$replace_string"
}

function check_replace_lines_in_file_with_dest_path() {
    dest_path=$1
    checkString=$2
    oldLine=$3
    newLine=$4

    if  grep "$checkString" $dest_path; then
        error "  $checkString already exists in $dest_path"
    else
        success "  $checkString not exists in $dest_path"
        replace_lines_in_file_with_dest_path "$dest_path" "$oldLine" "$newLine"
    fi
}

function check_replace_lines_in_file() {
    filePath=$1
    checkString=$2
    oldLine=$3
    newLine=$4

    dest_path="$DEST_PROJECT/$filePath"

    check_replace_lines_in_file_with_dest_path "$dest_path" "$checkString" "$oldLine" "$newLine"
}

function add_lines_in_file_with_dest_path() {
    dest_path=$1
    checkString=$2
    oldLine=$3
    newLines=$4
    DEFAULTVALUE="ignore"
    need_check="${5:-$DEFAULTVALUE}"

    # info "========== debug =============="
    # info "oldLine:$oldLine"
    # info "newLines:$newLines"
    # info "need_check:$need_check"
    # info "dest_path:$dest_path"
    # info "========== debug =============="

    if [ "$need_check" == "check" ] ; then
        if  grep "$checkString" $dest_path; then
            error "  $checkString already exists in $dest_path"
        else
            success "  $checkString not exists in $dest_path"
            replace_lines_in_file_with_dest_path "$dest_path" "$oldLine" "$oldLine\n$newLines"
        fi
    else
        replace_lines_in_file_with_dest_path "$dest_path" "$oldLine" "$oldLine\n$newLines"
    fi
}

function add_lines_in_file() {
    filePath=$1
    checkString=$2
    oldLine=$3
    newLines=$4
    DEFAULTVALUE="ignore"
    need_check="${5:-$DEFAULTVALUE}"

    dest_path="$DEST_PROJECT/$filePath"

    add_lines_in_file_with_dest_path "$dest_path" "$checkString" "$oldLine" "$newLines" "$need_check"
}

function add_new_line_to_file() {
    filePath=$1
    checkString=$2
    oldLine=$3
    newLine1=$4
    DEFAULTVALUE=""
    newLine2="${5:-$DEFAULTVALUE}"

    dest_path="$DEST_PROJECT/$filePath"

    if  grep "$checkString" $dest_path; then
        error "  $checkString already exists in $filePath"
    else
        success "  $checkString not exists in $filePath"
            
        if [ "$newLine2" == "" ] ; then
            sed -i '' -e "s|${oldLine}|${oldLine}\n${newLine1}|gI" "$dest_path" 
        else
            sed -i '' -e "s|${oldLine}|${oldLine}\n${newLine1}\n${newLine2}|gI" "$dest_path" 
        fi
    fi
}

function check_and_copy_folder() {
   folder=$1
   if [ ! -d "$DEST_PROJECT/${folder}" ]; then
       cp -Rvp "$SOURCE_PROJECT/${folder}" "${DEST_PROJECT}/${folder}"
   fi
}

function copy_file() {
    source_file=$1
    dest_file=$2
    DEFAULTVALUE="ignore"
    need_delete="${3:-$DEFAULTVALUE}"

    if [ "$need_delete" == "delete" ] ; then
        if [ -f "${dest_file}" ]; then
            rm -rf "${dest_file}"
        fi
    fi

    if [ ! -f "$dest_file" ]; then
        if [ -f "${source_file}" ]; then
            cp -Rp "$source_file" "$dest_file"
        fi
    fi
}

function copy_file_from_source_to_dest() {
    file_name=$1

    DEFAULTVALUE="ignore"
    need_delete="${2:-$DEFAULTVALUE}"

    info "Copying file: $file_name"
    copy_file  "$SOURCE_PROJECT/${file_name}" "$DEST_PROJECT/${file_name}" "$need_delete" 
}


function copy_folder() {
    source_folder=$1
    dest_folder=$2
    DEFAULTVALUE="ignore"
    need_delete="${3:-$DEFAULTVALUE}"

    if [ "$need_delete" == "delete" ] ; then
        if [ -d "${dest_folder}" ]; then
            rm -rf "${dest_folder}"
        fi
    fi

    if [ ! -d "$dest_folder" ]; then
        if [ -d "${source_folder}" ]; then
            cp -Rp "$source_folder" "$dest_folder"
        fi
    fi
}

function copy_folder_from_source_to_dest() {
    folder_name=$1

    info "Copying folderPath: $folder_name"
    copy_folder  "$SOURCE_PROJECT/${folder_name}" "$DEST_PROJECT/${folder_name}" 
}

function copy_folders_with_array() {
	folders=("$@")
    
    info "Start copying folders with array"
    for ((j = 0; j < ${#folders[@]}; j = j + 1)); do
        folderPath=${folders[$j]} 
        info " folderPath: $folderPath"
        copy_folder  "$SOURCE_PROJECT/${folderPath}" "$DEST_PROJECT/${folderPath}" 
    done
}

