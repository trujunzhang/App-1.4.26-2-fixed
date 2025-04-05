// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React, {useMemo, useState} from 'react';
import FullPageNotFoundView from '@components/BlockingViews/FullPageNotFoundView';
import FullScreenLoadingIndicator from '@components/FullscreenLoadingIndicator';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import SelectionList from '@components/Ieatta/components/SelectionList';
import type {SectionListDataType} from '@components/Ieatta/components/SelectionList/types';
import AddUserListItem from '@components/Ieatta/components/Selections/AddUserListItem';
import type {ChoiceOrderedUserItem} from '@components/Ieatta/components/Selections/types';
import ScreenWrapper from '@components/ScreenWrapper';
import useCurrentUserPersonalDetails from '@hooks/useCurrentUserPersonalDetails';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {ParseModelPeopleInEvent} from '@libs/FirebaseIeatta/appModel';
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import type {IAuthUser} from '@libs/FirebaseIeatta/models/auth_user_model';
import {getAuthUserFromPersonalDetails} from '@libs/FirebaseIeatta/models/auth_user_model';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import {convertToRadioItemForUsers} from '@libs/ieatta/userUtils';
import Navigation from '@libs/Navigation/Navigation';
import * as OptionsListUtils from '@libs/OptionsListUtils';
import type {IFBUser} from '@src/types/firebase';

type BaseAddUsersPageProps = {
    restaurantId: string;
    eventId: string;
    userIdsInPeopleInEvents: string[];
    userDict: Record<string, IFBUser>;
};

function BaseAddUsersPage({restaurantId, eventId, userIdsInPeopleInEvents, userDict}: BaseAddUsersPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const personalData = useCurrentUserPersonalDetails();

    const [searchValue, setSearchValue] = useState('');

    // eslint-disable-next-line rulesdir/no-negated-variables
    const shouldShowNotFoundView = false;
    const shouldShowLoading = false;
    const selectUser = (item: ChoiceOrderedUserItem) => {
        const {userId, isSelected} = item;
        if (isSelected) {
            return;
        }
        const authUserModel: IAuthUser | null = getAuthUserFromPersonalDetails(personalData);

        if (_.isUndefined(authUserModel) || _.isNull(authUserModel)) {
            return;
        }

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

    const sections: Array<SectionListDataType<ChoiceOrderedUserItem>> = useMemo(() => {
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
                    <SelectionList<ChoiceOrderedUserItem>
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

export default BaseAddUsersPage;
