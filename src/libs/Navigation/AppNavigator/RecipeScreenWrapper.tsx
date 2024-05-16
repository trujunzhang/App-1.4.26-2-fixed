import type {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import type {CentralPaneNavigatorParamList} from '@navigation/types';
import RecipeScreen from '@pages/home/RecipeScreen';
import type SCREENS from '@src/SCREENS';

type RecipeScreenWrapperProps = StackScreenProps<CentralPaneNavigatorParamList, typeof SCREENS.RECIPE>;

function RecipeScreenWrapper({route, navigation}: RecipeScreenWrapperProps) {
    // The RecipeScreen without the reportID set will display a skeleton
    // until the reportID is loaded and set in the route param
    return (
        <>
            <RecipeScreen
                route={route}
                navigation={navigation}
            />
        </>
    );
}

RecipeScreenWrapper.displayName = 'RecipeScreenWrapper';

export default RecipeScreenWrapper;
export type {RecipeScreenWrapperProps};
