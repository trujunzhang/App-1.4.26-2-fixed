/* eslint-disable @dword-design/import-alias/prefer-alias */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import useThemeStyles from '@hooks/useThemeStyles';
import getCurrentUrl from '@libs/Navigation/currentUrl';
import type {CentralPaneNavigatorParamList} from '@navigation/types';
import SCREENS from '@src/SCREENS';
import EventScreenWrapper from '../../EventScreenWrapper';
import RecipeScreenWrapper from '../../RecipeScreenWrapper';
import RestaurantScreenWrapper from '../../RestaurantScreenWrapper';

const Stack = createStackNavigator<CentralPaneNavigatorParamList>();

const url = getCurrentUrl();
const openOnAdminRoom = url ? new URL(url).searchParams.get('openOnAdminRoom') : undefined;

function BaseCentralPaneNavigator() {
    const styles = useThemeStyles();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={SCREENS.RESTAURANT}
                // We do it this way to avoid adding the url params to url
                initialParams={{openOnAdminRoom: openOnAdminRoom === 'true' || undefined}}
                options={{
                    headerShown: false,
                    title: 'New Ieatta',

                    // Prevent unnecessary scrolling
                    cardStyle: styles.cardStyleNavigator,
                }}
                component={RestaurantScreenWrapper}
            />
            <Stack.Screen
                name={SCREENS.EVENT}
                // We do it this way to avoid adding the url params to url
                initialParams={{}}
                options={{
                    headerShown: false,
                    title: 'New Ieatta',

                    // Prevent unnecessary scrolling
                    cardStyle: styles.cardStyleNavigator,
                }}
                component={EventScreenWrapper}
            />
            <Stack.Screen
                name={SCREENS.RECIPE}
                // We do it this way to avoid adding the url params to url
                initialParams={{}}
                options={{
                    headerShown: false,
                    title: 'New Ieatta',

                    // Prevent unnecessary scrolling
                    cardStyle: styles.cardStyleNavigator,
                }}
                component={RecipeScreenWrapper}
            />
        </Stack.Navigator>
    );
}

export default BaseCentralPaneNavigator;
