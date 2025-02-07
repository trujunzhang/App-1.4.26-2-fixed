/* eslint-disable @typescript-eslint/naming-convention  */
import type {
    CommonActions,
    NavigationContainerRefWithCurrent,
    NavigationHelpers,
    NavigationState,
    NavigatorScreenParams,
    ParamListBase,
    PartialRoute,
    PartialState,
    Route,
} from '@react-navigation/native';
import type {ValueOf} from 'type-fest';
import type {IOURequestType} from '@libs/actions/IOU';
import type CONST from '@src/CONST';
import type {Country, IOUAction, IOUType} from '@src/CONST';
import type NAVIGATORS from '@src/NAVIGATORS';
import type {HybridAppRoute, Route as Routes} from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';
import type EXIT_SURVEY_REASON_FORM_INPUT_IDS from '@src/types/form/ExitSurveyReasonForm';

type NavigationRef = NavigationContainerRefWithCurrent<RootStackParamList>;

type NavigationRoot = NavigationHelpers<RootStackParamList>;

type GoBackAction = Extract<CommonActions.Action, {type: 'GO_BACK'}>;
type ResetAction = Extract<CommonActions.Action, {type: 'RESET'}>;
type SetParamsAction = Extract<CommonActions.Action, {type: 'SET_PARAMS'}>;

type ActionNavigate = {
    type: ValueOf<typeof CONST.NAVIGATION.ACTION_TYPE>;
    payload: {
        name?: string;
        key?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params?: any;
        path?: string;
        merge?: boolean;
    };
    source?: string;
    target?: string;
};

type StackNavigationAction = GoBackAction | ResetAction | SetParamsAction | ActionNavigate | undefined;

type NavigationStateRoute = NavigationState['routes'][number];
type NavigationPartialRoute<TRouteName extends string = string> = PartialRoute<Route<TRouteName>>;
type StateOrRoute = NavigationState | NavigationStateRoute | NavigationPartialRoute;
type State<TParamList extends ParamListBase = ParamListBase> = NavigationState<TParamList> | PartialState<NavigationState<TParamList>>;

type CentralPaneNavigatorParamList = {
    [SCREENS.REPORT]: {
        reportId: string;
    };
    [SCREENS.RESTAURANT]: {
        restaurantId: string;
        openOnAdminRoom?: boolean;
    };
    [SCREENS.EVENT]: {
        eventId: string;
    };
    [SCREENS.RECIPE]: {
        recipeId: string;
    };
};

type WorkspaceSwitcherNavigatorParamList = {
    [SCREENS.WORKSPACE_SWITCHER.ROOT]: undefined;
};

type BackToParams = {
    backTo?: Routes;
};

type RightIeattaNavigatorParamList = {
    [SCREENS.RIGHT_IEATTA.RESTAURANT]: {
        restaurantId: string;
    };
    [SCREENS.RIGHT_IEATTA.EVENT]: {
        eventId: string;
        restaurantId: string;
    };
    [SCREENS.RIGHT_IEATTA.RECIPE]: {
        recipeId: string;
        restaurantId: string;
    };
    [SCREENS.RIGHT_IEATTA.REVIEW]: {
        reviewId: string;
        relatedId: string;
        reviewType: string;
    };
    [SCREENS.RIGHT_IEATTA.ADD_RECIPES_IN_EVENT]: {
        restaurantId: string;
        peopleInEventId: string;
    };
    [SCREENS.RIGHT_IEATTA.ADD_USERS_IN_EVENT]: {
        restaurantId: string;
        eventId: string;
    };
    [SCREENS.RIGHT_IEATTA.TAKE_PHOTO]: {
        relatedId: string;
        photoType: string;
        pageId: string;
    };
    [SCREENS.RIGHT_IEATTA.LOCAL_PHOTOS]: {
        pageId: string;
    };
};

