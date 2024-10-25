import type {StackScreenProps} from '@react-navigation/stack';
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {useCollection, useCollectionOnce} from 'react-firebase-hooks/firestore';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import {emptyEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import {getUserIdsInPeopleInEvents} from '@libs/ieatta/peopleInEventUtils';
import {toUserDict} from '@libs/ieatta/userUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import type SCREENS from '@src/SCREENS';
import type {IFBPeopleInEvent, IFBUser} from '@src/types/firebase';
import BaseAddUsersPage from './BaseAddUsersPage';

type AddUsersInEventNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.ADD_USERS_IN_EVENT>;

type AddUsersInEventPageProps = AddUsersInEventNavigationProps & {};

function AddUsersInEventPage({route}: AddUsersInEventPageProps) {
    const restaurantId = lodashGet(route, 'params.restaurantId', emptyRestaurantTag);
    const eventId = lodashGet(route, 'params.eventId', emptyEventTag);

    /**
     |--------------------------------------------------
     | List(PeopleInEvents)
     |--------------------------------------------------
     */
    const [peopleInEventsSnapshot] = useCollection<IFBPeopleInEvent>(
        FirebaseQuery.queryForPeopleInEvents({
            restaurantId,
            eventId,
        }),
    );

    const peopleInEvents = peopleInEventsSnapshot === undefined ? [] : _.map(peopleInEventsSnapshot.docs, (item) => item.data() as unknown as IFBPeopleInEvent);
    const userIdsInPeopleInEvents = getUserIdsInPeopleInEvents(peopleInEvents);

    /**
     |--------------------------------------------------
     | List(users)
     |--------------------------------------------------
     */
    const [usersSnapshot, loader] = useCollectionOnce<IFBUser[]>(FirebaseQuery.queryAllUsers());

    const users = usersSnapshot === undefined ? [] : _.map(usersSnapshot.docs, (item) => item.data() as unknown as IFBUser);
    const userDict = toUserDict(users);

    return (
        <BaseAddUsersPage
            restaurantId={restaurantId}
            eventId={eventId}
            userIdsInPeopleInEvents={userIdsInPeopleInEvents}
            userDict={userDict}
        />
    );
}

AddUsersInEventPage.displayName = 'AddUsersInEventPage';

export default AddUsersInEventPage;
