import type {WithPolicyConnectionsProps} from '@expPages/workspace/withPolicyConnections';
import withPolicyConnections from '@expPages/workspace/withPolicyConnections';
import ToggleSettingOptionRow from '@expPages/workspace/workflows/ToggleSettingsOptionRow';
import React, {useMemo} from 'react';
import Accordion from '@components/Accordion';
import ConnectionLayout from '@components/ConnectionLayout';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import useAccordionAnimation from '@hooks/useAccordionAnimation';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as ErrorUtils from '@libs/ErrorUtils';
import Navigation from '@libs/Navigation/Navigation';
import {getCurrentXeroOrganizationName, settingsPendingAction} from '@libs/PolicyUtils';
import * as PolicyUtils from '@libs/PolicyUtils';
import {updateXeroAutoSync, updateXeroSyncSyncReimbursedReports} from '@userActions/connections/Xero';
import * as Policy from '@userActions/Policy/Policy';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';

function XeroAdvancedPage({policy}: WithPolicyConnectionsProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const policyID = policy?.id ?? '-1';
    const xeroConfig = policy?.connections?.xero?.config;
    const {autoSync, pendingFields, errorFields, sync} = xeroConfig ?? {};
    const {bankAccounts} = policy?.connections?.xero?.data ?? {};
    const {invoiceCollectionsAccountID, reimbursementAccountID} = sync ?? {};

    const getSelectedAccountName = useMemo(
        () => (accountID: string) => {
            const selectedAccount = (bankAccounts ?? []).find((bank) => bank.id === accountID);
            return selectedAccount?.name ?? translate('workspace.xero.notConfigured');
        },
        [bankAccounts, translate],
    );

    const selectedBankAccountName = getSelectedAccountName(invoiceCollectionsAccountID ?? '-1');
    const selectedBillPaymentAccountName = getSelectedAccountName(reimbursementAccountID ?? '-1');

    const currentXeroOrganizationName = useMemo(() => getCurrentXeroOrganizationName(policy ?? undefined), [policy]);

    const {isAccordionExpanded, shouldAnimateAccordionSection} = useAccordionAnimation(!!sync?.syncReimbursedReports);

    return (
        <ConnectionLayout
            displayName={XeroAdvancedPage.displayName}
            headerTitle="workspace.accounting.advanced"
            headerSubtitle={currentXeroOrganizationName}
            accessVariants={[CONST.POLICY.ACCESS_VARIANTS.ADMIN, CONST.POLICY.ACCESS_VARIANTS.PAID]}
            policyID={policyID}
            featureName={CONST.POLICY.MORE_FEATURES.ARE_CONNECTIONS_ENABLED}
            contentContainerStyle={[styles.pb2, styles.ph5]}
            connectionName={CONST.POLICY.CONNECTIONS.NAME.XERO}
        >
            <ToggleSettingOptionRow
                key={translate('workspace.accounting.autoSync')}
                title={translate('workspace.accounting.autoSync')}
                subtitle={translate('workspace.xero.advancedConfig.autoSyncDescription')}
                switchAccessibilityLabel={translate('workspace.xero.advancedConfig.autoSyncDescription')}
                shouldPlaceSubtitleBelowSwitch
                wrapperStyle={styles.mv3}
                isActive={!!autoSync?.enabled}
                onToggle={() =>
                    updateXeroAutoSync(
                        policyID,
                        {
                            enabled: !autoSync?.enabled,
                        },
                        {enabled: autoSync?.enabled ?? undefined},
                    )
                }
                pendingAction={settingsPendingAction([CONST.XERO_CONFIG.ENABLED], pendingFields)}
                errors={ErrorUtils.getLatestErrorField(xeroConfig ?? {}, CONST.XERO_CONFIG.ENABLED)}
                onCloseError={() => Policy.clearXeroErrorField(policyID, CONST.XERO_CONFIG.ENABLED)}
            />
            <ToggleSettingOptionRow
                key={translate('workspace.accounting.reimbursedReports')}
                title={translate('workspace.accounting.reimbursedReports')}
                subtitle={translate('workspace.xero.advancedConfig.reimbursedReportsDescription')}
                switchAccessibilityLabel={translate('workspace.xero.advancedConfig.reimbursedReportsDescription')}
                shouldPlaceSubtitleBelowSwitch
                wrapperStyle={styles.mv3}
                isActive={!!sync?.syncReimbursedReports}
                onToggle={() => updateXeroSyncSyncReimbursedReports(policyID, !sync?.syncReimbursedReports, sync?.syncReimbursedReports)}
                pendingAction={settingsPendingAction([CONST.XERO_CONFIG.SYNC_REIMBURSED_REPORTS], pendingFields)}
                errors={ErrorUtils.getLatestErrorField(xeroConfig ?? {}, CONST.XERO_CONFIG.SYNC_REIMBURSED_REPORTS)}
                onCloseError={() => Policy.clearXeroErrorField(policyID, CONST.XERO_CONFIG.SYNC_REIMBURSED_REPORTS)}
            />
            <Accordion
                isExpanded={isAccordionExpanded}
                isToggleTriggered={shouldAnimateAccordionSection}
            >
                <>
                    <OfflineWithFeedback pendingAction={settingsPendingAction([CONST.XERO_CONFIG.REIMBURSEMENT_ACCOUNT_ID], pendingFields)}>
                        <MenuItemWithTopDescription
                            shouldShowRightIcon
                            title={String(selectedBillPaymentAccountName)}
                            description={translate('workspace.xero.advancedConfig.xeroBillPaymentAccount')}
                            key={translate('workspace.xero.advancedConfig.xeroBillPaymentAccount')}
                            wrapperStyle={[styles.sectionMenuItemTopDescription]}
                            onPress={() => Navigation.navigate(ROUTES.POLICY_ACCOUNTING_XERO_BILL_PAYMENT_ACCOUNT_SELECTOR.getRoute(policyID))}
                            brickRoadIndicator={
                                PolicyUtils.areSettingsInErrorFields([CONST.XERO_CONFIG.REIMBURSEMENT_ACCOUNT_ID], errorFields) ? CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined
                            }
                        />
                    </OfflineWithFeedback>
                    <OfflineWithFeedback pendingAction={settingsPendingAction([CONST.XERO_CONFIG.INVOICE_COLLECTIONS_ACCOUNT_ID], pendingFields)}>
                        <MenuItemWithTopDescription
                            shouldShowRightIcon
                            title={String(selectedBankAccountName)}
                            description={translate('workspace.xero.advancedConfig.xeroInvoiceCollectionAccount')}
                            key={translate('workspace.xero.advancedConfig.xeroInvoiceCollectionAccount')}
                            wrapperStyle={[styles.sectionMenuItemTopDescription]}
                            onPress={() => {
                                Navigation.navigate(ROUTES.POLICY_ACCOUNTING_XERO_INVOICE_SELECTOR.getRoute(policyID));
                            }}
                            brickRoadIndicator={
                                PolicyUtils.areSettingsInErrorFields([CONST.XERO_CONFIG.INVOICE_COLLECTIONS_ACCOUNT_ID], errorFields) ? CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined
                            }
                        />
                    </OfflineWithFeedback>
                </>
            </Accordion>
        </ConnectionLayout>
    );
}

XeroAdvancedPage.displayName = 'XeroAdvancedPage';

export default withPolicyConnections(XeroAdvancedPage);
