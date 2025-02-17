import React from 'react';
import {Image} from 'react-native';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';

function SignInHeroImage() {
    const styles = useThemeStyles();
    const {isSmallScreenWidth, isMediumScreenWidth} = useResponsiveLayout();
    let imageSize;
    if (isSmallScreenWidth) {
        imageSize = {
            height: variables.signInHeroImageMobileHeight,
            width: variables.signInHeroImageMobileWidth,
        };
    } else if (isMediumScreenWidth) {
        imageSize = {
            height: variables.signInHeroImageTabletHeight,
            width: variables.signInHeroImageTabletWidth,
        };
    } else {
        imageSize = {
            height: variables.signInHeroImageDesktopHeight,
            width: variables.signInHeroImageDesktopWidth,
        };
    }

    return (
        <Image
            source={Ieattaicons.SignupIllustration}
            style={[styles.alignSelfCenter, imageSize]}
        />
    );
}

SignInHeroImage.displayName = 'SignInHeroImage';

export default SignInHeroImage;
