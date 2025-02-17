// eslint-disable-next-line lodash/import-scope
import React from 'react';
import {Image, View} from 'react-native';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import Text from '@components/Text';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
// import withLocalize, {withLocalizePropTypes} from '@components/withLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import variables from '@styles/variables';

// const propTypes = {
//     ...withLocalizePropTypes,
//     shouldShowSmallScreen: PropTypes.bool,
// };
//
// const defaultProps = {
//     shouldShowSmallScreen: false,
// };

// eslint-disable-next-line @typescript-eslint/ban-types
type CommonFooterProps = {};
function CommonFooter(props: CommonFooterProps) {
    const styles = useThemeStyles();
    const {windowWidth, windowHeight} = useWindowDimensions();
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
            height: variables.footerImageDesktopHeight,
            width: variables.footerImageDesktopWidth,
        };
    }

    if (windowHeight < 400) {
        return null;
    }

    return (
        <View style={[styles.mb8]}>
            <View style={[styles.footerBottomLogo, styles.alignItemsCenter]}>
                <Image
                    source={Ieattaicons.FooterCityscape}
                    style={[styles.alignSelfCenter, imageSize]}
                />
                <Text style={[styles.mt8]}>Copyright © 2004–2020 Ieatta Inc. Ieatta,and related marks are registered trademarks of Ieatta.</Text>
            </View>
        </View>
    );
}

CommonFooter.displayName = 'CommonFooter';

export default CommonFooter;
