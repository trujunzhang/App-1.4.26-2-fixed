#!/bin/bash

function EDIT_expensify_js() {
    step=$((step + 1))
    info "Start editing expensify js"

    expensify_js="src/Expensify.tsx"

    keys_type_line="import ONYXKEYS from './ONYXKEYS';"
    app_type_keys_lines=(
        "import FirebaseProvider from './components/Firebase/provider';"
        "import * as DetailedPageActionContextMenu from './components/Ieatta/detailedPage/ContextMenu/DetailedPageActionContextMenu';"
        "import PopoverDetailedPageActionContextMenu from './components/Ieatta/detailedPage/ContextMenu/PopoverDetailedPageActionContextMenu';"
        "import * as PhotosPageContextMenu from './pages/photos/online/Popover/ContextMenu/PhotosPageContextMenu';"
        "import PopoverPhotosPageContextMenu from './pages/photos/online/Popover/ContextMenu/PopoverPhotosPageContextMenu';"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$expensify_js" \
         "import PopoverPhotosPageContextMenu" \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         "check"


    function_line="<DeeplinkWrapper"
    function_export_lines=(
        "        <FirebaseProvider isAuthenticated={isAuthenticated}>"
        "            <DeeplinkWrapper"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$expensify_js" \
         "<FirebaseProvider" \
         "$function_line" \
         "$function_export_strings"  


    function_line="</DeeplinkWrapper>"
    function_export_lines=(
        "            </DeeplinkWrapper>"
        "        </FirebaseProvider>"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$expensify_js" \
         "</FirebaseProvider>" \
         "$function_line" \
         "$function_export_strings"  


    keys_type_line="<PopoverReportActionContextMenu ref={ReportActionContextMenu.contextMenuRef} />"
    app_type_keys_lines=(
        "                        <PopoverPhotosPageContextMenu ref={PhotosPageContextMenu.contextMenuRef} />"
        "                        <PopoverDetailedPageActionContextMenu ref={DetailedPageActionContextMenu.contextMenuRef} />"
    )
    join_by app_type_keys_strings "\n" "${app_type_keys_lines[@]}"

    add_lines_in_file \
         "$expensify_js" \
         "<PopoverPhotosPageContextMenu " \
         "$keys_type_line" \
         "$app_type_keys_strings"  \
         "check"

}
