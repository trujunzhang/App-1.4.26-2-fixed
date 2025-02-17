import type {ParamListBase} from '@react-navigation/routers';
import type {StackNavigationOptions} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import type {
    AddPersonalBankAccountNavigatorParamList,
    DebugParamList,
    EditRequestNavigatorParamList,
    EnablePaymentsNavigatorParamList,
    FlagCommentNavigatorParamList,
    MissingPersonalDetailsParamList,
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
    RoomMembersNavigatorParamList,
    SearchAdvancedFiltersParamList,
    SearchReportParamList,
    SearchSavedSearchParamList,
    SettingsNavigatorParamList,
    SignInNavigatorParamList,
    SplitDetailsNavigatorParamList,
    TaskDetailsNavigatorParamList,
    TeachersUniteNavigatorParamList,
    TransactionDuplicateNavigatorParamList,
    TravelNavigatorParamList,
    WalletStatementNavigatorParamList,
} from '@navigation/types';
import type {ThemeStyles} from '@styles/index';
import type {Screen} from '@src/SCREENS';
import SCREENS from '@src/SCREENS';
import type ReactComponentModule from '@src/types/utils/ReactComponentModule';
import useModalScreenOptions from './useModalScreenOptions';

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
    [SCREENS.MONEY_REQUEST.START]: () => require<ReactComponentModule>('@expPages/iou/request/IOURequestRedirectToStartPage').default,
    [SCREENS.MONEY_REQUEST.CREATE]: () => require<ReactComponentModule>('@expPages/iou/request/IOURequestStartPage').default,
    [SCREENS.MONEY_REQUEST.STEP_CONFIRMATION]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepConfirmation').default,
    [SCREENS.MONEY_REQUEST.STEP_AMOUNT]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepAmount').default,
    [SCREENS.MONEY_REQUEST.STEP_TAX_AMOUNT]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepTaxAmountPage').default,
    [SCREENS.MONEY_REQUEST.STEP_TAX_RATE]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepTaxRatePage').default,
    [SCREENS.MONEY_REQUEST.STEP_CATEGORY]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepCategory').default,
    [SCREENS.MONEY_REQUEST.STEP_CURRENCY]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepCurrency').default,
    [SCREENS.MONEY_REQUEST.STEP_DATE]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepDate').default,
    [SCREENS.MONEY_REQUEST.STEP_DESCRIPTION]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepDescription').default,
    [SCREENS.MONEY_REQUEST.STEP_DISTANCE]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepDistance').default,
    [SCREENS.MONEY_REQUEST.STEP_DISTANCE_RATE]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepDistanceRate').default,
    [SCREENS.MONEY_REQUEST.STEP_MERCHANT]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepMerchant').default,
    [SCREENS.MONEY_REQUEST.STEP_PARTICIPANTS]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepParticipants').default,
    [SCREENS.SETTINGS_CATEGORIES.SETTINGS_CATEGORIES_ROOT]: () => require<ReactComponentModule>('@expPages/workspace/categories/WorkspaceCategoriesPage').default,
    [SCREENS.SETTINGS_TAGS_ROOT]: () => require<ReactComponentModule>('@expPages/workspace/tags/WorkspaceTagsPage').default,
    [SCREENS.MONEY_REQUEST.STEP_SCAN]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepScan').default,
    [SCREENS.MONEY_REQUEST.STEP_TAG]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepTag').default,
    [SCREENS.MONEY_REQUEST.STEP_WAYPOINT]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepWaypoint').default,
    [SCREENS.MONEY_REQUEST.STEP_SPLIT_PAYER]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepSplitPayer').default,
    [SCREENS.MONEY_REQUEST.STEP_SEND_FROM]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepSendFrom').default,
    [SCREENS.MONEY_REQUEST.STEP_COMPANY_INFO]: () => require<ReactComponentModule>('@expPages/iou/request/step/IOURequestStepCompanyInfo').default,
    [SCREENS.MONEY_REQUEST.HOLD]: () => require<ReactComponentModule>('@expPages/iou/HoldReasonPage').default,
    [SCREENS.IOU_SEND.ADD_BANK_ACCOUNT]: () => require<ReactComponentModule>('@expPages/AddPersonalBankAccountPage').default,
    [SCREENS.IOU_SEND.ADD_DEBIT_CARD]: () => require<ReactComponentModule>('@expPages/settings/Wallet/AddDebitCardPage').default,
    [SCREENS.IOU_SEND.ENABLE_PAYMENTS]: () => require<ReactComponentModule>('@expPages/EnablePayments/EnablePaymentsPage').default,
    [SCREENS.MONEY_REQUEST.STATE_SELECTOR]: () => require<ReactComponentModule>('@expPages/settings/Profile/PersonalDetails/StateSelectionPage').default,
});

const TravelModalStackNavigator = createModalStackNavigator<TravelNavigatorParamList>({
    [SCREENS.TRAVEL.MY_TRIPS]: () => require<ReactComponentModule>('@expPages/Travel/MyTripsPage').default,
    [SCREENS.TRAVEL.TCS]: () => require<ReactComponentModule>('@expPages/Travel/TravelTerms').default,
});

const SplitDetailsModalStackNavigator = createModalStackNavigator<SplitDetailsNavigatorParamList>({
    [SCREENS.SPLIT_DETAILS.ROOT]: () => require<ReactComponentModule>('@expPages/iou/SplitBillDetailsPage').default,
});

const ProfileModalStackNavigator = createModalStackNavigator<ProfileNavigatorParamList>({
    [SCREENS.PROFILE_ROOT]: () => require<ReactComponentModule>('@expPages/ProfilePage').default,
});

const ReportDetailsModalStackNavigator = createModalStackNavigator<ReportDetailsNavigatorParamList>({
    [SCREENS.REPORT_DETAILS.ROOT]: () => require<ReactComponentModule>('@expPages/ReportDetailsPage').default,
    [SCREENS.REPORT_DETAILS.SHARE_CODE]: () => require<ReactComponentModule>('@expPages/home/report/ReportDetailsShareCodePage').default,
    [SCREENS.REPORT_DETAILS.EXPORT]: () => require<ReactComponentModule>('@expPages/home/report/ReportDetailsExportPage').default,
});

const ReportSettingsModalStackNavigator = createModalStackNavigator<ReportSettingsNavigatorParamList>({
    [SCREENS.REPORT_SETTINGS.ROOT]: () => require<ReactComponentModule>('@expPages/settings/Report/ReportSettingsPage').default,
    [SCREENS.REPORT_SETTINGS.NAME]: () => require<ReactComponentModule>('@expPages/settings/Report/NamePage').default,
    [SCREENS.REPORT_SETTINGS.NOTIFICATION_PREFERENCES]: () => require<ReactComponentModule>('@expPages/settings/Report/NotificationPreferencePage').default,
    [SCREENS.REPORT_SETTINGS.WRITE_CAPABILITY]: () => require<ReactComponentModule>('@expPages/settings/Report/WriteCapabilityPage').default,
    [SCREENS.REPORT_SETTINGS.VISIBILITY]: () => require<ReactComponentModule>('@expPages/settings/Report/VisibilityPage').default,
});

const TaskModalStackNavigator = createModalStackNavigator<TaskDetailsNavigatorParamList>({
    [SCREENS.TASK.TITLE]: () => require<ReactComponentModule>('@expPages/tasks/TaskTitlePage').default,
    [SCREENS.TASK.ASSIGNEE]: () => require<ReactComponentModule>('@expPages/tasks/TaskAssigneeSelectorModal').default,
});

const ReportDescriptionModalStackNavigator = createModalStackNavigator<ReportDescriptionNavigatorParamList>({
    [SCREENS.REPORT_DESCRIPTION_ROOT]: () => require<ReactComponentModule>('@expPages/ReportDescriptionPage').default,
});

