import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import Text from '@components/Text';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import TailwindColors from '@styles/tailwindcss/colors';

type BaseGoogleButtonProps = {
    isLoading: boolean;
};

function BaseGoogleButton({isLoading}: BaseGoogleButtonProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    return (
        <View style={[styles.flexRow, styles.shadowMd, styles.ph4, styles.pv2, styles.mt2, styles.mb1, styles.gap2]}>
            {isLoading ? (
                <ActivityIndicator
                    color={theme.textSupporting}
                    style={[]}
                />
            ) : (
                <Image
                    style={styles.signInGoogleLogoIcon}
                    source={Ieattaicons.GoogleLogoIcon}
                />
            )}
            <Text style={[styles.signInGoogleLogoText, styles.colorTextSupporting, styles.alignItemsCenter]}>Sign In with Google</Text>
        </View>
    );
}

BaseGoogleButton.displayName = 'BaseGoogleButton';

export default BaseGoogleButton;
