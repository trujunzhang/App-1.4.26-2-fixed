import type {OnyxEntry} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import CONST from '@src/CONST';
import ROUTES from '@src/ROUTES';
import type {Report, Transaction} from '@src/types/onyx';
import * as IOU from './actions/IOU';
import * as CurrencyUtils from './CurrencyUtils';
import * as FileUtils from './fileDownload/FileUtils';
import Navigation from './Navigation/Navigation';
import * as TransactionUtils from './TransactionUtils';

function navigateToStartMoneyRequestStep(requestType: ValueOf<typeof CONST.IOU.REQUEST_TYPE>, iouType: ValueOf<typeof CONST.IOU.TYPE>, transactionID: string, reportID: string) {
    // If the participants were automatically added to the transaction, then the user needs taken back to the starting step
    switch (requestType) {
        case CONST.IOU.REQUEST_TYPE.DISTANCE:
            Navigation.goBack(ROUTES.MONEY_REQUEST_CREATE_TAB_DISTANCE.getRoute(iouType, transactionID, reportID));
            break;
        case CONST.IOU.REQUEST_TYPE.SCAN:
            Navigation.goBack(ROUTES.MONEY_REQUEST_CREATE_TAB_SCAN.getRoute(iouType, transactionID, reportID));
            break;
        default:
            Navigation.goBack(ROUTES.MONEY_REQUEST_CREATE_TAB_MANUAL.getRoute(iouType, transactionID, reportID));
            break;
    }
}

type SuccessCallback = (file?: File) => void;
// eslint-disable-next-line rulesdir/no-negated-variables
function navigateToStartStepIfScanFileCannotBeRead(
    receiptFilename: string,
    receiptPath: string,
    onSuccess: SuccessCallback,
    requestType: ValueOf<typeof CONST.IOU.REQUEST_TYPE>,
    iouType: ValueOf<typeof CONST.IOU.TYPE>,
    transactionID: string,
    reportID: string,
) {
    if (!receiptFilename || !receiptPath) {
        return;
    }

    const onFailure = () => {
        IOU.setMoneyRequestReceipt(transactionID, '', '', true);
        if (requestType === CONST.IOU.REQUEST_TYPE.MANUAL) {
            Navigation.navigate(ROUTES.MONEY_REQUEST_STEP_SCAN.getRoute(CONST.IOU.ACTION.CREATE, iouType, transactionID, reportID, Navigation.getActiveRouteWithoutParams()));
            return;
        }
        navigateToStartMoneyRequestStep(requestType, iouType, transactionID, reportID);
    };
    FileUtils.readFileAsync(receiptPath, receiptFilename, onSuccess, onFailure);
}

/**
 * Calculates the amount per user given a list of participants
 *
 * @param numberOfParticipants - Number of participants in the chat. It should not include the current user.
 * @param total - IOU total amount in backend format (cents, no matter the currency)
 * @param currency - This is used to know how many decimal places are valid to use when splitting the total
 * @param isDefaultUser - Whether we are calculating the amount for the current user
 */
function calculateAmount(numberOfParticipants: number, total: number, currency: string, isDefaultUser = false): number {
    // Since the backend can maximum store 2 decimal places, any currency with more than 2 decimals
    // has to be capped to 2 decimal places
    const currencyUnit = Math.min(100, CurrencyUtils.getCurrencyUnit(currency));
    const totalInCurrencySubunit = Math.round((total / 100) * currencyUnit);
    const totalParticipants = numberOfParticipants + 1;
    const amountPerPerson = Math.round(totalInCurrencySubunit / totalParticipants);
    let finalAmount = amountPerPerson;
    if (isDefaultUser) {
        const sumAmount = amountPerPerson * totalParticipants;
        const difference = totalInCurrencySubunit - sumAmount;
        finalAmount = totalInCurrencySubunit !== sumAmount ? amountPerPerson + difference : amountPerPerson;
    }
    return Math.round((finalAmount * 100) / currencyUnit);
}

/**
 * The owner of the IOU report is the account who is owed money and the manager is the one who owes money!
 * In case the owner/manager swap, we need to update the owner of the IOU report and the report total, since it is always positive.
 * For example: if user1 owes user2 $10, then we have: {ownerAccountID: user2, managerID: user1, total: $10 (a positive amount, owed to user2)}
 * If user1 requests $17 from user2, then we have: {ownerAccountID: user1, managerID: user2, total: $7 (still a positive amount, but now owed to user1)}
 *
 * @param isDeleting - whether the user is deleting the request
 */
function updateIOUOwnerAndTotal(iouReport: OnyxEntry<Report>, actorAccountID: number, amount: number, currency: string, isDeleting = false): OnyxEntry<Report> {
    if (currency !== iouReport?.currency) {
        return iouReport;
    }

    // Make a copy so we don't mutate the original object
    const iouReportUpdate: Report = {...iouReport};

    // Let us ensure a valid value before updating the total amount.
    iouReportUpdate.total = iouReportUpdate.total ?? 0;

    if (actorAccountID === iouReport.ownerAccountID) {
        iouReportUpdate.total += isDeleting ? -amount : amount;
    } else {
        iouReportUpdate.total += isDeleting ? amount : -amount;
    }

    if (iouReportUpdate.total < 0) {
        // The total sign has changed and hence we need to flip the manager and owner of the report.
        iouReportUpdate.ownerAccountID = iouReport.managerID;
        iouReportUpdate.managerID = iouReport.ownerAccountID;
        iouReportUpdate.total = -iouReportUpdate.total;
    }

    return iouReportUpdate;
}

/**
 * Returns whether or not an IOU report contains money requests in a different currency
 * that are either created or cancelled offline, and thus haven't been converted to the report's currency yet
 */
function isIOUReportPendingCurrencyConversion(iouReport: Report): boolean {
    const reportTransactions: Transaction[] = TransactionUtils.getAllReportTransactions(iouReport.reportID);
    const pendingRequestsInDifferentCurrency = reportTransactions.filter((transaction) => transaction.pendingAction && TransactionUtils.getCurrency(transaction) !== iouReport.currency);
    return pendingRequestsInDifferentCurrency.length > 0;
}

/**
 * Checks if the iou type is one of request, send, or split.
 */
function isValidMoneyRequestType(iouType: string): boolean {
    const moneyRequestType: string[] = [CONST.IOU.TYPE.REQUEST, CONST.IOU.TYPE.SPLIT, CONST.IOU.TYPE.SEND];
    return moneyRequestType.includes(iouType);
}

export {calculateAmount, updateIOUOwnerAndTotal, isIOUReportPendingCurrencyConversion, isValidMoneyRequestType, navigateToStartMoneyRequestStep, navigateToStartStepIfScanFileCannotBeRead};