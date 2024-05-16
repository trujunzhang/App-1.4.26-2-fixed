import type {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import ReportScreen from '@expPages/home/ReportScreen';
import type SCREENS from '@src/SCREENS';
import type {CentralPaneNavigatorParamList} from '../types';
import ReportScreenIDSetter from './ReportScreenIDSetter';

type ReportScreenWrapperProps = StackScreenProps<CentralPaneNavigatorParamList, typeof SCREENS.REPORT>;

function ReportScreenWrapper({route, navigation}: ReportScreenWrapperProps) {
    // The ReportScreen without the reportID set will display a skeleton
    // until the reportID is loaded and set in the route param
    return (
        <>
            <ReportScreen
                // @ts-expect-error Error will be resolved after ReportScreen migration to TypeScript
                route={route}
                navigation={navigation}
            />
            <ReportScreenIDSetter
                route={route}
                navigation={navigation}
            />
        </>
    );
}

ReportScreenWrapper.displayName = 'ReportScreenWrapper';

export default ReportScreenWrapper;
export type {ReportScreenWrapperProps};
