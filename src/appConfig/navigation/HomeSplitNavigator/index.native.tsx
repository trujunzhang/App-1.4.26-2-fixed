/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {useRoute} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {useOnyx} from 'react-native-onyx';
import FocusTrapForScreens from '@components/FocusTrap/FocusTrapForScreen';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import {getLastRestaurantId} from '@libs/actions/ieatta/restaurant';
import createSplitNavigator from '@libs/Navigation/AppNavigator/createSplitNavigator';
import useSplitNavigatorScreenOptions from '@libs/Navigation/AppNavigator/useSplitNavigatorScreenOptions';
import {loadNativeHomeScreen, loadWebHomeScreen} from '@src/appConfig/navigation/home';
import {SidebarDrawNavigator} from '@src/appConfig/navigation/home/nativeHomeScreen';
import type {ReportsSplitNavigatorParamList} from '@src/appConfig/navigation/types';
import ONYXKEYS from '@src/ONYXKEYS';
import SCREENS from '@src/SCREENS';
import type ReactComponentModule from '@src/types/utils/ReactComponentModule';

type Screens = Partial<Record<keyof ReportsSplitNavigatorParamList, () => React.ComponentType>>;

const loadRestaurantScreen = () => require<ReactComponentModule>('@pages/home/RestaurantScreen').default;

const CENTRAL_MOBILE_PANE_HOME_SCREENS = {
    // [SCREENS.MOBILE_SMALL_SCREEN_SIDE_BAR]: () => require<ReactComponentModule>('@pages/home/sidebar/SidebarScreen').default,
} satisfies Screens;

const CENTRAL_WEB_PANE_HOME_SCREENS = {
    [SCREENS.EVENT]: () => require<ReactComponentModule>('@pages/home/EventScreen').default,
    [SCREENS.RECIPE]: () => require<ReactComponentModule>('@pages/home/RecipeScreen').default,
} satisfies Screens;

const Split = createSplitNavigator<ReportsSplitNavigatorParamList>();

function HomeSplitNavigator() {
    const route = useRoute();
    const restaurantIdInSidebar = getLastRestaurantId();

    // eslint-disable-next-line rulesdir/prefer-shouldUseNarrowLayout-instead-of-isSmallScreenWidth
    const {isSmallScreenWidth} = useResponsiveLayout();
    const splitNavigatorScreenOptions = useSplitNavigatorScreenOptions();

    const loadHomeScreen = useMemo(() => {
        return isSmallScreenWidth ? loadNativeHomeScreen : loadWebHomeScreen;
    }, [isSmallScreenWidth]);

    const CENTRAL_PANE_HOME_SCREENS = useMemo(() => {
        return isSmallScreenWidth ? CENTRAL_MOBILE_PANE_HOME_SCREENS : CENTRAL_WEB_PANE_HOME_SCREENS;
    }, [isSmallScreenWidth]);

    return (
        <FocusTrapForScreens>
            <SidebarDrawNavigator />
        </FocusTrapForScreens>
    );
}

HomeSplitNavigator.displayName = 'HomeSplitNavigator';

export default HomeSplitNavigator;
