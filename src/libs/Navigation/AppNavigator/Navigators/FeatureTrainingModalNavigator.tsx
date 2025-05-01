import ChangePolicyEducationalModal from '@expPages/ChangePolicyEducationalModal';
import ProcessMoneyRequestHoldPage from '@expPages/ProcessMoneyRequestHoldPage';
import TrackTrainingPage from '@expPages/TrackTrainingPage';
import React from 'react';
import {View} from 'react-native';
import NoDropZone from '@components/DragAndDrop/NoDropZone';
import createPlatformStackNavigator from '@libs/Navigation/PlatformStackNavigation/createPlatformStackNavigator';
import Animations from '@libs/Navigation/PlatformStackNavigation/navigationOptions/animation';
import type {FeatureTrainingNavigatorParamList} from '@libs/Navigation/types';
import SCREENS from '@src/SCREENS';

const Stack = createPlatformStackNavigator<FeatureTrainingNavigatorParamList>();

function FeatureTrainingModalNavigator() {
    return (
        <NoDropZone>
            <View>
                <Stack.Navigator screenOptions={{headerShown: false, animation: Animations.SLIDE_FROM_RIGHT}}>
                    <Stack.Screen
                        name={SCREENS.FEATURE_TRAINING_ROOT}
                        component={TrackTrainingPage}
                    />
                    <Stack.Screen
                        name={SCREENS.PROCESS_MONEY_REQUEST_HOLD_ROOT}
                        component={ProcessMoneyRequestHoldPage}
                    />
                    <Stack.Screen
                        name={SCREENS.CHANGE_POLICY_EDUCATIONAL_ROOT}
                        component={ChangePolicyEducationalModal}
                    />
                </Stack.Navigator>
            </View>
        </NoDropZone>
    );
}

FeatureTrainingModalNavigator.displayName = 'FeatureTrainingModalNavigator';

export default FeatureTrainingModalNavigator;
