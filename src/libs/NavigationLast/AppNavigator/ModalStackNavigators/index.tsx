import type {ParamListBase} from '@react-navigation/routers';
import type {StackNavigationOptions} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import type {
    AddPersonalBankAccountNavigatorParamList,
    ChatFinderNavigatorParamList,
    DetailsNavigatorParamList,
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
    ReportDescriptionNavigatorParamList,
    ReportDetailsNavigatorParamList,
    ReportSettingsNavigatorParamList,
    RoomInviteNavigatorParamList,
    RoomMembersNavigatorParamList,
    SearchReportParamList,
    SettingsNavigatorParamList,
    SignInNavigatorParamList,
    SplitDetailsNavigatorParamList,
    TaskDetailsNavigatorParamList,
    TeachersUniteNavigatorParamList,
    WalletStatementNavigatorParamList,
    WorkspaceSwitcherNavigatorParamList,
} from '@navigation/types';
import type {ThemeStyles} from '@styles/index';
import type {Screen} from '@src/SCREENS';
import SCREENS from '@src/SCREENS';
import useModalScreenOptions from './useModalScreenOptions';
import WorkspaceSettingsModalStackNavigator from './WorkspaceSettingsModalStackNavigator';

type Screens = Partial<Record<Screen, () => React.ComponentType>>;

/**
 * Create a modal stack navigator with an array of sub-screens.
 *
 * @param screens key/value pairs where the key is the name of the screen and the value is a functon that returns the lazy-loaded component
 * @param getScreenOptions optional function that returns the screen options, override the default options
 */
function createModalStackNavigator<TStackParams extends ParamListBase>(screens: Screens, getScreenOptions?: (styles: ThemeStyles) => StackNavigationOptions): React.ComponentType {
    const ModalStackNavigator = createStackNavigator<TStackParams>();

    function ModalStack() {
        const screenOptions = useModalScreenOptions(getScreenOptions);

        return (
            <ModalStackNavigator.Navigator screenOptions={screenOptions}>
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

const MoneyRequestModalStackNavigator = createModalStackNavigator<MoneyRequestNavigatorParamList>({
    [SCREENS.MONEY_REQUEST.START]: () => require('@src/expPages/iou/request/IOURequestRedirectToStartPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.CREATE]: () => require('@src/expPages/iou/request/IOURequestStartPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_CONFIRMATION]: () => require('@src/expPages/iou/request/step/IOURequestStepConfirmation').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_AMOUNT]: () => require('@src/expPages/iou/request/step/IOURequestStepAmount').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_TAX_AMOUNT]: () => require('@src/expPages/iou/request/step/IOURequestStepTaxAmountPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_TAX_RATE]: () => require('@src/expPages/iou/request/step/IOURequestStepTaxRatePage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_CATEGORY]: () => require('@src/expPages/iou/request/step/IOURequestStepCategory').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_CURRENCY]: () => require('@src/expPages/iou/request/step/IOURequestStepCurrency').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_DATE]: () => require('@src/expPages/iou/request/step/IOURequestStepDate').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_DESCRIPTION]: () => require('@src/expPages/iou/request/step/IOURequestStepDescription').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_DISTANCE]: () => require('@src/expPages/iou/request/step/IOURequestStepDistance').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_DISTANCE_RATE]: () => require('@src/expPages/iou/request/step/IOURequestStepDistanceRate').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_MERCHANT]: () => require('@src/expPages/iou/request/step/IOURequestStepMerchant').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_PARTICIPANTS]: () => require('@src/expPages/iou/request/step/IOURequestStepParticipants').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_SCAN]: () => require('@src/expPages/iou/request/step/IOURequestStepScan').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_TAG]: () => require('@src/expPages/iou/request/step/IOURequestStepTag').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_WAYPOINT]: () => require('@src/expPages/iou/request/step/IOURequestStepWaypoint').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_SPLIT_PAYER]: () => require('@src/expPages/iou/request/step/IOURequestStepSplitPayer').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STEP_SEND_FROM]: () => require('@src/expPages/iou/request/step/IOURequestStepSendFrom').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.HOLD]: () => require('@src/expPages/iou/HoldReasonPage').default as React.ComponentType,
    [SCREENS.IOU_SEND.ADD_BANK_ACCOUNT]: () => require('@src/expPages/AddPersonalBankAccountPage').default as React.ComponentType,
    [SCREENS.IOU_SEND.ADD_DEBIT_CARD]: () => require('@src/expPages/settings/Wallet/AddDebitCardPage').default as React.ComponentType,
    [SCREENS.IOU_SEND.ENABLE_PAYMENTS]: () => require('@src/expPages/EnablePayments/EnablePaymentsPage').default as React.ComponentType,
    [SCREENS.MONEY_REQUEST.STATE_SELECTOR]: () => require('@src/expPages/settings/Profile/PersonalDetails/StateSelectionPage').default as React.ComponentType,
});

