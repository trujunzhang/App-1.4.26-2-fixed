import type {ParamListBase} from '@react-navigation/routers';
import type {StackNavigationOptions} from '@react-navigation/stack';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import useThemeStyles from '@hooks/useThemeStyles';
import type {
    AddPersonalBankAccountNavigatorParamList,
    DetailsNavigatorParamList,
    EditIeattaNavigatorParamList,
    EditRequestNavigatorParamList,
    EnablePaymentsNavigatorParamList,
    FlagCommentNavigatorParamList,
    MoneyRequestNavigatorParamList,
    NewChatNavigatorParamList,
    NewTaskNavigatorParamList,
    ParticipantsNavigatorParamList,
    PrivateNotesNavigatorParamList,
    ProfileNavigatorParamList,
    ReferralDetailsNavigatorParamList,
    ReimbursementAccountNavigatorParamList,
    ReportDetailsNavigatorParamList,
    ReportSettingsNavigatorParamList,
    ReportWelcomeMessageNavigatorParamList,
    RoomInviteNavigatorParamList,
    RoomMembersNavigatorParamList,
    SearchNavigatorParamList,
    SettingsNavigatorParamList,
    SignInNavigatorParamList,
    SplitDetailsNavigatorParamList,
    TaskDetailsNavigatorParamList,
    TeachersUniteNavigatorParamList,
    WalletStatementNavigatorParamList,
} from '@navigation/types';
import SCREENS from '@src/SCREENS';
import type {Screen} from '@src/SCREENS';

type Screens = Partial<Record<Screen, () => React.ComponentType>>;

/**
 * Create a modal stack navigator with an array of sub-screens.
 *
 * @param screens key/value pairs where the key is the name of the screen and the value is a functon that returns the lazy-loaded component
 */
function createModalStackNavigator<TStackParams extends ParamListBase>(screens: Screens): React.ComponentType {
    const ModalStackNavigator = createStackNavigator<TStackParams>();

    function ModalStack() {
        const styles = useThemeStyles();

        const defaultSubRouteOptions = useMemo(
            (): StackNavigationOptions => ({
                cardStyle: styles.navigationScreenCardStyle,
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }),
            [styles],
        );

        return (
            <ModalStackNavigator.Navigator screenOptions={defaultSubRouteOptions}>
                {Object.keys(screens as Required<Screens>).map((name) => (
                    <ModalStackNavigator.Screen
                        key={name}
                        name={name}
                        getComponent={(screens as Required<Screens>)[name as Screen]}
                    />
                ))}
            </ModalStackNavigator.Navigator>
        );
    }

    ModalStack.displayName = 'ModalStack';

    return ModalStack;
}

const EditIeattaStackNavigator = createModalStackNavigator<EditIeattaNavigatorParamList>({
    [SCREENS.RIGHT_IEATTA.RESTAURANT]: () => require('../../../pages/edit/restaurant').default as React.ComponentType,
    [SCREENS.RIGHT_IEATTA.EVENT]: () => require('../../../pages/edit/event').default as React.ComponentType,
    [SCREENS.RIGHT_IEATTA.RECIPE]: () => require('../../../pages/edit/recipe').default as React.ComponentType,
    [SCREENS.RIGHT_IEATTA.REVIEW]: () => require('../../../pages/edit/review').default as React.ComponentType,
    [SCREENS.RIGHT_IEATTA.ADD_RECIPES_IN_EVENT]: () => require('../../../pages/add/AddRecipesInEventPage').default as React.ComponentType,
    [SCREENS.RIGHT_IEATTA.ADD_USERS_IN_EVENT]: () => require('../../../pages/add/AddUsersInEventPage').default as React.ComponentType,
});

