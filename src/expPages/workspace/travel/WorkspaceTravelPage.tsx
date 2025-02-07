import type {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import type {WorkspacesCentralPaneNavigatorParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import WorkspacePageWithSections from '@src/expPages/workspace/WorkspacePageWithSections';
import type SCREENS from '@src/SCREENS';
import WorkspaceTravelNoVBAView from './WorkspaceTravelNoVBAView';
import WorkspaceTravelVBAView from './WorkspaceTravelVBAView';

type WorkspaceTravelPageProps = StackScreenProps<WorkspacesCentralPaneNavigatorParamList, typeof SCREENS.WORKSPACE.TRAVEL>;

function WorkspaceTravelPage({route}: WorkspaceTravelPageProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();

    return (
        <WorkspacePageWithSections
            shouldUseScrollView
            headerText={translate('workspace.common.travel')}
            route={route}
            guidesCallTaskID={CONST.GUIDES_CALL_TASK_IDS.WORKSPACE_TRAVEL}
            shouldShowOfflineIndicatorInWideScreen
        >
            {(hasVBA, policyID) => (
                <View style={[styles.mt3, isSmallScreenWidth ? styles.workspaceSectionMobile : styles.workspaceSection]}>
                    {!hasVBA && <WorkspaceTravelNoVBAView policyID={policyID} />}
                    {hasVBA && <WorkspaceTravelVBAView />}
                </View>
            )}
        </WorkspacePageWithSections>
    );
}

WorkspaceTravelPage.displayName = 'WorkspaceTravelPage';

export default WorkspaceTravelPage;