const CategoriesModalStackNavigator = createModalStackNavigator({
    [SCREENS.SETTINGS_CATEGORIES.SETTINGS_CATEGORIES_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/categories/WorkspaceCategoriesSettingsPage').default,
    [SCREENS.SETTINGS_CATEGORIES.SETTINGS_CATEGORY_CREATE]: () => require<ReactComponentModule>('@expPages/workspace/categories/CreateCategoryPage').default,
    [SCREENS.SETTINGS_CATEGORIES.SETTINGS_CATEGORY_EDIT]: () => require<ReactComponentModule>('@expPages/workspace/categories/EditCategoryPage').default,
    [SCREENS.SETTINGS_CATEGORIES.SETTINGS_CATEGORY_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/categories/CategorySettingsPage').default,
});

const ExpensifyCardModalStackNavigator = createModalStackNavigator({
    [SCREENS.EXPENSIFY_CARD.EXPENSIFY_CARD_DETAILS]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceExpensifyCardDetailsPage').default,
    [SCREENS.EXPENSIFY_CARD.EXPENSIFY_CARD_NAME]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceEditCardNamePage').default,
    [SCREENS.EXPENSIFY_CARD.EXPENSIFY_CARD_LIMIT]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceEditCardLimitPage').default,
    [SCREENS.EXPENSIFY_CARD.EXPENSIFY_CARD_LIMIT_TYPE]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceEditCardLimitTypePage').default,
});

const DomainCardModalStackNavigator = createModalStackNavigator({
    [SCREENS.DOMAIN_CARD.DOMAIN_CARD_DETAIL]: () => require<ReactComponentModule>('@expPages/settings/Wallet/ExpensifyCardPage').default,
    [SCREENS.DOMAIN_CARD.DOMAIN_CARD_REPORT_FRAUD]: () => require<ReactComponentModule>('@expPages/settings/Wallet/ReportVirtualCardFraudPage').default,
});

const ReportParticipantsModalStackNavigator = createModalStackNavigator<ParticipantsNavigatorParamList>({
    [SCREENS.REPORT_PARTICIPANTS.ROOT]: () => require<ReactComponentModule>('@expPages/ReportParticipantsPage').default,
    [SCREENS.REPORT_PARTICIPANTS.INVITE]: () => require<ReactComponentModule>('@expPages/InviteReportParticipantsPage').default,
    [SCREENS.REPORT_PARTICIPANTS.DETAILS]: () => require<ReactComponentModule>('@expPages/ReportParticipantDetailsPage').default,
    [SCREENS.REPORT_PARTICIPANTS.ROLE]: () => require<ReactComponentModule>('@expPages/ReportParticipantRoleSelectionPage').default,
});

const RoomMembersModalStackNavigator = createModalStackNavigator<RoomMembersNavigatorParamList>({
    [SCREENS.ROOM_MEMBERS.ROOT]: () => require<ReactComponentModule>('@expPages/RoomMembersPage').default,
    [SCREENS.ROOM_MEMBERS.INVITE]: () => require<ReactComponentModule>('@expPages/RoomInvitePage').default,
    [SCREENS.ROOM_MEMBERS.DETAILS]: () => require<ReactComponentModule>('@expPages/RoomMemberDetailsPage').default,
});

const NewChatModalStackNavigator = createModalStackNavigator<NewChatNavigatorParamList>({
    [SCREENS.NEW_CHAT.ROOT]: () => require<ReactComponentModule>('@expPages/NewChatSelectorPage').default,
    [SCREENS.NEW_CHAT.NEW_CHAT_CONFIRM]: () => require<ReactComponentModule>('@expPages/NewChatConfirmPage').default,
    [SCREENS.NEW_CHAT.NEW_CHAT_EDIT_NAME]: () => require<ReactComponentModule>('@expPages/GroupChatNameEditPage').default,
});

const NewTaskModalStackNavigator = createModalStackNavigator<NewTaskNavigatorParamList>({
    [SCREENS.NEW_TASK.ROOT]: () => require<ReactComponentModule>('@expPages/tasks/NewTaskPage').default,
    [SCREENS.NEW_TASK.TASK_ASSIGNEE_SELECTOR]: () => require<ReactComponentModule>('@expPages/tasks/TaskAssigneeSelectorModal').default,
    [SCREENS.NEW_TASK.TASK_SHARE_DESTINATION_SELECTOR]: () => require<ReactComponentModule>('@expPages/tasks/TaskShareDestinationSelectorModal').default,
    [SCREENS.NEW_TASK.DETAILS]: () => require<ReactComponentModule>('@expPages/tasks/NewTaskDetailsPage').default,
    [SCREENS.NEW_TASK.TITLE]: () => require<ReactComponentModule>('@expPages/tasks/NewTaskTitlePage').default,
    [SCREENS.NEW_TASK.DESCRIPTION]: () => require<ReactComponentModule>('@expPages/tasks/NewTaskDescriptionPage').default,
});

const NewTeachersUniteNavigator = createModalStackNavigator<TeachersUniteNavigatorParamList>({
    [SCREENS.SAVE_THE_WORLD.ROOT]: () => require<ReactComponentModule>('@expPages/TeachersUnite/SaveTheWorldPage').default,
    [SCREENS.I_KNOW_A_TEACHER]: () => require<ReactComponentModule>('@expPages/TeachersUnite/KnowATeacherPage').default,
    [SCREENS.INTRO_SCHOOL_PRINCIPAL]: () => require<ReactComponentModule>('@expPages/TeachersUnite/ImTeacherPage').default,
    [SCREENS.I_AM_A_TEACHER]: () => require<ReactComponentModule>('@expPages/TeachersUnite/ImTeacherPage').default,
});

const SettingsModalStackNavigator = createModalStackNavigator<SettingsNavigatorParamList>({
    [SCREENS.SETTINGS.SHARE_CODE]: () => require<ReactComponentModule>('@expPages/ShareCodePage').default,
    [SCREENS.SETTINGS.PROFILE.PRONOUNS]: () => require<ReactComponentModule>('@expPages/settings/Profile/PronounsPage').default,
    [SCREENS.SETTINGS.PROFILE.DISPLAY_NAME]: () => require<ReactComponentModule>('@expPages/settings/Profile/DisplayNamePage').default,
    [SCREENS.SETTINGS.PROFILE.TIMEZONE]: () => require<ReactComponentModule>('@expPages/settings/Profile/TimezoneInitialPage').default,
    [SCREENS.SETTINGS.PROFILE.TIMEZONE_SELECT]: () => require<ReactComponentModule>('@expPages/settings/Profile/TimezoneSelectPage').default,
    [SCREENS.SETTINGS.PROFILE.LEGAL_NAME]: () => require<ReactComponentModule>('@expPages/settings/Profile/PersonalDetails/LegalNamePage').default,
    [SCREENS.SETTINGS.PROFILE.DATE_OF_BIRTH]: () => require<ReactComponentModule>('@expPages/settings/Profile/PersonalDetails/DateOfBirthPage').default,
    [SCREENS.SETTINGS.PROFILE.ADDRESS]: () => require<ReactComponentModule>('@expPages/settings/Profile/PersonalDetails/PersonalAddressPage').default,
    [SCREENS.SETTINGS.PROFILE.ADDRESS_COUNTRY]: () => require<ReactComponentModule>('@expPages/settings/Profile/PersonalDetails/CountrySelectionPage').default,
    [SCREENS.SETTINGS.PROFILE.ADDRESS_STATE]: () => require<ReactComponentModule>('@expPages/settings/Profile/PersonalDetails/StateSelectionPage').default,
    [SCREENS.SETTINGS.PROFILE.CONTACT_METHODS]: () => require<ReactComponentModule>('@expPages/settings/Profile/Contacts/ContactMethodsPage').default,
    [SCREENS.SETTINGS.PROFILE.CONTACT_METHOD_DETAILS]: () => require<ReactComponentModule>('@expPages/settings/Profile/Contacts/ContactMethodDetailsPage').default,
    [SCREENS.SETTINGS.PROFILE.CONTACT_METHOD_VALIDATE_ACTION]: () => require<ReactComponentModule>('@expPages/settings/Profile/Contacts/ValidateContactActionPage').default,
    [SCREENS.SETTINGS.PROFILE.NEW_CONTACT_METHOD]: () => require<ReactComponentModule>('@expPages/settings/Profile/Contacts/NewContactMethodPage').default,
    [SCREENS.SETTINGS.PREFERENCES.PRIORITY_MODE]: () => require<ReactComponentModule>('@expPages/settings/Preferences/PriorityModePage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.ROOT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/PolicyAccountingPage').default,
    [SCREENS.SETTINGS.PREFERENCES.LANGUAGE]: () => require<ReactComponentModule>('@expPages/settings/Preferences/LanguagePage').default,
    [SCREENS.SETTINGS.PREFERENCES.THEME]: () => require<ReactComponentModule>('@expPages/settings/Preferences/ThemePage').default,
    [SCREENS.SETTINGS.CLOSE]: () => require<ReactComponentModule>('@expPages/settings/Security/CloseAccountPage').default,
    [SCREENS.SETTINGS.APP_DOWNLOAD_LINKS]: () => require<ReactComponentModule>('@expPages/settings/AppDownloadLinks').default,
    [SCREENS.SETTINGS.CONSOLE]: () => require<ReactComponentModule>('@expPages/settings/AboutPage/ConsolePage').default,
    [SCREENS.SETTINGS.SHARE_LOG]: () => require<ReactComponentModule>('@expPages/settings/AboutPage/ShareLogPage').default,
    [SCREENS.SETTINGS.WALLET.CARDS_DIGITAL_DETAILS_UPDATE_ADDRESS]: () => require<ReactComponentModule>('@expPages/settings/Profile/PersonalDetails/PersonalAddressPage').default,
    [SCREENS.SETTINGS.WALLET.DOMAIN_CARD]: () => require<ReactComponentModule>('@expPages/settings/Wallet/ExpensifyCardPage').default,
    [SCREENS.SETTINGS.WALLET.REPORT_VIRTUAL_CARD_FRAUD]: () => require<ReactComponentModule>('@expPages/settings/Wallet/ReportVirtualCardFraudPage').default,
    [SCREENS.SETTINGS.WALLET.CARD_ACTIVATE]: () => require<ReactComponentModule>('@expPages/settings/Wallet/ActivatePhysicalCardPage').default,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.NAME]: () => require<ReactComponentModule>('@expPages/settings/Wallet/Card/GetPhysicalCardName').default,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.PHONE]: () => require<ReactComponentModule>('@expPages/settings/Wallet/Card/GetPhysicalCardPhone').default,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.ADDRESS]: () => require<ReactComponentModule>('@expPages/settings/Wallet/Card/GetPhysicalCardAddress').default,
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.CONFIRM]: () => require<ReactComponentModule>('@expPages/settings/Wallet/Card/GetPhysicalCardConfirm').default,
    [SCREENS.SETTINGS.WALLET.TRANSFER_BALANCE]: () => require<ReactComponentModule>('@expPages/settings/Wallet/TransferBalancePage').default,
    [SCREENS.SETTINGS.WALLET.CHOOSE_TRANSFER_ACCOUNT]: () => require<ReactComponentModule>('@expPages/settings/Wallet/ChooseTransferAccountPage').default,
    [SCREENS.SETTINGS.WALLET.ENABLE_PAYMENTS]: () => require<ReactComponentModule>('@expPages/EnablePayments/EnablePayments').default,
    [SCREENS.SETTINGS.WALLET.VERIFY_ACCOUNT]: () => require<ReactComponentModule>('@expPages/settings/Wallet/VerifyAccountPage').default,
    [SCREENS.SETTINGS.ADD_DEBIT_CARD]: () => require<ReactComponentModule>('@expPages/settings/Wallet/AddDebitCardPage').default,
    [SCREENS.SETTINGS.ADD_BANK_ACCOUNT]: () => require<ReactComponentModule>('@expPages/AddPersonalBankAccountPage').default,
    [SCREENS.SETTINGS.PROFILE.STATUS]: () => require<ReactComponentModule>('@expPages/settings/Profile/CustomStatus/StatusPage').default,
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER]: () => require<ReactComponentModule>('@expPages/settings/Profile/CustomStatus/StatusClearAfterPage').default,
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER_DATE]: () => require<ReactComponentModule>('@expPages/settings/Profile/CustomStatus/SetDatePage').default,
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER_TIME]: () => require<ReactComponentModule>('@expPages/settings/Profile/CustomStatus/SetTimePage').default,
    [SCREENS.SETTINGS.SUBSCRIPTION.SIZE]: () => require<ReactComponentModule>('@expPages/settings/Subscription/SubscriptionSize').default,
    [SCREENS.SETTINGS.SUBSCRIPTION.DISABLE_AUTO_RENEW_SURVEY]: () => require<ReactComponentModule>('@expPages/settings/Subscription/DisableAutoRenewSurveyPage').default,
    [SCREENS.SETTINGS.SUBSCRIPTION.REQUEST_EARLY_CANCELLATION]: () => require<ReactComponentModule>('@expPages/settings/Subscription/RequestEarlyCancellationPage').default,
    [SCREENS.WORKSPACE.INVITE]: () => require<ReactComponentModule>('@expPages/workspace/WorkspaceInvitePage').default,
    [SCREENS.WORKSPACE.MEMBERS_IMPORT]: () => require<ReactComponentModule>('@expPages/workspace/members/ImportMembersPage').default,
    [SCREENS.WORKSPACE.MEMBERS_IMPORTED]: () => require<ReactComponentModule>('@expPages/workspace/members/ImportedMembersPage').default,
    [SCREENS.WORKSPACE.WORKFLOWS_APPROVALS_NEW]: () => require<ReactComponentModule>('@expPages/workspace/workflows/approvals/WorkspaceWorkflowsApprovalsCreatePage').default,
    [SCREENS.WORKSPACE.WORKFLOWS_APPROVALS_EDIT]: () => require<ReactComponentModule>('@expPages/workspace/workflows/approvals/WorkspaceWorkflowsApprovalsEditPage').default,
    [SCREENS.WORKSPACE.WORKFLOWS_APPROVALS_EXPENSES_FROM]: () => require<ReactComponentModule>('@expPages/workspace/workflows/approvals/WorkspaceWorkflowsApprovalsExpensesFromPage').default,
    [SCREENS.WORKSPACE.WORKFLOWS_APPROVALS_APPROVER]: () => require<ReactComponentModule>('@expPages/workspace/workflows/approvals/WorkspaceWorkflowsApprovalsApproverPage').default,
    [SCREENS.WORKSPACE.INVITE_MESSAGE]: () => require<ReactComponentModule>('@expPages/workspace/WorkspaceInviteMessagePage').default,
    [SCREENS.WORKSPACE.WORKFLOWS_PAYER]: () => require<ReactComponentModule>('@expPages/workspace/workflows/WorkspaceWorkflowsPayerPage').default,
    [SCREENS.WORKSPACE.NAME]: () => require<ReactComponentModule>('@expPages/workspace/WorkspaceNamePage').default,
    [SCREENS.WORKSPACE.DESCRIPTION]: () => require<ReactComponentModule>('@expPages/workspace/WorkspaceProfileDescriptionPage').default,
    [SCREENS.WORKSPACE.SHARE]: () => require<ReactComponentModule>('@expPages/workspace/WorkspaceProfileSharePage').default,
    [SCREENS.WORKSPACE.CURRENCY]: () => require<ReactComponentModule>('@expPages/workspace/WorkspaceProfileCurrencyPage').default,
    [SCREENS.WORKSPACE.CATEGORY_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/categories/CategorySettingsPage').default,
    [SCREENS.WORKSPACE.ADDRESS]: () => require<ReactComponentModule>('@expPages/workspace/WorkspaceProfileAddressPage').default,
    [SCREENS.WORKSPACE.CATEGORIES_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/categories/WorkspaceCategoriesSettingsPage').default,
    [SCREENS.WORKSPACE.CATEGORIES_IMPORT]: () => require<ReactComponentModule>('@expPages/workspace/categories/ImportCategoriesPage').default,
    [SCREENS.WORKSPACE.CATEGORIES_IMPORTED]: () => require<ReactComponentModule>('@expPages/workspace/categories/ImportedCategoriesPage').default,
    [SCREENS.WORKSPACE.UPGRADE]: () => require<ReactComponentModule>('@expPages/workspace/upgrade/WorkspaceUpgradePage').default,
    [SCREENS.WORKSPACE.MEMBER_DETAILS]: () => require<ReactComponentModule>('@expPages/workspace/members/WorkspaceMemberDetailsPage').default,
    [SCREENS.WORKSPACE.MEMBER_NEW_CARD]: () => require<ReactComponentModule>('@expPages/workspace/members/WorkspaceMemberNewCardPage').default,
    [SCREENS.WORKSPACE.OWNER_CHANGE_CHECK]: () => require<ReactComponentModule>('@expPages/workspace/members/WorkspaceOwnerChangeWrapperPage').default,
    [SCREENS.WORKSPACE.OWNER_CHANGE_SUCCESS]: () => require<ReactComponentModule>('@expPages/workspace/members/WorkspaceOwnerChangeSuccessPage').default,
    [SCREENS.WORKSPACE.OWNER_CHANGE_ERROR]: () => require<ReactComponentModule>('@expPages/workspace/members/WorkspaceOwnerChangeErrorPage').default,
    [SCREENS.WORKSPACE.CATEGORY_CREATE]: () => require<ReactComponentModule>('@expPages/workspace/categories/CreateCategoryPage').default,
    [SCREENS.WORKSPACE.CATEGORY_EDIT]: () => require<ReactComponentModule>('@expPages/workspace/categories/EditCategoryPage').default,
    [SCREENS.WORKSPACE.CATEGORY_PAYROLL_CODE]: () => require<ReactComponentModule>('@expPages/workspace/categories/CategoryPayrollCodePage').default,
    [SCREENS.WORKSPACE.CATEGORY_GL_CODE]: () => require<ReactComponentModule>('@expPages/workspace/categories/CategoryGLCodePage').default,
    [SCREENS.WORKSPACE.CATEGORY_DEFAULT_TAX_RATE]: () => require<ReactComponentModule>('@expPages/workspace/categories/CategoryDefaultTaxRatePage').default,
    [SCREENS.WORKSPACE.CATEGORY_FLAG_AMOUNTS_OVER]: () => require<ReactComponentModule>('@expPages/workspace/categories/CategoryFlagAmountsOverPage').default,
    [SCREENS.WORKSPACE.CATEGORY_DESCRIPTION_HINT]: () => require<ReactComponentModule>('@expPages/workspace/categories/CategoryDescriptionHintPage').default,
    [SCREENS.WORKSPACE.CATEGORY_REQUIRE_RECEIPTS_OVER]: () => require<ReactComponentModule>('@expPages/workspace/categories/CategoryRequireReceiptsOverPage').default,
    [SCREENS.WORKSPACE.CATEGORY_APPROVER]: () => require<ReactComponentModule>('@expPages/workspace/categories/CategoryApproverPage').default,
    [SCREENS.WORKSPACE.CREATE_DISTANCE_RATE]: () => require<ReactComponentModule>('@expPages/workspace/distanceRates/CreateDistanceRatePage').default,
    [SCREENS.WORKSPACE.DISTANCE_RATES_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/distanceRates/PolicyDistanceRatesSettingsPage').default,
    [SCREENS.WORKSPACE.DISTANCE_RATE_DETAILS]: () => require<ReactComponentModule>('@expPages/workspace/distanceRates/PolicyDistanceRateDetailsPage').default,
    [SCREENS.WORKSPACE.DISTANCE_RATE_EDIT]: () => require<ReactComponentModule>('@expPages/workspace/distanceRates/PolicyDistanceRateEditPage').default,
    [SCREENS.WORKSPACE.DISTANCE_RATE_TAX_RECLAIMABLE_ON_EDIT]: () => require<ReactComponentModule>('@expPages/workspace/distanceRates/PolicyDistanceRateTaxReclaimableEditPage').default,
    [SCREENS.WORKSPACE.DISTANCE_RATE_TAX_RATE_EDIT]: () => require<ReactComponentModule>('@expPages/workspace/distanceRates/PolicyDistanceRateTaxRateEditPage').default,
    [SCREENS.WORKSPACE.TAGS_IMPORT]: () => require<ReactComponentModule>('@expPages/workspace/tags/ImportTagsPage').default,
    [SCREENS.WORKSPACE.TAGS_IMPORTED]: () => require<ReactComponentModule>('@expPages/workspace/tags/ImportedTagsPage').default,
    [SCREENS.WORKSPACE.TAGS_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/tags/WorkspaceTagsSettingsPage').default,
    [SCREENS.WORKSPACE.TAG_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/tags/TagSettingsPage').default,
    [SCREENS.WORKSPACE.TAG_LIST_VIEW]: () => require<ReactComponentModule>('@expPages/workspace/tags/WorkspaceViewTagsPage').default,
    [SCREENS.WORKSPACE.TAGS_EDIT]: () => require<ReactComponentModule>('@expPages/workspace/tags/WorkspaceEditTagsPage').default,
    [SCREENS.WORKSPACE.TAG_CREATE]: () => require<ReactComponentModule>('@expPages/workspace/tags/WorkspaceCreateTagPage').default,
    [SCREENS.WORKSPACE.TAG_EDIT]: () => require<ReactComponentModule>('@expPages/workspace/tags/EditTagPage').default,
    [SCREENS.WORKSPACE.TAG_APPROVER]: () => require<ReactComponentModule>('@expPages/workspace/tags/TagApproverPage').default,
    [SCREENS.WORKSPACE.TAG_GL_CODE]: () => require<ReactComponentModule>('@expPages/workspace/tags/TagGLCodePage').default,
    [SCREENS.WORKSPACE.TAXES_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/taxes/WorkspaceTaxesSettingsPage').default,
    [SCREENS.WORKSPACE.TAXES_SETTINGS_CUSTOM_TAX_NAME]: () => require<ReactComponentModule>('@expPages/workspace/taxes/WorkspaceTaxesSettingsCustomTaxName').default,
    [SCREENS.WORKSPACE.TAXES_SETTINGS_FOREIGN_CURRENCY_DEFAULT]: () => require<ReactComponentModule>('@expPages/workspace/taxes/WorkspaceTaxesSettingsForeignCurrency').default,
    [SCREENS.WORKSPACE.TAXES_SETTINGS_WORKSPACE_CURRENCY_DEFAULT]: () => require<ReactComponentModule>('@expPages/workspace/taxes/WorkspaceTaxesSettingsWorkspaceCurrency').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksExportConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_DATE_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksExportDateSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_INVOICE_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksExportInvoiceAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksOutOfPocketExpenseAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksOutOfPocketExpenseConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksOutOfPocketExpenseEntitySelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_NON_REIMBURSABLE_DEFAULT_VENDOR_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksNonReimbursableDefaultVendorSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksCompanyCardExpenseAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_COMPANY_CARD_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksCompanyCardExpenseAccountSelectCardPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksCompanyCardExpenseAccountPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_PREFERRED_EXPORTER]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/export/QuickbooksPreferredExporterConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_COMPANY_CARD_EXPENSE_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/export/QuickbooksDesktopCompanyCardExpenseAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_COMPANY_CARD_EXPENSE_ACCOUNT_COMPANY_CARD_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/export/QuickbooksDesktopCompanyCardExpenseAccountSelectCardPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_NON_REIMBURSABLE_DEFAULT_VENDOR_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/export/QuickbooksDesktopNonReimbursableDefaultVendorSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_COMPANY_CARD_EXPENSE_ACCOUNT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/export/QuickbooksDesktopCompanyCardExpenseAccountPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_EXPORT_DATE_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/export/QuickbooksDesktopExportDateSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_EXPORT_PREFERRED_EXPORTER]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/export/QuickbooksDesktopPreferredExporterConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_EXPORT_OUT_OF_POCKET_EXPENSES_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/export/QuickbooksDesktopOutOfPocketExpenseAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_EXPORT_OUT_OF_POCKET_EXPENSES]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/export/QuickbooksDesktopOutOfPocketExpenseConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_EXPORT_OUT_OF_POCKET_EXPENSES_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/export/QuickbooksDesktopOutOfPocketExpenseEntitySelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_EXPORT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbd/export/QuickbooksDesktopExportPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_ADVANCED]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbd/advanced/QuickbooksDesktopAdvancedPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_SETUP_MODAL]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbd/QuickBooksDesktopSetupPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_SETUP_REQUIRED_DEVICE_MODAL]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/RequireQuickBooksDesktopPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_TRIGGER_FIRST_SYNC]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/QuickBooksDesktopSetupFlowSyncPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_IMPORT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbd/import/QuickbooksDesktopImportPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_CHART_OF_ACCOUNTS]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/import/QuickbooksDesktopChartOfAccountsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_CLASSES]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbd/import/QuickbooksDesktopClassesPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_CLASSES_DISPLAYED_AS]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/import/QuickbooksDesktopClassesDisplayedAsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_CUSTOMERS]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbd/import/QuickbooksDesktopCustomersPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_CUSTOMERS_DISPLAYED_AS]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbd/import/QuickbooksDesktopCustomersDisplayedAsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_DESKTOP_ITEMS]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbd/import/QuickbooksDesktopItemsPage').default,
    [SCREENS.REIMBURSEMENT_ACCOUNT]: () => require<ReactComponentModule>('@expPages/ReimbursementAccount/ReimbursementAccountPage').default,
    [SCREENS.GET_ASSISTANCE]: () => require<ReactComponentModule>('@expPages/GetAssistancePage').default,
    [SCREENS.SETTINGS.TWO_FACTOR_AUTH]: () => require<ReactComponentModule>('@expPages/settings/Security/TwoFactorAuth/TwoFactorAuthPage').default,
    [SCREENS.SETTINGS.REPORT_CARD_LOST_OR_DAMAGED]: () => require<ReactComponentModule>('@expPages/settings/Wallet/ReportCardLostPage').default,
    [SCREENS.KEYBOARD_SHORTCUTS]: () => require<ReactComponentModule>('@expPages/KeyboardShortcutsPage').default,
    [SCREENS.SETTINGS.EXIT_SURVEY.REASON]: () => require<ReactComponentModule>('@expPages/settings/ExitSurvey/ExitSurveyReasonPage').default,
    [SCREENS.SETTINGS.EXIT_SURVEY.RESPONSE]: () => require<ReactComponentModule>('@expPages/settings/ExitSurvey/ExitSurveyResponsePage').default,
    [SCREENS.SETTINGS.EXIT_SURVEY.CONFIRM]: () => require<ReactComponentModule>('@expPages/settings/ExitSurvey/ExitSurveyConfirmPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_IMPORT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbo/import/QuickbooksImportPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_CHART_OF_ACCOUNTS]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/import/QuickbooksChartOfAccountsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_CUSTOMERS]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbo/import/QuickbooksCustomersPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_TAXES]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbo/import/QuickbooksTaxesPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_LOCATIONS]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbo/import/QuickbooksLocationsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_CLASSES]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbo/import/QuickbooksClassesPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_ADVANCED]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbo/advanced/QuickbooksAdvancedPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_ACCOUNT_SELECTOR]: () => require<ReactComponentModule>('@expPages/workspace/accounting/qbo/advanced/QuickbooksAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_INVOICE_ACCOUNT_SELECTOR]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/qbo/advanced/QuickbooksInvoiceAccountSelectPage').default,

    [SCREENS.WORKSPACE.ACCOUNTING.XERO_IMPORT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/XeroImportPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_ORGANIZATION]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/XeroOrganizationConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_CHART_OF_ACCOUNTS]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/import/XeroChartOfAccountsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_CUSTOMER]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/import/XeroCustomerConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_TAXES]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/XeroTaxesConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_TRACKING_CATEGORIES]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/XeroTrackingCategoryConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_MAP_TRACKING_CATEGORY]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/XeroMapTrackingCategoryConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_EXPORT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/export/XeroExportConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_EXPORT_PURCHASE_BILL_DATE_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/xero/export/XeroPurchaseBillDateSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_EXPORT_BANK_ACCOUNT_SELECT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/export/XeroBankAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_ADVANCED]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/advanced/XeroAdvancedPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_BILL_STATUS_SELECTOR]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/export/XeroPurchaseBillStatusSelectorPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_INVOICE_ACCOUNT_SELECTOR]: () => require<ReactComponentModule>('@expPages/workspace/accounting/xero/advanced/XeroInvoiceAccountSelectorPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_EXPORT_PREFERRED_EXPORTER_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/xero/export/XeroPreferredExporterSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_BILL_PAYMENT_ACCOUNT_SELECTOR]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/xero/advanced/XeroBillPaymentAccountSelectorPage').default,

    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_SUBSIDIARY_SELECTOR]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/NetSuiteSubsidiarySelector').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_REUSE_EXISTING_CONNECTIONS]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/NetSuiteTokenInput/NetSuiteExistingConnectionsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_TOKEN_INPUT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/NetSuiteTokenInput/NetSuiteTokenInputPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_IMPORT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/import/NetSuiteImportPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_IMPORT_MAPPING]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/import/NetSuiteImportMappingPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_IMPORT_CUSTOM_FIELD]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/import/NetSuiteImportCustomFieldPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_IMPORT_CUSTOM_FIELD_VIEW]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/import/NetSuiteImportCustomFieldView').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_IMPORT_CUSTOM_FIELD_EDIT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/import/NetSuiteImportCustomFieldEdit').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_IMPORT_CUSTOM_LIST_ADD]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/import/NetSuiteImportCustomFieldNew/NetSuiteImportAddCustomListPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_IMPORT_CUSTOM_SEGMENT_ADD]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/import/NetSuiteImportCustomFieldNew/NetSuiteImportAddCustomSegmentPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_IMPORT_CUSTOMERS_OR_PROJECTS]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/import/NetSuiteImportCustomersOrProjectsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_IMPORT_CUSTOMERS_OR_PROJECTS_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/import/NetSuiteImportCustomersOrProjectSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_EXPORT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteExportConfigurationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_PREFERRED_EXPORTER_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuitePreferredExporterSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_DATE_SELECT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteDateSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_EXPORT_EXPENSES]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteExportExpensesPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_EXPORT_EXPENSES_DESTINATION_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteExportExpensesDestinationSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_EXPORT_EXPENSES_VENDOR_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteExportExpensesVendorSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_EXPORT_EXPENSES_PAYABLE_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteExportExpensesPayableAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_EXPORT_EXPENSES_JOURNAL_POSTING_PREFERENCE_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteExportExpensesJournalPostingPreferenceSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_RECEIVABLE_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteReceivableAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_INVOICE_ITEM_PREFERENCE_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteInvoiceItemPreferenceSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_INVOICE_ITEM_SELECT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteInvoiceItemSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_TAX_POSTING_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteTaxPostingAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_PROVINCIAL_TAX_POSTING_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/export/NetSuiteProvincialTaxPostingAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_ADVANCED]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/advanced/NetSuiteAdvancedPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_REIMBURSEMENT_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/advanced/NetSuiteReimbursementAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_COLLECTION_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/advanced/NetSuiteCollectionAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_EXPENSE_REPORT_APPROVAL_LEVEL_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/advanced/NetSuiteExpenseReportApprovalLevelSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_VENDOR_BILL_APPROVAL_LEVEL_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/advanced/NetSuiteVendorBillApprovalLevelSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_JOURNAL_ENTRY_APPROVAL_LEVEL_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/advanced/NetSuiteJournalEntryApprovalLevelSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_APPROVAL_ACCOUNT_SELECT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/advanced/NetSuiteApprovalAccountSelectPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.NETSUITE_CUSTOM_FORM_ID]: () => require<ReactComponentModule>('@expPages/workspace/accounting/netsuite/advanced/NetSuiteCustomFormIDPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_PREREQUISITES]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/SageIntacctPrerequisitesPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.ENTER_SAGE_INTACCT_CREDENTIALS]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/EnterSageIntacctCredentialsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.EXISTING_SAGE_INTACCT_CONNECTIONS]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/ExistingConnectionsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_ENTITY]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/SageIntacctEntityPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_EXPORT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/export/SageIntacctExportPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_PREFERRED_EXPORTER]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/intacct/export/SageIntacctPreferredExporterPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_EXPORT_DATE]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/export/SageIntacctDatePage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_REIMBURSABLE_EXPENSES]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/intacct/export/SageIntacctReimbursableExpensesPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_NON_REIMBURSABLE_EXPENSES]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/intacct/export/SageIntacctNonReimbursableExpensesPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_REIMBURSABLE_DESTINATION]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/intacct/export/SageIntacctReimbursableExpensesDestinationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_NON_REIMBURSABLE_DESTINATION]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/intacct/export/SageIntacctNonReimbursableExpensesDestinationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_DEFAULT_VENDOR]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/export/SageIntacctDefaultVendorPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_NON_REIMBURSABLE_CREDIT_CARD_ACCOUNT]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/intacct/export/SageIntacctNonReimbursableCreditCardAccountPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_ADVANCED]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/advanced/SageIntacctAdvancedPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_PAYMENT_ACCOUNT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/advanced/SageIntacctPaymentAccountPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.CARD_RECONCILIATION]: () => require<ReactComponentModule>('@expPages/workspace/accounting/reconciliation/CardReconciliationPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.RECONCILIATION_ACCOUNT_SETTINGS]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/reconciliation/ReconciliationAccountSettingsPage').default,
    [SCREENS.WORKSPACE.WORKFLOWS_AUTO_REPORTING_FREQUENCY]: () => require<ReactComponentModule>('@expPages/workspace/workflows/WorkspaceAutoReportingFrequencyPage').default,
    [SCREENS.WORKSPACE.WORKFLOWS_AUTO_REPORTING_MONTHLY_OFFSET]: () => require<ReactComponentModule>('@expPages/workspace/workflows/WorkspaceAutoReportingMonthlyOffsetPage').default,
    [SCREENS.WORKSPACE.TAX_EDIT]: () => require<ReactComponentModule>('@expPages/workspace/taxes/WorkspaceEditTaxPage').default,
    [SCREENS.WORKSPACE.TAX_NAME]: () => require<ReactComponentModule>('@expPages/workspace/taxes/NamePage').default,
    [SCREENS.WORKSPACE.TAX_VALUE]: () => require<ReactComponentModule>('@expPages/workspace/taxes/ValuePage').default,
    [SCREENS.WORKSPACE.TAX_CREATE]: () => require<ReactComponentModule>('@expPages/workspace/taxes/WorkspaceCreateTaxPage').default,
    [SCREENS.WORKSPACE.TAX_CODE]: () => require<ReactComponentModule>('@expPages/workspace/taxes/WorkspaceTaxCodePage').default,
    [SCREENS.WORKSPACE.INVOICES_COMPANY_NAME]: () => require<ReactComponentModule>('@expPages/workspace/invoices/WorkspaceInvoicingDetailsName').default,
    [SCREENS.WORKSPACE.INVOICES_COMPANY_WEBSITE]: () => require<ReactComponentModule>('@expPages/workspace/invoices/WorkspaceInvoicingDetailsWebsite').default,
    [SCREENS.WORKSPACE.COMPANY_CARDS_ASSIGN_CARD]: () => require<ReactComponentModule>('@expPages/workspace/companyCards/assignCard/AssignCardFeedPage').default,
    [SCREENS.WORKSPACE.COMPANY_CARDS_SELECT_FEED]: () => require<ReactComponentModule>('@expPages/workspace/companyCards/WorkspaceCompanyCardFeedSelectorPage').default,
    [SCREENS.WORKSPACE.COMPANY_CARDS_ADD_NEW]: () => require<ReactComponentModule>('@expPages/workspace/companyCards/addNew/AddNewCardPage').default,
    [SCREENS.WORKSPACE.COMPANY_CARD_DETAILS]: () => require<ReactComponentModule>('@expPages/workspace/companyCards/WorkspaceCompanyCardDetailsPage').default,
    [SCREENS.WORKSPACE.COMPANY_CARD_NAME]: () => require<ReactComponentModule>('@expPages/workspace/companyCards/WorkspaceCompanyCardEditCardNamePage').default,
    [SCREENS.WORKSPACE.COMPANY_CARD_EXPORT]: () => require<ReactComponentModule>('@expPages/workspace/companyCards/WorkspaceCompanyCardAccountSelectCardPage').default,
    [SCREENS.WORKSPACE.EXPENSIFY_CARD_ISSUE_NEW]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/issueNew/IssueNewCardPage').default,
    [SCREENS.WORKSPACE.EXPENSIFY_CARD_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceCardSettingsPage').default,
    [SCREENS.WORKSPACE.EXPENSIFY_CARD_SETTINGS_ACCOUNT]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceSettlementAccountPage').default,
    [SCREENS.WORKSPACE.EXPENSIFY_CARD_SETTINGS_FREQUENCY]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceSettlementFrequencyPage').default,
    [SCREENS.WORKSPACE.EXPENSIFY_CARD_BANK_ACCOUNT]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceExpensifyCardBankAccounts').default,
    [SCREENS.WORKSPACE.EXPENSIFY_CARD_DETAILS]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceExpensifyCardDetailsPage').default,
    [SCREENS.WORKSPACE.EXPENSIFY_CARD_NAME]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceEditCardNamePage').default,
    [SCREENS.WORKSPACE.EXPENSIFY_CARD_LIMIT]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceEditCardLimitPage').default,
    [SCREENS.WORKSPACE.EXPENSIFY_CARD_LIMIT_TYPE]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceEditCardLimitTypePage').default,
    [SCREENS.WORKSPACE.COMPANY_CARDS_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/companyCards/WorkspaceCompanyCardsSettingsPage').default,
    [SCREENS.WORKSPACE.COMPANY_CARDS_SETTINGS_FEED_NAME]: () => require<ReactComponentModule>('@expPages/workspace/companyCards/WorkspaceCompanyCardsSettingsFeedNamePage').default,
    [SCREENS.SETTINGS.SAVE_THE_WORLD]: () => require<ReactComponentModule>('@expPages/TeachersUnite/SaveTheWorldPage').default,
    [SCREENS.SETTINGS.SUBSCRIPTION.CHANGE_PAYMENT_CURRENCY]: () => require<ReactComponentModule>('@expPages/settings/PaymentCard/ChangeCurrency').default,
    [SCREENS.SETTINGS.SUBSCRIPTION.CHANGE_BILLING_CURRENCY]: () => require<ReactComponentModule>('@expPages/settings/Subscription/PaymentCard/ChangeBillingCurrency').default,
    [SCREENS.SETTINGS.SUBSCRIPTION.ADD_PAYMENT_CARD]: () => require<ReactComponentModule>('@expPages/settings/Subscription/PaymentCard').default,
    [SCREENS.SETTINGS.ADD_PAYMENT_CARD_CHANGE_CURRENCY]: () => require<ReactComponentModule>('@expPages/settings/PaymentCard/ChangeCurrency').default,
    [SCREENS.WORKSPACE.REPORT_FIELDS_CREATE]: () => require<ReactComponentModule>('@expPages/workspace/reportFields/CreateReportFieldsPage').default,
    [SCREENS.WORKSPACE.REPORT_FIELDS_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/reportFields/ReportFieldsSettingsPage').default,
    [SCREENS.WORKSPACE.REPORT_FIELDS_LIST_VALUES]: () => require<ReactComponentModule>('@expPages/workspace/reportFields/ReportFieldsListValuesPage').default,
    [SCREENS.WORKSPACE.REPORT_FIELDS_ADD_VALUE]: () => require<ReactComponentModule>('@expPages/workspace/reportFields/ReportFieldsAddListValuePage').default,
    [SCREENS.WORKSPACE.REPORT_FIELDS_VALUE_SETTINGS]: () => require<ReactComponentModule>('@expPages/workspace/reportFields/ReportFieldsValueSettingsPage').default,
    [SCREENS.WORKSPACE.REPORT_FIELDS_EDIT_INITIAL_VALUE]: () => require<ReactComponentModule>('@expPages/workspace/reportFields/ReportFieldsInitialValuePage').default,
    [SCREENS.WORKSPACE.REPORT_FIELDS_EDIT_VALUE]: () => require<ReactComponentModule>('@expPages/workspace/reportFields/ReportFieldsEditValuePage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_IMPORT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/import/SageIntacctImportPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_TOGGLE_MAPPING]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/import/SageIntacctToggleMappingsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_MAPPING_TYPE]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/import/SageIntacctMappingsTypePage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_USER_DIMENSIONS]: () => require<ReactComponentModule>('@expPages/workspace/accounting/intacct/import/SageIntacctUserDimensionsPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_ADD_USER_DIMENSION]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/intacct/import/SageIntacctAddUserDimensionPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.SAGE_INTACCT_EDIT_USER_DIMENSION]: () =>
        require<ReactComponentModule>('@expPages/workspace/accounting/intacct/import/SageIntacctEditUserDimensionsPage').default,
    [SCREENS.SETTINGS.DELEGATE.ADD_DELEGATE]: () => require<ReactComponentModule>('@expPages/settings/Security/AddDelegate/AddDelegatePage').default,
    [SCREENS.SETTINGS.DELEGATE.DELEGATE_ROLE]: () => require<ReactComponentModule>('@expPages/settings/Security/AddDelegate/SelectDelegateRolePage').default,
    [SCREENS.SETTINGS.DELEGATE.UPDATE_DELEGATE_ROLE]: () => require<ReactComponentModule>('@expPages/settings/Security/AddDelegate/UpdateDelegateRole/UpdateDelegateRolePage').default,
    [SCREENS.SETTINGS.DELEGATE.DELEGATE_CONFIRM]: () => require<ReactComponentModule>('@expPages/settings/Security/AddDelegate/ConfirmDelegatePage').default,
    [SCREENS.SETTINGS.DELEGATE.DELEGATE_MAGIC_CODE]: () => require<ReactComponentModule>('@expPages/settings/Security/AddDelegate/DelegateMagicCodePage').default,
    [SCREENS.SETTINGS.DELEGATE.UPDATE_DELEGATE_ROLE_MAGIC_CODE]: () =>
        require<ReactComponentModule>('@expPages/settings/Security/AddDelegate/UpdateDelegateRole/UpdateDelegateMagicCodePage').default,
    [SCREENS.WORKSPACE.RULES_CUSTOM_NAME]: () => require<ReactComponentModule>('@expPages/workspace/rules/RulesCustomNamePage').default,
    [SCREENS.WORKSPACE.RULES_AUTO_APPROVE_REPORTS_UNDER]: () => require<ReactComponentModule>('@expPages/workspace/rules/RulesAutoApproveReportsUnderPage').default,
    [SCREENS.WORKSPACE.RULES_RANDOM_REPORT_AUDIT]: () => require<ReactComponentModule>('@expPages/workspace/rules/RulesRandomReportAuditPage').default,
    [SCREENS.WORKSPACE.RULES_AUTO_PAY_REPORTS_UNDER]: () => require<ReactComponentModule>('@expPages/workspace/rules/RulesAutoPayReportsUnderPage').default,
    [SCREENS.WORKSPACE.RULES_RECEIPT_REQUIRED_AMOUNT]: () => require<ReactComponentModule>('@expPages/workspace/rules/RulesReceiptRequiredAmountPage').default,
    [SCREENS.WORKSPACE.RULES_MAX_EXPENSE_AMOUNT]: () => require<ReactComponentModule>('@expPages/workspace/rules/RulesMaxExpenseAmountPage').default,
    [SCREENS.WORKSPACE.RULES_MAX_EXPENSE_AGE]: () => require<ReactComponentModule>('@expPages/workspace/rules/RulesMaxExpenseAgePage').default,
    [SCREENS.WORKSPACE.RULES_BILLABLE_DEFAULT]: () => require<ReactComponentModule>('@expPages/workspace/rules/RulesBillableDefaultPage').default,
});

