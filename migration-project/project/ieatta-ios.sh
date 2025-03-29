#!/bin/bash

function ieatta_ios_podfile() {
    firebase_header_lines=(
        ""
        "#======== static frameworks ========= "
        "use_frameworks! :linkage => :static"
        "\$RNFirebaseAsStaticFramework = true"
        "#\$FirebaseSDKVersion = '11.7.0'"
        "#======== static frameworks ========= "
        ""
    )
    join_by firebase_header_strings "\n" "${firebase_header_lines[@]}"
    add_lines_in_file \
        'ios/Podfile' \
        "FirebaseSDKVersion" \
        "$RNMapboxMapsImpl = 'mapbox'" \
        "$firebase_header_strings" \
        

    boringssl_end_lines="      if target.respond_to?(:product_type) and target.product_type"
    boringssl_lines=(
        ""
        "      if target.name == 'BoringSSL-GRPC'"
        "        target.source_build_phase.files.each do \|file\|"
        "          if file.settings \&\& file.settings['COMPILER_FLAGS']"
        "            flags = file.settings['COMPILER_FLAGS'].split"
        "            flags.reject! { \|flag\| flag == '-GCC_WARN_INHIBIT_ALL_WARNINGS' }"
        "            file.settings['COMPILER_FLAGS'] = flags.join(' ')"
        "          end"
        "        end"
        "      end"
        ""
        ""
        "$boringssl_end_lines"
    )
    join_by boringssl_strings "\n" "${boringssl_lines[@]}"
    # if  grep "BoringSSL-GRPC"  "$DEST_PROJECT/ios/Podfile"; then
    #     error "  BoringSSL already exists in Podfile"
    # else
    #     replace_lines_in_file \
    #         'ios/Podfile' \
    #         "$boringssl_end_lines" \
    #         "$boringssl_strings" 
    # fi

}

function ieatta_ios_google_login() {
    config_file="ios/NewIeatta/Info.plist"

    function_line="<string>com.googleusercontent.apps.921154746561-s3uqn2oe4m85tufi6mqflbfbuajrm2i3</string>"
    function_export_lines=(
        "<!-- <string>com.googleusercontent.apps.921154746561-s3uqn2oe4m85tufi6mqflbfbuajrm2i3</string> -->"
        "				<string>com.googleusercontent.apps.229321919225-bvhcakm216dta1p0tb1fb5m4cp8pqse5</string>"
    )
    join_by function_export_strings "\n" "${function_export_lines[@]}"

    check_replace_lines_in_file \
         "$config_file" \
         "229321919225" \
         "$function_line" \
         "$function_export_strings"  
}

function PROJECT_ieatta_ios() {
    step=$((step + 1))
    info "Start copying ieatta ios"

    rm -rf "$DEST_PROJECT/ios/Podfile.lock"
    ieatta_ios_podfile
    ieatta_ios_google_login
}
