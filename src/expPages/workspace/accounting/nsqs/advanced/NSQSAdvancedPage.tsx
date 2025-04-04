import type {WithPolicyProps} from '@expPages/workspace/withPolicy';
import withPolicyConnections from '@expPages/workspace/withPolicyConnections';
import ToggleSettingOptionRow from '@expPages/workspace/workflows/ToggleSettingsOptionRow';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import ConnectionLayout from '@components/ConnectionLayout';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {updateNSQSAutoSync} from '@libs/actions/connections/NSQS';
import {getLatestErrorField} from '@libs/ErrorUtils';
import {settingsPendingAction} from '@libs/PolicyUtils';
import {clearNSQSErrorField} from '@userActions/Policy/Policy';
import CONST from '@src/CONST';

function NSQSAdvancedPage({policy}: WithPolicyProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const policyID = policy?.id;
    const nsqsConfig = policy?.connections?.netsuiteQuickStart?.config;
    const isAutoSyncEnabled = nsqsConfig?.autoSync?.enabled ?? false;

    const toggleAutoSync = useCallback(() => {
        if (!policyID) {
            return;
        }

        updateNSQSAutoSync(policyID, !isAutoSyncEnabled);
    }, [policyID, isAutoSyncEnabled]);

    return (
        <ConnectionLayout
            policyID={policyID}
            displayName={NSQSAdvancedPage.displayName}
            headerTitle="workspace.accounting.advanced"
            accessVariants={[CONST.POLICY.ACCESS_VARIANTS.ADMIN, CONST.POLICY.ACCESS_VARIANTS.PAID]}
            featureName={CONST.POLICY.MORE_FEATURES.ARE_CONNECTIONS_ENABLED}
            contentContainerStyle={[styles.pb2, styles.ph5, styles.gap6]}
            connectionName={CONST.POLICY.CONNECTIONS.NAME.NSQS}
        >
            <View>
                <ToggleSettingOptionRow
                    title={translate('workspace.accounting.autoSync')}
                    switchAccessibilityLabel={translate('workspace.accounting.autoSync')}
                    subtitle={translate('workspace.nsqs.advanced.autoSyncDescription')}
                    shouldPlaceSubtitleBelowSwitch
                    isActive={isAutoSyncEnabled}
                    onToggle={toggleAutoSync}
                    pendingAction={settingsPendingAction([CONST.NSQS_CONFIG.AUTO_SYNC], nsqsConfig?.pendingFields)}
                    errors={getLatestErrorField(nsqsConfig, CONST.NSQS_CONFIG.AUTO_SYNC)}
                    onCloseError={policyID ? () => clearNSQSErrorField(policyID, CONST.NSQS_CONFIG.AUTO_SYNC) : undefined}
                />
            </View>
        </ConnectionLayout>
    );
}

NSQSAdvancedPage.displayName = 'NSQSAdvancedPage';

export default withPolicyConnections(NSQSAdvancedPage);