type SettingsNavigatorParamList = {
    [SCREENS.SETTINGS.ROOT]: undefined;
    [SCREENS.SETTINGS.SHARE_CODE]: undefined;
    [SCREENS.SETTINGS.PROFILE.ROOT]: undefined;
    [SCREENS.SETTINGS.PROFILE.PRONOUNS]: undefined;
    [SCREENS.SETTINGS.PROFILE.DISPLAY_NAME]: undefined;
    [SCREENS.SETTINGS.PROFILE.TIMEZONE]: undefined;
    [SCREENS.SETTINGS.PROFILE.TIMEZONE_SELECT]: undefined;
    [SCREENS.SETTINGS.PROFILE.LEGAL_NAME]: undefined;
    [SCREENS.SETTINGS.PROFILE.DATE_OF_BIRTH]: undefined;
    [SCREENS.SETTINGS.PROFILE.ADDRESS]: {
        country?: Country | '';
    };
    [SCREENS.SETTINGS.PROFILE.ADDRESS_COUNTRY]: {
        backTo?: Routes;
        country: string;
    };
    [SCREENS.SETTINGS.PROFILE.CONTACT_METHODS]: {
        backTo: Routes;
    };
    [SCREENS.SETTINGS.PROFILE.CONTACT_METHOD_DETAILS]: {
        contactMethod: string;
    };
    [SCREENS.SETTINGS.PROFILE.NEW_CONTACT_METHOD]: {
        backTo: Routes;
    };
    [SCREENS.SETTINGS.PREFERENCES.ROOT]: undefined;
    [SCREENS.SETTINGS.PREFERENCES.PRIORITY_MODE]: undefined;
    [SCREENS.SETTINGS.PREFERENCES.LANGUAGE]: undefined;
    [SCREENS.SETTINGS.PREFERENCES.THEME]: undefined;
    [SCREENS.SETTINGS.CLOSE]: undefined;
    [SCREENS.SETTINGS.SECURITY]: undefined;
    [SCREENS.SETTINGS.ABOUT]: undefined;
    [SCREENS.SETTINGS.TROUBLESHOOT]: undefined;
    [SCREENS.SETTINGS.APP_DOWNLOAD_LINKS]: undefined;
    [SCREENS.SETTINGS.TROUBLESHOOT]: undefined;
    [SCREENS.SETTINGS.CONSOLE]: undefined;
    [SCREENS.SETTINGS.SHARE_LOG]: {
        /** URL of the generated file to share logs in a report */
        source: string;
    };
    [SCREENS.SETTINGS.WALLET.ROOT]: undefined;
    [SCREENS.SETTINGS.WALLET.CARDS_DIGITAL_DETAILS_UPDATE_ADDRESS]: undefined;
    [SCREENS.SETTINGS.WALLET.DOMAIN_CARD]: {
        /** cardID of selected card */
        cardID: string;
    };
    [SCREENS.SETTINGS.WALLET.REPORT_VIRTUAL_CARD_FRAUD]: {
        /** cardID of selected card */
        cardID: string;
    };
    [SCREENS.SETTINGS.WALLET.CARD_ACTIVATE]: {
        /** cardID of selected card */
        cardID: string;
    };
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.NAME]: {
        /** domain of selected card */
        domain: string;
    };
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.PHONE]: {
        /** domain of selected card */
        domain: string;
    };
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.ADDRESS]: {
        /** Currently selected country */
        country: string;
        /** domain of selected card */
        domain: string;
    };
    [SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.CONFIRM]: {
        /** Currently selected country */
        country: string;
        /** domain of selected card */
        domain: string;
    };
    [SCREENS.WORKSPACE.WORKFLOWS_PAYER]: {
        policyID: string;
    };
    [SCREENS.SETTINGS.WALLET.TRANSFER_BALANCE]: undefined;
    [SCREENS.SETTINGS.WALLET.CHOOSE_TRANSFER_ACCOUNT]: undefined;
    [SCREENS.SETTINGS.WALLET.ENABLE_PAYMENTS]: undefined;
    [SCREENS.SETTINGS.ADD_DEBIT_CARD]: undefined;
    [SCREENS.SETTINGS.ADD_BANK_ACCOUNT]: undefined;
    [SCREENS.SETTINGS.PROFILE.STATUS]: undefined;
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER]: undefined;
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER_DATE]: undefined;
    [SCREENS.SETTINGS.PROFILE.STATUS_CLEAR_AFTER_TIME]: undefined;
    [SCREENS.WORKSPACE.CURRENCY]: undefined;
    [SCREENS.WORKSPACE.ADDRESS]: undefined;
    [SCREENS.WORKSPACE.NAME]: undefined;
    [SCREENS.WORKSPACE.DESCRIPTION]: undefined;
    [SCREENS.WORKSPACE.SHARE]: undefined;
    [SCREENS.WORKSPACE.RATE_AND_UNIT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.RATE_AND_UNIT_RATE]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.RATE_AND_UNIT_UNIT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.INVITE]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.INVITE_MESSAGE]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.CATEGORY_CREATE]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.CATEGORY_EDIT]: {
        policyID: string;
        categoryName: string;
    };
    [SCREENS.WORKSPACE.CATEGORY_SETTINGS]: {
        policyID: string;
        categoryName: string;
    };
    [SCREENS.WORKSPACE.CATEGORIES_SETTINGS]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.TAG_CREATE]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.DISTANCE_RATE_DETAILS]: {
        policyID: string;
        rateID: string;
    };
    [SCREENS.WORKSPACE.DISTANCE_RATE_EDIT]: {
        policyID: string;
        rateID: string;
    };
    [SCREENS.WORKSPACE.TAGS_SETTINGS]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.TAG_SETTINGS]: {
        policyID: string;
        tagName: string;
    };
    [SCREENS.WORKSPACE.TAGS_EDIT]: {
        policyID: string;
        tagName: string;
    };
    [SCREENS.WORKSPACE.TAG_EDIT]: {
        policyID: string;
        tagName: string;
    };
    [SCREENS.WORKSPACE.TAXES_SETTINGS]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.TAXES_SETTINGS_CUSTOM_TAX_NAME]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.TAXES_SETTINGS_FOREIGN_CURRENCY_DEFAULT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.TAXES_SETTINGS_WORKSPACE_CURRENCY_DEFAULT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.MEMBER_DETAILS]: {
        policyID: string;
        accountID: string;
    };
    [SCREENS.WORKSPACE.OWNER_CHANGE_SUCCESS]: {
        policyID: string;
        accountID: number;
    };
    [SCREENS.WORKSPACE.OWNER_CHANGE_ERROR]: {
        policyID: string;
        accountID: number;
    };
    [SCREENS.WORKSPACE.OWNER_CHANGE_CHECK]: {
        policyID: string;
        accountID: number;
        error: ValueOf<typeof CONST.POLICY.OWNERSHIP_ERRORS>;
    };
    [SCREENS.WORKSPACE.CREATE_DISTANCE_RATE]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.DISTANCE_RATES_SETTINGS]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_IMPORT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_CHART_OF_ACCOUNTS]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_LOCATIONS]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_CLASSES]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_CUSTOMERS]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_TAXES]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_DATE_SELECT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_INVOICE_ACCOUNT_SELECT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES_ACCOUNT_SELECT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_OUT_OF_POCKET_EXPENSES_SELECT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_SELECT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_COMPANY_CARD_SELECT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_COMPANY_CARD_EXPENSE_ACCOUNT_PAYABLE_SELECT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_EXPORT_PREFERRED_EXPORTER]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_IMPORT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_CUSTOMER]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_ORGANIZATION]: {
        policyID: string;
        organizationID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.XERO_TAXES]: {
        policyID: string;
    };
    [SCREENS.GET_ASSISTANCE]: {
        backTo: Routes;
    };
    [SCREENS.SETTINGS.TWO_FACTOR_AUTH]: BackToParams;
    [SCREENS.SETTINGS.REPORT_CARD_LOST_OR_DAMAGED]: {
        /** cardID of selected card */
        cardID: string;
    };
    [SCREENS.KEYBOARD_SHORTCUTS]: undefined;
    [SCREENS.SETTINGS.EXIT_SURVEY.REASON]: undefined;
    [SCREENS.SETTINGS.EXIT_SURVEY.RESPONSE]: {
        [EXIT_SURVEY_REASON_FORM_INPUT_IDS.REASON]: ValueOf<typeof CONST.EXIT_SURVEY.REASONS>;
        backTo: Routes;
    };
    [SCREENS.SETTINGS.EXIT_SURVEY.CONFIRM]: {
        backTo: Routes;
    };
    [SCREENS.WORKSPACE.TAX_CREATE]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.TAX_EDIT]: {
        policyID: string;
        taxID: string;
    };
    [SCREENS.WORKSPACE.TAX_NAME]: {
        policyID: string;
        taxID: string;
    };
    [SCREENS.WORKSPACE.TAX_VALUE]: {
        policyID: string;
        taxID: string;
    };
} & ReimbursementAccountNavigatorParamList;

