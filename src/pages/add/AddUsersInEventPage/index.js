import lodashGet from 'lodash/get';
import React, {useCallback, useState} from 'react';
import {useCollection, useCollectionOnce, useDocumentData} from 'react-firebase-hooks/firestore';
import {usePagination} from 'react-firebase-pagination-hooks';
import _ from 'underscore';
import {queryAllUsers, queryForPeopleInEvents, querySingle} from '@libs/Firebase/services/firebase-query';
import {FirebaseReviewQuery} from '@libs/Firebase/services/review-query';
import {emptyEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import {getUserIdsInPeopleInEvents} from '@libs/ieatta/peopleInEventUtils';
import {toUserDict} from '@libs/ieatta/userUtils';
import BaseAddUsersPage from './BaseAddUsersPage';
import {defaultProps, propTypes} from './propTypes';

function AddUsersInEventPage({route}) {
    const restaurantId = lodashGet(route, 'params.restaurantId', emptyRestaurantTag);
    const eventId = lodashGet(route, 'params.eventId', emptyEventTag);

    /**
     |--------------------------------------------------
     | List(PeopleInEvents)
     |--------------------------------------------------
     */
    const [peopleInEventsSnapshot] = useCollection(
        queryForPeopleInEvents({
            restaurantId,
            eventId,
        }),
    );

    const peopleInEvents = peopleInEventsSnapshot === undefined ? [] : _.map(peopleInEventsSnapshot.docs, (item) => item.data());
    const userIdsInPeopleInEvents = getUserIdsInPeopleInEvents(peopleInEvents);

    /**
     |--------------------------------------------------
     | List(users)
     |--------------------------------------------------
     */
    const [usersSnapshot, loader] = useCollectionOnce(queryAllUsers());

    const users = usersSnapshot === undefined ? [] : _.map(usersSnapshot.docs, (item) => item.data());
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

AddUsersInEventPage.propTypes = propTypes;
AddUsersInEventPage.defaultProps = defaultProps;
AddUsersInEventPage.displayName = 'AddUsersInEventPage';

export default AddUsersInEventPage;
