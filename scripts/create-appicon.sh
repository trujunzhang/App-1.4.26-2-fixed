#!/bin/bash


# Use functions and variables from the utils script
source scripts/shellUtils.sh

iosFolderName="NewIeatta"

info "Android & iOS icon generator for React Native"

createIcons() {
    iconset create -d --flavor AdHoc ./assets/appIcons/icon-adHoc.png
    iconset create -d --flavor Development ./assets/appIcons/icon-dev.png
    iconset create -d --flavor Dev ./assets/appIcons/icon-dev.png
    iconset create -d ./assets/appIcons/icon.png
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
createAdaptiveIcons "adhoc" "ic_launcher_foreground.png"
