import PropTypes from 'prop-types';
import React from 'react';
import {Image} from 'react-native';
import * as Illustrations from '@components/Icon/Illustrations';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import variables from '@styles/variables';

function SignInHeroImage() {
    const styles = useThemeStyles();
    const {isSmallScreenWidth, isMediumScreenWidth} = useWindowDimensions();
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
            source={Illustrations.SignupIllustration}
            style={[styles.alignSelfCenter, imageSize]}
        />
    );
}

SignInHeroImage.displayName = 'SignInHeroImage';

export default SignInHeroImage;
