#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# echo "dir:  >>> $DIR"


DEFAULTVALUE="all"
Params="${1:-$DEFAULTVALUE}"

# CURRENT=`pwd`
CURRENT="$(dirname "$DIR")"

projectPath="${CURRENT}"

package_version="unknown"

# Check if 'package.json' exists
if [[ -f "$projectPath/package.json" ]]; then
    # Read the 'name' field from 'package.json'
    package_version=$(jq -r '.version' "$projectPath/package.json" 2>/dev/null)
fi

ANDROID_APK_FILE="$projectPath/android/app/build/outputs/apk/production/release/app-production-release.apk"
MAC_DMG_FILE="$projectPath/desktop-build/NewIeatta.dmg"

DIST_FOLD="$projectPath/dist-apps"
DIST_APK_FILE="$DIST_FOLD/NewIeatta-v$package_version.apk"
DIST_DMG_FILE="$DIST_FOLD/NewIeatta-v$package_version.dmg"

echo "                         "
echo "==============================================================="
echo "Bash version ${BASH_VERSION}..."
echo "                         "
echo "project path:    $projectPath"
echo "package version: $package_version"
echo "android file:    $ANDROID_APK_FILE"
echo "mac file:        $MAC_DMG_FILE"
echo "dist folder:     $DIST_FOLD"
echo "dist apk file:   $DIST_APK_FILE"
echo "dist dmg file:   $DIST_DMG_FILE"
echo "==============================================================="
echo "                         "

rm -rf "$DIST_FOLD"
mkdir -p "$DIST_FOLD"

copy_apk_file() {
    echo "copy apk file:"
    if [  -f "$ANDROID_APK_FILE" ]; then
        echo "  android apk file: $ANDROID_APK_FILE"

        if [ "$package_version" = "unknown" ]; then
           echo "app version is unknown"
        else
           cp "$ANDROID_APK_FILE" "$DIST_APK_FILE"
        fi
    fi
}

copy_dmg_file() {
    echo "copy dmg file:"
    if [  -f "$MAC_DMG_FILE" ]; then
        echo " Mac DMG file: $ANDROID_APK_FILE"
        cp "$MAC_DMG_FILE" "$DIST_DMG_FILE"
    fi
}

if [ "$Params" = "all" ]; then
    copy_apk_file
    copy_dmg_file
elif [ "$Params" = "apk" ]; then
    copy_apk_file
elif [ "$Params" = "dmg" ]; then
    copy_dmg_file
fi