const EnablePaymentsStackNavigator = createModalStackNavigator<EnablePaymentsNavigatorParamList>({
    [SCREENS.ENABLE_PAYMENTS_ROOT]: () => require<ReactComponentModule>('@expPages/EnablePayments/EnablePaymentsPage').default,
});

const AddPersonalBankAccountModalStackNavigator = createModalStackNavigator<AddPersonalBankAccountNavigatorParamList>({
    [SCREENS.ADD_PERSONAL_BANK_ACCOUNT_ROOT]: () => require<ReactComponentModule>('@expPages/AddPersonalBankAccountPage').default,
});

const ReimbursementAccountModalStackNavigator = createModalStackNavigator<ReimbursementAccountNavigatorParamList>({
    [SCREENS.REIMBURSEMENT_ACCOUNT_ROOT]: () => require<ReactComponentModule>('@expPages/ReimbursementAccount/ReimbursementAccountPage').default,
});

const WalletStatementStackNavigator = createModalStackNavigator<WalletStatementNavigatorParamList>({
    [SCREENS.WALLET_STATEMENT_ROOT]: () => require<ReactComponentModule>('@expPages/wallet/WalletStatementPage').default,
});

const FlagCommentStackNavigator = createModalStackNavigator<FlagCommentNavigatorParamList>({
    [SCREENS.FLAG_COMMENT_ROOT]: () => require<ReactComponentModule>('@expPages/FlagCommentPage').default,
});