type NewChatNavigatorParamList = {
    [SCREENS.NEW_CHAT.ROOT]: undefined;
    [SCREENS.NEW_CHAT.NEW_CHAT_EDIT_NAME]: {
        reportID?: string;
    };
};

type ChatFinderNavigatorParamList = {
    [SCREENS.CHAT_FINDER_ROOT]: undefined;
};

type DetailsNavigatorParamList = {
    [SCREENS.DETAILS_ROOT]: {
        login: string;
        reportID: string;
    };
};

type ProfileNavigatorParamList = {
    [SCREENS.PROFILE_ROOT]: {
        accountID: string;
        reportID: string;
        backTo: Routes;
    };
};

type ReportDetailsNavigatorParamList = {
    [SCREENS.REPORT_DETAILS.ROOT]: undefined;
    [SCREENS.REPORT_DETAILS.SHARE_CODE]: {
        reportID: string;
    };
};

type ReportSettingsNavigatorParamList = {
    [SCREENS.REPORT_SETTINGS.ROOT]: undefined;
    [SCREENS.REPORT_SETTINGS.ROOM_NAME]: undefined;
    [SCREENS.REPORT_SETTINGS.GROUP_NAME]: undefined;
    [SCREENS.REPORT_SETTINGS.NOTIFICATION_PREFERENCES]: undefined;
    [SCREENS.REPORT_SETTINGS.WRITE_CAPABILITY]: undefined;
    [SCREENS.REPORT_SETTINGS.VISIBILITY]: {
        reportID: string;
    };
};

