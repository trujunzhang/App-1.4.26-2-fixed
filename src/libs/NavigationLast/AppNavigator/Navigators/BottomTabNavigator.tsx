import SidebarScreen from '@expPages/home/sidebar/SidebarScreen';
import SearchPageBottomTab from '@expPages/Search/SearchPageBottomTab';
import {useNavigationState} from '@react-navigation/native';
import React from 'react';
import createCustomBottomTabNavigator from '@libs/Navigation/AppNavigator/createCustomBottomTabNavigator';
import getTopmostCentralPaneRoute from '@libs/Navigation/getTopmostCentralPaneRoute';
import Animations from '@libs/Navigation/PlatformStackNavigation/navigationOptions/animation';
import type {PlatformStackNavigationOptions} from '@libs/Navigation/PlatformStackNavigation/types';
import type {BottomTabNavigatorParamList, CentralPaneName, NavigationPartialRoute, RootStackParamList} from '@libs/Navigation/types';
import SCREENS from '@src/SCREENS';
import type ReactComponentModule from '@src/types/utils/ReactComponentModule';
import ActiveCentralPaneRouteContext from './ActiveCentralPaneRouteContext';

const loadInitialSettingsPage = () => require<ReactComponentModule>('../../../../expPages/settings/InitialSettingsPage').default;
const Tab = createCustomBottomTabNavigator<BottomTabNavigatorParamList>();

const screenOptions: PlatformStackNavigationOptions = {
    animation: Animations.FADE,
    headerShown: false,
};

function BottomTabNavigator() {
    const activeRoute = useNavigationState<RootStackParamList, NavigationPartialRoute<CentralPaneName> | undefined>(getTopmostCentralPaneRoute);
    return (
        <ActiveCentralPaneRouteContext.Provider value={activeRoute}>
            <Tab.Navigator screenOptions={screenOptions}>
                <Tab.Screen
                    name={SCREENS.HOME}
                    component={SidebarScreen}
                />
                <Tab.Screen
                    name={SCREENS.SEARCH.BOTTOM_TAB}
                    component={SearchPageBottomTab}
                />
                <Tab.Screen
                    name={SCREENS.SETTINGS.ROOT}
                    getComponent={loadInitialSettingsPage}
                />
            </Tab.Navigator>
        </ActiveCentralPaneRouteContext.Provider>
    );
}

BottomTabNavigator.displayName = 'BottomTabNavigator';

export default BottomTabNavigator;
