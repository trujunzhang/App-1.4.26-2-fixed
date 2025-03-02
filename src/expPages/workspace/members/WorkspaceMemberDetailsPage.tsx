import NotFoundPage from '@expPages/ErrorPage/NotFoundPage';
import AccessOrNotFoundWrapper from '@expPages/workspace/AccessOrNotFoundWrapper';
import type {WithPolicyAndFullscreenLoadingProps} from '@expPages/workspace/withPolicyAndFullscreenLoading';
import withPolicyAndFullscreenLoading from '@expPages/workspace/withPolicyAndFullscreenLoading';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {OnyxEntry} from 'react-native-onyx';
import type {ValueOf} from 'type-fest';
import Avatar from '@components/Avatar';
import Button from '@components/Button';
import ConfirmModal from '@components/ConfirmModal';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import * as Expensicons from '@components/Icon/Expensicons';
import MenuItem from '@components/MenuItem';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import OfflineWithFeedback from '@components/OfflineWithFeedback';
import ScreenWrapper from '@components/ScreenWrapper';
import ScrollView from '@components/ScrollView';
import Text from '@components/Text';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useNetwork from '@hooks/useNetwork';
import usePrevious from '@hooks/usePrevious';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import * as CardUtils from '@libs/CardUtils';
import * as CurrencyUtils from '@libs/CurrencyUtils';
import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import * as PersonalDetailsUtils from '@libs/PersonalDetailsUtils';
import * as PolicyUtils from '@libs/PolicyUtils';
import shouldRenderTransferOwnerButton from '@libs/shouldRenderTransferOwnerButton';
import Navigation from '@navigation/Navigation';
import type {SettingsNavigatorParamList} from '@navigation/types';
import variables from '@styles/variables';
import * as Card from '@userActions/Card';
import * as CompanyCards from '@userActions/CompanyCards';
import * as Member from '@userActions/Policy/Member';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';
import type {CompanyCardFeed, Card as MemberCard, PersonalDetails, PersonalDetailsList} from '@src/types/onyx';
import type {ListItemType} from './WorkspaceMemberDetailsRoleSelectionModal';
import WorkspaceMemberDetailsRoleSelectionModal from './WorkspaceMemberDetailsRoleSelectionModal';

type WorkspacePolicyOnyxProps = {
    /** Personal details of all users */
    personalDetails: OnyxEntry<PersonalDetailsList>;
};

type WorkspaceMemberDetailsPageProps = Omit<WithPolicyAndFullscreenLoadingProps, 'route'> &
    WorkspacePolicyOnyxProps &
    PlatformStackScreenProps<SettingsNavigatorParamList, typeof SCREENS.WORKSPACE.MEMBER_DETAILS>;