type ReportDescriptionNavigatorParamList = {
    [SCREENS.REPORT_DESCRIPTION_ROOT]: {reportID: string};
};

type ParticipantsNavigatorParamList = {
    [SCREENS.REPORT_PARTICIPANTS.ROOT]: {reportID: string};
    [SCREENS.REPORT_PARTICIPANTS.INVITE]: {reportID: string};
    [SCREENS.REPORT_PARTICIPANTS.DETAILS]: {
        reportID: string;
        accountID: string;
    };
    [SCREENS.REPORT_PARTICIPANTS.ROLE]: {
        reportID: string;
        accountID: string;
    };
};

type RoomMembersNavigatorParamList = {
    [SCREENS.ROOM_MEMBERS_ROOT]: undefined;
};

type RoomInviteNavigatorParamList = {
    [SCREENS.ROOM_INVITE_ROOT]: {
        reportID: string;
        role?: 'accountant';
    };
};

type MoneyRequestNavigatorParamList = {
    [SCREENS.MONEY_REQUEST.STEP_SEND_FROM]: {
        iouType: IOUType;
        transactionID: string;
        reportID: string;
        backTo: Routes;
    };
    [SCREENS.MONEY_REQUEST.STEP_PARTICIPANTS]: {
        action: IOUAction;
        iouType: Exclude<IOUType, typeof CONST.IOU.TYPE.REQUEST | typeof CONST.IOU.TYPE.SEND>;
        transactionID: string;
        reportID: string;
        backTo: string;
    };
    [SCREENS.MONEY_REQUEST.STEP_DATE]: {
        action: IOUAction;
        iouType: Exclude<IOUType, typeof CONST.IOU.TYPE.REQUEST | typeof CONST.IOU.TYPE.SEND>;
        transactionID: string;
        reportID: string;
        backTo: Routes;
    };
    [SCREENS.MONEY_REQUEST.STEP_DESCRIPTION]: {
        action: IOUAction;
        iouType: Exclude<IOUType, typeof CONST.IOU.TYPE.REQUEST | typeof CONST.IOU.TYPE.SEND>;
        transactionID: string;
        reportID: string;
        backTo: Routes;
        reportActionID: string;
    };
    [SCREENS.MONEY_REQUEST.STEP_CATEGORY]: {
        action: IOUAction;
        iouType: Exclude<IOUType, typeof CONST.IOU.TYPE.REQUEST | typeof CONST.IOU.TYPE.SEND>;
        transactionID: string;
        reportActionID: string;
        reportID: string;
        backTo: Routes;
    };
    [SCREENS.MONEY_REQUEST.STEP_TAX_AMOUNT]: {
        action: IOUAction;
        iouType: Exclude<IOUType, typeof CONST.IOU.TYPE.REQUEST | typeof CONST.IOU.TYPE.SEND>;
        transactionID: string;
        reportID: string;
        backTo: Routes;
        currency?: string;
    };
    [SCREENS.MONEY_REQUEST.STEP_TAG]: {
        action: IOUAction;
        iouType: Exclude<IOUType, typeof CONST.IOU.TYPE.REQUEST | typeof CONST.IOU.TYPE.SEND>;
        transactionID: string;
        reportID: string;
        backTo: Routes;
        reportActionID: string;
        orderWeight: string;
    };
    [SCREENS.MONEY_REQUEST.STEP_TAX_RATE]: {
        action: IOUAction;
        iouType: Exclude<IOUType, typeof CONST.IOU.TYPE.REQUEST | typeof CONST.IOU.TYPE.SEND>;
        transactionID: string;
        reportID: string;
        backTo: Routes;
    };
    [SCREENS.MONEY_REQUEST.STEP_WAYPOINT]: {
        iouType: IOUType;
        reportID: string;
        backTo: Routes | undefined;
        action: IOUAction;
        pageIndex: string;
        transactionID: string;
    };
    [SCREENS.MONEY_REQUEST.STEP_MERCHANT]: {
        action: IOUAction;
        iouType: Exclude<IOUType, typeof CONST.IOU.TYPE.REQUEST | typeof CONST.IOU.TYPE.SEND>;
        transactionID: string;
        reportID: string;
        backTo: Routes;
    };
    [SCREENS.MONEY_REQUEST.STEP_SPLIT_PAYER]: {
        action: ValueOf<typeof CONST.IOU.ACTION>;
        iouType: ValueOf<typeof CONST.IOU.TYPE>;
        transactionID: string;
        reportID: string;
        backTo: Routes;
    };
    [SCREENS.IOU_SEND.ENABLE_PAYMENTS]: undefined;
    [SCREENS.IOU_SEND.ADD_BANK_ACCOUNT]: undefined;
    [SCREENS.IOU_SEND.ADD_DEBIT_CARD]: undefined;
    [SCREENS.MONEY_REQUEST.STEP_DISTANCE]: {
        action: IOUAction;
        iouType: IOUType;
        transactionID: string;
        reportID: string;
        backTo: Routes;
    };
    [SCREENS.MONEY_REQUEST.CREATE]: {
        iouType: IOUType;
        reportID: string;
        transactionID: string;

        // These are not used in the screen, but are needed for the navigation
        // for IOURequestStepDistance and IOURequestStepAmount components
        backTo: never;
        action: never;
        currency: never;
    };
    [SCREENS.MONEY_REQUEST.START]: {
        iouType: IOUType;
        reportID: string;
        transactionID: string;
        iouRequestType: IOURequestType;
    };
    [SCREENS.MONEY_REQUEST.STEP_AMOUNT]: {
        iouType: IOUType;
        reportID: string;
        transactionID: string;
        backTo: Routes;
        action: IOUAction;
        currency?: string;
    };
    [SCREENS.MONEY_REQUEST.STEP_DISTANCE_RATE]: {
        iouType: ValueOf<typeof CONST.IOU.TYPE>;
        transactionID: string;
        backTo: Routes;
        reportID: string;
    };
    [SCREENS.MONEY_REQUEST.STEP_CONFIRMATION]: {
        action: IOUAction;
        iouType: Exclude<IOUType, typeof CONST.IOU.TYPE.REQUEST | typeof CONST.IOU.TYPE.SEND>;
        transactionID: string;
        reportID: string;
        pageIndex?: string;
        backTo?: string;
    };
    [SCREENS.MONEY_REQUEST.STEP_SCAN]: {
        action: IOUAction;
        iouType: IOUType;
        transactionID: string;
        reportID: string;
        pageIndex: number;
        backTo: Routes;
    };
    [SCREENS.MONEY_REQUEST.STEP_CURRENCY]: {
        action: IOUAction;
        iouType: IOUType;
        transactionID: string;
        reportID: string;
        pageIndex?: string;
        backTo?: Routes;
        currency?: string;
    };
};