const EditRequestStackNavigator = createModalStackNavigator<EditRequestNavigatorParamList>({
    [SCREENS.EDIT_REQUEST.REPORT_FIELD]: () => require<ReactComponentModule>('@expPages/EditReportFieldPage').default,
});

const PrivateNotesModalStackNavigator = createModalStackNavigator<PrivateNotesNavigatorParamList>({
    [SCREENS.PRIVATE_NOTES.LIST]: () => require<ReactComponentModule>('@expPages/PrivateNotes/PrivateNotesListPage').default,
    [SCREENS.PRIVATE_NOTES.EDIT]: () => require<ReactComponentModule>('@expPages/PrivateNotes/PrivateNotesEditPage').default,
});

const SignInModalStackNavigator = createModalStackNavigator<SignInNavigatorParamList>({
    [SCREENS.SIGN_IN_ROOT]: () => require<ReactComponentModule>('@expPages/signin/SignInModal').default,
});
const ReferralModalStackNavigator = createModalStackNavigator<ReferralDetailsNavigatorParamList>({
    [SCREENS.REFERRAL_DETAILS]: () => require<ReactComponentModule>('@expPages/ReferralDetailsPage').default,
});

const ProcessMoneyRequestHoldStackNavigator = createModalStackNavigator({
    [SCREENS.PROCESS_MONEY_REQUEST_HOLD_ROOT]: () => require<ReactComponentModule>('@expPages/ProcessMoneyRequestHoldPage').default,
});