function WorkspaceMemberDetailsPage({personalDetails, policy, route}: WorkspaceMemberDetailsPageProps) {
    const policyID = route.params.policyID;
    const workspaceAccountID = PolicyUtils.getWorkspaceAccountID(policyID);

    const styles = useThemeStyles();
    const {isOffline} = useNetwork();
    const {formatPhoneNumber, translate} = useLocalize();
    const StyleUtils = useStyleUtils();
    const currentUserPersonalDetails = useCurrentUserPersonalDetails();
    const [cardFeeds] = useOnyx(`${ONYXKEYS.COLLECTION.SHARED_NVP_PRIVATE_DOMAIN_MEMBER}${workspaceAccountID}`);

    const [isRemoveMemberConfirmModalVisible, setIsRemoveMemberConfirmModalVisible] = useState(false);
    const [isRoleSelectionModalVisible, setIsRoleSelectionModalVisible] = useState(false);

    const accountID = Number(route.params.accountID);
    const memberLogin = personalDetails?.[accountID]?.login ?? '';
    const member = policy?.employeeList?.[memberLogin];
    const prevMember = usePrevious(member);
    const details = personalDetails?.[accountID] ?? ({} as PersonalDetails);
    const fallbackIcon = details.fallbackIcon ?? '';
    const displayName = formatPhoneNumber(PersonalDetailsUtils.getDisplayNameOrDefault(details));
    const isSelectedMemberOwner = policy?.owner === details.login;
    const isSelectedMemberCurrentUser = accountID === currentUserPersonalDetails?.accountID;
    const isCurrentUserAdmin = policy?.employeeList?.[personalDetails?.[currentUserPersonalDetails?.accountID]?.login ?? '']?.role === CONST.POLICY.ROLE.ADMIN;
    const isCurrentUserOwner = policy?.owner === currentUserPersonalDetails?.login;
    const ownerDetails = personalDetails?.[policy?.ownerAccountID ?? CONST.DEFAULT_NUMBER_ID] ?? ({} as PersonalDetails);
    const policyOwnerDisplayName = formatPhoneNumber(PersonalDetailsUtils.getDisplayNameOrDefault(ownerDetails)) ?? policy?.owner ?? '';
    const hasMultipleFeeds = Object.values(CardUtils.getCompanyFeeds(cardFeeds)).filter((feed) => !feed.pending).length > 0;

    const workspaceCards = CardUtils.getAllCardsForWorkspace(workspaceAccountID);
    const hasWorkspaceCardsAssigned = !!workspaceCards && !!Object.values(workspaceCards).length;

    useEffect(() => {
        CompanyCards.openPolicyCompanyCardsPage(policyID, workspaceAccountID);
    }, [policyID, workspaceAccountID]);

    const memberCards = useMemo(() => {
        if (!workspaceCards) {
            return [];
        }
        return Object.values(workspaceCards ?? {}).filter((card) => card.accountID === accountID);
    }, [accountID, workspaceCards]);

    const confirmModalPrompt = useMemo(() => {
        const isApprover = Member.isApprover(policy, accountID);
        if (!isApprover) {
            return translate('workspace.people.removeMemberPrompt', {memberName: displayName});
        }
        return translate('workspace.people.removeMembersWarningPrompt', {
            memberName: displayName,
            ownerName: policyOwnerDisplayName,
        });
    }, [accountID, policy, displayName, policyOwnerDisplayName, translate]);

    const roleItems: ListItemType[] = useMemo(
        () => [
            {
                value: CONST.POLICY.ROLE.ADMIN,
                text: translate('common.admin'),
                alternateText: translate('workspace.common.adminAlternateText'),
                isSelected: member?.role === CONST.POLICY.ROLE.ADMIN,
                keyForList: CONST.POLICY.ROLE.ADMIN,
            },
            {
                value: CONST.POLICY.ROLE.USER,
                text: translate('common.member'),
                alternateText: translate('workspace.common.memberAlternateText'),
                isSelected: member?.role === CONST.POLICY.ROLE.USER,
                keyForList: CONST.POLICY.ROLE.USER,
            },
            {
                value: CONST.POLICY.ROLE.AUDITOR,
                text: translate('common.auditor'),
                alternateText: translate('workspace.common.auditorAlternateText'),
                isSelected: member?.role === CONST.POLICY.ROLE.AUDITOR,
                keyForList: CONST.POLICY.ROLE.AUDITOR,
            },
        ],
        [member?.role, translate],
    );

    useEffect(() => {
        if (!prevMember || prevMember?.pendingAction === CONST.RED_BRICK_ROAD_PENDING_ACTION.DELETE || member?.pendingAction !== CONST.RED_BRICK_ROAD_PENDING_ACTION.DELETE) {
            return;
        }
        Navigation.goBack();
    }, [member, prevMember]);

    const askForConfirmationToRemove = () => {
        setIsRemoveMemberConfirmModalVisible(true);
    };

    const removeUser = useCallback(() => {
        Member.removeMembers([accountID], policyID);
        setIsRemoveMemberConfirmModalVisible(false);
    }, [accountID, policyID]);

    const navigateToProfile = useCallback(() => {
        Navigation.navigate(ROUTES.PROFILE.getRoute(accountID, Navigation.getActiveRoute()));
    }, [accountID]);

    const navigateToDetails = useCallback(
        (card: MemberCard) => {
            if (card.bank === CONST.EXPENSIFY_CARD.BANK) {
                Navigation.navigate(ROUTES.WORKSPACE_EXPENSIFY_CARD_DETAILS.getRoute(policyID, card.cardID.toString(), Navigation.getActiveRoute()));
                return;
            }
            Navigation.navigate(ROUTES.WORKSPACE_COMPANY_CARD_DETAILS.getRoute(policyID, card.cardID.toString(), card.bank, Navigation.getActiveRoute()));
        },
        [policyID],
    );

    const handleIssueNewCard = useCallback(() => {
        if (hasMultipleFeeds) {
            Navigation.navigate(ROUTES.WORKSPACE_MEMBER_NEW_CARD.getRoute(policyID, accountID));
            return;
        }
        const activeRoute = Navigation.getActiveRoute();

        Card.setIssueNewCardStepAndData({
            step: CONST.EXPENSIFY_CARD.STEP.CARD_TYPE,
            data: {
                assigneeEmail: memberLogin,
            },
            isEditing: false,
        });
        Navigation.navigate(ROUTES.WORKSPACE_EXPENSIFY_CARD_ISSUE_NEW.getRoute(policyID, activeRoute));
    }, [accountID, hasMultipleFeeds, memberLogin, policyID]);

    const openRoleSelectionModal = useCallback(() => {
        setIsRoleSelectionModalVisible(true);
    }, []);

    const changeRole = useCallback(
        ({value}: ListItemType) => {
            setIsRoleSelectionModalVisible(false);
            Member.updateWorkspaceMembersRole(policyID, [accountID], value);
        },
        [accountID, policyID],
    );

    const startChangeOwnershipFlow = useCallback(() => {
        Member.clearWorkspaceOwnerChangeFlow(policyID);
        Member.requestWorkspaceOwnerChange(policyID);
        Navigation.navigate(ROUTES.WORKSPACE_OWNER_CHANGE_CHECK.getRoute(policyID, accountID, 'amountOwed' as ValueOf<typeof CONST.POLICY.OWNERSHIP_ERRORS>));
    }, [accountID, policyID]);

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundPage =
        !member || (member.pendingAction === CONST.RED_BRICK_ROAD_PENDING_ACTION.DELETE && prevMember?.pendingAction === CONST.RED_BRICK_ROAD_PENDING_ACTION.DELETE);

    if (shouldShowNotFoundPage) {
        return <NotFoundPage />;
    }

    const shouldShowCardsSection = hasWorkspaceCardsAssigned && (!!policy?.areExpensifyCardsEnabled || !!policy?.areCompanyCardsEnabled);

    return (
        <AccessOrNotFoundWrapper
            policyID={policyID}
            accessVariants={[CONST.POLICY.ACCESS_VARIANTS.ADMIN, CONST.POLICY.ACCESS_VARIANTS.PAID]}
        >
            <ScreenWrapper testID={WorkspaceMemberDetailsPage.displayName}>
                {({safeAreaPaddingBottomStyle}) => (
                    <>
                        <HeaderWithBackButton
                            title={displayName}
                            subtitle={policy?.name}
                        />
                        <ScrollView contentContainerStyle={safeAreaPaddingBottomStyle}>
                            <View style={[styles.containerWithSpaceBetween, styles.pointerEventsBoxNone, styles.justifyContentStart]}>
                                <View style={[styles.avatarSectionWrapper, styles.pb0]}>
                                    <OfflineWithFeedback pendingAction={details.pendingFields?.avatar}>
                                        <Avatar
                                            containerStyles={[styles.avatarXLarge, styles.mv5, styles.noOutline]}
                                            imageStyles={[styles.avatarXLarge]}
                                            source={details.avatar}
                                            avatarID={accountID}
                                            type={CONST.ICON_TYPE_AVATAR}
                                            size={CONST.AVATAR_SIZE.XLARGE}
                                            fallbackIcon={fallbackIcon}
                                        />
                                    </OfflineWithFeedback>
                                    {!!(details.displayName ?? '') && (
                                        <Text
                                            style={[styles.textHeadline, styles.pre, styles.mb6, styles.w100, styles.textAlignCenter]}
                                            numberOfLines={1}
                                        >
                                            {displayName}
                                        </Text>
                                    )}
                                    {isSelectedMemberOwner && isCurrentUserAdmin && !isCurrentUserOwner ? (
                                        shouldRenderTransferOwnerButton() && (
                                            <Button
                                                text={translate('workspace.people.transferOwner')}
                                                onPress={startChangeOwnershipFlow}
                                                isDisabled={isOffline}
                                                icon={Expensicons.Transfer}
                                                iconStyles={StyleUtils.getTransformScaleStyle(0.8)}
                                                style={styles.mv5}
                                            />
                                        )
                                    ) : (
                                        <Button
                                            text={translate('workspace.people.removeWorkspaceMemberButtonTitle')}
                                            onPress={askForConfirmationToRemove}
                                            isDisabled={isSelectedMemberOwner || isSelectedMemberCurrentUser}
                                            icon={Expensicons.RemoveMembers}
                                            iconStyles={StyleUtils.getTransformScaleStyle(0.8)}
                                            style={styles.mv5}
                                        />
                                    )}
                                    <ConfirmModal
                                        danger
                                        title={translate('workspace.people.removeMemberTitle')}
                                        isVisible={isRemoveMemberConfirmModalVisible}
                                        onConfirm={removeUser}
                                        onCancel={() => setIsRemoveMemberConfirmModalVisible(false)}
                                        prompt={confirmModalPrompt}
                                        confirmText={translate('common.remove')}
                                        cancelText={translate('common.cancel')}
                                    />
                                </View>
                                <View style={styles.w100}>
                                    <MenuItemWithTopDescription
                                        disabled={isSelectedMemberOwner || isSelectedMemberCurrentUser}
                                        title={translate(`workspace.common.roleName`, {role: member?.role})}
                                        description={translate('common.role')}
                                        shouldShowRightIcon
                                        onPress={openRoleSelectionModal}
                                    />
                                    <MenuItem
                                        style={styles.mb5}
                                        title={translate('common.profile')}
                                        icon={Expensicons.Info}
                                        onPress={navigateToProfile}
                                        shouldShowRightIcon
                                    />
                                    <WorkspaceMemberDetailsRoleSelectionModal
                                        isVisible={isRoleSelectionModalVisible}
                                        items={roleItems}
                                        onRoleChange={changeRole}
                                        onClose={() => setIsRoleSelectionModalVisible(false)}
                                    />
                                    {shouldShowCardsSection && (
                                        <>
                                            <View style={[styles.ph5, styles.pv3]}>
                                                <Text style={StyleUtils.combineStyles([styles.sidebarLinkText, styles.optionAlternateText, styles.textLabelSupporting])}>
                                                    {translate('walletPage.assignedCards')}
                                                </Text>
                                            </View>
                                            {memberCards.map((memberCard) => {
                                                const isCardDeleted = memberCard.pendingAction === CONST.RED_BRICK_ROAD_PENDING_ACTION.DELETE;
                                                return (
                                                    <OfflineWithFeedback
                                                        key={`${memberCard.nameValuePairs?.cardTitle}_${memberCard.cardID}`}
                                                        errorRowStyles={styles.ph5}
                                                        errors={memberCard.errors}
                                                        pendingAction={memberCard.pendingAction}
                                                    >
                                                        <MenuItem
                                                            key={memberCard.cardID}
                                                            title={memberCard.nameValuePairs?.cardTitle ?? CardUtils.maskCardNumber(memberCard?.cardName ?? '', memberCard.bank)}
                                                            badgeText={
                                                                memberCard.bank === CONST.EXPENSIFY_CARD.BANK
                                                                    ? CurrencyUtils.convertToDisplayString(memberCard.nameValuePairs?.unapprovedExpenseLimit)
                                                                    : ''
                                                            }
                                                            icon={CardUtils.getCardFeedIcon(memberCard.bank as CompanyCardFeed)}
                                                            displayInDefaultIconColor
                                                            iconStyles={styles.cardIcon}
                                                            iconWidth={variables.cardIconWidth}
                                                            iconHeight={variables.cardIconHeight}
                                                            onPress={() => navigateToDetails(memberCard)}
                                                            shouldRemoveHoverBackground={isCardDeleted}
                                                            disabled={isCardDeleted}
                                                            shouldShowRightIcon={!isCardDeleted}
                                                            style={[isCardDeleted ? styles.offlineFeedback.deleted : {}]}
                                                        />
                                                    </OfflineWithFeedback>
                                                );
                                            })}
                                            <MenuItem
                                                title={translate('workspace.expensifyCard.newCard')}
                                                icon={Expensicons.Plus}
                                                onPress={handleIssueNewCard}
                                            />
                                        </>
                                    )}
                                </View>
                            </View>
                        </ScrollView>
                    </>
                )}
            </ScreenWrapper>
        </AccessOrNotFoundWrapper>
    );
}

WorkspaceMemberDetailsPage.displayName = 'WorkspaceMemberDetailsPage';

export default withPolicyAndFullscreenLoading(WorkspaceMemberDetailsPage);
