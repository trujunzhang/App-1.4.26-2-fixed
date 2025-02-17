/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable import/no-relative-packages */
import React from 'react';
import {View} from 'react-native';
import NoDropZone from '@components/DragAndDrop/NoDropZone';
// import InitialSettingsPage from '@pages/settings/InitialSettingsPage';
import InitialSettingsPage from '@expPages/settings/InitialSettingsPage';
import SCREENS from '@src/SCREENS';
import type ReactComponentModule from '@src/types/utils/ReactComponentModule';
import type {DrawerContentComponentProps, DrawerNavigationOptions} from '../../../../plugins/react-navigation-drawer-6.6.10/packages/drawer/src';
import {createDrawerNavigator} from '../../../../plugins/react-navigation-drawer-6.6.10/packages/drawer/src';

const loadSidebarScreen = () => require<ReactComponentModule>('@pages/home/sidebar/SidebarScreen').default;
// const loadSidebarScreen = () => require('../../../../pages/home/sidebar/SidebarScreen').default as React.ComponentType;

const defaultScreenOptions: DrawerNavigationOptions = {
    // cardStyle: {
    //     overflow: 'visible',
    //     flex: 1,
    // },
    headerShown: false,
    // animationTypeForReplace: 'push',
};

function SidebarDrawNavigator() {
    // eslint-disable-next-line @typescript-eslint/no-shadow,@typescript-eslint/no-unsafe-call
    const Drawer = createDrawerNavigator();

    return (
        <NoDropZone>
            <View style={[{flex: 1}]}>
                <Drawer.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    drawerContent={(props: DrawerContentComponentProps) => <InitialSettingsPage shouldShowLeftBackArrow={false} />}
                >
                    <Drawer.Screen
                        name={SCREENS.HOME}
                        options={defaultScreenOptions}
                        getComponent={loadSidebarScreen}
                    />
                </Drawer.Navigator>
            </View>
        </NoDropZone>
    );
}

const loadNativeHomeScreen = () => SidebarDrawNavigator as React.ComponentType;

export default loadNativeHomeScreen;
