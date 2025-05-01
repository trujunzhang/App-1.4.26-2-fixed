#!/bin/bash

# https://apetools.webprofusion.com/#/tools/imagegorilla

# Use functions and variables from the utils script
source scripts/shellUtils.sh

iosFolderName="NewIeatta"
appIconsFold="./AppIconsSplash/appIcons"

info "Android & iOS icon generator for React Native"

createIcons() {
    npx iconset create -d --flavor AdHoc $appIconsFold/icon-adHoc.png
    npx iconset create -d --flavor Development $appIconsFold/icon-dev.png
    npx iconset create -d --flavor Dev $appIconsFold/icon-dev.png
    npx iconset create -d $appIconsFold/icon.png
}

onPrefix() {
    rm -rf "ios/${iosFolderName}/Images.xcassets/AppIcon.appiconset"
    rm -rf "ios/${iosFolderName}/Images.xcassets/AppIconAdHoc.appiconset"
    rm -rf "ios/${iosFolderName}/Images.xcassets/AppIconDev.appiconset"
}


onPost() {
    rm -rf "android/app/src/dev"
    rm -rf "ios/${iosFolderName}/Images.xcassets/AppIcon-Development.appiconset"
    mv "ios/${iosFolderName}/Images.xcassets/AppIcon-AdHoc.appiconset"     "ios/${iosFolderName}/Images.xcassets/AppIconAdHoc.appiconset"
    mv "ios/${iosFolderName}/Images.xcassets/AppIcon-Dev.appiconset"       "ios/${iosFolderName}/Images.xcassets/AppIconDev.appiconset"
}

onPostOnAndroid() {
    rm -rf "android/app/src/main/res/drawable/ic_launcher.png"
    cp "android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png" "android/app/src/main/res/drawable/ic_launcher.png"
    rm -rf "android/app/src/main/res/drawable/ic_launcher_monochrome.png"
    cp "AppIconsSplash/appIcons/ic_launcher_monochrome.png" "android/app/src/main/res/drawable/ic_launcher_monochrome.png"
    rm -rf "android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml"
    cp "AppIconsSplash/appIcons/mipmap-anydpi-v26/ic_launcher.xml" "android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml"
}

createAdaptiveIcons() {
    androidIcons=(
        'mipmap-mdpi'
        'mipmap-hdpi'
        'mipmap-xhdpi'
        'mipmap-xxhdpi'
        'mipmap-xxxhdpi'
    )

    flavor=$1
    filename=$2

    info ""
    info "flavor: ${flavor}, filename: ${filename}"

    androidResDirectory="android/app/src/${flavor}/res/";
    info "androidResDirectory: ${androidResDirectory}"

    for (( i=0; i<${#androidIcons[@]}; i=i+1 ));
    do
        androidIcon=${androidIcons[$i]}
        info "androidIcon $i is ${androidIcon}"
        iconDirectory="${androidResDirectory}${androidIcon}"
        info "iconDirectory is ${iconDirectory}"
        filePath="${iconDirectory}/${filename}"
        info "filePath is ${filePath}"
        ic_launcher_round_path="${iconDirectory}/ic_launcher_round.png"
        info "ic_launcher_round_path is ${ic_launcher_round_path}"
        cp "${ic_launcher_round_path}" "${filePath}"
    done
}

onPrefix
createIcons
onPost
onPostOnAndroid
createAdaptiveIcons "adhoc" "ic_launcher_foreground.png"
