#!/bin/bash

function EDIT_react-native-pdf() {
   info "Start editing react-native-pdf"

    removed_dependencies=(
        "react-native-pdf"        "react-native-pdf"
    )
	removed_dependencies_in_package_json "${removed_dependencies[@]}"

    remove_patches_by_name "react-native-pdf"

    pdf_thumbnail_file="src/components/PDFThumbnail/index.native.tsx"
    node "$SOURCE_PROJECT/migration-project/js/comment-file.js" "$DEST_PROJECT/$pdf_thumbnail_file" "withReturn|PDF-fitPolicy|multipleLineWithBraces"
    import_pdf_in_pdfthumbmail="import Pdf from 'react-native-pdf';"
    check_replace_lines_in_file  "$pdf_thumbnail_file" "// import Pdf from" "$import_pdf_in_pdfthumbmail" "// $import_pdf_in_pdfthumbmail"


    pdf_view_file="src/components/PDFView/index.native.tsx"
    node "$SOURCE_PROJECT/migration-project/js/comment-file.js" "$DEST_PROJECT/$pdf_view_file" "withReturn|PDF-fitPolicy|multipleLineWithBraces"
    import_pdf_in_view="import PDF from 'react-native-pdf';"
    check_replace_lines_in_file  "$pdf_view_file" "// import PDF from" "$import_pdf_in_view" "// $import_pdf_in_view"
}
