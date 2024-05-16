import PropTypes from 'prop-types';
import React, {useCallback, useRef} from 'react';
import {Keyboard, View} from 'react-native';
import LogoComponent from '@assets/images/expensify-wordmark.svg';
import Header from '@components/Header';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import ImageSVG from '@components/ImageSVG';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import Tooltip from '@components/Tooltip';
import useLocalize from '@hooks/useLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import Navigation from '@navigation/Navigation';
import SignInOrAvatarWithOptionalStatus from '@pages/home/sidebar/SignInOrAvatarWithOptionalStatus';
import {restaurantPropTypes} from '@pages/proptypes';
import variables from '@styles/variables';
import * as Session from '@userActions/Session';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';

const propTypes = {
    shouldShowBackButton: PropTypes.bool,
    onBackButtonPress: PropTypes.func,
    // eslint-disable-next-line react/require-default-props
    iconFill: PropTypes.string,

    shouldShowSearchIcon: PropTypes.bool,
    shouldShowAvatar: PropTypes.bool,
};

const defaultProps = {
    shouldShowBackButton: false,
    onBackButtonPress: () => Navigation.goBack(ROUTES.HOME),
    shouldShowSearchIcon: true,
    shouldShowAvatar: true,
};

function NativeHeader({shouldShowBackButton, onBackButtonPress, iconFill, shouldShowSearchIcon, shouldShowAvatar}) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const modal = useRef({});
    const {translate, updateLocale} = useLocalize();
    const {isSmallScreenWidth} = useWindowDimensions();

    const isCreateMenuOpen = false;

    const showSearchPage = useCallback(() => {
        // Navigation.navigate(ROUTES.SEARCH);
        Navigation.openSideBarDrawer();
    }, []);

    // @ts-ignore
    return (
        <View
            style={[styles.flexRow, styles.pr5, shouldShowBackButton ? styles.pl2 : styles.pl5, styles.pv3, styles.justifyContentBetween, styles.alignItemsCenter]}
            dataSet={{dragArea: true}}
        >
            {shouldShowBackButton ? (
                <Tooltip text={translate('common.back')}>
                    <PressableWithoutFeedback
                        onPress={() => {
                            // if (isKeyboardShown) {
                            //     Keyboard.dismiss();
                            // }
                            // const topmostReportId = Navigation.getTopmostReportId();
                            // if (shouldNavigateToTopMostReport && topmostReportId) {
                            //     Navigation.navigate(ROUTES.REPORT_WITH_ID.getRoute(topmostReportId));
                            // } else {
                            onBackButtonPress();
                            // }
                        }}
                        style={[styles.touchableButtonImage]}
                        role="button"
                        accessibilityLabel={translate('common.back')}
                        nativeID={CONST.BACK_BUTTON_NATIVE_ID}
                    >
                        <Icon
                            src={Expensicons.BackArrow}
                            fill={iconFill ?? theme.icon}
                        />
                    </PressableWithoutFeedback>
                </Tooltip>
            ) : (
                <Tooltip text={translate('common.search')}>
                    <PressableWithoutFeedback
                        accessibilityLabel={translate('sidebarScreen.buttonSearch')}
                        role={CONST.ROLE.BUTTON}
                        style={[styles.flexRow]}
                        onPress={Session.checkIfActionIsAllowed(showSearchPage)}
                    >
                        <Icon
                            fill={theme.icon}
                            src={Expensicons.IconMenu}
                            width={variables.iconMenuSizeWidth}
                            height={variables.iconMenuSizeHeight}
                        />
                    </PressableWithoutFeedback>
                </Tooltip>
            )}
            <Header
                title={translate('sidebar.header.title')}
                subtitle={translate('sidebar.header.subTitle')}
                textStyles={[styles.textAlignCenter]}
                role={CONST.ROLE.PRESENTATION}
                shouldShowEnvironmentBadge={false}
            />
            {shouldShowSearchIcon && (
                <Tooltip text={translate('common.search')}>
                    <PressableWithoutFeedback
                        accessibilityLabel={translate('sidebarScreen.buttonSearch')}
                        role={CONST.ROLE.BUTTON}
                        style={[styles.flexRow, styles.ph5]}
                        onPress={Session.checkIfActionIsAllowed(showSearchPage)}
                    >
                        <Icon
                            fill={theme.icon}
                            src={Expensicons.MagnifyingGlass}
                        />
                    </PressableWithoutFeedback>
                </Tooltip>
            )}
            {shouldShowAvatar && <SignInOrAvatarWithOptionalStatus isCreateMenuOpen={isCreateMenuOpen} />}
        </View>
    );
}

NativeHeader.propTypes = propTypes;
NativeHeader.defaultProps = defaultProps;
NativeHeader.displayName = 'NativeHeader';

export default NativeHeader;
