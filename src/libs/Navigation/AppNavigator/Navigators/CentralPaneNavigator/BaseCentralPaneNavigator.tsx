import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import useThemeStyles from '@hooks/useThemeStyles';
// import ReportScreenWrapper from '@libs/Navigation/AppNavigator/ReportScreenWrapper';
import getCurrentUrl from '@libs/NavigationLast/currentUrl';
import type {CentralPaneNavigatorParamList} from '@navigation/types';
import SearchPage from '@src/expPages/Search/SearchPage';
import SCREENS from '@src/SCREENS';
import EventScreenWrapper from '../../EventScreenWrapper';
import RecipeScreenWrapper from '../../RecipeScreenWrapper';
import RestaurantScreenWrapper from '../../RestaurantScreenWrapper';

const Stack = createStackNavigator<CentralPaneNavigatorParamList>();

const url = getCurrentUrl();
const openOnAdminRoom = url ? new URL(url).searchParams.get('openOnAdminRoom') : undefined;

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
                name={SCREENS.RESTAURANT}
                // We do it this way to avoid adding the url params to url
                initialParams={{openOnAdminRoom: openOnAdminRoom === 'true' || undefined}}
                component={RestaurantScreenWrapper}
            />
            <Stack.Screen
                name={SCREENS.EVENT}
                // We do it this way to avoid adding the url params to url
                component={EventScreenWrapper}
            />
            <Stack.Screen
                name={SCREENS.RECIPE}
                // We do it this way to avoid adding the url params to url
                component={RecipeScreenWrapper}
            />
        </Stack.Navigator>
    );
}

export default BaseCentralPaneNavigator;