const MoneyRequestModalStackNavigator = createModalStackNavigator<MoneyRequestNavigatorParamList>({
    [SCREENS.MONEY_REQUEST.START]: () => require('../../../expPages/iou/request/IOURequestRedirectToStartPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.CREATE]: () => require('../../../expPages/iou/request/IOURequestStartPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_CONFIRMATION]: () => require('../../../expPages/iou/request/step/IOURequestStepConfirmation').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_AMOUNT]: () => require('../../../expPages/iou/request/step/IOURequestStepAmount').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_TAX_AMOUNT]: () => require('../../../expPages/iou/request/step/IOURequestStepTaxAmountPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_TAX_RATE]: () => require('../../../expPages/iou/request/step/IOURequestStepTaxRatePage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_CATEGORY]: () => require('../../../expPages/iou/request/step/IOURequestStepCategory').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_CURRENCY]: () => require('../../../expPages/iou/request/step/IOURequestStepCurrency').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_DATE]: () => require('../../../expPages/iou/request/step/IOURequestStepDate').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_DESCRIPTION]: () => require('../../../expPages/iou/request/step/IOURequestStepDescription').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_DISTANCE]: () => require('../../../expPages/iou/request/step/IOURequestStepDistance').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_MERCHANT]: () => require('../../../expPages/iou/request/step/IOURequestStepMerchant').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_PARTICIPANTS]: () => require('../../../expPages/iou/request/step/IOURequestStepParticipants').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_SCAN]: () => require('../../../expPages/iou/request/step/IOURequestStepScan').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_TAG]: () => require('../../../expPages/iou/request/step/IOURequestStepTag').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_WAYPOINT]: () => require('../../../expPages/iou/request/step/IOURequestStepWaypoint').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.ROOT]: () => require('../../../expPages/iou/MoneyRequestSelectorPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.AMOUNT]: () => require('../../../expPages/iou/steps/NewRequestAmountPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.PARTICIPANTS]: () => require('../../../expPages/iou/steps/MoneyRequstParticipantsPage/MoneyRequestParticipantsPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.CONFIRMATION]: () => require('../../../expPages/iou/steps/MoneyRequestConfirmPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.CURRENCY]: () => require('../../../expPages/iou/IOUCurrencySelection').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.DATE]: () => require('../../../expPages/iou/MoneyRequestDatePage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.DESCRIPTION]: () => require('../../../expPages/iou/MoneyRequestDescriptionPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.CATEGORY]: () => require('../../../expPages/iou/MoneyRequestCategoryPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.TAG]: () => require('../../../expPages/iou/MoneyRequestTagPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.MERCHANT]: () => require('../../../expPages/iou/MoneyRequestMerchantPage').default as React.ComponentType,
    [SCREENS.IOU_SEND.ADD_BANK_ACCOUNT]: () => require('../../../expPages/AddPersonalBankAccountPage').default as React.ComponentType,
    [SCREENS.IOU_SEND.ADD_DEBIT_CARD]: () => require('../../../expPages/settings/Wallet/AddDebitCardPage').default as React.ComponentType,
    [SCREENS.IOU_SEND.ENABLE_PAYMENTS]: () => require('../../../expPages/EnablePayments/EnablePaymentsPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.WAYPOINT]: () => require('../../../expPages/iou/MoneyRequestWaypointPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.DISTANCE]: () => require('../../../expPages/iou/NewDistanceRequestPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.RECEIPT]: () => require('../../../expPages/EditRequestReceiptPage').default as React.ComponentType,
});

const SplitDetailsModalStackNavigator = createModalStackNavigator<SplitDetailsNavigatorParamList>({
    [SCREENS.SPLIT_DETAILS.ROOT]: () => require('../../../expPages/iou/SplitBillDetailsPage').default as React.ComponentType,
    [SCREENS.SPLIT_DETAILS.EDIT_REQUEST]: () => require('../../../expPages/EditSplitBillPage').default as React.ComponentType,
    [SCREENS.SPLIT_DETAILS.EDIT_CURRENCY]: () => require('../../../expPages/iou/IOUCurrencySelection').default as React.ComponentType,
});

const DetailsModalStackNavigator = createModalStackNavigator<DetailsNavigatorParamList>({
    [SCREENS.DETAILS_ROOT]: () => require('../../../expPages/DetailsPage').default as React.ComponentType,
});

const ProfileModalStackNavigator = createModalStackNavigator<ProfileNavigatorParamList>({
    [SCREENS.PROFILE_ROOT]: () => require('../../../expPages/ProfilePage').default as React.ComponentType,
});