type NewTaskNavigatorParamList = {
    [SCREENS.NEW_TASK.ROOT]: undefined;
    [SCREENS.NEW_TASK.TASK_ASSIGNEE_SELECTOR]: undefined;
    [SCREENS.NEW_TASK.TASK_SHARE_DESTINATION_SELECTOR]: undefined;
    [SCREENS.NEW_TASK.DETAILS]: undefined;
    [SCREENS.NEW_TASK.TITLE]: undefined;
    [SCREENS.NEW_TASK.DESCRIPTION]: undefined;
};

type TeachersUniteNavigatorParamList = {
    [SCREENS.SAVE_THE_WORLD.ROOT]: undefined;
    [SCREENS.I_KNOW_A_TEACHER]: undefined;
    [SCREENS.INTRO_SCHOOL_PRINCIPAL]: undefined;
    [SCREENS.I_AM_A_TEACHER]: undefined;
};

type TaskDetailsNavigatorParamList = {
    [SCREENS.TASK.TITLE]: undefined;
    [SCREENS.TASK.ASSIGNEE]: {
        reportID: string;
    };
};

type EnablePaymentsNavigatorParamList = {
    [SCREENS.ENABLE_PAYMENTS_ROOT]: undefined;
};

type SplitDetailsNavigatorParamList = {
    [SCREENS.SPLIT_DETAILS.ROOT]: {
        reportID: string;
        reportActionID: string;
    };
    [SCREENS.SPLIT_DETAILS.EDIT_REQUEST]: {
        field: string;
        reportID: string;
        reportActionID: string;
        currency: string;
        tagIndex: string;
    };
};

