import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import type {OnyxEntry} from 'react-native-onyx';
import useLocalize from '@hooks/useLocalize';
import DistanceRequestUtils from '@libs/DistanceRequestUtils';
import * as IOUUtils from '@libs/IOUUtils';
import Navigation from '@libs/Navigation/Navigation';
import * as TransactionUtils from '@libs/TransactionUtils';
import * as IOU from '@userActions/IOU';
import CONST from '@src/CONST';
import MoneyRequestParticipantsSelector from '@src/expPages/iou/request/MoneyTemporaryForRefactorRequestParticipantsSelector';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';
import type {Transaction} from '@src/types/onyx';
import type {Participant} from '@src/types/onyx/IOU';
import StepScreenWrapper from './StepScreenWrapper';
import type {WithFullTransactionOrNotFoundProps} from './withFullTransactionOrNotFound';
import withFullTransactionOrNotFound from './withFullTransactionOrNotFound';
import type {WithWritableReportOrNotFoundProps} from './withWritableReportOrNotFound';
import withWritableReportOrNotFound from './withWritableReportOrNotFound';

type IOURequestStepParticipantsOnyxProps = {
    /** The transaction object being modified in Onyx */
    transaction: OnyxEntry<Transaction>;
};

type IOURequestStepParticipantsProps = IOURequestStepParticipantsOnyxProps &
    WithWritableReportOrNotFoundProps<typeof SCREENS.MONEY_REQUEST.STEP_PARTICIPANTS> &
    WithFullTransactionOrNotFoundProps<typeof SCREENS.MONEY_REQUEST.STEP_PARTICIPANTS>;

function IOURequestStepParticipants({
    route: {
        params: {iouType, reportID, transactionID, action},
    },
    transaction,
}: IOURequestStepParticipantsProps) {
    const participants = transaction?.participants;
    const {translate} = useLocalize();
    const selectedReportID = useRef<string>(reportID);
    const numberOfParticipants = useRef(participants?.length ?? 0);
    const iouRequestType = TransactionUtils.getRequestType(transaction);
    const isSplitRequest = iouType === CONST.IOU.TYPE.SPLIT;
    const headerTitle = useMemo(() => {
        if (action === CONST.IOU.ACTION.CATEGORIZE) {
            return translate('iou.categorize');
        }
        if (action === CONST.IOU.ACTION.SUBMIT) {
            return translate('iou.submitExpense');
        }
        if (action === CONST.IOU.ACTION.SHARE) {
            return translate('iou.share');
        }
        if (isSplitRequest) {
            return translate('iou.splitExpense');
        }
        if (iouType === CONST.IOU.TYPE.PAY) {
            return translate('iou.paySomeone', {});
        }
        if (iouType === CONST.IOU.TYPE.INVOICE) {
            return translate('workspace.invoices.sendInvoice');
        }
        return translate('iou.submitExpense');
    }, [iouType, translate, isSplitRequest, action]);

    const receiptFilename = transaction?.filename;
    const receiptPath = transaction?.receipt?.source;
    const receiptType = transaction?.receipt?.type;

    // When the component mounts, if there is a receipt, see if the image can be read from the disk. If not, redirect the user to the starting step of the flow.
    // This is because until the expense is saved, the receipt file is only stored in the browsers memory as a blob:// and if the browser is refreshed, then
    // the image ceases to exist. The best way for the user to recover from this is to start over from the start of the expense process.
    // skip this in case user is moving the transaction as the receipt path will be valid in that case
    useEffect(() => {
        if (IOUUtils.isMovingTransactionFromTrackExpense(action)) {
            return;
        }
        IOU.navigateToStartStepIfScanFileCannotBeRead(receiptFilename ?? '', receiptPath ?? '', () => {}, iouRequestType, iouType, transactionID, reportID, receiptType ?? '');
    }, [receiptType, receiptPath, receiptFilename, iouRequestType, iouType, transactionID, reportID, action]);

    const addParticipant = useCallback(
        (val: Participant[]) => {
            IOU.setMoneyRequestParticipants(transactionID, val);
            const rateID = DistanceRequestUtils.getCustomUnitRateID(val[0]?.reportID ?? '');
            IOU.setCustomUnitRateID(transactionID, rateID);

            numberOfParticipants.current = val.length;

            // When multiple participants are selected, the reportID is generated at the end of the confirmation step.
            // So we are resetting selectedReportID ref to the reportID coming from params.
            if (val.length !== 1) {
                selectedReportID.current = reportID;
                return;
            }

            // When a participant is selected, the reportID needs to be saved because that's the reportID that will be used in the confirmation step.
            selectedReportID.current = val[0]?.reportID ?? reportID;
        },
        [reportID, transactionID],
    );

    const goToNextStep = useCallback(() => {
        const isCategorizing = action === CONST.IOU.ACTION.CATEGORIZE;

        IOU.setMoneyRequestTag(transactionID, '');
        IOU.setMoneyRequestCategory(transactionID, '');
        const iouConfirmationPageRoute = ROUTES.MONEY_REQUEST_STEP_CONFIRMATION.getRoute(action, iouType, transactionID, selectedReportID.current || reportID);
        if (isCategorizing) {
            Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_CATEGORY.getRoute(action, iouType, transactionID, selectedReportID.current || reportID, iouConfirmationPageRoute));
        } else {
            Navigation.navigate(iouConfirmationPageRoute);
        }
    }, [iouType, transactionID, reportID, action]);

    const navigateBack = useCallback(() => {
        IOUUtils.navigateToStartMoneyRequestStep(iouRequestType, iouType, transactionID, reportID, action);
    }, [iouRequestType, iouType, transactionID, reportID, action]);

    return (
        <StepScreenWrapper
            headerTitle={headerTitle}
            onBackButtonPress={navigateBack}
            shouldShowWrapper
            testID={IOURequestStepParticipants.displayName}
            includeSafeAreaPaddingBottom={false}
        >
            <MoneyRequestParticipantsSelector
                participants={isSplitRequest ? participants : []}
                onParticipantsAdded={addParticipant}
                onFinish={goToNextStep}
                iouType={iouType}
                iouRequestType={iouRequestType}
                action={action}
            />
        </StepScreenWrapper>
    );
}

IOURequestStepParticipants.displayName = 'IOURequestStepParticipants';

export default withWritableReportOrNotFound(withFullTransactionOrNotFound(IOURequestStepParticipants));
