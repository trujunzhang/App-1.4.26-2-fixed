import React, {useMemo, useState} from 'react';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import AddUserListItem from '@components/Ieatta/components/Selections/AddUserListItem';
import type {ChoiceOrderedUserItem} from '@components/Ieatta/components/Selections/types';
import ScreenWrapper from '@components/ScreenWrapper';
import SelectionList from '@components/SelectionList';
import type {WithCurrentUserPersonalDetailsProps} from '@components/withCurrentUserPersonalDetails';
import withCurrentUserPersonalDetails from '@components/withCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {ParseModelPeopleInEvent} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {getAuthUserFromPersonalDetails} from '@libs/Firebase/models/auth_user_model';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import {convertToRadioItemForUsers} from '@libs/ieatta/userUtils';
import Navigation from '@libs/Navigation/Navigation';
import * as OptionsListUtils from '@libs/OptionsListUtils';
import type {IFBUser} from '@src/types/firebase';

type BaseAddUsersPageProps = WithCurrentUserPersonalDetailsProps & {
    restaurantId: string;
    eventId: string;
    userIdsInPeopleInEvents: string[];
    userDict: Record<string, IFBUser>;
};

function BaseAddUsersPage({restaurantId, eventId, userIdsInPeopleInEvents, userDict, currentUserPersonalDetails}: BaseAddUsersPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const [searchValue, setSearchValue] = useState('');

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundView = false;
    const shouldShowLoading = false;
    const selectUser = (item: ChoiceOrderedUserItem) => {
        const {userId} = item;
        const authUserModel = getAuthUserFromPersonalDetails(currentUserPersonalDetails);

        const newPeopleInEvent = ParseModelPeopleInEvent.emptyPeopleInEvent({authUserModel});
        const nextModel = ParseModelPeopleInEvent.updatePeopleInEvent({
            model: {...newPeopleInEvent},
            restaurantId,
            eventId,
            userId,
        });
        new FirebaseHelper()
            .setData({
                path: FBCollections.PeopleInEvent,
                model: nextModel,
            })
            .then(() => {})
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const sections = useMemo(() => {
        return convertToRadioItemForUsers({
            orderedUsersTitle: translate('add.orderedUser.section.orderedUsersTitle'),
            title: translate('add.orderedUser.section.title'),
            searchValue,
            userIdsInPeopleInEvents,
            userDict,
        });
    }, [searchValue, translate, userIdsInPeopleInEvents, userDict]);

    const headerMessage = OptionsListUtils.getHeaderMessageForNonUserList(false, searchValue);

    const selectedOptionKey = null;

    return (
        <ScreenWrapper
            includeSafeAreaPaddingBottom={false}
            shouldEnablePickerAvoiding={false}
            shouldEnableMaxHeight
            testID={BaseAddUsersPage.displayName}
        >
            <FullPageNotFoundView
                onBackButtonPress={() => Navigation.goBack()}
                shouldShow={shouldShowNotFoundView}
                subtitleKey="workspace.common.notAuthorized"
            >
                <HeaderWithBackButton title={translate('add.orderedUser.title')} />
                {shouldShowLoading ? (
                    <FullScreenLoadingIndicator style={[styles.flex1, styles.pRelative]} />
                ) : (
                    <SelectionList
                        ListItem={AddUserListItem}
                        sectionTitleStyles={styles.mt5}
                        sections={sections}
                        textInputValue={searchValue}
                        headerMessage={headerMessage}
                        textInputLabel={translate('add.orderedUser.search')}
                        initiallyFocusedOptionKey={selectedOptionKey}
                        onChangeText={setSearchValue}
                        onSelectRow={selectUser}
                        canSelectMultiple
                    />
                )}
            </FullPageNotFoundView>
        </ScreenWrapper>
    );
}

BaseAddUsersPage.displayName = 'BaseAddUsersPage';

// export default BaseAddUsersPage;

export default withCurrentUserPersonalDetails(BaseAddUsersPage);
