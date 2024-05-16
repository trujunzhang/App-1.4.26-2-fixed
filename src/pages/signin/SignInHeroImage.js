import PropTypes from 'prop-types';
import React from 'react';
import {Image} from 'react-native';
import * as Illustrations from '@components/Icon/Illustrations';
import withWindowDimensions, {windowDimensionsPropTypes} from '@components/withWindowDimensions';
import useThemeStyles from '@hooks/useThemeStyles';
import variables from '@styles/variables';

const propTypes = {
    ...windowDimensionsPropTypes,

    shouldShowSmallScreen: PropTypes.bool,
};

const defaultProps = {
    shouldShowSmallScreen: false,
};

function SignInHeroImage(props) {
    const styles = useThemeStyles();
    let imageSize;
    if (props.isSmallScreenWidth) {
        imageSize = {
            height: variables.signInHeroImageMobileHeight,
            width: variables.signInHeroImageMobileWidth,
        };
    } else if (props.isMediumScreenWidth) {
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
SignInHeroImage.propTypes = propTypes;
SignInHeroImage.defaultProps = defaultProps;

export default withWindowDimensions(SignInHeroImage);
