#!/bin/bash

function EDIT_type_person_details() {
    step=$((step + 1))
    info "Start editing type PersonDetails"

    config_js="src/types/onyx/PersonalDetails.ts"

    forms_line="accountID: number;"
    form_keys_lines=(
        ""
        "    /** Currently logged in user userID in the firebase's table */"
        "    userID?: string;"
    )
    join_by form_keys_strings "\n" "${form_keys_lines[@]}"

    add_lines_in_file \
         "$config_js" \
         "userID?: string;" \
         "$forms_line" \
         "$form_keys_strings"  \
         "check"


}
