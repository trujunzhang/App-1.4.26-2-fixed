#!/bin/bash

function comment_react-native-plaid-link-sdk() {
    file_add_plaid_bank_account="src/components/AddPlaidBankAccount.tsx"

    old_block_invoke_renderPlaidLink="        return <FullPageOfflineBlockingView>{renderPlaidLink()}</FullPageOfflineBlockingView>;"
    new_block_invoke_renderPlaidLink=(
        "        // return <FullPageOfflineBlockingView>{renderPlaidLink()}</FullPageOfflineBlockingView>;"
        "        return null;"
     )
    join_by new_block_invoke_renderPlaidLink_string "\n" "${new_block_invoke_renderPlaidLink[@]}"
    check_replace_lines_in_file \
            "$file_add_plaid_bank_account" \
            "// return <FullPageOfflineBlockingView>" \
            "$old_block_invoke_renderPlaidLink" \
            "$new_block_invoke_renderPlaidLink_string" 

   node "$SOURCE_PROJECT/migration-project/js/comment-file.js" "$DEST_PROJECT/$file_add_plaid_bank_account" "withReturn|PlaidLink|singleLine"

   import_plaidLink="import PlaidLink from './PlaidLink';"
   check_replace_lines_in_file   "$file_add_plaid_bank_account" "// import PlaidLink from './PlaidLink" "$import_plaidLink" "// $import_plaidLink"
}

function comment_android_react-native-plaid-link-sdk() {

# include ':react-native-plaid-link-sdk'
# project(':react-native-plaid-link-sdk').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-plaid-link-sdk/android')
    check_replace_lines_in_file \
        "android/settings.gradle" \
        "//include ':react-native-plaid-link-sdk'" \
        "include ':react-native-plaid-link-sdk'"  \
        "//include ':react-native-plaid-link-sdk'"
    check_replace_lines_in_file \
        "android/settings.gradle" \
        "//project(':react-native-plaid-link-sdk')" \
        "project(':react-native-plaid-link-sdk')"  \
        "//project(':react-native-plaid-link-sdk')"

# implementation project(':react-native-plaid-link-sdk')
    check_replace_lines_in_file \
        "android/app/build.gradle" \
        "//implementation project(':react-native-plaid-link-sdk')" \
        "implementation project(':react-native-plaid-link-sdk')" \
        "//implementation project(':react-native-plaid-link-sdk')" 

}


function EDIT_react-native-plaid-link-sdk() {
    info "Start editing react-native-plaid-link-sdk"

    removed_dependencies=(
        "react-plaid-link"        "react-plaid-link"
        "react-native-plaid-link-sdk"        "react-native-plaid-link-sdk"
    )
	removed_dependencies_in_package_json "${removed_dependencies[@]}"
    remove_patches_by_name "react-native-plaid-link-sdk"

    rm -rf "$DEST_PROJECT/src/components/PlaidLink"

    comment_react-native-plaid-link-sdk
    comment_android_react-native-plaid-link-sdk
}
