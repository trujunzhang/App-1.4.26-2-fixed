import type {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import type {CentralPaneNavigatorParamList} from '@navigation/types';
import EventScreen from '@pages/home/EventScreen';
import type SCREENS from '@src/SCREENS';

type EventScreenWrapperProps = StackScreenProps<CentralPaneNavigatorParamList, typeof SCREENS.EVENT>;

function EventScreenWrapper({route, navigation}: EventScreenWrapperProps) {
    // The EventScreen without the reportID set will display a skeleton
    // until the reportID is loaded and set in the route param
    return (
        <>
            <EventScreen
                route={route}
                navigation={navigation}
            />
        </>
    );
}

EventScreenWrapper.displayName = 'EventScreenWrapper';

export default EventScreenWrapper;
export type {EventScreenWrapperProps};
