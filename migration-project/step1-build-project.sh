#!/bin/bash

source ../scripts/shellUtils.sh

# import utils
source "./utils/constant.sh"
source "./utils/file-utils.sh"
source "./utils/package-utils.sh"
source "./utils/scan-folder-utils.sh"

# import edit
source "./edit/react-native-background-task.sh"
source "./edit/react-native-live-markdown.sh"
source "./edit/react-native-plaid-link-sdk.sh"
source "./edit/react-native-firebase.sh"
source "./edit/react-native-pdf.sh"

function edit_git_ignore() {
    step=$((step + 1))
    info "Start editing .gitignore file"

    ignore_file="$DEST_PROJECT/.gitignore"
    line="!my-upload-key.keystore"

    # sed_exception_tmp_file=".!*!*"
    sed_exception_tmp_file="\.!\*!\*"

    # add_lines_in_file ".gitignore" "!my-upload-key.keystore" "!debug.keystore" "!my-upload-key.keystore" 
    # add_lines_in_file ".gitignore" "obsidian" "!debug.keystore" ".obsidian" 
    # add_lines_in_file ".gitignore" "$sed_exception_tmp_file" "!debug.keystore" "${sed_exception_tmp_file}" 

     webpack_array_string=(
        "!my-upload-key.keystore"
        ".kotlin"
        ".obsidian"
        ".js"
        ".jsx"
        "${sed_exception_tmp_file}"
        "*-E"
     )
     join_by webpack_add_lines "\n" "${webpack_array_string[@]}"
     add_lines_in_file \
         '.gitignore' \
         "obsidian" \
         "!debug.keystore" \
         "$webpack_add_lines" \
         
}