const ReportDetailsModalStackNavigator = createModalStackNavigator<ReportDetailsNavigatorParamList>({
    [SCREENS.REPORT_DETAILS.ROOT]: () => require('../../../expPages/ReportDetailsPage').default as React.ComponentType,
    [SCREENS.REPORT_DETAILS.SHARE_CODE]: () => require('../../../expPages/home/report/ReportDetailsShareCodePage').default as React.ComponentType,
});

const ReportSettingsModalStackNavigator = createModalStackNavigator<ReportSettingsNavigatorParamList>({
    [SCREENS.REPORT_SETTINGS.ROOT]: () => require('../../../expPages/settings/Report/ReportSettingsPage').default as React.ComponentType,
    [SCREENS.REPORT_SETTINGS.ROOM_NAME]: () => require('../../../expPages/settings/Report/RoomNamePage').default as React.ComponentType,
    [SCREENS.REPORT_SETTINGS.NOTIFICATION_PREFERENCES]: () => require('../../../expPages/settings/Report/NotificationPreferencePage').default as React.ComponentType,
    [SCREENS.REPORT_SETTINGS.WRITE_CAPABILITY]: () => require('../../../expPages/settings/Report/WriteCapabilityPage').default as React.ComponentType,
});

const TaskModalStackNavigator = createModalStackNavigator<TaskDetailsNavigatorParamList>({
    [SCREENS.TASK.TITLE]: () => require('../../../expPages/tasks/TaskTitlePage').default as React.ComponentType,
    [SCREENS.TASK.DESCRIPTION]: () => require('../../../expPages/tasks/TaskDescriptionPage').default as React.ComponentType,
    [SCREENS.TASK.ASSIGNEE]: () => require('../../../expPages/tasks/TaskAssigneeSelectorModal').default as React.ComponentType,
});

const ReportWelcomeMessageModalStackNavigator = createModalStackNavigator<ReportWelcomeMessageNavigatorParamList>({
    [SCREENS.REPORT_WELCOME_MESSAGE_ROOT]: () => require('../../../expPages/ReportWelcomeMessagePage').default as React.ComponentType,
});

const ReportParticipantsModalStackNavigator = createModalStackNavigator<ParticipantsNavigatorParamList>({
    [SCREENS.REPORT_PARTICIPANTS_ROOT]: () => require('../../../expPages/ReportParticipantsPage').default as React.ComponentType,
});

const RoomMembersModalStackNavigator = createModalStackNavigator<RoomMembersNavigatorParamList>({
    [SCREENS.ROOM_MEMBERS_ROOT]: () => require('../../../expPages/RoomMembersPage').default as React.ComponentType,
});

const RoomInviteModalStackNavigator = createModalStackNavigator<RoomInviteNavigatorParamList>({
    [SCREENS.ROOM_INVITE_ROOT]: () => require('../../../expPages/RoomInvitePage').default as React.ComponentType,
});

const SearchModalStackNavigator = createModalStackNavigator<SearchNavigatorParamList>({
    [SCREENS.SEARCH_ROOT]: () => require('../../../expPages/SearchPage').default as React.ComponentType,
});

const NewChatModalStackNavigator = createModalStackNavigator<NewChatNavigatorParamList>({
    [SCREENS.NEW_CHAT.ROOT]: () => require('../../../expPages/NewChatSelectorPage').default as React.ComponentType,
});

const NewTaskModalStackNavigator = createModalStackNavigator<NewTaskNavigatorParamList>({
    [SCREENS.NEW_TASK.ROOT]: () => require('../../../expPages/tasks/NewTaskPage').default as React.ComponentType,
    [SCREENS.NEW_TASK.TASK_ASSIGNEE_SELECTOR]: () => require('../../../expPages/tasks/TaskAssigneeSelectorModal').default as React.ComponentType,
    [SCREENS.NEW_TASK.TASK_SHARE_DESTINATION_SELECTOR]: () => require('../../../expPages/tasks/TaskShareDestinationSelectorModal').default as React.ComponentType,
    [SCREENS.NEW_TASK.DETAILS]: () => require('../../../expPages/tasks/NewTaskDetailsPage').default as React.ComponentType,
    [SCREENS.NEW_TASK.TITLE]: () => require('../../../expPages/tasks/NewTaskTitlePage').default as React.ComponentType,
    [SCREENS.NEW_TASK.DESCRIPTION]: () => require('../../../expPages/tasks/NewTaskDescriptionPage').default as React.ComponentType,
});

