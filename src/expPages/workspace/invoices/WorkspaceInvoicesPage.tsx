import type {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import type {WorkspacesCentralPaneNavigatorParamList} from '@navigation/types';
import CONST from '@src/CONST';
import WorkspacePageWithSections from '@src/expPages/workspace/WorkspacePageWithSections';
import type SCREENS from '@src/SCREENS';
import WorkspaceInvoicesNoVBAView from './WorkspaceInvoicesNoVBAView';
import WorkspaceInvoicesVBAView from './WorkspaceInvoicesVBAView';

type WorkspaceInvoicesPageProps = StackScreenProps<WorkspacesCentralPaneNavigatorParamList, typeof SCREENS.WORKSPACE.INVOICES>;

function WorkspaceInvoicesPage({route}: WorkspaceInvoicesPageProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();
    return (
        <WorkspacePageWithSections
            shouldUseScrollView
            headerText={translate('workspace.common.invoices')}
            guidesCallTaskID={CONST.GUIDES_CALL_TASK_IDS.WORKSPACE_INVOICES}
            shouldShowOfflineIndicatorInWideScreen
            route={route}
        >
            {(hasVBA?: boolean, policyID?: string) => (
                <View style={[styles.mt3, isSmallScreenWidth ? styles.workspaceSectionMobile : styles.workspaceSection]}>
                    {!hasVBA && policyID && <WorkspaceInvoicesNoVBAView policyID={policyID} />}
                    {hasVBA && policyID && <WorkspaceInvoicesVBAView policyID={policyID} />}
                </View>
            )}
        </WorkspacePageWithSections>
    );
}

WorkspaceInvoicesPage.displayName = 'WorkspaceInvoicesPage';

export default WorkspaceInvoicesPage;
