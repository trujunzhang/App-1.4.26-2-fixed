import React from 'react';
import {View} from 'react-native';
import FocusTrapForScreens from '@components/FocusTrap/FocusTrapForScreen';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import createCustomFullScreenNavigator from '@libs/Navigation/AppNavigator/createCustomFullScreenNavigator';
import getRootNavigatorScreenOptions from '@libs/Navigation/AppNavigator/getRootNavigatorScreenOptions';
import type {FullScreenNavigatorParamList} from '@libs/Navigation/types';
import SCREENS from '@src/SCREENS';
import type ReactComponentModule from '@src/types/utils/ReactComponentModule';

const loadWorkspaceInitialPage = () => require<ReactComponentModule>('@expPages/workspace/WorkspaceInitialPage').default;

const RootStack = createCustomFullScreenNavigator();

type Screens = Partial<Record<keyof FullScreenNavigatorParamList, () => React.ComponentType>>;

const CENTRAL_PANE_WORKSPACE_SCREENS = {
    [SCREENS.WORKSPACE.PROFILE]: () => require<ReactComponentModule>('@expPages/workspace/WorkspaceProfilePage').default,
    [SCREENS.WORKSPACE.WORKFLOWS]: () => require<ReactComponentModule>('@expPages/workspace/workflows/WorkspaceWorkflowsPage').default,
    [SCREENS.WORKSPACE.INVOICES]: () => require<ReactComponentModule>('@expPages/workspace/invoices/WorkspaceInvoicesPage').default,
    [SCREENS.WORKSPACE.MEMBERS]: () => require<ReactComponentModule>('@expPages/workspace/WorkspaceMembersPage').default,
    [SCREENS.WORKSPACE.ACCOUNTING.ROOT]: () => require<ReactComponentModule>('@expPages/workspace/accounting/PolicyAccountingPage').default,
    [SCREENS.WORKSPACE.CATEGORIES]: () => require<ReactComponentModule>('@expPages/workspace/categories/WorkspaceCategoriesPage').default,
    [SCREENS.WORKSPACE.MORE_FEATURES]: () => require<ReactComponentModule>('@expPages/workspace/WorkspaceMoreFeaturesPage').default,
    [SCREENS.WORKSPACE.TAGS]: () => require<ReactComponentModule>('@expPages/workspace/tags/WorkspaceTagsPage').default,
    [SCREENS.WORKSPACE.TAXES]: () => require<ReactComponentModule>('@expPages/workspace/taxes/WorkspaceTaxesPage').default,
    [SCREENS.WORKSPACE.REPORT_FIELDS]: () => require<ReactComponentModule>('@expPages/workspace/reportFields/WorkspaceReportFieldsPage').default,
    [SCREENS.WORKSPACE.EXPENSIFY_CARD]: () => require<ReactComponentModule>('@expPages/workspace/expensifyCard/WorkspaceExpensifyCardPage').default,
    [SCREENS.WORKSPACE.COMPANY_CARDS]: () => require<ReactComponentModule>('@expPages/workspace/companyCards/WorkspaceCompanyCardsPage').default,
    [SCREENS.WORKSPACE.DISTANCE_RATES]: () => require<ReactComponentModule>('@expPages/workspace/distanceRates/PolicyDistanceRatesPage').default,
    [SCREENS.WORKSPACE.RULES]: () => require<ReactComponentModule>('@expPages/workspace/rules/PolicyRulesPage').default,
} satisfies Screens;

function FullScreenNavigator() {
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();
    const {shouldUseNarrowLayout} = useResponsiveLayout();
    const screenOptions = getRootNavigatorScreenOptions(shouldUseNarrowLayout, styles, StyleUtils);

    return (
        <FocusTrapForScreens>
            <View style={styles.rootNavigatorContainerStyles(shouldUseNarrowLayout)}>
                <RootStack.Navigator screenOptions={screenOptions.centralPaneNavigator}>
                    <RootStack.Screen
                        name={SCREENS.WORKSPACE.INITIAL}
                        options={screenOptions.homeScreen}
                        getComponent={loadWorkspaceInitialPage}
                    />
                    {Object.entries(CENTRAL_PANE_WORKSPACE_SCREENS).map(([screenName, componentGetter]) => (
                        <RootStack.Screen
                            key={screenName}
                            name={screenName as keyof Screens}
                            getComponent={componentGetter}
                        />
                    ))}
                </RootStack.Navigator>
            </View>
        </FocusTrapForScreens>
    );
}

FullScreenNavigator.displayName = 'FullScreenNavigator';

export {CENTRAL_PANE_WORKSPACE_SCREENS};
export default FullScreenNavigator;