const NewTeachersUniteNavigator = createModalStackNavigator<TeachersUniteNavigatorParamList>({
    [SCREENS.SAVE_THE_WORLD.ROOT]: () => require('../../../expPages/TeachersUnite/SaveTheWorldPage').default as React.ComponentType,
    [SCREENS.I_KNOW_A_TEACHER]: () => require('../../../expPages/TeachersUnite/KnowATeacherPage').default as React.ComponentType,
    [SCREENS.INTRO_SCHOOL_PRINCIPAL]: () => require('../../../expPages/TeachersUnite/ImTeacherPage').default as React.ComponentType,
    [SCREENS.I_AM_A_TEACHER]: () => require('../../../expPages/TeachersUnite/ImTeacherPage').default as React.ComponentType,
});

const SettingsModalStackNavigator = createModalStackNavigator<SettingsNavigatorParamList>({
    [SCREENS.SETTINGS.ROOT]: () => require('../../../expPages/settings/InitialSettingsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.SHARE_CODE]: () => require('../../../expPages/ShareCodePage').default as React.ComponentType,
    [SCREENS.SETTINGS.WORKSPACES]: () => require('../../../expPages/workspace/WorkspacesListPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.ROOT]: () => require('../../../expPages/settings/Profile/ProfilePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.PRONOUNS]: () => require('../../../expPages/settings/Profile/PronounsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.DISPLAY_NAME]: () => require('../../../expPages/settings/Profile/DisplayNamePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.TIMEZONE]: () => require('../../../expPages/settings/Profile/TimezoneInitialPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.TIMEZONE_SELECT]: () => require('../../../expPages/settings/Profile/TimezoneSelectPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.PERSONAL_DETAILS.INITIAL]: () => require('../../../expPages/settings/Profile/PersonalDetails/PersonalDetailsInitialPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.PERSONAL_DETAILS.LEGAL_NAME]: () => require('../../../expPages/settings/Profile/PersonalDetails/LegalNamePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.PERSONAL_DETAILS.DATE_OF_BIRTH]: () => require('../../../expPages/settings/Profile/PersonalDetails/DateOfBirthPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.PERSONAL_DETAILS.ADDRESS]: () => require('../../../expPages/settings/Profile/PersonalDetails/AddressPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.PERSONAL_DETAILS.ADDRESS_COUNTRY]: () => require('../../../expPages/settings/Profile/PersonalDetails/CountrySelectionPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.CONTACT_METHODS]: () => require('../../../expPages/settings/Profile/Contacts/ContactMethodsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.CONTACT_METHOD_DETAILS]: () => require('../../../expPages/settings/Profile/Contacts/ContactMethodDetailsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.NEW_CONTACT_METHOD]: () => require('../../../expPages/settings/Profile/Contacts/NewContactMethodPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PREFERENCES.ROOT]: () => require('../../../expPages/settings/Preferences/PreferencesPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PREFERENCES.PRIORITY_MODE]: () => require('../../../expPages/settings/Preferences/PriorityModePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PREFERENCES.LANGUAGE]: () => require('../../../expPages/settings/Preferences/LanguagePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PREFERENCES.THEME]: () => require('../../../expPages/settings/Preferences/ThemePage').default as React.ComponentType,
    [SCREENS.SETTINGS.CLOSE]: () => require('../../../expPages/settings/Security/CloseAccountPage').default as React.ComponentType,
    [SCREENS.SETTINGS.SECURITY]: () => require('../../../expPages/settings/Security/SecuritySettingsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.ABOUT]: () => require('../../../expPages/settings/AboutPage/AboutPage').default as React.ComponentType,
    [SCREENS.SETTINGS.APP_DOWNLOAD_LINKS]: () => require('../../../expPages/settings/AppDownloadLinks').default as React.ComponentType,
    [SCREENS.SETTINGS.LOUNGE_ACCESS]: () => require('../../../expPages/settings/Profile/LoungeAccessPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.ROOT]: () => require('../../../expPages/settings/Wallet/WalletPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARDS_DIGITAL_DETAILS_UPDATE_ADDRESS]: () => require('../../../expPages/settings/Profile/PersonalDetails/AddressPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.DOMAIN_CARD]: () => require('../../../expPages/settings/Wallet/ExpensifyCardPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.REPORT_VIRTUAL_CARD_FRAUD]: () => require('../../../expPages/settings/Wallet/ReportVirtualCardFraudPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARD_ACTIVATE]: () => require('../../../expPages/settings/Wallet/ActivatePhysicalCardPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.NAME]: () => require('../../../expPages/settings/Wallet/Card/GetPhysicalCardName').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.PHONE]: () => require('../../../expPages/settings/Wallet/Card/GetPhysicalCardPhone').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.ADDRESS]: () => require('../../../expPages/settings/Wallet/Card/GetPhysicalCardAddress').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.CONFIRM]: () => require('../../../expPages/settings/Wallet/Card/GetPhysicalCardConfirm').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.TRANSFER_BALANCE]: () => require('../../../expPages/settings/Wallet/TransferBalancePage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CHOOSE_TRANSFER_ACCOUNT]: () => require('../../../expPages/settings/Wallet/ChooseTransferAccountPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.ENABLE_PAYMENTS]: () => require('../../../expPages/EnablePayments/EnablePaymentsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.ADD_DEBIT_CARD]: () => require('../../../expPages/settings/Wallet/AddDebitCardPage').default as React.ComponentType,
    [SCREENS.SETTINGS.ADD_BANK_ACCOUNT]: () => require('../../../expPages/AddPersonalBankAccountPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.STATUS]: () => require('../../../expPages/settings/Profile/CustomStatus/StatusPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER]: () => require('../../../expPages/settings/Profile/CustomStatus/StatusClearAfterPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER_DATE]: () => require('../../../expPages/settings/Profile/CustomStatus/SetDatePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER_TIME]: () => require('../../../expPages/settings/Profile/CustomStatus/SetTimePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.INITIAL]: () => require('../../../expPages/workspace/WorkspaceInitialPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.SETTINGS]: () => require('../../../expPages/workspace/WorkspaceSettingsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.CURRENCY]: () => require('../../../expPages/workspace/WorkspaceSettingsCurrencyPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.CARD]: () => require('../../../expPages/workspace/card/WorkspaceCardPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.REIMBURSE]: () => require('../../../expPages/workspace/reimburse/WorkspaceReimbursePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.RATE_AND_UNIT]: () => require('../../../expPages/workspace/reimburse/WorkspaceRateAndUnitPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.BILLS]: () => require('../../../expPages/workspace/bills/WorkspaceBillsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.INVOICES]: () => require('../../../expPages/workspace/invoices/WorkspaceInvoicesPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TRAVEL]: () => require('../../../expPages/workspace/travel/WorkspaceTravelPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.MEMBERS]: () => require('../../../expPages/workspace/WorkspaceMembersPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.INVITE]: () => require('../../../expPages/workspace/WorkspaceInvitePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.INVITE_MESSAGE]: () => require('../../../expPages/workspace/WorkspaceInviteMessagePage').default as React.ComponentType,
    [SCREENS.REIMBURSEMENT_ACCOUNT]: () => require('../../../expPages/ReimbursementAccount/ReimbursementAccountPage').default as React.ComponentType,
    [SCREENS.GET_ASSISTANCE]: () => require('../../../expPages/GetAssistancePage').default as React.ComponentType,
    [SCREENS.SETTINGS.TWO_FACTOR_AUTH]: () => require('../../../expPages/settings/Security/TwoFactorAuth/TwoFactorAuthPage').default as React.ComponentType,
    [SCREENS.SETTINGS.REPORT_CARD_LOST_OR_DAMAGED]: () => require('../../../expPages/settings/Wallet/ReportCardLostPage').default as React.ComponentType,
    [SCREENS.KEYBOARD_SHORTCUTS]: () => require('../../../expPages/KeyboardShortcutsPage').default as React.ComponentType,
});

