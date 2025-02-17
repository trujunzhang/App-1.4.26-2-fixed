#!/bin/bash

function EDIT_metro_config_js() {
    metro_config_js="metro.config.js"

    default_source_lines="const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts;"
    default_additional_strings="const defaultAdditionalExts = require('metro-config/src/defaults/defaults').additionalExts;"
    add_lines_in_file \
        "$metro_config_js" \
        "const defaultAdditionalExts" \
        "$default_source_lines" \
        "$default_additional_strings" \
        "check"


    # sourceExts: [...(isE2ETesting ? e2eSourceExts : []), ...defaultSourceExts, ...defaultAdditionalExts, 'jsx'],
    check_replace_lines_in_file \
        "$metro_config_js" \
        "\.\.\.defaultAdditionalExts" \
        "...defaultSourceExts," \
        "...defaultSourceExts, ...defaultAdditionalExts,"

}
