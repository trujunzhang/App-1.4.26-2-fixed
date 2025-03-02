import NotFoundPage from '@expPages/ErrorPage/NotFoundPage';
import React, {useMemo} from 'react';
import {useOnyx} from 'react-native-onyx';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import ScreenWrapper from '@components/ScreenWrapper';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {SettingsNavigatorParamList} from '@libs/Navigation/types';
import * as PolicyUtils from '@libs/PolicyUtils';
import * as Policy from '@src/libs/actions/Policy/Policy';
import ONYXKEYS from '@src/ONYXKEYS';
import type SCREENS from '@src/SCREENS';
import DowngradeConfirmation from './DowngradeConfirmation';
import DowngradeIntro from './DowngradeIntro';

type WorkspaceDowngradePageProps = PlatformStackScreenProps<SettingsNavigatorParamList, typeof SCREENS.WORKSPACE.DOWNGRADE>;

function WorkspaceDowngradePage({route}: WorkspaceDowngradePageProps) {
    const styles = useThemeStyles();
    const policyID = route.params?.policyID;
    const {translate} = useLocalize();
    const [policy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`);
    const {isOffline} = useNetwork();

    const canPerformDowngrade = useMemo(() => PolicyUtils.canModifyPlan(policyID), [policyID]);
    const isDowngraded = useMemo(() => PolicyUtils.isCollectPolicy(policy), [policy]);

    const downgradeToTeam = () => {
        if (!canPerformDowngrade || !policy) {
            return;
        }
        Policy.downgradeToTeam(policy.id);
    };

    if (!canPerformDowngrade) {
        return <NotFoundPage />;
    }

    return (
        <ScreenWrapper
            shouldShowOfflineIndicator
            testID="workspaceDowngradePage"
            offlineIndicatorStyle={styles.mtAuto}
        >
            <HeaderWithBackButton
                title={translate('common.downgradeWorkspace')}
                onBackButtonPress={() => {
                    if (isDowngraded) {
                        Navigation.dismissModal();
                    } else {
                        Navigation.goBack();
                    }
                }}
            />
            {isDowngraded && !!policyID && (
                <DowngradeConfirmation
                    onConfirmDowngrade={() => {
                        Navigation.dismissModal();
                    }}
                    policyID={policyID}
                />
            )}
            {!isDowngraded && (
                <DowngradeIntro
                    policyID={policyID}
                    onDowngrade={downgradeToTeam}
                    buttonDisabled={isOffline}
                    loading={policy?.isPendingDowngrade}
                />
            )}
        </ScreenWrapper>
    );
}

export default WorkspaceDowngradePage;
