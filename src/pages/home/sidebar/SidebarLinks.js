/* eslint-disable rulesdir/onyx-props-must-have-default */
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useRef} from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import NativeHeader from '@components/AppHeader/NativeHeader';
import WebHeader from '@components/AppHeader/WebHeader';
import LHNRestaurantsList from '@components/LHNRestaurantsList/LHNRestaurantsList';
import Lottie from '@components/Lottie';
import LottieAnimations from '@components/LottieAnimations';
import OptionsListSkeletonView from '@components/OptionsListSkeletonView';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import KeyboardShortcut from '@libs/KeyboardShortcut';
import Log from '@libs/Log';
import Navigation from '@libs/Navigation/Navigation';
import onyxSubscribe from '@libs/onyxSubscribe';
import SidebarUtils from '@libs/SidebarUtils';
import {restaurantPropTypes} from '@pages/proptypes';
// import * as RestaurantActionContextMenu from '@expPages/home/report/ContextMenu/RestaurantActionContextMenu';
import safeAreaInsetPropTypes from '@expPages/safeAreaInsetPropTypes';
import * as App from '@userActions/App';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';

const basePropTypes = {
    /** Toggles the navigation menu open and closed */
    onLinkClick: PropTypes.func.isRequired,

    /** Safe area insets required for mobile devices margins */
    insets: safeAreaInsetPropTypes.isRequired,
};

const propTypes = {
    ...basePropTypes,

    restaurantListItems: PropTypes.arrayOf(restaurantPropTypes).isRequired,

    /** Callback to fire to load more restaurants */
    fetchMoreRestaurants: PropTypes.func.isRequired,

    isLoading: PropTypes.bool.isRequired,
    shouldShowRadar: PropTypes.bool,
    shouldShowFBFirstSync: PropTypes.bool,

    // eslint-disable-next-line react/require-default-props
    priorityMode: PropTypes.oneOf(_.values(CONST.PRIORITY_MODE)),

    isActiveRestaurant: PropTypes.func.isRequired,
};

const defaultProps = {
    shouldShowRadar: false,
    shouldShowFBFirstSync: false,
};