const EnablePaymentsStackNavigator = createModalStackNavigator<EnablePaymentsNavigatorParamList>({
    [SCREENS.ENABLE_PAYMENTS_ROOT]: () => require('../../../expPages/EnablePayments/EnablePaymentsPage').default as React.ComponentType,
});

const AddPersonalBankAccountModalStackNavigator = createModalStackNavigator<AddPersonalBankAccountNavigatorParamList>({
    [SCREENS.ADD_PERSONAL_BANK_ACCOUNT_ROOT]: () => require('../../../expPages/AddPersonalBankAccountPage').default as React.ComponentType,
});

const ReimbursementAccountModalStackNavigator = createModalStackNavigator<ReimbursementAccountNavigatorParamList>({
    [SCREENS.REIMBURSEMENT_ACCOUNT_ROOT]: () => require('../../../expPages/ReimbursementAccount/ReimbursementAccountPage').default as React.ComponentType,
});

const WalletStatementStackNavigator = createModalStackNavigator<WalletStatementNavigatorParamList>({
    [SCREENS.WALLET_STATEMENT_ROOT]: () => require('../../../expPages/wallet/WalletStatementPage').default as React.ComponentType,
});

const FlagCommentStackNavigator = createModalStackNavigator<FlagCommentNavigatorParamList>({
    [SCREENS.FLAG_COMMENT_ROOT]: () => require('../../../expPages/FlagCommentPage').default as React.ComponentType,
});