type AddPersonalBankAccountNavigatorParamList = {
    [SCREENS.ADD_PERSONAL_BANK_ACCOUNT_ROOT]: undefined;
};

type ReimbursementAccountNavigatorParamList = {
    [SCREENS.REIMBURSEMENT_ACCOUNT_ROOT]: {
        stepToOpen?: string;
        backTo?: Routes;
        policyID?: string;
    };
};

type WalletStatementNavigatorParamList = {
    [SCREENS.WALLET_STATEMENT_ROOT]: {
        /** The statement year and month as one string, i.e. 202110 */
        yearMonth: string;
    };
};

type FlagCommentNavigatorParamList = {
    [SCREENS.FLAG_COMMENT_ROOT]: {
        reportID: string;
        reportActionID: string;
    };
};

type EditRequestNavigatorParamList = {
    [SCREENS.EDIT_REQUEST.REPORT_FIELD]: undefined;
};

type SignInNavigatorParamList = {
    [SCREENS.SIGN_IN_ROOT]: undefined;
};

type FeatureTrainingNavigatorParamList = {
    [SCREENS.FEATURE_TRAINING_ROOT]: undefined;
};

type ReferralDetailsNavigatorParamList = {
    [SCREENS.REFERRAL_DETAILS]: {
        contentType: ValueOf<typeof CONST.REFERRAL_PROGRAM.CONTENT_TYPES>;
        backTo: string;
    };
};

type ProcessMoneyRequestHoldNavigatorParamList = {
    [SCREENS.PROCESS_MONEY_REQUEST_HOLD_ROOT]: undefined;
};

type PrivateNotesNavigatorParamList = {
    [SCREENS.PRIVATE_NOTES.LIST]: undefined;
    [SCREENS.PRIVATE_NOTES.EDIT]: {
        reportID: string;
        accountID: string;
    };
};

type LeftModalNavigatorParamList = {
    [SCREENS.LEFT_MODAL.CHAT_FINDER]: NavigatorScreenParams<ChatFinderNavigatorParamList>;
    [SCREENS.LEFT_MODAL.WORKSPACE_SWITCHER]: NavigatorScreenParams<WorkspaceSwitcherNavigatorParamList>;
};

type RightModalNavigatorParamList = {
    [SCREENS.RIGHT_MODAL.EDIT_IEATTA]: NavigatorScreenParams<RightIeattaNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.SETTINGS]: NavigatorScreenParams<SettingsNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.NEW_CHAT]: NavigatorScreenParams<NewChatNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.DETAILS]: NavigatorScreenParams<DetailsNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.PROFILE]: NavigatorScreenParams<ProfileNavigatorParamList>;
    [SCREENS.SETTINGS.SHARE_CODE]: undefined;
    [SCREENS.RIGHT_MODAL.REPORT_DETAILS]: NavigatorScreenParams<ReportDetailsNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.REPORT_SETTINGS]: NavigatorScreenParams<ReportSettingsNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.REPORT_DESCRIPTION]: NavigatorScreenParams<ReportDescriptionNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.PARTICIPANTS]: NavigatorScreenParams<ParticipantsNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.ROOM_MEMBERS]: NavigatorScreenParams<RoomMembersNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.ROOM_INVITE]: NavigatorScreenParams<RoomInviteNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.MONEY_REQUEST]: NavigatorScreenParams<MoneyRequestNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.NEW_TASK]: NavigatorScreenParams<NewTaskNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.TEACHERS_UNITE]: NavigatorScreenParams<TeachersUniteNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.TASK_DETAILS]: NavigatorScreenParams<TaskDetailsNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.ENABLE_PAYMENTS]: NavigatorScreenParams<EnablePaymentsNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.SPLIT_DETAILS]: NavigatorScreenParams<SplitDetailsNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.ADD_PERSONAL_BANK_ACCOUNT]: NavigatorScreenParams<AddPersonalBankAccountNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.WALLET_STATEMENT]: NavigatorScreenParams<WalletStatementNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.FLAG_COMMENT]: NavigatorScreenParams<FlagCommentNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.EDIT_REQUEST]: NavigatorScreenParams<EditRequestNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.SIGN_IN]: NavigatorScreenParams<SignInNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.PROCESS_MONEY_REQUEST_HOLD]: NavigatorScreenParams<ProcessMoneyRequestHoldNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.REFERRAL]: NavigatorScreenParams<ReferralDetailsNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.PRIVATE_NOTES]: NavigatorScreenParams<PrivateNotesNavigatorParamList>;
    [SCREENS.RIGHT_MODAL.SEARCH_REPORT]: NavigatorScreenParams<SearchReportParamList>;
};

