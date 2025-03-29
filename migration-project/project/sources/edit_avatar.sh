#!/bin/bash

function avatar_js_comment_Icon() {
    avatar_js="src/components/Avatar.tsx"

    dest_path="$DEST_PROJECT/$avatar_js"
    checkString="//                     <Icon"
    if  grep "$checkString" $dest_path; then
        error "  $checkString already exists in $dest_path"
    else
        success "  $checkString not exists in $dest_path"
        node "$SOURCE_PROJECT/migration-project/js/comment-file.js" "$DEST_PROJECT/$avatar_js" "withReturn|Icon|singleLine"
    fi

    add_lines_in_file \
         "$avatar_js" \
         "renderAvatar()" \
         ") : (" \
         "                renderAvatar()"  \
         
}

function avatar_js_add_render_avatar() {
    avatar_js="src/components/Avatar.tsx"

    components_line="return ("
    components_rules_lines=(
        ""
        "    const commonIcon = () => {"
        "        if (typeof avatarSource === 'string') {"
        "            return null;"
        "        }"
        "        return ("
        "            <View style={iconStyle}>"
        "                <Icon"
        "                    testID={fallbackAvatarTestID}"
        "                    src={avatarSource}"
        "                    height={iconSize}"
        "                    width={iconSize}"
        "                    fill={imageError ? iconColors?.fill ?? theme.offline : iconColors?.fill ?? fill}"
        "                    additionalStyles={[StyleUtils.getAvatarBorderStyle(size, type), iconColors, iconAdditionalStyles]}"
        "                />"
        "            </View>"
        "        );"
        "    };"
        ""
        "    const commonAvatar = (sourceUri: string \| undefined) => ("
        "        <View"
        '            testID="AvatarWrapper"'
        "            style={RNStyleSheet.flatten(StyleUtils.getAvatarStyle(size))}"
        "        >"
        "            <ImagePlaceholder"
        "                sourceUri={sourceUri}"
        "                style={RNStyleSheet.flatten(StyleUtils.getAvatarStyle(size))}"
        '                imageType="png"'
        "                placeholder={Ieattaicons.User60Square}"
        "            />"
        "        </View>"
        "    );"
        ""
        "    const renderAvatar = () => {"
        "        if (shouldShowAsAvatar) {"
        "            return commonAvatar(avatarUrl);"
        "        }"
        "        if (type === CONST.ICON_TYPE_AVATAR) {"
        "            return commonAvatar(source as string);"
        "        }"
        "        return commonIcon();"
        "    };"
        ""
        "$components_line"
    )
    join_by components_rules_string "\n" "${components_rules_lines[@]}"

    check_replace_lines_in_file \
         "$avatar_js" \
         'testID="AvatarWrapper"' \
         "$components_line" \
         "$components_rules_string"  
}

function EDIT_avatar_js() {
    step=$((step + 1))
    info "Start editing avatar"

    avatar_js="src/components/Avatar.tsx"

    check_replace_lines_in_file \
         "$avatar_js" \
         "StyleSheet as RNStyleSheet" \
         "import {View} from 'react-native';" \
         "import {StyleSheet as RNStyleSheet, View} from 'react-native';"  \


    define_line="import CONST from '@src/CONST';"   \
    define_rules_lines=(
        "import ImagePlaceholder from './ImagePlaceholder';" 
        "import * as Ieattaicons from './Icon/Ieattaicons';"
    )
    join_by define_rules_string "\n" "${define_rules_lines[@]}"

    add_lines_in_file \
         "$avatar_js" \
         "import ImagePlaceholder" \
         "$define_line" \
         "$define_rules_string"  \
         


    define_line="type AvatarProps = {"
    define_rules_lines=(
        "    /** fields for Ieatta */"
        "    avatarUrl?: string;"
        "    shouldShowAsAvatar?: boolean;"
        ""
    )
    join_by define_rules_string "\n" "${define_rules_lines[@]}"

    add_lines_in_file \
         "$avatar_js" \
         "avatarUrl?" \
         "$define_line" \
         "$define_rules_string"  \
         


    define_line="function Avatar({"
    define_rules_lines=(
        "    /** fields for Ieatta */"
        "    avatarUrl,"
        "    shouldShowAsAvatar = false,"
    )
    join_by define_rules_string "\n" "${define_rules_lines[@]}"

    add_lines_in_file \
         "$avatar_js" \
         "shouldShowAsAvatar = false," \
         "$define_line" \
         "$define_rules_string"  \
         

    avatar_js_comment_Icon
    avatar_js_add_render_avatar
}