const TransactionDuplicateStackNavigator = createModalStackNavigator<TransactionDuplicateNavigatorParamList>({
    [SCREENS.TRANSACTION_DUPLICATE.REVIEW]: () => require<ReactComponentModule>('@expPages/TransactionDuplicate/Review').default,
    [SCREENS.TRANSACTION_DUPLICATE.MERCHANT]: () => require<ReactComponentModule>('@expPages/TransactionDuplicate/ReviewMerchant').default,
    [SCREENS.TRANSACTION_DUPLICATE.CATEGORY]: () => require<ReactComponentModule>('@expPages/TransactionDuplicate/ReviewCategory').default,
    [SCREENS.TRANSACTION_DUPLICATE.TAG]: () => require<ReactComponentModule>('@expPages/TransactionDuplicate/ReviewTag').default,
    [SCREENS.TRANSACTION_DUPLICATE.DESCRIPTION]: () => require<ReactComponentModule>('@expPages/TransactionDuplicate/ReviewDescription').default,
    [SCREENS.TRANSACTION_DUPLICATE.TAX_CODE]: () => require<ReactComponentModule>('@expPages/TransactionDuplicate/ReviewTaxCode').default,
    [SCREENS.TRANSACTION_DUPLICATE.BILLABLE]: () => require<ReactComponentModule>('@expPages/TransactionDuplicate/ReviewBillable').default,
    [SCREENS.TRANSACTION_DUPLICATE.REIMBURSABLE]: () => require<ReactComponentModule>('@expPages/TransactionDuplicate/ReviewReimbursable').default,
    [SCREENS.TRANSACTION_DUPLICATE.CONFIRMATION]: () => require<ReactComponentModule>('@expPages/TransactionDuplicate/Confirmation').default,
});

