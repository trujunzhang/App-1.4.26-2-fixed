import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SCREENS from '@src/SCREENS';
import useModalScreenOptions from './useModalScreenOptions';

const StackNavigator = createStackNavigator();

function WorkspaceSettingsModalStackNavigator() {
    const screenOptions = useModalScreenOptions((styles) => ({cardStyle: styles.navigationScreenCardStyle, headerShown: false}));

    return (
        <StackNavigator.Navigator screenOptions={screenOptions}>
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.PROFILE}
                name={SCREENS.WORKSPACE.PROFILE}
                getComponent={() => require('@src/expPages/workspace/WorkspaceProfilePage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.CARD}
                name={SCREENS.WORKSPACE.CARD}
                getComponent={() => require('@src/expPages/workspace/card/WorkspaceCardPage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.WORKFLOWS}
                name={SCREENS.WORKSPACE.WORKFLOWS}
                getComponent={() => require('@src/expPages/workspace/workflows/WorkspaceWorkflowsPage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.REIMBURSE}
                name={SCREENS.WORKSPACE.REIMBURSE}
                getComponent={() => require('@src/expPages/workspace/reimburse/WorkspaceReimbursePage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.BILLS}
                name={SCREENS.WORKSPACE.BILLS}
                getComponent={() => require('@src/expPages/workspace/bills/WorkspaceBillsPage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.INVOICES}
                name={SCREENS.WORKSPACE.INVOICES}
                getComponent={() => require('@src/expPages/workspace/invoices/WorkspaceInvoicesPage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.TRAVEL}
                name={SCREENS.WORKSPACE.TRAVEL}
                getComponent={() => require('@src/expPages/workspace/travel/WorkspaceTravelPage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.MEMBERS}
                name={SCREENS.WORKSPACE.MEMBERS}
                getComponent={() => require('@src/expPages/workspace/WorkspaceMembersPage').default as React.ComponentType}
            />

            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.ACCOUNTING.ROOT}
                name={SCREENS.WORKSPACE.ACCOUNTING.ROOT}
                getComponent={() => require('@src/expPages/workspace/accounting/PolicyAccountingPage').default as React.ComponentType}
            />

            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.CATEGORIES}
                name={SCREENS.WORKSPACE.CATEGORIES}
                getComponent={() => require('@src/expPages/workspace/categories/WorkspaceCategoriesPage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.MORE_FEATURES}
                name={SCREENS.WORKSPACE.MORE_FEATURES}
                getComponent={() => require('@src/expPages/workspace/WorkspaceMoreFeaturesPage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.TAGS}
                name={SCREENS.WORKSPACE.TAGS}
                getComponent={() => require('@src/expPages/workspace/tags/WorkspaceTagsPage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.TAXES}
                name={SCREENS.WORKSPACE.TAXES}
                getComponent={() => require('@src/expPages/workspace/taxes/WorkspaceTaxesPage').default as React.ComponentType}
            />
            <StackNavigator.Screen
                key={SCREENS.WORKSPACE.DISTANCE_RATES}
                name={SCREENS.WORKSPACE.DISTANCE_RATES}
                getComponent={() => require('@src/expPages/workspace/distanceRates/PolicyDistanceRatesPage').default as React.ComponentType}
            />
        </StackNavigator.Navigator>
    );
}

export default WorkspaceSettingsModalStackNavigator;
