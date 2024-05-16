import type {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import type {CentralPaneNavigatorParamList} from '@navigation/types';
import RestaurantScreen from '@pages/home/RestaurantScreen';
import type SCREENS from '@src/SCREENS';
import RestaurantScreenIDSetter from './RestaurantScreenIDSetter';

type RestaurantScreenWrapperProps = StackScreenProps<CentralPaneNavigatorParamList, typeof SCREENS.RESTAURANT>;

function RestaurantScreenWrapper({route, navigation}: RestaurantScreenWrapperProps) {
    // The RestaurantScreen without the reportID set will display a skeleton
    // until the reportID is loaded and set in the route param
    return (
        <>
            <RestaurantScreen
                route={route}
                navigation={navigation}
            />
            <RestaurantScreenIDSetter
                route={route}
                navigation={navigation}
            />
        </>
    );
}

RestaurantScreenWrapper.displayName = 'RestaurantScreenWrapper';

export default RestaurantScreenWrapper;
export type {RestaurantScreenWrapperProps};
