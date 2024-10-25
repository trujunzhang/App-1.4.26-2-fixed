import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import useThemeStyles from '@hooks/useThemeStyles';
import SCREENS from '@src/SCREENS';

const loadWebSidebarScreen = () => require('@pages/home/sidebar/SidebarScreen').default as React.ComponentType;

const StackNavigator = createStackNavigator();

function IeattaWebSidebarStackNavigator() {
    const styles = useThemeStyles();
    return (
        <StackNavigator.Navigator
            screenOptions={{
                cardStyle: styles.navigationScreenCardStyle,
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <StackNavigator.Screen
                key={SCREENS.HOME}
                name={SCREENS.HOME}
                getComponent={loadWebSidebarScreen}
            />
        </StackNavigator.Navigator>
    );
}

// const loadWebHomeScreen = () => IeattaWebSidebarStackNavigator as React.ComponentType;
const loadWebHomeScreen = loadWebSidebarScreen;

export default loadWebHomeScreen;
