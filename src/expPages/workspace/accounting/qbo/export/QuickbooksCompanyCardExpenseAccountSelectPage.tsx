import React, {useCallback, useMemo} from 'react';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import ScreenWrapper from '@components/ScreenWrapper';
import SelectionList from '@components/SelectionList';
import RadioListItem from '@components/SelectionList/RadioListItem';
import type {ListItem} from '@components/SelectionList/types';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as Connections from '@libs/actions/connections';
import Navigation from '@navigation/Navigation';
import CONST from '@src/CONST';
import AccessOrNotFoundWrapper from '@src/expPages/workspace/AccessOrNotFoundWrapper';
import type {WithPolicyConnectionsProps} from '@src/expPages/workspace/withPolicyConnections';
import withPolicyConnections from '@src/expPages/workspace/withPolicyConnections';
import ROUTES from '@src/ROUTES';
import type {Account} from '@src/types/onyx/Policy';

type CardListItem = ListItem & {
    value: string;
};

function QuickbooksCompanyCardExpenseAccountSelectPage({policy}: WithPolicyConnectionsProps) {
    const {translate} = useLocalize();
    const styles = useThemeStyles();
    const policyID = policy?.id ?? '';
    const {creditCards, vendors, bankAccounts} = policy?.connections?.quickbooksOnline?.data ?? {};

    const {exportCompanyCardAccount, exportAccount, exportCompanyCard} = policy?.connections?.quickbooksOnline?.config ?? {};

    const data: CardListItem[] = useMemo(() => {
        let accounts: Account[];
        switch (exportCompanyCard) {
            case CONST.QUICKBOOKS_EXPORT_COMPANY_CARD_ACCOUNT_TYPE.CREDIT_CARD:
                accounts = creditCards ?? [];
                break;
            case CONST.QUICKBOOKS_EXPORT_COMPANY_CARD_ACCOUNT_TYPE.DEBIT_CARD:
                accounts = bankAccounts ?? [];
                break;
            case CONST.QUICKBOOKS_OUT_OF_POCKET_EXPENSE_ACCOUNT_TYPE.VENDOR_BILL:
                accounts = vendors ?? [];
                break;
            default:
                accounts = [];
        }

        return accounts.map((card) => ({
            value: card.name,
            text: card.name,
            keyForList: card.name,
            isSelected: card.name === exportCompanyCardAccount,
        }));
    }, [exportCompanyCardAccount, creditCards, bankAccounts, exportCompanyCard, vendors]);

    const selectExportAccount = useCallback(
        (row: CardListItem) => {
            if (row.value !== exportAccount) {
                Connections.updatePolicyConnectionConfig(policyID, CONST.POLICY.CONNECTIONS.NAME.QBO, CONST.QUICK_BOOKS_CONFIG.EXPORT_COMPANY_CARD_ACCOUNT, row.value);
            }
            Navigation.goBack(ROUTES.POLICY_ACCOUNTING_QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT.getRoute(policyID));
        },
        [exportAccount, policyID],
    );

    return (
        <AccessOrNotFoundWrapper
            policyID={policyID}
            accessVariants={[CONST.POLICY.ACCESS_VARIANTS.ADMIN]}
            featureName={CONST.POLICY.MORE_FEATURES.ARE_CONNECTIONS_ENABLED}
        >
            <ScreenWrapper testID={QuickbooksCompanyCardExpenseAccountSelectPage.displayName}>
                <HeaderWithBackButton
                    title={exportCompanyCard === CONST.QUICKBOOKS_EXPORT_COMPANY_CARD_ACCOUNT_TYPE.VENDOR_BILL ? translate('workspace.qbo.vendor') : translate('workspace.qbo.account')}
                />
                <SelectionList
                    headerContent={exportCompanyCard ? <Text style={[styles.ph5, styles.pb5]}>{translate(`workspace.qbo.accounts.${exportCompanyCard}AccountDescription`)}</Text> : null}
                    sections={[{data}]}
                    ListItem={RadioListItem}
                    onSelectRow={selectExportAccount}
                    initiallyFocusedOptionKey={data.find((mode) => mode.isSelected)?.keyForList}
                />
            </ScreenWrapper>
        </AccessOrNotFoundWrapper>
    );
}

QuickbooksCompanyCardExpenseAccountSelectPage.displayName = 'QuickbooksCompanyCardExpenseAccountSelectPage';

export default withPolicyConnections(QuickbooksCompanyCardExpenseAccountSelectPage);
