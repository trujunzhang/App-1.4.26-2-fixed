/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {StackScreenProps} from '@react-navigation/stack';
import {useQuery} from '@realm/react';
// eslint-disable-next-line lodash/import-scope
import lodashGet from 'lodash/get';
import React from 'react';
import {emptyEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import {getUserIdsInPeopleInEvents} from '@libs/ieatta/peopleInEventUtils';
import {toUserDict} from '@libs/ieatta/userUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import type SCREENS from '@src/SCREENS';
import type {IFBPeopleInEvent, IFBUser} from '@src/types/firebase';
import BaseAddUsersPage from './BaseAddUsersPage';

type AddUsersInEventNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.ADD_USERS_IN_EVENT>;

// eslint-disable-next-line @typescript-eslint/ban-types
type AddUsersInEventPageProps = AddUsersInEventNavigationProps & {};

function AddUsersInEventPage({route}: AddUsersInEventPageProps) {
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
    const peopleInEvents: IFBPeopleInEvent[] = toRealmModelList<IFBPeopleInEvent>(peopleInEventsInRealm);
    const userIdsInPeopleInEvents = getUserIdsInPeopleInEvents(peopleInEvents);

    /**
   |--------------------------------------------------
   | List(users)
   |--------------------------------------------------
   */
    const usersInRealm = useQuery(RealmCollections.Profiles);
    const users: IFBUser[] = toRealmModelList<IFBUser>(usersInRealm);

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