const SplitDetailsModalStackNavigator = createModalStackNavigator<SplitDetailsNavigatorParamList>({
    [SCREENS.SPLIT_DETAILS.ROOT]: () => require('@src/expPages/iou/SplitBillDetailsPage').default as React.ComponentType,
});

const DetailsModalStackNavigator = createModalStackNavigator<DetailsNavigatorParamList>({
    [SCREENS.DETAILS_ROOT]: () => require('@src/expPages/DetailsPage').default as React.ComponentType,
});

const ProfileModalStackNavigator = createModalStackNavigator<ProfileNavigatorParamList>({
    [SCREENS.PROFILE_ROOT]: () => require('@src/expPages/ProfilePage').default as React.ComponentType,
});

const ReportDetailsModalStackNavigator = createModalStackNavigator<ReportDetailsNavigatorParamList>({
    [SCREENS.REPORT_DETAILS.ROOT]: () => require('@src/expPages/ReportDetailsPage').default as React.ComponentType,
    [SCREENS.REPORT_DETAILS.SHARE_CODE]: () => require('@src/expPages/home/report/ReportDetailsShareCodePage').default as React.ComponentType,
});

const ReportSettingsModalStackNavigator = createModalStackNavigator<ReportSettingsNavigatorParamList>({
    [SCREENS.REPORT_SETTINGS.ROOT]: () => require('@src/expPages/settings/Report/ReportSettingsPage').default as React.ComponentType,
    [SCREENS.REPORT_SETTINGS.ROOM_NAME]: () => require('@src/expPages/settings/Report/RoomNamePage').default as React.ComponentType,
    [SCREENS.REPORT_SETTINGS.GROUP_NAME]: () => require('@src/expPages/GroupChatNameEditPage').default as React.ComponentType,
    [SCREENS.REPORT_SETTINGS.NOTIFICATION_PREFERENCES]: () => require('@src/expPages/settings/Report/NotificationPreferencePage').default as React.ComponentType,
    [SCREENS.REPORT_SETTINGS.WRITE_CAPABILITY]: () => require('@src/expPages/settings/Report/WriteCapabilityPage').default as React.ComponentType,
    [SCREENS.REPORT_SETTINGS.VISIBILITY]: () => require('@src/expPages/settings/Report/VisibilityPage').default as React.ComponentType,
});

const TaskModalStackNavigator = createModalStackNavigator<TaskDetailsNavigatorParamList>({
    [SCREENS.TASK.TITLE]: () => require('@src/expPages/tasks/TaskTitlePage').default as React.ComponentType,
    [SCREENS.TASK.ASSIGNEE]: () => require('@src/expPages/tasks/TaskAssigneeSelectorModal').default as React.ComponentType,
});

const ReportDescriptionModalStackNavigator = createModalStackNavigator<ReportDescriptionNavigatorParamList>({
    [SCREENS.REPORT_DESCRIPTION_ROOT]: () => require('@src/expPages/ReportDescriptionPage').default as React.ComponentType,
});