function replace_app_identifier() {
    step=$((step + 1))

    info "Start scaning folders"
    walk_dir "$DEST_PROJECT" 

	strings_array=(
     "New Expensify"              "New Ieatta"
     "new\.expensify\.com"        "new\.ieatta\.com"
     "new\.expensify\.desktop"    "new\.ieatta\.desktop"
     "new-expensify://"           "new-ieatta://"
     # >> .gitignore:
     # >>   android/app/src/main/java/com/expensify/chat/generated/
     "com\.expensify\.chat"         "com\.ieatta\.track"
     "[[:<:]]NewExpensify[[:>:]]"   "NewIeatta"
     "NewExpensifyTests"            "NewIeattaTests"
     "from '@pages/"                "from '@expPages/"
     "@src/pages"                   "@src/expPages"
     "from './pages/home"           "from './expPages/home"
     "/../pages/"                   "/../expPages/"
     "('@pages/"                    "('@expPages/"
    )

    info "Start replacing strings"

    for ((j = 0; j < ${#ARRAY[@]}; j = j + 1)); do
        dest_filePath=${ARRAY[$j]} 

        FILE=`basename "$dest_filePath"`
        NAME=`echo "$FILE" | cut -d'.' -f1`
        EXTENSION=`echo "$FILE" | cut -d'.' -f2`

        for ((i = 0; i < ${#strings_array[@]}; i = i + 2)); do
            string_to_replace=${strings_array[$i]} 
            replace_string=${strings_array[$i + 1]}

            # info "  [Replacing] {${string_to_replace}} with {${replace_string}}"
            # info "replaced file Path: $dest_filePath, name: $NAME, extension: $EXTENSION"
    
            replace_lines_in_file_with_dest_path "$dest_filePath" "${string_to_replace}" "${replace_string}" 
        done
        
    done

    # /Volumes/MacUser/djzhang/Desktop/Migration-App/dest-project/ios/NewIeatta.xcodeproj/project.pbxproj
    NewIeatta_project_files=(
        "ios/NewIeatta.xcodeproj/project.pbxproj"
        "ios/NewExpensify.xcodeproj/project.pbxproj"
    )
        
    for ((j = 0; j < ${#NewIeatta_project_files[@]}; j = j + 1)); do
        filePath=${NewIeatta_project_files[$j]} 
        if [  -f "$DEST_PROJECT/${filePath}" ]; then
            info "Start replacing strings in ${filePath}"
            replace_lines_in_file "${filePath}" "NewExpensify" "NewIeatta"
        fi
    done

    info "End replacing strings"
    # info ""
}

function move_pages_to_exppages() {
    step=$((step + 1))
    info "Start moving 'pages' to 'expPages"

    exist_string="expPages"

    add_lines_in_file 'tsconfig.json'    "$exist_string"      '"@pages/\*": \["\./src/pages/\*"\],'           '            "@expPages/\*": \["./src/expPages/\*\"],'  
    add_lines_in_file ".eslintrc.js"     "$exist_string"      "'@pages': './src/pages',"                      "            '@expPages': './src/expPages',"            
    add_lines_in_file "babel.config.js"  "$exist_string"      "'@pages': './src/pages',"                      "            '@expPages': './src/expPages',"            
    webpack_array_string=(
        "            // eslint-disable-next-line @typescript-eslint/naming-convention" 
        "            '@expPages': path.resolve(__dirname, '../../src/expPages/'),"
    )
    join_by webpack_add_lines "\n" "${webpack_array_string[@]}"
    add_lines_in_file \
        'config/webpack/webpack.common.ts' \
        "$exist_string" \
        "'@pages': path.resolve(__dirname, '../../src/pages/')," \
        "$webpack_add_lines" \
        

    if [  -f "$DEST_PROJECT/src/pages/home/ReportScreen.tsx" ]; then
        info "Start moving 'src/pages' to 'src/expPages"
        if [ ! -d "$DEST_PROJECT/src/expPages" ]; then
            mv "$DEST_PROJECT/src/pages" "$DEST_PROJECT/src/expPages"
        else
            error "'src/expPages' already exists"
        fi
        info "End moving 'src/pages' to 'src/expPages"
    fi

    info "Start copying 'src/libs/Navigation' to 'src/libs/NavigationLast"
    copy_folder  "$DEST_PROJECT/src/libs/Navigation" "$DEST_PROJECT/src/libs/NavigationLast" "delete"
    info "End copying 'src/libs/Navigation' to 'src/libs/NavigationLast"
}

function rename_Xcode_Project() {
    step=$((step + 1))
    info "Start rename Xcode Project"

    project_files=(
        "ios/NewExpensify/NewExpensifyDebugAdHoc.entitlements"  "ios/NewExpensify/NewIeattaDebugAdHoc.entitlements"
        "ios/NewExpensify/NewExpensifyDebugDevelopment.entitlements"    "ios/NewExpensify/NewIeattaDebugDevelopment.entitlements"
        "ios/NewExpensify/NewExpensifyDebugProduction.entitlements"    "ios/NewExpensify/NewIeattaDebugProduction.entitlements"
        "ios/NewExpensify/NewExpensifyDebugProduction.entitlements"    "ios/NewExpensify/NewIeattaDebugProduction.entitlements"
        "ios/NewExpensify/NewExpensifyReleaseAdHoc.entitlements"    "ios/NewExpensify/NewIeattaReleaseAdHoc.entitlements"
        "ios/NewExpensify/NewExpensifyReleaseDevelopment.entitlements"    "ios/NewExpensify/NewIeattaReleaseDevelopment.entitlements"
        "ios/NewExpensify/NewExpensifyReleaseProduction.entitlements"    "ios/NewExpensify/NewIeattaReleaseProduction.entitlements"

        "ios/NewExpensify.xcodeproj/xcshareddata/xcschemes/New Expensify.xcscheme"    "ios/NewExpensify.xcodeproj/xcshareddata/xcschemes/New Ieatta.xcscheme"
        "ios/NewExpensify.xcodeproj/xcshareddata/xcschemes/New Expensify AdHoc.xcscheme"    "ios/NewExpensify.xcodeproj/xcshareddata/xcschemes/New Ieatta AdHoc.xcscheme"
        "ios/NewExpensify.xcodeproj/xcshareddata/xcschemes/New Expensify Dev.xcscheme"    "ios/NewExpensify.xcodeproj/xcshareddata/xcschemes/New Ieatta Dev.xcscheme"
    )

    for ((j = 0; j < ${#project_files[@]}; j = j + 2)); do
        source_file=${project_files[$j]} 
        target_file=${project_files[$j + 1]}

        if [  -f "$DEST_PROJECT/${source_file}" ]; then
            info "  Rename ios file: source: $source_file, dest: $target_file"
            mv "$DEST_PROJECT/${source_file}" "$DEST_PROJECT/${target_file}"
        fi
    done


   project_folders=(
      "ios/NewExpensify.xcodeproj"       "ios/NewIeatta.xcodeproj" 
      "ios/NewExpensify.xcworkspace"      "ios/NewIeatta.xcworkspace"
      "ios/NewExpensifyTests"      "ios/NewIeattaTests"
      "ios/NewExpensify"      "ios/NewIeatta"
   ) 

    for ((j = 0; j < ${#project_folders[@]}; j = j + 2)); do
        source_folder=${project_folders[$j]} 
        target_folder=${project_folders[$j + 1]}

        if [  -d "$DEST_PROJECT/${source_folder}" ]; then
            info "  Rename ios folder: source: $source_folder, dest: $target_folder"
            mv "$DEST_PROJECT/${source_folder}" "$DEST_PROJECT/${target_folder}"
        fi
    done

   # replace_lines_in_file "ios/Podfile" "# :ccache_enabled => true"     ":ccache_enabled => true" 

   check_and_copy_files  "ios/GoogleService-Info.plist"
}

function rename_Android_project() {
    step=$((step + 1))
    info "Start renaming Android project"

    source_main_package="android/app/src/main/java/com/expensify/chat"
    target_main_package="android/app/src/main/java/com/ieatta/track"

    if [  -d "$DEST_PROJECT/android/app/src/main/java/com/expensify/chat" ]; then
        mv "$DEST_PROJECT/android/app/src/main/java/com/expensify/chat" "$DEST_PROJECT/android/app/src/main/java/com/expensify/track"
    fi
    if [  -d "$DEST_PROJECT/android/app/src/main/java/com/expensify" ]; then
        mv "$DEST_PROJECT/android/app/src/main/java/com/expensify" "$DEST_PROJECT/android/app/src/main/java/com/ieatta"
    fi

   check_and_copy_files   "android/app/google-services.json"

   # !my-upload-key.keystore
   check_and_copy_files "android/app/my-upload-key.keystore"
}

function prepare_run_apps() {
   step=$((step + 1))
   info "Start preparing run-apps"

   info "Start removing unnecessary files [docs]"
   rm -rf "$DEST_PROJECT/docs"

   remove_keys_in_package_json "['devDependencies']['@kie/act-js']"
   remove_keys_in_package_json "['devDependencies']['shellcheck']"


   check_replace_lines_in_file \
         "scripts/pod-install.sh" \
         "Podspecsxxx" \
         "ios/Pods/Local Podspecs" \
         "ios/Pods/Local Podspecsxxx"  

   # npx rnef run:ios --device "iPhone 16 Plus" --verbose --configuration $IOS_MODE --scheme "$SCHEME"
   check_replace_lines_in_file \
         "scripts/run-build.sh" \
         'run:ios --device "iPhone 16 Plus" --verbose' \
         'run:ios --configuration'  \
         'run:ios --device "iPhone 16 Plus" --verbose --configuration'  
            
   # sed -i '' -e "s|'ios/Pods/Local Podspecs'|'ios/Pods/Local Podspecs xxx'|gI" "${DEST_PROJECT}/scripts/pod-install.sh" 
   # sed -i '' -e "s|run-ios --list-devices|run-ios --simulator \"iPhone 16 Plus\"|gI" "${DEST_PROJECT}/scripts/run-build.sh" 
}

function replace_all_in_dest_project() {
    if [ ! -d "$DEST_PROJECT/src/pages/searchPages/restaurants" ]; then
        move_pages_to_exppages
        replace_app_identifier
    else
        info "'ieatta' pages already exist"
    fi
}

prepare_run_apps
edit_git_ignore
replace_all_in_dest_project
rename_Xcode_Project
rename_Android_project
summary_end $step "6"