type IeattaPhotosCentralPaneNavigatorParamList = {};

type WorkspacesCentralPaneNavigatorParamList = {
    [SCREENS.WORKSPACE.PROFILE]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.CARD]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.WORKFLOWS]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.WORKFLOWS_APPROVER]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.WORKFLOWS_AUTO_REPORTING_FREQUENCY]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.WORKFLOWS_AUTO_REPORTING_MONTHLY_OFFSET]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.REIMBURSE]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.BILLS]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.INVOICES]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.TRAVEL]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.MEMBERS]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.CATEGORIES]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.MORE_FEATURES]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.TAGS]: {
        policyID: string;
        tagName: string;
    };
    [SCREENS.WORKSPACE.TAXES]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.DISTANCE_RATES]: {
        policyID: string;
    };

    [SCREENS.WORKSPACE.ACCOUNTING.ROOT]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_ADVANCED]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_ACCOUNT_SELECTOR]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE.ACCOUNTING.QUICKBOOKS_ONLINE_INVOICE_ACCOUNT_SELECTOR]: {
        policyID: string;
    };
};

type FullScreenNavigatorParamList = {
    [SCREENS.WORKSPACE.INITIAL]: {
        policyID: string;
    };
    // [SCREENS.WORKSPACES_CENTRAL_PANE]: NavigatorScreenParams<WorkspacesCentralPaneNavigatorParamList>;
    // [SCREENS.IEATTA_PHOTOS_CENTRAL_PANE]: NavigatorScreenParams<IeattaPhotosCentralPaneNavigatorParamList>;
};

type OnboardingModalNavigatorParamList = {
    [SCREENS.ONBOARDING_MODAL.ONBOARDING]: undefined;
    [SCREENS.ONBOARDING.PERSONAL_DETAILS]: undefined;
    [SCREENS.ONBOARDING.PURPOSE]: undefined;
    [SCREENS.ONBOARDING.WORK]: undefined;
};

type WelcomeVideoModalNavigatorParamList = {
    [SCREENS.WELCOME_VIDEO.ROOT]: undefined;
};

type BottomTabNavigatorParamList = {
    [SCREENS.HOME]: undefined;
    // [SCREENS.SEARCH.BOTTOM_TAB]: undefined;
    // [SCREENS.SETTINGS.ROOT]: undefined;
};

type SharedScreensParamList = {
    [NAVIGATORS.BOTTOM_TAB_NAVIGATOR]: NavigatorScreenParams<BottomTabNavigatorParamList>;
    [SCREENS.TRANSITION_BETWEEN_APPS]: {
        email?: string;
        accountID?: number;
        error?: string;
        shortLivedAuthToken?: string;
        shortLivedToken?: string;
        authTokenType?: ValueOf<typeof CONST.AUTH_TOKEN_TYPES>;
        exitTo?: Routes | HybridAppRoute;
        shouldForceLogin: string;
        domain?: Routes;
    };
    [SCREENS.VALIDATE_LOGIN]: {
        accountID: string;
        validateCode: string;
        exitTo?: Routes | HybridAppRoute;
    };
};

type PublicScreensParamList = SharedScreensParamList & {
    [SCREENS.UNLINK_LOGIN]: {
        accountID?: string;
        validateCode?: string;
    };
    [SCREENS.SIGN_IN_WITH_APPLE_DESKTOP]: undefined;
    [SCREENS.SIGN_IN_WITH_GOOGLE_DESKTOP]: undefined;
    [SCREENS.SAML_SIGN_IN]: undefined;
    [SCREENS.CONNECTION_COMPLETE]: undefined;
};

