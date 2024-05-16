/* eslint-disable no-restricted-imports */
// eslint-disable-next-line no-restricted-imports
import lodashGet from 'lodash/get';
import _ from 'underscore';
import type {ChoiceOrderedUserItem, SectionListDataType} from '@components/Ieatta/components/Selections/SelectionList/types';
import CONST from '@src/CONST';
import type {IFBUser} from '@src/types/firebase';
import {isEmptyObject} from '@src/types/utils/EmptyObject';

type ConvertToRadioItemParamsForUsers = {
    orderedUsersTitle: string;
    title: string;
    searchValue: string;
    userIdsInPeopleInEvents: string[];
    userDict: Record<string, IFBUser>;
};

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
            data: _.map(orderedUsers, (user) => {
                return {
                    userId: user.id,
                    userUrl: lodashGet(user, 'originalUrl', CONST.IEATTA_URL_EMPTY),
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
                    userUrl: lodashGet(user, 'originalUrl', CONST.IEATTA_URL_EMPTY),
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
    const userDict: Record<string, IFBUser> = Object.assign({}, ..._.map(users, (user) => ({[user.id]: user})));

    return userDict;
}

// eslint-disable-next-line import/prefer-default-export
export {convertToRadioItemForUsers, toUserDict};