const EditRequestStackNavigator = createModalStackNavigator<EditRequestNavigatorParamList>({
    [SCREENS.EDIT_REQUEST.ROOT]: () => require('../../../expPages/EditRequestPage').default as React.ComponentType,
    [SCREENS.EDIT_REQUEST.CURRENCY]: () => require('../../../expPages/iou/IOUCurrencySelection').default as React.ComponentType,
});

const PrivateNotesModalStackNavigator = createModalStackNavigator<PrivateNotesNavigatorParamList>({
    [SCREENS.PRIVATE_NOTES.VIEW]: () => require('../../../expPages/PrivateNotes/PrivateNotesViewPage').default as React.ComponentType,
    [SCREENS.PRIVATE_NOTES.LIST]: () => require('../../../expPages/PrivateNotes/PrivateNotesListPage').default as React.ComponentType,
    [SCREENS.PRIVATE_NOTES.EDIT]: () => require('../../../expPages/PrivateNotes/PrivateNotesEditPage').default as React.ComponentType,
});

const SignInModalStackNavigator = createModalStackNavigator<SignInNavigatorParamList>({
    [SCREENS.SIGN_IN_ROOT]: () => require('../../../expPages/signin/SignInModal').default as React.ComponentType,
});

const ReferralModalStackNavigator = createModalStackNavigator<ReferralDetailsNavigatorParamList>({
    [SCREENS.REFERRAL_DETAILS]: () => require('../../../expPages/ReferralDetailsPage').default as React.ComponentType,
});

const ProcessMoneyRequestHoldStackNavigator = createModalStackNavigator({
    [SCREENS.PROCESS_MONEY_REQUEST_HOLD_ROOT]: () => require('../../../expPages/ProcessMoneyRequestHoldPage').default as React.ComponentType,
});

export {
    EditIeattaStackNavigator,
    MoneyRequestModalStackNavigator,
    SplitDetailsModalStackNavigator,
    DetailsModalStackNavigator,
    ProfileModalStackNavigator,
    ReportDetailsModalStackNavigator,
    TaskModalStackNavigator,
    ReportSettingsModalStackNavigator,
    ReportWelcomeMessageModalStackNavigator,
    ReportParticipantsModalStackNavigator,
    SearchModalStackNavigator,
    NewChatModalStackNavigator,
    NewTaskModalStackNavigator,
    SettingsModalStackNavigator,
    EnablePaymentsStackNavigator,
    AddPersonalBankAccountModalStackNavigator,
    ReimbursementAccountModalStackNavigator,
    WalletStatementStackNavigator,
    FlagCommentStackNavigator,
    EditRequestStackNavigator,
    PrivateNotesModalStackNavigator,
    NewTeachersUniteNavigator,
    SignInModalStackNavigator,
    RoomMembersModalStackNavigator,
    RoomInviteModalStackNavigator,
    ReferralModalStackNavigator,
    ProcessMoneyRequestHoldStackNavigator,
};
