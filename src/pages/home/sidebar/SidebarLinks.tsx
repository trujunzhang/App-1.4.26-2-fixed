import _ from 'lodash';
import React, {useCallback, useEffect, useRef} from 'react';
import {InteractionManager, StyleSheet, View} from 'react-native';
import type {EdgeInsets} from 'react-native-safe-area-context';
import {NativeHeader, WebHeader} from '@components/AppHeader';
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
import Navigation from '@libs/Navigation/Navigation';
import onyxSubscribe from '@libs/onyxSubscribe';
import * as App from '@userActions/App';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBRestaurant} from '@src/types/firebase';

type SidebarLinksProps = {
    insets: EdgeInsets;
    restaurantListItems: IFBRestaurant[];
    fetchMoreRestaurants: () => void;
    isLoading: boolean;
    shouldShowRadar?: boolean;
    shouldShowFBFirstSync?: boolean;
};

function SidebarLinks({insets, restaurantListItems, fetchMoreRestaurants, isLoading, shouldShowRadar = false, shouldShowFBFirstSync = false}: SidebarLinksProps) {
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
                // if (modal.current.willAlertModalBecomeVisible) {
                //     return;
                // }

                Navigation.dismissModal();
            },
            shortcutConfig.descriptionKey,
            shortcutConfig.modifiers,
            true,
            true,
        );

        // RestaurantActionContextMenu.hideContextMenu(false);

        return () => {
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
        // Navigation.navigate(ROUTES.SEARCH);
    }, []);

    // Log.info('restaurantListItems:' + restaurantListItems.length)

    return (
        <View style={[styles.flex1, styles.h100]}>
            {isSmallScreenWidth ? <NativeHeader shouldShowLocalPhotosIcon /> : <WebHeader />}
            <View style={[styles.pRelative, styles.flex1]}>
                {!shouldShowFBFirstSync && isLoading && restaurantListItems.length === 0 && (
                    <View style={[StyleSheet.absoluteFillObject, styles.highlightBG]}>
                        <OptionsListSkeletonView shouldAnimate />
                    </View>
                )}
                <LHNRestaurantsList
                    style={[styles.flex1]}
                    contentContainerStyles={StyleSheet.flatten([styles.sidebarListContainer, {paddingBottom: StyleUtils.getSafeAreaMargins(insets).marginBottom}])}
                    listItems={restaurantListItems}
                    fetchMoreRestaurants={fetchMoreRestaurants}
                />
                {!shouldShowFBFirstSync && shouldShowRadar && (
                    <View style={[styles.flex1, styles.pAbsolute, styles.pInset]}>
                        <View style={[styles.flex1, styles.pt20, {backgroundColor: '#2D7086'}]}>
                            <Lottie
                                source={LottieAnimations.Radar}
                                loop
                                autoPlay
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
                            />
                            <Text style={[styles.mt11, styles.textAlignCenter, styles.textLabel, styles.textWhite]}>{translate('sidebar.syncDB.message')}</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

SidebarLinks.displayName = 'SidebarLinks';
export default SidebarLinks;
