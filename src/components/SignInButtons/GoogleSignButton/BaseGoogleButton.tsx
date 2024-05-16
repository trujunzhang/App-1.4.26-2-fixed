import React from 'react';
import {ActivityIndicator, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Expensicons from '@components/Icon/Expensicons';
import Text from '@components/Text';
import withLocalize, {withLocalizePropTypes} from '@components/withLocalize';
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
                    color={TailwindColors.gray800}
                    style={[]}
                />
            ) : (
                <Image
                    style={styles.signInGoogleLogoIcon}
                    source={Expensicons.GoogleLogoIcon}
                />
            )}
            <Text style={[styles.signInGoogleLogoText, styles.alignItemsCenter]}>Sign In with Google</Text>
        </View>
    );
}

BaseGoogleButton.displayName = 'BaseGoogleButton';

export default BaseGoogleButton;
