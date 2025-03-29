#!/bin/bash

function EDIT_quick_books_online_ConnectToQuickbooksOnlineFlow() {
    ConnectToQuickbooksOnlineFlow_js="src/components/ConnectToQuickbooksOnlineFlow/index.tsx"

    check_replace_lines_in_file \
         "$ConnectToQuickbooksOnlineFlow_js" \
         "// import {getQuickbooksOnlineSetupLink}" \
         "import {getQuickbooksOnlineSetupLink}" \
         "// import {getQuickbooksOnlineSetupLink}"  

    check_replace_lines_in_file \
         "$ConnectToQuickbooksOnlineFlow_js" \
         "// Link.openLink(getQuickbooksOnlineSetupLink" \
         "Link.openLink(getQuickbooksOnlineSetupLink" \
         "// Link.openLink(getQuickbooksOnlineSetupLink"  
}

function EDIT_quick_books_online() {
    step=$((step + 1))
    info "Start editing quick books online"

    EDIT_quick_books_online_ConnectToQuickbooksOnlineFlow

    stack_js="src/libs/Navigation/AppNavigator/ModalStackNavigators/index.tsx"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "qbo/export"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "qbo/import"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "qbd/export"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "qbd/import"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "qbo/advanced"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "workspace/upgrade"
}