const SearchReportModalStackNavigator = createModalStackNavigator<SearchReportParamList>({
    [SCREENS.SEARCH.REPORT_RHP]: () => require<ReactComponentModule>('@expPages/home/ReportScreen').default,
    [SCREENS.SEARCH.TRANSACTION_HOLD_REASON_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchHoldReasonPage').default,
});

const SearchAdvancedFiltersModalStackNavigator = createModalStackNavigator<SearchAdvancedFiltersParamList>({
    [SCREENS.SEARCH.ADVANCED_FILTERS_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_DATE_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersDatePage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_CURRENCY_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersCurrencyPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_DESCRIPTION_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersDescriptionPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_MERCHANT_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersMerchantPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_REPORT_ID_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersReportIDPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_AMOUNT_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersAmountPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_CATEGORY_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersCategoryPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_KEYWORD_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersKeywordPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_CARD_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersCardPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_TAX_RATE_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersTaxRatePage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_EXPENSE_TYPE_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersExpenseTypePage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_TAG_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersTagPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_FROM_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersFromPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_TO_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersToPage').default,
    [SCREENS.SEARCH.ADVANCED_FILTERS_IN_RHP]: () => require<ReactComponentModule>('@expPages/Search/SearchAdvancedFiltersPage/SearchFiltersInPage').default,
});

const SearchSavedSearchModalStackNavigator = createModalStackNavigator<SearchSavedSearchParamList>({
    [SCREENS.SEARCH.SAVED_SEARCH_RENAME_RHP]: () => require<ReactComponentModule>('@expPages/Search/SavedSearchRenamePage').default,
});

const RestrictedActionModalStackNavigator = createModalStackNavigator<SearchReportParamList>({
    [SCREENS.RESTRICTED_ACTION_ROOT]: () => require<ReactComponentModule>('@expPages/RestrictedAction/Workspace/WorkspaceRestrictedActionPage').default,
});

const MissingPersonalDetailsModalStackNavigator = createModalStackNavigator<MissingPersonalDetailsParamList>({
    [SCREENS.MISSING_PERSONAL_DETAILS_ROOT]: () => require<ReactComponentModule>('@expPages/MissingPersonalDetails').default,
});

const DebugModalStackNavigator = createModalStackNavigator<DebugParamList>({
    [SCREENS.DEBUG.REPORT]: () => require<ReactComponentModule>('@expPages/Debug/Report/DebugReportPage').default,
    [SCREENS.DEBUG.REPORT_ACTION]: () => require<ReactComponentModule>('@expPages/Debug/ReportAction/DebugReportActionPage').default,
    [SCREENS.DEBUG.REPORT_ACTION_CREATE]: () => require<ReactComponentModule>('@expPages/Debug/ReportAction/DebugReportActionCreatePage').default,
    [SCREENS.DEBUG.DETAILS_CONSTANT_PICKER_PAGE]: () => require<ReactComponentModule>('@expPages/Debug/DebugDetailsConstantPickerPage').default,
    [SCREENS.DEBUG.DETAILS_DATE_TIME_PICKER_PAGE]: () => require<ReactComponentModule>('@expPages/Debug/DebugDetailsDateTimePickerPage').default,
});

export {
    AddPersonalBankAccountModalStackNavigator,
    EditRequestStackNavigator,
    EnablePaymentsStackNavigator,
    FlagCommentStackNavigator,
    MoneyRequestModalStackNavigator,
    NewChatModalStackNavigator,
    NewTaskModalStackNavigator,
    NewTeachersUniteNavigator,
    PrivateNotesModalStackNavigator,
    ProcessMoneyRequestHoldStackNavigator,
    ProfileModalStackNavigator,
    ReferralModalStackNavigator,
    TravelModalStackNavigator,
    ReimbursementAccountModalStackNavigator,
    ReportDescriptionModalStackNavigator,
    ReportDetailsModalStackNavigator,
    ReportParticipantsModalStackNavigator,
    ReportSettingsModalStackNavigator,
    RoomMembersModalStackNavigator,
    SettingsModalStackNavigator,
    SignInModalStackNavigator,
    CategoriesModalStackNavigator,
    ExpensifyCardModalStackNavigator,
    DomainCardModalStackNavigator,
    SplitDetailsModalStackNavigator,
    TaskModalStackNavigator,
    WalletStatementStackNavigator,
    TransactionDuplicateStackNavigator,
    SearchReportModalStackNavigator,
    RestrictedActionModalStackNavigator,
    SearchAdvancedFiltersModalStackNavigator,
    SearchSavedSearchModalStackNavigator,
    MissingPersonalDetailsModalStackNavigator,
    DebugModalStackNavigator,
};
