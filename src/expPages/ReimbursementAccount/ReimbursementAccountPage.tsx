import type {WithPolicyOnyxProps} from '@expPages/workspace/withPolicy';
import withPolicy from '@expPages/workspace/withPolicy';
import {Str} from 'expensify-common';
import lodashPick from 'lodash/pick';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import {useSession} from '@components/OnyxProvider';
import ReimbursementAccountLoadingIndicator from '@components/ReimbursementAccountLoadingIndicator';
import ScreenWrapper from '@components/ScreenWrapper';
import Text from '@components/Text';
import useBeforeRemove from '@hooks/useBeforeRemove';
import useEnvironment from '@hooks/useEnvironment';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import usePrevious from '@hooks/usePrevious';
import useThemeStyles from '@hooks/useThemeStyles';
import getPlaidOAuthReceivedRedirectURI from '@libs/getPlaidOAuthReceivedRedirectURI';
import BankAccount from '@libs/models/BankAccount';
import Navigation from '@libs/Navigation/Navigation';
import type {PlatformStackRouteProp, PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {ReimbursementAccountNavigatorParamList} from '@libs/Navigation/types';
import {goBackFromInvalidPolicy, isPendingDeletePolicy, isPolicyAdmin} from '@libs/PolicyUtils';
import {getRouteForCurrentStep, REIMBURSEMENT_ACCOUNT_ROUTE_NAMES} from '@libs/ReimbursementAccountUtils';
import shouldReopenOnfido from '@libs/shouldReopenOnfido';
import {
    clearOnfidoToken,
    goToWithdrawalAccountSetupStep,
    hideBankAccountErrors,
    openReimbursementAccountPage,
    setBankAccountSubStep,
    setPlaidEvent,
    setReimbursementAccountLoading,
    updateReimbursementAccountDraft,
} from '@userActions/BankAccounts';
import {clearReimbursementAccountDraft} from '@userActions/ReimbursementAccount';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type SCREENS from '@src/SCREENS';
import type {InputID} from '@src/types/form/ReimbursementAccountForm';
import type {ACHDataReimbursementAccount, BankAccountStep as TBankAccountStep} from '@src/types/onyx/ReimbursementAccount';
import {isEmptyObject} from '@src/types/utils/EmptyObject';
import ACHContractStep from './ACHContractStep';
import BankAccountStep from './BankAccountStep';
import BeneficialOwnersStep from './BeneficialOwnersStep';
import CompanyStep from './CompanyStep';
import ConnectBankAccount from './ConnectBankAccount/ConnectBankAccount';
import ContinueBankAccountSetup from './ContinueBankAccountSetup';
import EnableBankAccount from './EnableBankAccount/EnableBankAccount';
import Agreements from './NonUSD/Agreements';
import BankInfo from './NonUSD/BankInfo/BankInfo';
import BeneficialOwnerInfo from './NonUSD/BeneficialOwnerInfo/BeneficialOwnerInfo';
import BusinessInfo from './NonUSD/BusinessInfo/BusinessInfo';
import Country from './NonUSD/Country/Country';
import Finish from './NonUSD/Finish';
import SignerInfo from './NonUSD/SignerInfo';
import RequestorStep from './RequestorStep';

type ReimbursementAccountPageProps = WithPolicyOnyxProps & PlatformStackScreenProps<ReimbursementAccountNavigatorParamList, typeof SCREENS.REIMBURSEMENT_ACCOUNT_ROOT>;

const SUPPORTED_FOREIGN_CURRENCIES: string[] = [CONST.CURRENCY.EUR, CONST.CURRENCY.GBP, CONST.CURRENCY.CAD, CONST.CURRENCY.AUD];

/**
 * We can pass stepToOpen in the URL to force which step to show.
 * Mainly needed when user finished the flow in verifying state, and Ops ask them to modify some fields from a specific step.
 */
function getStepToOpenFromRouteParams(route: PlatformStackRouteProp<ReimbursementAccountNavigatorParamList, typeof SCREENS.REIMBURSEMENT_ACCOUNT_ROOT>): TBankAccountStep | '' {
    switch (route.params.stepToOpen) {
        case REIMBURSEMENT_ACCOUNT_ROUTE_NAMES.NEW:
            return CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT;
        case REIMBURSEMENT_ACCOUNT_ROUTE_NAMES.COMPANY:
            return CONST.BANK_ACCOUNT.STEP.COMPANY;
        case REIMBURSEMENT_ACCOUNT_ROUTE_NAMES.PERSONAL_INFORMATION:
            return CONST.BANK_ACCOUNT.STEP.REQUESTOR;
        case REIMBURSEMENT_ACCOUNT_ROUTE_NAMES.BENEFICIAL_OWNERS:
            return CONST.BANK_ACCOUNT.STEP.BENEFICIAL_OWNERS;
        case REIMBURSEMENT_ACCOUNT_ROUTE_NAMES.CONTRACT:
            return CONST.BANK_ACCOUNT.STEP.ACH_CONTRACT;
        case REIMBURSEMENT_ACCOUNT_ROUTE_NAMES.VALIDATE:
            return CONST.BANK_ACCOUNT.STEP.VALIDATION;
        case REIMBURSEMENT_ACCOUNT_ROUTE_NAMES.ENABLE:
            return CONST.BANK_ACCOUNT.STEP.ENABLE;
        default:
            return '';
    }
}

/**
 * Returns selected bank account fields based on field names provided.
 */
function getFieldsForStep(step: TBankAccountStep): InputID[] {
    switch (step) {
        case CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT:
            return ['routingNumber', 'accountNumber', 'bankName', 'plaidAccountID', 'plaidAccessToken', 'isSavings'];
        case CONST.BANK_ACCOUNT.STEP.COMPANY:
            return [
                'companyName',
                'addressStreet',
                'addressZipCode',
                'addressCity',
                'addressState',
                'companyPhone',
                'website',
                'companyTaxID',
                'incorporationType',
                'incorporationDate',
                'incorporationState',
            ];
        case CONST.BANK_ACCOUNT.STEP.REQUESTOR:
            return ['firstName', 'lastName', 'dob', 'ssnLast4', 'requestorAddressStreet', 'requestorAddressCity', 'requestorAddressState', 'requestorAddressZipCode'];
        default:
            return [];
    }
}

function ReimbursementAccountPage({route, policy, isLoadingPolicy}: ReimbursementAccountPageProps) {
    const session = useSession();
    const [reimbursementAccount] = useOnyx(ONYXKEYS.REIMBURSEMENT_ACCOUNT);
    const [plaidLinkToken = ''] = useOnyx(ONYXKEYS.PLAID_LINK_TOKEN);
    const [plaidCurrentEvent = ''] = useOnyx(ONYXKEYS.PLAID_CURRENT_EVENT);
    const [onfidoToken = ''] = useOnyx(ONYXKEYS.ONFIDO_TOKEN);
    const [isLoadingApp = false] = useOnyx(ONYXKEYS.IS_LOADING_APP);
    const [account] = useOnyx(ONYXKEYS.ACCOUNT);
    const [isDebugModeEnabled] = useOnyx(ONYXKEYS.USER, {selector: (user) => !!user?.isDebugModeEnabled});
    const [isValidateCodeActionModalVisible, setIsValidateCodeActionModalVisible] = useState(false);

    const policyName = policy?.name ?? '';
    const policyIDParam = route.params?.policyID;
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {isOffline} = useNetwork();
    const requestorStepRef = useRef(null);
    const prevReimbursementAccount = usePrevious(reimbursementAccount);
    const prevIsOffline = usePrevious(isOffline);
    const {isDevelopment} = useEnvironment();

    /**
     The SetupWithdrawalAccount flow allows us to continue the flow from various points depending on where the
     user left off. This view will refer to the achData as the single source of truth to determine which route to
     display. We can also specify a specific route to navigate to via route params when the component first
     mounts which will set the achData.currentStep after the account data is fetched and overwrite the logical
     next step.
     */
    const achData = reimbursementAccount?.achData;
    const isPreviousPolicy = policyIDParam === achData?.policyID;
    // eslint-disable-next-line  @typescript-eslint/prefer-nullish-coalescing
    const currentStep = !isPreviousPolicy ? CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT : achData?.currentStep || CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT;
    const [nonUSDBankAccountStep, setNonUSDBankAccountStep] = useState<string>(CONST.NON_USD_BANK_ACCOUNT.STEP.COUNTRY);

    function getBankAccountFields(fieldNames: InputID[]): Partial<ACHDataReimbursementAccount> {
        return {
            ...lodashPick(reimbursementAccount?.achData, ...fieldNames),
        };
    }

    /**
     * Returns true if a VBBA exists in any state other than OPEN or LOCKED
     */
    function hasInProgressVBBA(): boolean {
        return !!achData?.bankAccountID && !!achData?.state && achData?.state !== BankAccount.STATE.OPEN && achData?.state !== BankAccount.STATE.LOCKED;
    }

    /*
     * Calculates the state used to show the "Continue with setup" view. If a bank account setup is already in progress and
     * no specific further step was passed in the url we'll show the workspace bank account reset modal if the user wishes to start over
     */
    function getShouldShowContinueSetupButtonInitialValue(): boolean {
        if (!hasInProgressVBBA()) {
            // Since there is no VBBA in progress, we won't need to show the component ContinueBankAccountSetup
            return false;
        }
        return achData?.state === BankAccount.STATE.PENDING || [CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT, ''].includes(getStepToOpenFromRouteParams(route));
    }

    /**
     When this page is first opened, `reimbursementAccount` prop might not yet be fully loaded from Onyx.
     Calculating `shouldShowContinueSetupButton` immediately on initial render doesn't make sense as
     it relies on incomplete data. Thus, we should wait to calculate it until we have received
     the full `reimbursementAccount` data from the server. This logic is handled within the useEffect hook,
     which acts similarly to `componentDidUpdate` when the `reimbursementAccount` dependency changes.
     */
    const [hasACHDataBeenLoaded, setHasACHDataBeenLoaded] = useState(reimbursementAccount !== CONST.REIMBURSEMENT_ACCOUNT.DEFAULT_DATA && isPreviousPolicy);
    const [shouldShowContinueSetupButton, setShouldShowContinueSetupButton] = useState(() => getShouldShowContinueSetupButtonInitialValue());

    const handleNextNonUSDBankAccountStep = () => {
        switch (nonUSDBankAccountStep) {
            case CONST.NON_USD_BANK_ACCOUNT.STEP.COUNTRY:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.BANK_INFO);
                break;
            case CONST.NON_USD_BANK_ACCOUNT.STEP.BANK_INFO:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.BUSINESS_INFO);
                break;
            case CONST.NON_USD_BANK_ACCOUNT.STEP.BUSINESS_INFO:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.BENEFICIAL_OWNER_INFO);
                break;
            case CONST.NON_USD_BANK_ACCOUNT.STEP.BENEFICIAL_OWNER_INFO:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.SIGNER_INFO);
                break;
            case CONST.NON_USD_BANK_ACCOUNT.STEP.SIGNER_INFO:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.AGREEMENTS);
                break;
            case CONST.NON_USD_BANK_ACCOUNT.STEP.AGREEMENTS:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.FINISH);
                break;
            default:
                return null;
        }
    };

    const nonUSDBankAccountsGoBack = () => {
        switch (nonUSDBankAccountStep) {
            case CONST.NON_USD_BANK_ACCOUNT.STEP.COUNTRY:
                Navigation.goBack();
                break;
            case CONST.NON_USD_BANK_ACCOUNT.STEP.BANK_INFO:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.COUNTRY);
                break;
            case CONST.NON_USD_BANK_ACCOUNT.STEP.BUSINESS_INFO:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.BANK_INFO);
                break;
            case CONST.NON_USD_BANK_ACCOUNT.STEP.BENEFICIAL_OWNER_INFO:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.BUSINESS_INFO);
                break;
            case CONST.NON_USD_BANK_ACCOUNT.STEP.SIGNER_INFO:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.BENEFICIAL_OWNER_INFO);
                break;
            case CONST.NON_USD_BANK_ACCOUNT.STEP.AGREEMENTS:
                setNonUSDBankAccountStep(CONST.NON_USD_BANK_ACCOUNT.STEP.SIGNER_INFO);
                break;
            default:
                return null;
        }
    };

    /**
     * Retrieve verified business bank account currently being set up.
     */
    function fetchData() {
        // We can specify a step to navigate to by using route params when the component mounts.
        // We want to use the same stepToOpen variable when the network state changes because we can be redirected to a different step when the account refreshes.
        const stepToOpen = getStepToOpenFromRouteParams(route);
        const subStep = isPreviousPolicy ? achData?.subStep ?? '' : '';
        const localCurrentStep = isPreviousPolicy ? achData?.currentStep ?? '' : '';

        if (policyIDParam) {
            openReimbursementAccountPage(stepToOpen, subStep, localCurrentStep, policyIDParam);
        }
    }

    useBeforeRemove(() => setIsValidateCodeActionModalVisible(false));

    useEffect(() => {
        if (isPreviousPolicy) {
            return;
        }

        setReimbursementAccountLoading(true);
        clearReimbursementAccountDraft();

        // If the step to open is empty, we want to clear the sub step, so the connect option view is shown to the user
        const isStepToOpenEmpty = getStepToOpenFromRouteParams(route) === '';
        if (isStepToOpenEmpty) {
            setBankAccountSubStep(null);
            setPlaidEvent(null);
        }
        fetchData();
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
    }, []); // The empty dependency array ensures this runs only once after the component mounts.

    useEffect(
        () => {
            // Check for network change from offline to online
            if (prevIsOffline && !isOffline && prevReimbursementAccount && prevReimbursementAccount.pendingAction !== CONST.RED_BRICK_ROAD_PENDING_ACTION.DELETE) {
                fetchData();
            }

            if (!hasACHDataBeenLoaded) {
                if (reimbursementAccount !== CONST.REIMBURSEMENT_ACCOUNT.DEFAULT_DATA && reimbursementAccount?.isLoading === false) {
                    setHasACHDataBeenLoaded(true);
                }
                return;
            }

            if (
                prevReimbursementAccount &&
                prevReimbursementAccount.pendingAction === CONST.RED_BRICK_ROAD_PENDING_ACTION.DELETE &&
                reimbursementAccount?.pendingAction !== prevReimbursementAccount.pendingAction
            ) {
                setShouldShowContinueSetupButton(hasInProgressVBBA());
            }

            if (shouldShowContinueSetupButton) {
                return;
            }

            const currentStepRouteParam = getStepToOpenFromRouteParams(route);
            if (currentStepRouteParam === currentStep) {
                // If the user is connecting online with plaid, reset any bank account errors so we don't persist old data from a potential previous connection
                if (currentStep === CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT && achData?.subStep === CONST.BANK_ACCOUNT.SETUP_TYPE.PLAID) {
                    hideBankAccountErrors();
                }

                // The route is showing the correct step, no need to update the route param or clear errors.
                return;
            }

            // Update the data that is returned from back-end to draft value
            const draftStep = reimbursementAccount?.draftStep;
            if (draftStep) {
                updateReimbursementAccountDraft(getBankAccountFields(getFieldsForStep(draftStep)));
            }

            if (currentStepRouteParam !== '') {
                // When we click "Connect bank account", we load the page without the current step param, if there
                // was an error when we tried to disconnect or start over, we want the user to be able to see the error,
                // so we don't clear it. We only want to clear the errors if we are moving between steps.
                hideBankAccountErrors();
            }

            Navigation.setParams({stepToOpen: getRouteForCurrentStep(currentStep)});
        },
        // eslint-disable-next-line react-compiler/react-compiler, react-hooks/exhaustive-deps
        [isOffline, reimbursementAccount, route, hasACHDataBeenLoaded, shouldShowContinueSetupButton],
    );

    const setManualStep = () => {
        setBankAccountSubStep(CONST.BANK_ACCOUNT.SETUP_TYPE.MANUAL).then(() => {
            setShouldShowContinueSetupButton(false);
        });
    };

    const goBack = () => {
        const subStep = achData?.subStep;
        const shouldShowOnfido = onfidoToken && !achData?.isOnfidoSetupComplete;

        switch (currentStep) {
            case CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT:
                if (hasInProgressVBBA()) {
                    setShouldShowContinueSetupButton(true);
                }
                if (subStep) {
                    setBankAccountSubStep(null);
                    setPlaidEvent(null);
                } else {
                    Navigation.goBack();
                }
                break;

            case CONST.BANK_ACCOUNT.STEP.COMPANY:
                clearOnfidoToken();
                goToWithdrawalAccountSetupStep(CONST.BANK_ACCOUNT.STEP.REQUESTOR);
                break;

            case CONST.BANK_ACCOUNT.STEP.REQUESTOR:
                if (shouldShowOnfido) {
                    clearOnfidoToken();
                } else {
                    goToWithdrawalAccountSetupStep(CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT);
                }
                break;

            case CONST.BANK_ACCOUNT.STEP.BENEFICIAL_OWNERS:
                goToWithdrawalAccountSetupStep(CONST.BANK_ACCOUNT.STEP.COMPANY);
                break;

            case CONST.BANK_ACCOUNT.STEP.ACH_CONTRACT:
                goToWithdrawalAccountSetupStep(CONST.BANK_ACCOUNT.STEP.BENEFICIAL_OWNERS);
                break;

            case CONST.BANK_ACCOUNT.STEP.VALIDATION:
                if ([BankAccount.STATE.VERIFYING, BankAccount.STATE.SETUP].some((value) => value === achData?.state)) {
                    goToWithdrawalAccountSetupStep(CONST.BANK_ACCOUNT.STEP.ACH_CONTRACT);
                } else if (!isOffline && achData?.state === BankAccount.STATE.PENDING) {
                    setShouldShowContinueSetupButton(true);
                } else {
                    Navigation.goBack();
                }
                break;

            default:
                Navigation.goBack();
        }
    };

    const isLoading =
        (!!isLoadingApp || !!account?.isLoading || (reimbursementAccount?.isLoading && !reimbursementAccount?.isCreateCorpayBankAccount)) &&
        (!plaidCurrentEvent || plaidCurrentEvent === CONST.BANK_ACCOUNT.PLAID.EVENTS_NAME.EXIT);

    const shouldShowOfflineLoader = !(
        isOffline &&
        [
            CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT,
            CONST.BANK_ACCOUNT.STEP.COMPANY,
            CONST.BANK_ACCOUNT.STEP.REQUESTOR,
            CONST.BANK_ACCOUNT.STEP.BENEFICIAL_OWNERS,
            CONST.BANK_ACCOUNT.STEP.ACH_CONTRACT,
        ].some((value) => value === currentStep)
    );

    if (isLoadingPolicy) {
        return <FullScreenLoadingIndicator />;
    }

    // Show loading indicator when page is first time being opened and props.reimbursementAccount yet to be loaded from the server
    // or when data is being loaded. Don't show the loading indicator if we're offline and restarted the bank account setup process
    // On Android, when we open the app from the background, Onfido activity gets destroyed, so we need to reopen it.
    // eslint-disable-next-line react-compiler/react-compiler
    if (
        (!hasACHDataBeenLoaded || isLoading) &&
        shouldShowOfflineLoader &&
        (shouldReopenOnfido || !requestorStepRef?.current) &&
        !(currentStep === CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT && isValidateCodeActionModalVisible)
    ) {
        return <ReimbursementAccountLoadingIndicator onBackButtonPress={goBack} />;
    }

    if ((!isLoading && (isEmptyObject(policy) || !isPolicyAdmin(policy))) || isPendingDeletePolicy(policy)) {
        return (
            <ScreenWrapper testID={ReimbursementAccountPage.displayName}>
                <FullPageNotFoundView
                    shouldShow
                    onBackButtonPress={goBackFromInvalidPolicy}
                    onLinkPress={goBackFromInvalidPolicy}
                    subtitleKey={isEmptyObject(policy) || isPendingDeletePolicy(policy) ? undefined : 'workspace.common.notAuthorized'}
                />
            </ScreenWrapper>
        );
    }

    let errorText;
    const userHasPhonePrimaryEmail = Str.endsWith(session?.email ?? '', CONST.SMS.DOMAIN);
    const throttledDate = reimbursementAccount?.throttledDate ?? '';

    const policyCurrency = policy?.outputCurrency ?? '';
    // TODO once nonUSD flow is complete update the flag below to reflect all supported currencies, this will be updated in - https://github.com/Expensify/App/issues/50912
    const hasUnsupportedCurrency = policyCurrency !== CONST.CURRENCY.USD;
    // TODO remove isDevelopment and isDebugModeEnabled flags once nonUSD flow is complete, this will be updated in - https://github.com/Expensify/App/issues/50912
    const hasForeignCurrency = SUPPORTED_FOREIGN_CURRENCIES.includes(policyCurrency) && (isDevelopment || isDebugModeEnabled);

    if (userHasPhonePrimaryEmail) {
        errorText = translate('bankAccount.hasPhoneLoginError');
    } else if (throttledDate) {
        errorText = translate('bankAccount.hasBeenThrottledError');
    } else if (hasUnsupportedCurrency) {
        if (hasForeignCurrency) {
            switch (nonUSDBankAccountStep) {
                case CONST.NON_USD_BANK_ACCOUNT.STEP.COUNTRY:
                    return (
                        <Country
                            onBackButtonPress={nonUSDBankAccountsGoBack}
                            onSubmit={handleNextNonUSDBankAccountStep}
                        />
                    );
                case CONST.NON_USD_BANK_ACCOUNT.STEP.BANK_INFO:
                    return (
                        <BankInfo
                            onBackButtonPress={nonUSDBankAccountsGoBack}
                            onSubmit={handleNextNonUSDBankAccountStep}
                        />
                    );
                case CONST.NON_USD_BANK_ACCOUNT.STEP.BUSINESS_INFO:
                    return (
                        <BusinessInfo
                            onBackButtonPress={nonUSDBankAccountsGoBack}
                            onSubmit={handleNextNonUSDBankAccountStep}
                        />
                    );
                case CONST.NON_USD_BANK_ACCOUNT.STEP.BENEFICIAL_OWNER_INFO:
                    return (
                        <BeneficialOwnerInfo
                            onBackButtonPress={nonUSDBankAccountsGoBack}
                            onSubmit={handleNextNonUSDBankAccountStep}
                        />
                    );
                case CONST.NON_USD_BANK_ACCOUNT.STEP.SIGNER_INFO:
                    return (
                        <SignerInfo
                            onBackButtonPress={nonUSDBankAccountsGoBack}
                            onSubmit={handleNextNonUSDBankAccountStep}
                        />
                    );
                case CONST.NON_USD_BANK_ACCOUNT.STEP.AGREEMENTS:
                    return (
                        <Agreements
                            onBackButtonPress={nonUSDBankAccountsGoBack}
                            onSubmit={handleNextNonUSDBankAccountStep}
                        />
                    );
                case CONST.NON_USD_BANK_ACCOUNT.STEP.FINISH:
                    return <Finish />;
                default:
                    return null;
            }
        }
        errorText = translate('bankAccount.hasCurrencyError');
    }

    if (errorText) {
        return (
            <ScreenWrapper testID={ReimbursementAccountPage.displayName}>
                <HeaderWithBackButton
                    title={translate('workspace.common.connectBankAccount')}
                    subtitle={policyName}
                    onBackButtonPress={() => Navigation.goBack()}
                />
                <View style={[styles.m5, styles.mv3, styles.flex1]}>
                    <Text>{errorText}</Text>
                </View>
            </ScreenWrapper>
        );
    }

    if (shouldShowContinueSetupButton) {
        return (
            <ContinueBankAccountSetup
                reimbursementAccount={reimbursementAccount}
                onContinuePress={setManualStep}
                policyName={policyName}
                onBackButtonPress={Navigation.goBack}
            />
        );
    }

    switch (currentStep) {
        case CONST.BANK_ACCOUNT.STEP.BANK_ACCOUNT:
            return (
                <BankAccountStep
                    reimbursementAccount={reimbursementAccount}
                    onBackButtonPress={goBack}
                    receivedRedirectURI={getPlaidOAuthReceivedRedirectURI()}
                    plaidLinkOAuthToken={plaidLinkToken}
                    policyName={policyName}
                    policyID={policyIDParam}
                    isValidateCodeActionModalVisible={isValidateCodeActionModalVisible}
                    toggleValidateCodeActionModal={setIsValidateCodeActionModalVisible}
                />
            );
        case CONST.BANK_ACCOUNT.STEP.REQUESTOR:
            return (
                <RequestorStep
                    ref={requestorStepRef}
                    shouldShowOnfido={!!(onfidoToken && !achData?.isOnfidoSetupComplete)}
                    onBackButtonPress={goBack}
                />
            );
        case CONST.BANK_ACCOUNT.STEP.COMPANY:
            return <CompanyStep onBackButtonPress={goBack} />;
        case CONST.BANK_ACCOUNT.STEP.BENEFICIAL_OWNERS:
            return <BeneficialOwnersStep onBackButtonPress={goBack} />;
        case CONST.BANK_ACCOUNT.STEP.ACH_CONTRACT:
            return <ACHContractStep onBackButtonPress={goBack} />;
        case CONST.BANK_ACCOUNT.STEP.VALIDATION:
            return <ConnectBankAccount onBackButtonPress={goBack} />;
        case CONST.BANK_ACCOUNT.STEP.ENABLE:
            return (
                <EnableBankAccount
                    reimbursementAccount={reimbursementAccount}
                    onBackButtonPress={goBack}
                />
            );
        default:
            return null;
    }
}

ReimbursementAccountPage.displayName = 'ReimbursementAccountPage';

export default withPolicy(ReimbursementAccountPage);