const ReportParticipantsModalStackNavigator = createModalStackNavigator<ParticipantsNavigatorParamList>({
    [SCREENS.REPORT_PARTICIPANTS.ROOT]: () => require('@src/expPages/ReportParticipantsPage').default as React.ComponentType,
    [SCREENS.REPORT_PARTICIPANTS.INVITE]: () => require('@src/expPages/InviteReportParticipantsPage').default as React.ComponentType,
    [SCREENS.REPORT_PARTICIPANTS.DETAILS]: () => require('@src/expPages/ReportParticipantDetailsPage').default as React.ComponentType,
    [SCREENS.REPORT_PARTICIPANTS.ROLE]: () => require('@src/expPages/ReportParticipantRoleSelectionPage').default as React.ComponentType,
});

const RoomMembersModalStackNavigator = createModalStackNavigator<RoomMembersNavigatorParamList>({
    [SCREENS.ROOM_MEMBERS_ROOT]: () => require('@src/expPages/RoomMembersPage').default as React.ComponentType,
});

const RoomInviteModalStackNavigator = createModalStackNavigator<RoomInviteNavigatorParamList>({
    [SCREENS.ROOM_INVITE_ROOT]: () => require('@src/expPages/RoomInvitePage').default as React.ComponentType,
});

const ChatFinderModalStackNavigator = createModalStackNavigator<ChatFinderNavigatorParamList>({
    [SCREENS.CHAT_FINDER_ROOT]: () => require('@src/expPages/ChatFinderPage').default as React.ComponentType,
});

const NewChatModalStackNavigator = createModalStackNavigator<NewChatNavigatorParamList>({
    [SCREENS.NEW_CHAT.ROOT]: () => require('@src/expPages/NewChatSelectorPage').default as React.ComponentType,
    [SCREENS.NEW_CHAT.NEW_CHAT_CONFIRM]: () => require('@src/expPages/NewChatConfirmPage').default as React.ComponentType,
    [SCREENS.NEW_CHAT.NEW_CHAT_EDIT_NAME]: () => require('@src/expPages/GroupChatNameEditPage').default as React.ComponentType,
});

const NewTaskModalStackNavigator = createModalStackNavigator<NewTaskNavigatorParamList>({
    [SCREENS.NEW_TASK.ROOT]: () => require('@src/expPages/tasks/NewTaskPage').default as React.ComponentType,
    [SCREENS.NEW_TASK.TASK_ASSIGNEE_SELECTOR]: () => require('@src/expPages/tasks/TaskAssigneeSelectorModal').default as React.ComponentType,
    [SCREENS.NEW_TASK.TASK_SHARE_DESTINATION_SELECTOR]: () => require('@src/expPages/tasks/TaskShareDestinationSelectorModal').default as React.ComponentType,
    [SCREENS.NEW_TASK.DETAILS]: () => require('@src/expPages/tasks/NewTaskDetailsPage').default as React.ComponentType,
    [SCREENS.NEW_TASK.TITLE]: () => require('@src/expPages/tasks/NewTaskTitlePage').default as React.ComponentType,
    [SCREENS.NEW_TASK.DESCRIPTION]: () => require('@src/expPages/tasks/NewTaskDescriptionPage').default as React.ComponentType,
});

const NewTeachersUniteNavigator = createModalStackNavigator<TeachersUniteNavigatorParamList>({
    [SCREENS.SAVE_THE_WORLD.ROOT]: () => require('@src/expPages/TeachersUnite/SaveTheWorldPage').default as React.ComponentType,
    [SCREENS.I_KNOW_A_TEACHER]: () => require('@src/expPages/TeachersUnite/KnowATeacherPage').default as React.ComponentType,
    [SCREENS.INTRO_SCHOOL_PRINCIPAL]: () => require('@src/expPages/TeachersUnite/ImTeacherPage').default as React.ComponentType,
    [SCREENS.I_AM_A_TEACHER]: () => require('@src/expPages/TeachersUnite/ImTeacherPage').default as React.ComponentType,
});

