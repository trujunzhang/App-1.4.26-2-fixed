import MoneyRequestAmountForm from '@expPages/iou/MoneyRequestAmountForm';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import type {OnyxEntry} from 'react-native-onyx';
import {useOnyx} from 'react-native-onyx';
import type {BaseTextInputRef} from '@components/TextInput/BaseTextInput/types';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import type {WithCurrentUserPersonalDetailsProps} from '@components/withCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import * as TransactionEdit from '@libs/actions/TransactionEdit';
import * as CurrencyUtils from '@libs/CurrencyUtils';
import Navigation from '@libs/Navigation/Navigation';
import * as OptionsListUtils from '@libs/OptionsListUtils';
import * as ReportUtils from '@libs/ReportUtils';
import playSound, {SOUNDS} from '@libs/Sound';
import * as TransactionUtils from '@libs/TransactionUtils';
import {getRequestType} from '@libs/TransactionUtils';
import * as IOU from '@userActions/IOU';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';
import type * as OnyxTypes from '@src/types/onyx';
import type {PaymentMethodType} from '@src/types/onyx/OriginalMessage';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import StepScreenWrapper from './StepScreenWrapper';
import withFullTransactionOrNotFound from './withFullTransactionOrNotFound';
import type {WithWritableReportOrNotFoundProps} from './withWritableReportOrNotFound';
import withWritableReportOrNotFound from './withWritableReportOrNotFound';

type AmountParams = {
    amount: string;
    paymentMethod?: PaymentMethodType;
};

type IOURequestStepAmountProps = WithCurrentUserPersonalDetailsProps &
    WithWritableReportOrNotFoundProps<typeof SCREENS.MONEY_REQUEST.STEP_AMOUNT | typeof SCREENS.MONEY_REQUEST.CREATE> & {
        /** The transaction object being modified in Onyx */
        transaction: OnyxEntry<OnyxTypes.Transaction>;

        /** Whether the user input should be kept or not */
        shouldKeepUserInput?: boolean;
    };

