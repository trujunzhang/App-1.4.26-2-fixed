import {useObject, useQuery} from '@realm/react';
import lodashGet from 'lodash/get';
import React, {useCallback} from 'react';
import _ from 'underscore';
import {emptyEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import {toRecipeDictInRestaurant} from '@libs/ieatta/eventUtils';
import {getUserIdsInPeopleInEvents} from '@libs/ieatta/peopleInEventUtils';
import {toUserDict} from '@libs/ieatta/userUtils';
import {RealmCollections} from '@libs/Realm/constant';
import {toPeopleInEventsList} from '@libs/Realm/helpers/realmTypeHelper';
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
    const peopleInEventsInRealm = useQuery(RealmCollections.PeopleInEvent, (array) => {
        return array.filtered('restaurantId == $0 && eventId == $1', restaurantId, eventId);
    });
    const peopleInEvents = toPeopleInEventsList(peopleInEventsInRealm);
    const userIdsInPeopleInEvents = getUserIdsInPeopleInEvents(peopleInEvents);

    /**
   |--------------------------------------------------
   | List(users)
   |--------------------------------------------------
   */
    const usersInRealm = useQuery(RealmCollections.Profiles);

    const userDict = toUserDict(usersInRealm);

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
