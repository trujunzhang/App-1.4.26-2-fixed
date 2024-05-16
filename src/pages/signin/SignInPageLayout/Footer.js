import PropTypes from 'prop-types';
import React from 'react';
import {Image, View} from 'react-native';
import _ from 'underscore';
import * as Illustrations from '@components/Icon/Illustrations';
import Text from '@components/Text';
import TextLink from '@components/TextLink';
import withLocalize, {withLocalizePropTypes} from '@components/withLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import variables from '@styles/variables';
import * as Session from '@userActions/Session';
import CONST from '@src/CONST';

const propTypes = {
    ...withLocalizePropTypes,
    shouldShowSmallScreen: PropTypes.bool,
};

const defaultProps = {
    shouldShowSmallScreen: false,
};

const navigateHome = (scrollPageToTop) => {
    scrollPageToTop();

    // We need to clear sign in data in case the user is already in the ValidateCodeForm or PasswordForm pages
    Session.clearSignInData();
};

function Footer(props) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const {windowWidth, windowHeight} = useWindowDimensions();
    const StyleUtils = useStyleUtils();
    const imageDirection = styles.flexColumn;
    const imageStyle = styles.alignSelfCenter;
    const columnDirection = styles.flexRow;
    const pageFooterWrapper = [styles.footerWrapper];
    const footerWrapper = [];

    let imageSize;
    if (props.isSmallScreenWidth || props.shouldShowSmallScreen) {
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
            height: variables.footerImageDesktopHeight,
            width: variables.footerImageDesktopWidth,
        };
    }

    if (windowHeight < 400) {
        return null;
    }

    return (
        <View style={[styles.bottomContainer, styles.rightFlexBox]}>
            <View style={[styles.footerBottomLogo, styles.alignItemsCenter]}>
                <Image
                    source={Illustrations.FooterCityscape}
                    style={[styles.alignSelfCenter, imageSize]}
                />
                <Text style={[styles.footerBottomLogoText, styles.mt8]}>Copyright © 2004–2020 Ieatta Inc. Ieatta,and related marks are registered trademarks of Ieatta.</Text>
            </View>
        </View>
    );
}

Footer.propTypes = propTypes;
Footer.displayName = 'Footer';
Footer.defaultProps = defaultProps;

export default withLocalize(Footer);
