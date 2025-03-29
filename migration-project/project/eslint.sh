
#!/bin/bash

function EDIT_eslint_js() {
    step=$((step + 1))
    info "Start editing eslint.js"

    eslint_config_js=".eslintrc.js"

    rules_end_lines="// TypeScript specific rules"
    djzhang_rules_lines=(
        "        // djzhang's rules"
        "        '@typescript-eslint/no-explicit-any': 'off',"
        "        '@typescript-eslint/no-unused-vars': 'off',"
        "        'no-unused-vars': 'off',"
        "        'no-console': 'off',"
        "        'arrow-body-style': 'off',"
        "        'no-param-reassign': [2, {props: false}],"
        "$rules_end_lines"
    )
    join_by djzhang_rules_strings "\n" "${djzhang_rules_lines[@]}"

    check_replace_lines_in_file \
         "$eslint_config_js" \
         "// djzhang's rules" \
         "$rules_end_lines" \
         "$djzhang_rules_strings" 


    lodash_line="curly: 'error',"
    lodash_rules_lines=(
        "        'you-dont-need-lodash-underscore/first': 'off',"
        "        'you-dont-need-lodash-underscore/is-null': 'off',"
        "        'you-dont-need-lodash-underscore/is-undefined': 'off',"
        "        'you-dont-need-lodash-underscore/throttle': 'off',"
        "        'you-dont-need-lodash-underscore/get': 'off',"
        "        'you-dont-need-lodash-underscore/filter': 'off',"
        "        'you-dont-need-lodash-underscore/map': 'off',"
        "        'you-dont-need-lodash-underscore/find': 'off',"
        "        'you-dont-need-lodash-underscore/find-index': 'off',"
    )
    join_by lodash_rules_strings "\n" "${lodash_rules_lines[@]}"

    add_lines_in_file \
         "$eslint_config_js" \
         "you-dont-need-lodash-underscore/get" \
         "$lodash_line" \
         "$lodash_rules_strings"  \
         

}
