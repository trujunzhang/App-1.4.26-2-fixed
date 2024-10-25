import React from 'react';
import {View} from 'react-native';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import variables from '@styles/variables';
import SignInHeroImage from './SignInHeroImage';

function SignInPageHero() {
    const styles = useThemeStyles();
    const {windowWidth} = useWindowDimensions();
    return (
        <View style={[windowWidth <= variables.tabletResponsiveWidthBreakpoint ? styles.flexColumn : styles.flexColumn, styles.pt20, styles.alignSelfCenter]}>
            <View style={[styles.alignSelfCenter]}>
                <SignInHeroImage />
            </View>
        </View>
    );
}

SignInPageHero.displayName = 'SignInPageHero';

export default SignInPageHero;
