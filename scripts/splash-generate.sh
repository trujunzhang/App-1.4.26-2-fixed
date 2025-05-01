#!/bin/bash

# https://apetools.webprofusion.com/#/tools/imagegorilla

# Use functions and variables from the utils script
source scripts/shellUtils.sh

iosFolderName="NewIeatta"
androidSplashFold="./AppIconsSplash/androidSplash"
androidAppMainResFold="android/app/src/main/res"

iosSplashFold="./AppIconsSplash/iosSplash"
iosAppImagesFold="ios/$iosFolderName/Images.xcassets"

androidResFolders=(
    "drawable-hdpi"
    "drawable-mdpi"
    "drawable-xhdpi"
    "drawable-xxhdpi"
    "drawable-xxxhdpi"
)

iosResFolders=(
    "BootSplashLogo.imageset"
    "BootSplashLogoAdHoc.imageset"
    "BootSplashLogoDev.imageset"
)


info "Android & iOS splash generator for React Native"

generateAndroidSplash() {
    for ((j = 0; j < ${#androidResFolders[@]}; j = j + 1)); do
        foldName=${androidResFolders[$j]} 

        source="$androidSplashFold/$foldName/screen.png"
        dest="$androidAppMainResFold/$foldName/bootsplash_logo.png"

        info "Android splash: $foldName"
        info "  source: $source"
        info "  dest: $dest"

        rm -rf "$dest"
        cp "$source" "$dest"
    done
}

generateIosSplash() {
    for ((j = 0; j < ${#iosResFolders[@]}; j = j + 1)); do
        foldName=${iosResFolders[$j]} 

        source="$iosSplashFold/$foldName"
        dest="$iosAppImagesFold/$foldName"

        info "ios splash: $foldName"
        info "  source: $source"
        info "  dest: $dest"

        rm -rf "$dest"
        cp -Rp "$source" "$dest"
    done

    rm -rf "ios/$iosFolderName/BootSplash.storyboard"
    cp -Rp "AppIconsSplash/iosSplash/BootSplash.storyboard" "ios/$iosFolderName/BootSplash.storyboard"
}

generateAndroidSplash
generateIosSplash



