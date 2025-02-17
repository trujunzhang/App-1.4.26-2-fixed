/* eslint-disable no-restricted-imports */
// eslint-disable-next-line no-restricted-imports,lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import type {ChoiceOrderedUserItem} from '@components/Ieatta/components/Selections/types';
import type {SectionListDataType} from '@components/SelectionList/types';
// import type {ChoiceOrderedUserItem} from '@components/Ieatta/components/Selections/types';
// import type {SectionListDataType} from '@components/SelectionList/types';
import type {IFBPhoto, IFBReview, IFBUser} from '@src/types/firebase';
import type {PersonalDetailsList} from '@src/types/onyx';
import {isEmptyObject} from '@src/types/utils/EmptyObject';

type ConvertToRadioItemParamsForUsers = {
    orderedUsersTitle: string;
    title: string;
    searchValue: string;
    userIdsInPeopleInEvents: string[];
    userDict: Record<string, IFBUser>;
};

function getPersonDetailFromCreatorId(personalDetails: PersonalDetailsList, modal: IFBPhoto | IFBReview | undefined) {
    const creatorId = lodashGet(modal, 'creatorId', '');
    return personalDetails[creatorId];
}

function convertToRadioItemForUsers({
    orderedUsersTitle,
    title,
    searchValue,
    userIdsInPeopleInEvents,
    userDict,
}: ConvertToRadioItemParamsForUsers): Array<SectionListDataType<ChoiceOrderedUserItem>> {
    let filteredUsers = Object.values(userDict);

    if (searchValue !== '') {
        filteredUsers = _.filter(Object.values(userDict), (user) => {
            return user.username.toLowerCase().includes(searchValue.toLowerCase());
        });
    }
    const orderedUsers = _.filter(filteredUsers, (user) => userIdsInPeopleInEvents.includes(user.id));
    const unOrderedUsers = _.filter(filteredUsers, (user) => !userIdsInPeopleInEvents.includes(user.id));

    return [
        {
            title: orderedUsersTitle,
            shouldShow: !isEmptyObject(orderedUsers),
            data: _.map(orderedUsers, (user: IFBUser) => {
                return {
                    userId: user.id,
                    userUrl: user.originalUrl,
                    text: user.username,
                    alternateText: user.email,
                    isDisabled: true,
                    isSelected: true,
                };
            }),
        },
        {
            title,
            shouldShow: !isEmptyObject(unOrderedUsers),
            data: _.map(unOrderedUsers, (user) => {
                return {
                    userId: user.id,
                    userUrl: user.originalUrl,
                    text: user.username,
                    alternateText: user.email,
                    isDisabled: false,
                    isSelected: false,
                };
            }),
        },
    ];
}

function toUserDict(users: IFBUser[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userDict: Record<string, IFBUser> = Object.assign({}, ..._.map(users, (user) => ({[user.id]: user})));

    return userDict;
}

export {convertToRadioItemForUsers, toUserDict, getPersonDetailFromCreatorId};