const WorkspaceSwitcherModalStackNavigator = createModalStackNavigator<WorkspaceSwitcherNavigatorParamList>({
    [SCREENS.WORKSPACE_SWITCHER.ROOT]: () => require('@src/expPages/WorkspaceSwitcherPage').default as React.ComponentType,
});

const SettingsModalStackNavigator = createModalStackNavigator<SettingsNavigatorParamList>({
    [SCREENS.SETTINGS.SHARE_CODE]: () => require('@src/expPages/ShareCodePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.PRONOUNS]: () => require('@src/expPages/settings/Profile/PronounsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.DISPLAY_NAME]: () => require('@src/expPages/settings/Profile/DisplayNamePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.TIMEZONE]: () => require('@src/expPages/settings/Profile/TimezoneInitialPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.TIMEZONE_SELECT]: () => require('@src/expPages/settings/Profile/TimezoneSelectPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.LEGAL_NAME]: () => require('@src/expPages/settings/Profile/PersonalDetails/LegalNamePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.DATE_OF_BIRTH]: () => require('@src/expPages/settings/Profile/PersonalDetails/DateOfBirthPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.ADDRESS]: () => require('@src/expPages/settings/Profile/PersonalDetails/AddressPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.ADDRESS_COUNTRY]: () => require('@src/expPages/settings/Profile/PersonalDetails/CountrySelectionPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.ADDRESS_STATE]: () => require('@src/expPages/settings/Profile/PersonalDetails/StateSelectionPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.CONTACT_METHODS]: () => require('@src/expPages/settings/Profile/Contacts/ContactMethodsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.CONTACT_METHOD_DETAILS]: () => require('@src/expPages/settings/Profile/Contacts/ContactMethodDetailsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.NEW_CONTACT_METHOD]: () => require('@src/expPages/settings/Profile/Contacts/NewContactMethodPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PREFERENCES.PRIORITY_MODE]: () => require('@src/expPages/settings/Preferences/PriorityModePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.ROOT]: () => require('@src/expPages/workspace/accounting/PolicyAccountingPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PREFERENCES.LANGUAGE]: () => require('@src/expPages/settings/Preferences/LanguagePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PREFERENCES.THEME]: () => require('@src/expPages/settings/Preferences/ThemePage').default as React.ComponentType,
    [SCREENS.SETTINGS.CLOSE]: () => require('@src/expPages/settings/Security/CloseAccountPage').default as React.ComponentType,
    [SCREENS.SETTINGS.APP_DOWNLOAD_LINKS]: () => require('@src/expPages/settings/AppDownloadLinks').default as React.ComponentType,
    [SCREENS.SETTINGS.CONSOLE]: () => require('@src/expPages/settings/AboutPage/ConsolePage').default as React.ComponentType,
    [SCREENS.SETTINGS.SHARE_LOG]: () => require('@src/expPages/settings/AboutPage/ShareLogPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARDS_DIGITAL_DETAILS_UPDATE_ADDRESS]: () => require('@src/expPages/settings/Profile/PersonalDetails/AddressPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.DOMAIN_CARD]: () => require('@src/expPages/settings/Wallet/ExpensifyCardPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.REPORT_VIRTUAL_CARD_FRAUD]: () => require('@src/expPages/settings/Wallet/ReportVirtualCardFraudPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARD_ACTIVATE]: () => require('@src/expPages/settings/Wallet/ActivatePhysicalCardPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.NAME]: () => require('@src/expPages/settings/Wallet/Card/GetPhysicalCardName').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.PHONE]: () => require('@src/expPages/settings/Wallet/Card/GetPhysicalCardPhone').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.ADDRESS]: () => require('@src/expPages/settings/Wallet/Card/GetPhysicalCardAddress').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.CONFIRM]: () => require('@src/expPages/settings/Wallet/Card/GetPhysicalCardConfirm').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.TRANSFER_BALANCE]: () => require('@src/expPages/settings/Wallet/TransferBalancePage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.CHOOSE_TRANSFER_ACCOUNT]: () => require('@src/expPages/settings/Wallet/ChooseTransferAccountPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.ENABLE_PAYMENTS]: () => require('@src/expPages/EnablePayments/EnablePaymentsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.WALLET.ENABLE_PAYMENTS_REFACTOR]: () => require('@src/expPages/EnablePayments/PersonalInfo/PersonalInfo').default as React.ComponentType,
    [SCREENS.SETTINGS.ADD_DEBIT_CARD]: () => require('@src/expPages/settings/Wallet/AddDebitCardPage').default as React.ComponentType,
    [SCREENS.SETTINGS.ADD_BANK_ACCOUNT]: () => require('@src/expPages/AddPersonalBankAccountPage').default as React.ComponentType,
    [SCREENS.SETTINGS.ADD_BANK_ACCOUNT_REFACTOR]: () => require('@src/expPages/EnablePayments/AddBankAccount/AddBankAccount').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.STATUS]: () => require('@src/expPages/settings/Profile/CustomStatus/StatusPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER]: () => require('@src/expPages/settings/Profile/CustomStatus/StatusClearAfterPage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER_DATE]: () => require('@src/expPages/settings/Profile/CustomStatus/SetDatePage').default as React.ComponentType,
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER_TIME]: () => require('@src/expPages/settings/Profile/CustomStatus/SetTimePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.RATE_AND_UNIT]: () => require('@src/expPages/workspace/reimburse/WorkspaceRateAndUnitPage/InitialPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.RATE_AND_UNIT_RATE]: () => require('@src/expPages/workspace/reimburse/WorkspaceRateAndUnitPage/RatePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.RATE_AND_UNIT_UNIT]: () => require('@src/expPages/workspace/reimburse/WorkspaceRateAndUnitPage/UnitPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.INVITE]: () => require('@src/expPages/workspace/WorkspaceInvitePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.WORKFLOWS_APPROVER]: () => require('@src/expPages/workspace/workflows/WorkspaceWorkflowsApproverPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.INVITE_MESSAGE]: () => require('@src/expPages/workspace/WorkspaceInviteMessagePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.WORKFLOWS_PAYER]: () => require('@src/expPages/workspace/workflows/WorkspaceWorkflowsPayerPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.NAME]: () => require('@src/expPages/workspace/WorkspaceNamePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.DESCRIPTION]: () => require('@src/expPages/workspace/WorkspaceProfileDescriptionPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.SHARE]: () => require('@src/expPages/workspace/WorkspaceProfileSharePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.CURRENCY]: () => require('@src/expPages/workspace/WorkspaceProfileCurrencyPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.CATEGORY_SETTINGS]: () => require('@src/expPages/workspace/categories/CategorySettingsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ADDRESS]: () => require('@src/expPages/workspace/WorkspaceProfileAddressPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.CATEGORIES_SETTINGS]: () => require('@src/expPages/workspace/categories/WorkspaceCategoriesSettingsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.MEMBER_DETAILS]: () => require('@src/expPages/workspace/members/WorkspaceMemberDetailsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.OWNER_CHANGE_CHECK]: () => require('@src/expPages/workspace/members/WorkspaceOwnerChangeWrapperPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.OWNER_CHANGE_SUCCESS]: () => require('@src/expPages/workspace/members/WorkspaceOwnerChangeSuccessPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.OWNER_CHANGE_ERROR]: () => require('@src/expPages/workspace/members/WorkspaceOwnerChangeErrorPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.CATEGORY_CREATE]: () => require('@src/expPages/workspace/categories/CreateCategoryPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.CATEGORY_EDIT]: () => require('@src/expPages/workspace/categories/EditCategoryPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.CREATE_DISTANCE_RATE]: () => require('@src/expPages/workspace/distanceRates/CreateDistanceRatePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.DISTANCE_RATES_SETTINGS]: () => require('@src/expPages/workspace/distanceRates/PolicyDistanceRatesSettingsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.DISTANCE_RATE_DETAILS]: () => require('@src/expPages/workspace/distanceRates/PolicyDistanceRateDetailsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.DISTANCE_RATE_EDIT]: () => require('@src/expPages/workspace/distanceRates/PolicyDistanceRateEditPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAGS_SETTINGS]: () => require('@src/expPages/workspace/tags/WorkspaceTagsSettingsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAG_SETTINGS]: () => require('@src/expPages/workspace/tags/TagSettingsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAGS_EDIT]: () => require('@src/expPages/workspace/tags/WorkspaceEditTagsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAG_CREATE]: () => require('@src/expPages/workspace/tags/WorkspaceCreateTagPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAG_EDIT]: () => require('@src/expPages/workspace/tags/EditTagPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAXES_SETTINGS]: () => require('@src/expPages/workspace/taxes/WorkspaceTaxesSettingsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAXES_SETTINGS_CUSTOM_TAX_NAME]: () => require('@src/expPages/workspace/taxes/WorkspaceTaxesSettingsCustomTaxName').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAXES_SETTINGS_FOREIGN_CURRENCY_DEFAULT]: () => require('@src/expPages/workspace/taxes/WorkspaceTaxesSettingsForeignCurrency').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAXES_SETTINGS_WORKSPACE_CURRENCY_DEFAULT]: () => require('@src/expPages/workspace/taxes/WorkspaceTaxesSettingsWorkspaceCurrency').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT]: () => require('@src/expPages/workspace/accounting/qbo/export/QuickbooksExportConfigurationPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_DATE_SELECT]: () =>
        require('@src/expPages/workspace/accounting/qbo/export/QuickbooksExportDateSelectPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_INVOICE_ACCOUNT_SELECT]: () =>
        require('@src/expPages/workspace/accounting/qbo/export/QuickbooksExportInvoiceAccountSelectPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES_ACCOUNT_SELECT]: () =>
        require('@src/expPages/workspace/accounting/qbo/export/QuickbooksOutOfPocketExpenseAccountSelectPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_PAYABLE_SELECT]: () =>
        require('@src/expPages/workspace/accounting/qbo/export/QuickbooksCompanyCardExpenseAccountPayableSelectPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES]: () =>
        require('@src/expPages/workspace/accounting/qbo/export/QuickbooksOutOfPocketExpenseConfigurationPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES_SELECT]: () =>
        require('@src/expPages/workspace/accounting/qbo/export/QuickbooksOutOfPocketExpenseEntitySelectPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_SELECT]: () =>
        require('@src/expPages/workspace/accounting/qbo/export/QuickbooksCompanyCardExpenseAccountSelectPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_COMPANY_CARD_SELECT]: () =>
        require('@src/expPages/workspace/accounting/qbo/export/QuickbooksCompanyCardExpenseAccountSelectCardPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT]: () =>
        require('@src/expPages/workspace/accounting/qbo/export/QuickbooksCompanyCardExpenseAccountPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_PREFERRED_EXPORTER]: () =>
        require('@src/expPages/workspace/accounting/qbo/export/QuickbooksPreferredExporterConfigurationPage').default as React.ComponentType,
    [SCREENS.REIMBURSEMENT_ACCOUNT]: () => require('@src/expPages/ReimbursementAccount/ReimbursementAccountPage').default as React.ComponentType,
    [SCREENS.GET_ASSISTANCE]: () => require('@src/expPages/GetAssistancePage').default as React.ComponentType,
    [SCREENS.SETTINGS.TWO_FACTOR_AUTH]: () => require('@src/expPages/settings/Security/TwoFactorAuth/TwoFactorAuthPage').default as React.ComponentType,
    [SCREENS.SETTINGS.REPORT_CARD_LOST_OR_DAMAGED]: () => require('@src/expPages/settings/Wallet/ReportCardLostPage').default as React.ComponentType,
    [SCREENS.KEYBOARD_SHORTCUTS]: () => require('@src/expPages/KeyboardShortcutsPage').default as React.ComponentType,
    [SCREENS.SETTINGS.EXIT_SURVEY.REASON]: () => require('@src/expPages/settings/ExitSurvey/ExitSurveyReasonPage').default as React.ComponentType,
    [SCREENS.SETTINGS.EXIT_SURVEY.RESPONSE]: () => require('@src/expPages/settings/ExitSurvey/ExitSurveyResponsePage').default as React.ComponentType,
    [SCREENS.SETTINGS.EXIT_SURVEY.CONFIRM]: () => require('@src/expPages/settings/ExitSurvey/ExitSurveyConfirmPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_IMPORT]: () => require('@src/expPages/workspace/accounting/qbo/import/QuickbooksImportPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_CHART_OF_ACCOUNTS]: () =>
        require('@src/expPages/workspace/accounting/qbo/import/QuickbooksChartOfAccountsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_CUSTOMERS]: () => require('@src/expPages/workspace/accounting/qbo/import/QuickbooksCustomersPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_TAXES]: () => require('@src/expPages/workspace/accounting/qbo/import/QuickbooksTaxesPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_LOCATIONS]: () => require('@src/expPages/workspace/accounting/qbo/import/QuickbooksLocationsPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_CLASSES]: () => require('@src/expPages/workspace/accounting/qbo/import/QuickbooksClassesPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_ADVANCED]: () => require('@src/expPages/workspace/accounting/qbo/advanced/QuickbooksAdvancedPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_ACCOUNT_SELECTOR]: () =>
        require('@src/expPages/workspace/accounting/qbo/advanced/QuickbooksAccountSelectPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_INVOICE_ACCOUNT_SELECTOR]: () =>
        require('@src/expPages/workspace/accounting/qbo/advanced/QuickbooksInvoiceAccountSelectPage').default as React.ComponentType,

    [SCREENS.WORKSPACE.ACCOUNTING.XERO_IMPORT]: () => require('@src/expPages/workspace/accounting/xero/XeroImportPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_ORGANIZATION]: () => require('@src/expPages/workspace/accounting/xero/XeroOrganizationConfigurationPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_CUSTOMER]: () => require('@src/expPages/workspace/accounting/xero/import/XeroCustomerConfigurationPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_TAXES]: () => require('@src/expPages/workspace/accounting/xero/XeroTaxesConfigurationPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.WORKFLOWS_AUTO_REPORTING_FREQUENCY]: () => require('@src/expPages/workspace/workflows/WorkspaceAutoReportingFrequencyPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.WORKFLOWS_AUTO_REPORTING_MONTHLY_OFFSET]: () => require('@src/expPages/workspace/workflows/WorkspaceAutoReportingMonthlyOffsetPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAX_EDIT]: () => require('@src/expPages/workspace/taxes/WorkspaceEditTaxPage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAX_NAME]: () => require('@src/expPages/workspace/taxes/NamePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAX_VALUE]: () => require('@src/expPages/workspace/taxes/ValuePage').default as React.ComponentType,
    [SCREENS.WORKSPACE.TAX_CREATE]: () => require('@src/expPages/workspace/taxes/WorkspaceCreateTaxPage').default as React.ComponentType,
    [SCREENS.SETTINGS.SAVE_THE_WORLD]: () => require('@src/expPages/TeachersUnite/SaveTheWorldPage').default as React.ComponentType,
});

const EnablePaymentsStackNavigator = createModalStackNavigator<EnablePaymentsNavigatorParamList>({
    [SCREENS.ENABLE_PAYMENTS_ROOT]: () => require('@src/expPages/EnablePayments/EnablePaymentsPage').default as React.ComponentType,
});

const AddPersonalBankAccountModalStackNavigator = createModalStackNavigator<AddPersonalBankAccountNavigatorParamList>({
    [SCREENS.ADD_PERSONAL_BANK_ACCOUNT_ROOT]: () => require('@src/expPages/AddPersonalBankAccountPage').default as React.ComponentType,
});

const ReimbursementAccountModalStackNavigator = createModalStackNavigator<ReimbursementAccountNavigatorParamList>({
    [SCREENS.REIMBURSEMENT_ACCOUNT_ROOT]: () => require('@src/expPages/ReimbursementAccount/ReimbursementAccountPage').default as React.ComponentType,
});

const WalletStatementStackNavigator = createModalStackNavigator<WalletStatementNavigatorParamList>({
    [SCREENS.WALLET_STATEMENT_ROOT]: () => require('@src/expPages/wallet/WalletStatementPage').default as React.ComponentType,
});

const FlagCommentStackNavigator = createModalStackNavigator<FlagCommentNavigatorParamList>({
    [SCREENS.FLAG_COMMENT_ROOT]: () => require('@src/expPages/FlagCommentPage').default as React.ComponentType,
});

const EditRequestStackNavigator = createModalStackNavigator<EditRequestNavigatorParamList>({
    [SCREENS.EDIT_REQUEST.REPORT_FIELD]: () => require('@src/expPages/EditReportFieldPage').default as React.ComponentType,
});

const PrivateNotesModalStackNavigator = createModalStackNavigator<PrivateNotesNavigatorParamList>({
    [SCREENS.PRIVATE_NOTES.LIST]: () => require('@src/expPages/PrivateNotes/PrivateNotesListPage').default as React.ComponentType,
    [SCREENS.PRIVATE_NOTES.EDIT]: () => require('@src/expPages/PrivateNotes/PrivateNotesEditPage').default as React.ComponentType,
});

const SignInModalStackNavigator = createModalStackNavigator<SignInNavigatorParamList>({
    [SCREENS.SIGN_IN_ROOT]: () => require('@src/expPages/signin/SignInModal').default as React.ComponentType,
});
const ReferralModalStackNavigator = createModalStackNavigator<ReferralDetailsNavigatorParamList>({
    [SCREENS.REFERRAL_DETAILS]: () => require('@src/expPages/ReferralDetailsPage').default as React.ComponentType,
});

const ProcessMoneyRequestHoldStackNavigator = createModalStackNavigator({
    [SCREENS.PROCESS_MONEY_REQUEST_HOLD_ROOT]: () => require('@src/expPages/ProcessMoneyRequestHoldPage').default as React.ComponentType,
});

const SearchReportModalStackNavigator = createModalStackNavigator<SearchReportParamList>({
    [SCREENS.SEARCH.REPORT_RHP]: () => require('@src/expPages/home/ReportScreen').default as React.ComponentType,
});

export {
    AddPersonalBankAccountModalStackNavigator,
    DetailsModalStackNavigator,
    EditRequestStackNavigator,
    EnablePaymentsStackNavigator,
    FlagCommentStackNavigator,
    MoneyRequestModalStackNavigator,
    NewChatModalStackNavigator,
    NewTaskModalStackNavigator,
    NewTeachersUniteNavigator,
    PrivateNotesModalStackNavigator,
    ProfileModalStackNavigator,
    ReferralModalStackNavigator,
    WorkspaceSwitcherModalStackNavigator,
    ReimbursementAccountModalStackNavigator,
    ReportDetailsModalStackNavigator,
    ReportParticipantsModalStackNavigator,
    ReportSettingsModalStackNavigator,
    ReportDescriptionModalStackNavigator,
    RoomInviteModalStackNavigator,
    RoomMembersModalStackNavigator,
    ChatFinderModalStackNavigator,
    SettingsModalStackNavigator,
    SignInModalStackNavigator,
    SplitDetailsModalStackNavigator,
    TaskModalStackNavigator,
    WalletStatementStackNavigator,
    ProcessMoneyRequestHoldStackNavigator,
    WorkspaceSettingsModalStackNavigator,
    SearchReportModalStackNavigator,
};
