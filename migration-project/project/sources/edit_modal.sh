
#!/bin/bash

function EDIT_modal_js() {
    step=$((step + 1))
    info "Start editing modal js"

    modal_type_js="src/components/Modal/types.ts"
    modal_js="src/components/Modal/BaseModal.tsx"

    keys_type_line="type BaseModalProps = Partial<ModalProps> \& {"
    app_type_keys_lines=(
        "    /** Content of the modal header */"
        "    headerContent?: React.ReactNode;"
        ""
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$modal_type_js" \
         "headerContent?" \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         "check"


    add_lines_in_file \
        "$modal_js" \
        "headerContent,"  \
        "onModalHide = () => {}," \
        "        headerContent,"  \
        "check"


    header_line="<ModalContent"
    header_keys_lines=(
         "                    {headerContent}"
         "$header_line"
    )
    join_by header_keys_strings "\n" "${header_keys_lines[@]}"

    check_replace_lines_in_file \
         "$modal_js" \
         "{headerContent}" \
         "$header_line" \
         "$header_keys_strings"  \


}
