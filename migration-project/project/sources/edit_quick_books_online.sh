#!/bin/bash

function EDIT_quick_books_online_ConnectToQuickbooksOnlineFlow() {
    file_js="src/components/ConnectToQuickbooksOnlineFlow/index.tsx"

    check_replace_lines_in_file \
         "$file_js" \
         "// import {getQuickbooksOnlineSetupLink}" \
         "import {getQuickbooksOnlineSetupLink}" \
         "// import {getQuickbooksOnlineSetupLink}"  

    check_replace_lines_in_file \
         "$file_js" \
         "// Link.openLink(getQuickbooksOnlineSetupLink" \
         "Link.openLink(getQuickbooksOnlineSetupLink" \
         "// Link.openLink(getQuickbooksOnlineSetupLink"  
}

function EDIT_quick_books_online_useIndicatorStatus() {
    file_js="src/hooks/useIndicatorStatus.ts"

    check_replace_lines_in_file \
         "$file_js" \
         "// import {shouldShowQBOReimbursableExportDestinationAccountError}" \
         "import {shouldShowQBOReimbursableExportDestinationAccountError}" \
         "// import {shouldShowQBOReimbursableExportDestinationAccountError}"  

    check_replace_lines_in_file \
         "$file_js" \
         "// \[CONST\.INDICATOR_STATUS\.HAS_QBO_EXPORT_ERROR\]" \
         "\[CONST\.INDICATOR_STATUS\.HAS_QBO_EXPORT_ERROR\]" \
         "// \[CONST\.INDICATOR_STATUS\.HAS_QBO_EXPORT_ERROR\]"  
}

function EDIT_quick_books_online_PolicyUtils() {
    file_js="src/libs/PolicyUtils.ts"

    check_replace_lines_in_file \
         "$file_js" \
         "// import {shouldShowQBOReimbursableExportDestinationAccountError" \
         "import {shouldShowQBOReimbursableExportDestinationAccountError" \
         "// import {shouldShowQBOReimbursableExportDestinationAccountError"  

    check_replace_lines_in_file \
         "$file_js" \
         "// shouldShowQBOReimbursableExportDestinationAccountError(policy)" \
         "shouldShowQBOReimbursableExportDestinationAccountError(policy)" \
         "true // shouldShowQBOReimbursableExportDestinationAccountError(policy)"  
}

function EDIT_quick_books_online_WorkspacesSettingsUtils() {
    file_js="src/libs/WorkspacesSettingsUtils.ts"

    check_replace_lines_in_file \
         "$file_js" \
         "// import {shouldShowQBOReimbursableExportDestinationAccountError" \
         "import {shouldShowQBOReimbursableExportDestinationAccountError" \
         "// import {shouldShowQBOReimbursableExportDestinationAccountError"  

    check_replace_lines_in_file \
         "$file_js" \
         "// () => Object.values(cleanPolicies).some(shouldShowQBOReimbursableExportDestinationAccountError)" \
         "() => Object.values(cleanPolicies).some(shouldShowQBOReimbursableExportDestinationAccountError)" \
         "// () => Object.values(cleanPolicies).some(shouldShowQBOReimbursableExportDestinationAccountError)"  
}

function EDIT_quick_books_online() {
    step=$((step + 1))
    info "Start editing quick books online"

    EDIT_quick_books_online_ConnectToQuickbooksOnlineFlow
    EDIT_quick_books_online_useIndicatorStatus
    EDIT_quick_books_online_PolicyUtils
    EDIT_quick_books_online_WorkspacesSettingsUtils

    stack_js="src/libs/Navigation/AppNavigator/ModalStackNavigators/index.tsx"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "qbo/export"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "qbo/import"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "qbd/export"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "qbd/import"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "qbo/advanced"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "workspace/upgrade"

    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "expPages/ReimbursementAccount"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$stack_js" "expPages/workspace"

    workspace_js="src/libs/Navigation/AppNavigator/Navigators/WorkspaceSplitNavigator.tsx"
    node "$SOURCE_PROJECT/migration-project/js/comment-lines.js" "$DEST_PROJECT/$workspace_js" "expPages/workspace"
    node "$SOURCE_PROJECT/migration-project/js/comment-file.js" "$DEST_PROJECT/$workspace_js" "withReturn|FocusTrapForScreens|singleLine"
}