type AuthScreensParamList = SharedScreensParamList & {
    [NAVIGATORS.CENTRAL_PANE_NAVIGATOR]: NavigatorScreenParams<CentralPaneNavigatorParamList>;
    [SCREENS.CENTER_IEATTA.PHOTO_GRID_VIEW]: {
        relatedId: string;
        photoType: string;
    };
    [SCREENS.CENTER_IEATTA.PHOTO_PAGE_VIEW]: {
        relatedId: string;
        photoType: string;
        selected: string;
    };
    [SCREENS.CONCIERGE]: undefined;
    [SCREENS.REPORT_ATTACHMENTS]: {
        reportID: string;
        source: string;
    };
    [SCREENS.PROFILE_AVATAR]: {
        accountID: string;
    };
    [SCREENS.WORKSPACE_AVATAR]: {
        policyID: string;
    };
    [SCREENS.WORKSPACE_JOIN_USER]: {
        policyID: string;
        email: string;
    };
    [SCREENS.REPORT_AVATAR]: {
        reportID: string;
    };
    [SCREENS.NOT_FOUND]: undefined;
    [NAVIGATORS.LEFT_MODAL_NAVIGATOR]: NavigatorScreenParams<LeftModalNavigatorParamList>;
    [NAVIGATORS.RIGHT_MODAL_NAVIGATOR]: NavigatorScreenParams<RightModalNavigatorParamList>;
    [NAVIGATORS.FULL_SCREEN_NAVIGATOR]: NavigatorScreenParams<FullScreenNavigatorParamList>;
    [NAVIGATORS.ONBOARDING_MODAL_NAVIGATOR]: NavigatorScreenParams<OnboardingModalNavigatorParamList>;
    [NAVIGATORS.FEATURE_TRANING_MODAL_NAVIGATOR]: NavigatorScreenParams<FeatureTrainingNavigatorParamList>;
    [NAVIGATORS.WELCOME_VIDEO_MODAL_NAVIGATOR]: NavigatorScreenParams<WelcomeVideoModalNavigatorParamList>;
    [SCREENS.DESKTOP_SIGN_IN_REDIRECT]: undefined;
    [SCREENS.TRANSACTION_RECEIPT]: {
        reportID: string;
        transactionID: string;
    };
    [SCREENS.CONNECTION_COMPLETE]: undefined;
};

type SearchReportParamList = {
    [SCREENS.SEARCH.REPORT_RHP]: {
        query: string;
        reportID: string;
    };
};

type RootStackParamList = PublicScreensParamList & AuthScreensParamList & ChatFinderNavigatorParamList;

type BottomTabName = keyof BottomTabNavigatorParamList;

type CentralPaneName = keyof CentralPaneNavigatorParamList;

// type FullScreenName = keyof WorkspacesCentralPaneNavigatorParamList;
type FullScreenName = keyof IeattaPhotosCentralPaneNavigatorParamList;

type SwitchPolicyIDParams = {
    policyID?: string;
    route?: Routes;
    isPolicyAdmin?: boolean;
};

export type {
    AddPersonalBankAccountNavigatorParamList,
    AuthScreensParamList,
    BackToParams,
    BottomTabName,
    BottomTabNavigatorParamList,
    CentralPaneName,
    CentralPaneNavigatorParamList,
    ChatFinderNavigatorParamList,
    DetailsNavigatorParamList,
    EditRequestNavigatorParamList,
    EnablePaymentsNavigatorParamList,
    FlagCommentNavigatorParamList,
    FullScreenName,
    FullScreenNavigatorParamList,
    LeftModalNavigatorParamList,
    MoneyRequestNavigatorParamList,
    NavigationPartialRoute,
    NavigationRef,
    NavigationRoot,
    NavigationStateRoute,
    NewChatNavigatorParamList,
    NewTaskNavigatorParamList,
    OnboardingModalNavigatorParamList,
    ParticipantsNavigatorParamList,
    PrivateNotesNavigatorParamList,
    ProfileNavigatorParamList,
    PublicScreensParamList,
    ReferralDetailsNavigatorParamList,
    ReimbursementAccountNavigatorParamList,
    ReportDescriptionNavigatorParamList,
    ReportDetailsNavigatorParamList,
    ReportSettingsNavigatorParamList,
    RightModalNavigatorParamList,
    RoomInviteNavigatorParamList,
    RoomMembersNavigatorParamList,
    RootStackParamList,
    RightIeattaNavigatorParamList,
    SettingsNavigatorParamList,
    SignInNavigatorParamList,
    FeatureTrainingNavigatorParamList,
    SplitDetailsNavigatorParamList,
    StackNavigationAction,
    State,
    StateOrRoute,
    SwitchPolicyIDParams,
    TaskDetailsNavigatorParamList,
    TeachersUniteNavigatorParamList,
    WalletStatementNavigatorParamList,
    WelcomeVideoModalNavigatorParamList,
    WorkspaceSwitcherNavigatorParamList,
    WorkspacesCentralPaneNavigatorParamList,
    SearchReportParamList,
};
