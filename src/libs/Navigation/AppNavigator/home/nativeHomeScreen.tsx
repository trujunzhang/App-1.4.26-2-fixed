import React from 'react';
import {View} from 'react-native';
import NoDropZone from '@components/DragAndDrop/NoDropZone';
import InitialSettingsPage from '@expPages/settings/InitialSettingsPage';
import SCREENS from '@src/SCREENS';
import type {DrawerContentComponentProps, DrawerNavigationOptions} from '../../../../../plugins/react-navigation-drawer-6.6.10/packages/drawer/src';
import {createDrawerNavigator} from '../../../../../plugins/react-navigation-drawer-6.6.10/packages/drawer/src';

const loadSidebarScreen = () => require('../../../../pages/home/sidebar/SidebarScreen').default as React.ComponentType;

const defaultScreenOptions: DrawerNavigationOptions = {
    // cardStyle: {
    //     overflow: 'visible',
    //     flex: 1,
    // },
    headerShown: false,
    // animationTypeForReplace: 'push',
};

function SidebarDrawNavigator() {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const Drawer = createDrawerNavigator();

    return (
        <NoDropZone>
            <View style={[{flex: 1}]}>
                <Drawer.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                    drawerContent={(props: DrawerContentComponentProps) => (
                        <InitialSettingsPage
                            showHeaderBar={false}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
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
