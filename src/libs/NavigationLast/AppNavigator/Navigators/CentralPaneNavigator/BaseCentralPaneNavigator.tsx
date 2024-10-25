import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import useThemeStyles from '@hooks/useThemeStyles';
import ReportScreenWrapper from '@libs/NavigationLast/AppNavigator/ReportScreenWrapper';
import getCurrentUrl from '@libs/NavigationLast/currentUrl';
import type {CentralPaneNavigatorParamList} from '@libs/NavigationLast/types';
import SearchPage from '@src/expPages/Search/SearchPage';
import SCREENS from '@src/SCREENS';

const Stack = createStackNavigator<CentralPaneNavigatorParamList>();

const url = getCurrentUrl();
const openOnAdminRoom = url ? new URL(url).searchParams.get('openOnAdminRoom') : undefined;

type Screens = Partial<Record<keyof CentralPaneNavigatorParamList, () => React.ComponentType>>;

const settingsScreens = {
    [SCREENS.SETTINGS.WORKSPACES]: () => require('@src/expPages/workspace/WorkspacesListPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PREFERENCES.ROOT]: () => require('@src/expPages/settings/Preferences/PreferencesPage').default as React.ComponentType,
    [SCREENS.SETTINGS.SECURITY]: () => require('@src/expPages/settings/Security/SecuritySettingsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.ROOT]: () => require('@src/expPages/settings/Profile/ProfilePage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.ROOT]: () => require('@src/expPages/settings/Wallet/WalletPage').default as React.ComponentType,
    // [SCREENS.SETTINGS.ABOUT]: () => require('@src/expPages/settings/AboutPage/AboutPage').default as React.ComponentType,
    [SCREENS.SETTINGS.TROUBLESHOOT]: () => require('@src/expPages/settings/Troubleshoot/TroubleshootPage').default as React.ComponentType,
    [SCREENS.SETTINGS.SAVE_THE_WORLD]: () => require('@src/expPages/TeachersUnite/SaveTheWorldPage').default as React.ComponentType,
} satisfies Screens;

function BaseCentralPaneNavigator() {
    const styles = useThemeStyles();
    const options = {
        headerShown: false,
        title: 'New Ieatta',

        // Prevent unnecessary scrolling
        cardStyle: styles.cardStyleNavigator,
    };
    return (
        <Stack.Navigator screenOptions={options}>
            <Stack.Screen
                name={SCREENS.REPORT}
                // We do it this way to avoid adding the url params to url
                initialParams={{openOnAdminRoom: openOnAdminRoom === 'true' || undefined}}
                component={ReportScreenWrapper}
            />
            <Stack.Screen
                name={SCREENS.SEARCH.CENTRAL_PANE}
                // We do it this way to avoid adding the url params to url
                component={SearchPage}
            />

            {Object.entries(settingsScreens).map(([screenName, componentGetter]) => (
                <Stack.Screen
                    key={screenName}
                    name={screenName as keyof Screens}
                    getComponent={componentGetter}
                />
            ))}
        </Stack.Navigator>
    );
}

export default BaseCentralPaneNavigator;
