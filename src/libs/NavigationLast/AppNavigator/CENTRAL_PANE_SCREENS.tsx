import type {CentralPaneName} from '@libs/Navigation/types';
import withPrepareCentralPaneScreen from '@src/components/withPrepareCentralPaneScreen';
import SCREENS from '@src/SCREENS';
import type ReactComponentModule from '@src/types/utils/ReactComponentModule';

type Screens = Partial<Record<CentralPaneName, () => React.ComponentType>>;

const CENTRAL_PANE_SCREENS = {
    [SCREENS.SETTINGS.WORKSPACES]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/workspace/WorkspacesListPage').default),
    [SCREENS.SETTINGS.PREFERENCES.ROOT]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/settings/Preferences/PreferencesPage').default),
    [SCREENS.SETTINGS.SECURITY]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/settings/Security/SecuritySettingsPage').default),
    [SCREENS.SETTINGS.PROFILE.ROOT]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/settings/Profile/ProfilePage').default),
    [SCREENS.SETTINGS.WALLET.ROOT]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/settings/Wallet/WalletPage').default),
    [SCREENS.SETTINGS.ABOUT]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/settings/AboutPage/AboutPage').default),
    [SCREENS.SETTINGS.TROUBLESHOOT]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/settings/Troubleshoot/TroubleshootPage').default),
    [SCREENS.SETTINGS.SAVE_THE_WORLD]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/TeachersUnite/SaveTheWorldPage').default),
    [SCREENS.SETTINGS.SUBSCRIPTION.ROOT]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/settings/Subscription/SubscriptionSettingsPage').default),
    [SCREENS.SEARCH.CENTRAL_PANE]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/Search/SearchPage').default),
    [SCREENS.REPORT]: withPrepareCentralPaneScreen(() => require<ReactComponentModule>('@expPages/home/ReportScreen').default),
} satisfies Screens;

export default CENTRAL_PANE_SCREENS;