function SidebarLinks({
    onLinkClick,
    insets,
    restaurantListItems,
    fetchMoreRestaurants,
    isLoading,
    shouldShowRadar,
    shouldShowFBFirstSync,
    priorityMode = CONST.PRIORITY_MODE.DEFAULT,
    isActiveRestaurant,
    isCreateMenuOpen,
}) {
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const modal = useRef({});
    const {translate, updateLocale} = useLocalize();
    const {isSmallScreenWidth} = useWindowDimensions();

    useEffect(() => {
        if (!isSmallScreenWidth) {
            return;
        }
        App.confirmReadyToOpenApp();
    }, [isSmallScreenWidth]);

    useEffect(() => {
        App.setSidebarLoaded();
        SidebarUtils.setIsSidebarLoadedReady();

        InteractionManager.runAfterInteractions(() => {
            requestAnimationFrame(() => {
                updateLocale();
            });
        });

        const unsubscribeOnyxModal = onyxSubscribe({
            key: ONYXKEYS.MODAL,
            callback: (modalArg) => {
                if (_.isNull(modalArg) || typeof modalArg !== 'object') {
                    return;
                }
                modal.current = modalArg;
            },
        });

        const shortcutConfig = CONST.KEYBOARD_SHORTCUTS.ESCAPE;
        const unsubscribeEscapeKey = KeyboardShortcut.subscribe(
            shortcutConfig.shortcutKey,
            () => {
                if (modal.current.willAlertModalBecomeVisible) {
                    return;
                }

                Navigation.dismissModal();
            },
            shortcutConfig.descriptionKey,
            shortcutConfig.modifiers,
            true,
            true,
        );

        // RestaurantActionContextMenu.hideContextMenu(false);

        return () => {
            SidebarUtils.resetIsSidebarLoadedReadyPromise();
            if (unsubscribeEscapeKey) {
                unsubscribeEscapeKey();
            }
            if (unsubscribeOnyxModal) {
                unsubscribeOnyxModal();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showSearchPage = useCallback(() => {
        if (isCreateMenuOpen) {
            // Prevent opening Search page when click Search icon quickly after clicking FAB icon
            return;
        }

        Navigation.navigate(ROUTES.SEARCH);
    }, [isCreateMenuOpen]);

    /**
     * Show Restaurant page with selected report id
     *
     * @param {Object} option
     * @param {String} option.reportID
     */
    const showRestaurantPage = useCallback(
        (option) => {
            // Prevent opening Restaurant page when clicking LHN row quickly after clicking FAB icon
            // or when clicking the active LHN row on large screens
            // or when continuously clicking different LHNs, only apply to small screen
            // since getTopmostRestaurantId always returns on other devices
            const reportActionID = Navigation.getTopmostRestaurantActionId();
            if (
                isCreateMenuOpen ||
                (option.reportID === Navigation.getTopmostRestaurantId() && !reportActionID) ||
                (isSmallScreenWidth && isActiveRestaurant(option.reportID) && !reportActionID)
            ) {
                return;
            }
            // Navigation.navigate(ROUTES.REPORT_WITH_ID.getRoute(option.reportID));
            onLinkClick();
        },
        [isCreateMenuOpen, isSmallScreenWidth, isActiveRestaurant, onLinkClick],
    );

    const viewMode = priorityMode === CONST.PRIORITY_MODE.GSD ? CONST.OPTION_MODE.COMPACT : CONST.OPTION_MODE.DEFAULT;

    // Log.info('restaurantListItems:' + restaurantListItems.length)

    return (
        <View style={[styles.flex1, styles.h100]}>
            {isSmallScreenWidth ? <NativeHeader /> : <WebHeader />}
            <View style={[styles.pRelative, styles.flex1]}>
                {shouldShowFBFirstSync === false && isLoading && restaurantListItems.length === 0 && (
                    <View style={[StyleSheet.absoluteFillObject, styles.highlightBG]}>
                        <OptionsListSkeletonView shouldAnimate />
                    </View>
                )}
                <LHNRestaurantsList
                    style={styles.flex1}
                    contentContainerStyles={StyleSheet.flatten([styles.sidebarListContainer, {paddingBottom: StyleUtils.getSafeAreaMargins(insets).marginBottom}])}
                    listItems={restaurantListItems}
                    fetchMoreRestaurants={fetchMoreRestaurants}
                    onSelectRow={showRestaurantPage}
                    shouldDisableFocusOptions={isSmallScreenWidth}
                    optionMode={viewMode}
                />
                {shouldShowFBFirstSync === false && shouldShowRadar && (
                    <View style={[styles.flex1, styles.pAbsolute, styles.pInset]}>
                        <View style={[styles.flex1, styles.pt20, {backgroundColor: '#2D7086'}]}>
                            <Lottie
                                source={LottieAnimations.Radar}
                                loop
                                autoPlay
                                style={[styles.alignSelfCenter]}
                                webStyle={{...styles.alignSelfCenter}}
                            />
                            <Text style={[styles.mt11, styles.textAlignCenter, styles.textLabel, styles.textWhite]}>{translate('sidebar.search.message')}</Text>
                        </View>
                    </View>
                )}
                {shouldShowFBFirstSync && (
                    <View style={[styles.flex1, styles.pAbsolute, styles.pInset]}>
                        <View style={[styles.flex1, styles.pt20, {backgroundColor: '#2D7086'}]}>
                            <Lottie
                                source={LottieAnimations.SyncFirebase}
                                loop
                                autoPlay
                                style={[styles.alignSelfCenter]}
                                webStyle={{...styles.alignSelfCenter}}
                            />
                            <Text style={[styles.mt11, styles.textAlignCenter, styles.textLabel, styles.textWhite]}>{translate('sidebar.syncDB.message')}</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

SidebarLinks.propTypes = propTypes;
SidebarLinks.defaultProps = defaultProps;
SidebarLinks.displayName = 'SidebarLinks';
export default SidebarLinks;
export {basePropTypes};