function IOURequestStepAmount({
    report,
    route: {
        params: {iouType, reportID, transactionID = '-1', backTo, pageIndex, action, currency: selectedCurrency = ''},
    },
    transaction,
    currentUserPersonalDetails,
    shouldKeepUserInput = false,
}: IOURequestStepAmountProps) {
    const {translate} = useLocalize();
    const textInput = useRef<BaseTextInputRef | null>(null);
    const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isSaveButtonPressed = useRef(false);
    const iouRequestType = getRequestType(transaction);
    const policyID = report?.policyID;

    const [reportNameValuePairs] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT_NAME_VALUE_PAIRS}${report?.reportID}`);
    const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`);
    const [personalDetails] = useOnyx(ONYXKEYS.PERSONAL_DETAILS_LIST);
    const [draftTransaction] = useOnyx(`${ONYXKEYS.COLLECTION.TRANSACTION_DRAFT}${transactionID}`);
    const [splitDraftTransaction] = useOnyx(`${ONYXKEYS.COLLECTION.SPLIT_TRANSACTION_DRAFT}${transactionID}`);
    const [skipConfirmation] = useOnyx(`${ONYXKEYS.COLLECTION.SKIP_CONFIRMATION}${transactionID}`);

    const isEditing = action === CONST.IOU.ACTION.EDIT;
    const isSplitBill = iouType === CONST.IOU.TYPE.SPLIT;
    const isEditingSplitBill = isEditing && isSplitBill;
    const currentTransaction = isEditingSplitBill && !isEmptyObject(splitDraftTransaction) ? splitDraftTransaction : transaction;
    const {amount: transactionAmount} = ReportUtils.getTransactionDetails(currentTransaction) ?? {amount: 0};
    const {currency: originalCurrency} = ReportUtils.getTransactionDetails(isEditing && !isEmptyObject(draftTransaction) ? draftTransaction : transaction) ?? {currency: CONST.CURRENCY.USD};
    const currency = CurrencyUtils.isValidCurrencyCode(selectedCurrency) ? selectedCurrency : originalCurrency;

    // For quick button actions, we'll skip the confirmation page unless the report is archived or this is a workspace request, as
    // the user will have to add a merchant.
    const shouldSkipConfirmation: boolean = useMemo(() => {
        if (isSplitBill || !skipConfirmation || !report?.reportID) {
            return false;
        }

        return !(ReportUtils.isArchivedReport(report, reportNameValuePairs) || ReportUtils.isPolicyExpenseChat(report));
    }, [report, isSplitBill, skipConfirmation, reportNameValuePairs]);

    useFocusEffect(
        useCallback(() => {
            focusTimeoutRef.current = setTimeout(() => textInput.current?.focus(), CONST.ANIMATED_TRANSITION);
            return () => {
                if (!focusTimeoutRef.current) {
                    return;
                }
                clearTimeout(focusTimeoutRef.current);
            };
        }, []),
    );

    useEffect(() => {
        if (!isEditing) {
            return;
        }
        // A temporary solution to not prevent users from editing the currency
        // We create a backup transaction and use it to save the currency and remove this transaction backup if we don't save the amount
        // It should be removed after this issue https://github.com/Expensify/App/issues/34607 is fixed
        TransactionEdit.createDraftTransaction(isEditingSplitBill && !isEmptyObject(splitDraftTransaction) ? splitDraftTransaction : transaction);

        return () => {
            if (isSaveButtonPressed.current) {
                return;
            }
            TransactionEdit.removeDraftTransaction(transaction?.transactionID);
        };
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, []);

    const navigateBack = () => {
        Navigation.goBack(backTo);
    };

    const navigateToCurrencySelectionPage = () => {
        Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_CURRENCY.getRoute(action, iouType, transactionID, reportID, pageIndex, currency, Navigation.getActiveRoute()));
    };

    const navigateToParticipantPage = () => {
        switch (iouType) {
            case CONST.IOU.TYPE.REQUEST:
                Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_PARTICIPANTS.getRoute(CONST.IOU.TYPE.SUBMIT, transactionID, reportID));
                break;
            case CONST.IOU.TYPE.SEND:
                Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_PARTICIPANTS.getRoute(CONST.IOU.TYPE.PAY, transactionID, reportID));
                break;
            default:
                Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_PARTICIPANTS.getRoute(iouType, transactionID, reportID));
        }
    };

    const navigateToConfirmationPage = () => {
        switch (iouType) {
            case CONST.IOU.TYPE.REQUEST:
                Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(CONST.IOU.ACTION.CREATE, CONST.IOU.TYPE.SUBMIT, transactionID, reportID));
                break;
            case CONST.IOU.TYPE.SEND:
                Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(CONST.IOU.ACTION.CREATE, CONST.IOU.TYPE.PAY, transactionID, reportID));
                break;
            default:
                Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(CONST.IOU.ACTION.CREATE, iouType, transactionID, reportID));
        }
    };

    const navigateToNextPage = ({amount, paymentMethod}: AmountParams) => {
        isSaveButtonPressed.current = true;
        const amountInSmallestCurrencyUnits = CurrencyUtils.convertToBackendAmount(Number.parseFloat(amount));

        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        IOU.setMoneyRequestAmount(transactionID, amountInSmallestCurrencyUnits, currency || CONST.CURRENCY.USD, shouldKeepUserInput);

        // Initially when we're creating money request, we do not know the participant and hence if the request is with workspace with tax tracking enabled
        // So, we reset the taxAmount here and calculate it in the hook in MoneyRequestConfirmationList component
        IOU.setMoneyRequestTaxAmount(transactionID, null);

        if (backTo) {
            Navigation.goBack(backTo);
            return;
        }

        // If a reportID exists in the report object, it's because either:
        // - The user started this flow from using the + button in the composer inside a report.
        // - The user started this flow from using the global create menu by selecting the Track expense option.
        // In this case, the participants can be automatically assigned from the report and the user can skip the participants step and go straight
        // to the confirm step.
        // If the user is started this flow using the Create expense option (combined submit/track flow), they should be redirected to the participants page.
        if (report?.reportID && !ReportUtils.isArchivedReport(report, reportNameValuePairs) && iouType !== CONST.IOU.TYPE.CREATE) {
            const selectedParticipants = IOU.setMoneyRequestParticipantsFromReport(transactionID, report);
            const participants = selectedParticipants.map((participant) => {
                const participantAccountID = participant?.accountID ?? CONST.DEFAULT_NUMBER_ID;
                return participantAccountID ? OptionsListUtils.getParticipantsOption(participant, personalDetails) : OptionsListUtils.getReportOption(participant);
            });
            const backendAmount = CurrencyUtils.convertToBackendAmount(Number.parseFloat(amount));

            if (shouldSkipConfirmation) {
                if (iouType === CONST.IOU.TYPE.PAY || iouType === CONST.IOU.TYPE.SEND) {
                    if (paymentMethod && paymentMethod === CONST.IOU.PAYMENT_TYPE.EXPENSIFY) {
                        IOU.sendMoneyWithWallet(report, backendAmount, currency, '', currentUserPersonalDetails.accountID, participants.at(0) ?? {});
                        return;
                    }

                    IOU.sendMoneyElsewhere(report, backendAmount, currency, '', currentUserPersonalDetails.accountID, participants.at(0) ?? {});
                    return;
                }
                if (iouType === CONST.IOU.TYPE.SUBMIT || iouType === CONST.IOU.TYPE.REQUEST) {
                    playSound(SOUNDS.DONE);
                    IOU.requestMoney({
                        report,
                        participantParams: {
                            participant: participants.at(0) ?? {},
                            payeeEmail: currentUserPersonalDetails.login,
                            payeeAccountID: currentUserPersonalDetails.accountID,
                        },
                        transactionParams: {
                            amount: backendAmount,
                            currency,
                            created: transaction?.created ?? '',
                            merchant: CONST.TRANSACTION.PARTIAL_TRANSACTION_MERCHANT,
                            attendees: transaction?.attendees,
                        },
                    });
                    return;
                }
                if (iouType === CONST.IOU.TYPE.TRACK) {
                    playSound(SOUNDS.DONE);
                    IOU.trackExpense(
                        report,
                        backendAmount,
                        currency ?? 'USD',
                        transaction?.created ?? '',
                        CONST.TRANSACTION.PARTIAL_TRANSACTION_MERCHANT,
                        currentUserPersonalDetails.login,
                        currentUserPersonalDetails.accountID,
                        participants.at(0) ?? {},
                        '',
                        false,
                    );
                    return;
                }
            }
            IOU.setMoneyRequestParticipantsFromReport(transactionID, report);
            if (isSplitBill && !report.isOwnPolicyExpenseChat && report.participants) {
                const participantAccountIDs = Object.keys(report.participants).map((accountID) => Number(accountID));
                IOU.setSplitShares(transaction, amountInSmallestCurrencyUnits, currency || CONST.CURRENCY.USD, participantAccountIDs);
            }
            navigateToConfirmationPage();
            return;
        }

        // If there was no reportID, then that means the user started this flow from the global + menu
        // and an optimistic reportID was generated. In that case, the next step is to select the participants for this expense.
        navigateToParticipantPage();
    };

    const saveAmountAndCurrency = ({amount, paymentMethod}: AmountParams) => {
        const newAmount = CurrencyUtils.convertToBackendAmount(Number.parseFloat(amount));

        // Edits to the amount from the splits page should reset the split shares.
        if (transaction?.splitShares) {
            IOU.resetSplitShares(transaction, newAmount, currency);
        }

        if (!isEditing) {
            navigateToNextPage({amount, paymentMethod});
            return;
        }

        // If the value hasn't changed, don't request to save changes on the server and just close the modal
        const transactionCurrency = TransactionUtils.getCurrency(currentTransaction);
        if (newAmount === TransactionUtils.getAmount(currentTransaction) && currency === transactionCurrency) {
            navigateBack();
            return;
        }

        // If currency has changed, then we get the default tax rate based on currency, otherwise we use the current tax rate selected in transaction, if we have it.
        const transactionTaxCode = ReportUtils.getTransactionDetails(currentTransaction)?.taxCode;
        const defaultTaxCode = TransactionUtils.getDefaultTaxCode(policy, currentTransaction, currency) ?? '';
        const taxCode = (currency !== transactionCurrency ? defaultTaxCode : transactionTaxCode) ?? defaultTaxCode;
        const taxPercentage = TransactionUtils.getTaxValue(policy, currentTransaction, taxCode) ?? '';
        const taxAmount = CurrencyUtils.convertToBackendAmount(TransactionUtils.calculateTaxAmount(taxPercentage, newAmount, currency ?? CONST.CURRENCY.USD));

        if (isSplitBill) {
            IOU.setDraftSplitTransaction(transactionID, {amount: newAmount, currency, taxCode, taxAmount});
            navigateBack();
            return;
        }

        IOU.updateMoneyRequestAmountAndCurrency({transactionID, transactionThreadReportID: reportID, currency, amount: newAmount, taxAmount, policy, taxCode});
        navigateBack();
    };

    return (
        <StepScreenWrapper
            headerTitle={translate('iou.amount')}
            onBackButtonPress={navigateBack}
            testID={IOURequestStepAmount.displayName}
            shouldShowWrapper={!!backTo || isEditing}
            includeSafeAreaPaddingBottom
        >
            <MoneyRequestAmountForm
                isEditing={!!backTo || isEditing}
                currency={currency}
                amount={Math.abs(transactionAmount)}
                skipConfirmation={shouldSkipConfirmation ?? false}
                iouType={iouType}
                policyID={policy?.id}
                bankAccountRoute={ReportUtils.getBankAccountRoute(report)}
                ref={(e) => (textInput.current = e)}
                shouldKeepUserInput={transaction?.shouldShowOriginalAmount}
                onCurrencyButtonPress={navigateToCurrencySelectionPage}
                onSubmitButtonPress={saveAmountAndCurrency}
                selectedTab={iouRequestType}
            />
        </StepScreenWrapper>
    );
}

IOURequestStepAmount.displayName = 'IOURequestStepAmount';

const IOURequestStepAmountWithCurrentUserPersonalDetails = withCurrentUserPersonalDetails(IOURequestStepAmount);
// eslint-disable-next-line rulesdir/no-negated-variables
const IOURequestStepAmountWithWritableReportOrNotFound = withWritableReportOrNotFound(IOURequestStepAmountWithCurrentUserPersonalDetails, true);
// eslint-disable-next-line rulesdir/no-negated-variables
const IOURequestStepAmountWithFullTransactionOrNotFound = withFullTransactionOrNotFound(IOURequestStepAmountWithWritableReportOrNotFound);

export default IOURequestStepAmountWithFullTransactionOrNotFound;
