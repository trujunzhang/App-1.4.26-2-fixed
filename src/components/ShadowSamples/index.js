import React from 'react';
import {View} from 'react-native';
import Text from '@components/Text';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import TailwindColors from '@styles/tailwindcss/colors';

function ShadowSamples() {
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();

    const shadowStyles = {
        't.shadow': {
            size: 64,
            title: 'Shadow',
            style: styles.shadow,
        },
        't.shadowMd': {
            size: 80,
            title: 'ShadowMd',
            style: styles.shadowMd,
        },
        't.shadowLg': {
            size: 96,
            title: 'ShadowLg',
            style: styles.shadowLg,
        },
        't.shadowXl': {
            size: 112,
            title: 'ShadowXl',
            style: styles.shadowXl,
        },
        't.shadow2xl': {
            size: 128,
            title: 'Shadow2xl',
            style: styles.shadow2xl,
        },
        't.shadowInner': {
            size: 136,
            title: 'ShadowInner',
            style: styles.shadowInner,
        },
        't.shadowOutline': {
            size: 148,
            title: 'ShadowOutline',
            style: styles.shadowOutline,
        },
        't.shadowNone': {
            size: 156,
            title: 'ShadowNone',
            style: styles.shadowNone,
        },
    };

    const renderShadow = (type) => {
        const shadowStyle = shadowStyles[type];

        return (
            <View
                key={type}
                style={[{width: shadowStyle.size, height: shadowStyle.size}, styles.mh4, {backgroundColor: 'white'}, styles.alignItemsCenter, styles.justifyContentCenter, shadowStyle.style]}
            >
                <Text style={[styles.textStrong, styles.label, {color: TailwindColors.gray500}]}>{shadowStyle.title}</Text>
            </View>
        );
    };

    return (
        <View style={[styles.flexRow, styles.alignItemsCenter, styles.pv10, styles.ph5, {backgroundColor: TailwindColors.gray200}]}>
            {
                // eslint-disable-next-line rulesdir/prefer-underscore-method
                Object.keys(shadowStyles).map((key) => {
                    return renderShadow(key);
                })
            }
        </View>
    );
}

export default ShadowSamples;
