/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {StackScreenProps} from '@react-navigation/stack';
import {useObject, useQuery} from '@realm/react';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
// eslint-disable-next-line lodash/import-scope
import lodashGet from 'lodash/get';
import React from 'react';
import {PhotoType} from '@libs/FirebaseIeatta/constant';
import {emptyEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import type SCREENS from '@src/SCREENS';
import type {IFBEvent, IFBPhoto} from '@src/types/firebase';
import BaseAddWaitersPage from './BaseAddWaitersPage';

type AddWaitersInEventNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.ADD_WAITERS_IN_EVENT>;

// eslint-disable-next-line @typescript-eslint/ban-types
type AddWaitersInEventPageProps = AddWaitersInEventNavigationProps & {};

function AddWaitersInEventPage({route}: AddWaitersInEventPageProps) {
    const restaurantId = lodashGet(route, 'params.restaurantId', emptyRestaurantTag);
    const eventId = lodashGet(route, 'params.eventId', emptyEventTag);

    /**
     |--------------------------------------------------
     | Single(Event)
     |--------------------------------------------------
     */
    const eventInRealm = useObject<IFBEvent>(RealmCollections.Events, eventId);
    const event: IFBEvent | undefined = _.isNull(eventInRealm) === false ? (eventInRealm as IFBEvent) : undefined;

    /**
     |--------------------------------------------------
     | Waiters in the restaurant
     |--------------------------------------------------
     */
    const photos = useQuery(RealmCollections.Photos, RealmQuery.queryForRealmPhotos({relatedId: restaurantId, photoType: PhotoType.Waiter}));
    const waitersInRestaurant: IFBPhoto[] = toRealmModelList<IFBPhoto>(photos);

    return (
        <BaseAddWaitersPage
            restaurantId={restaurantId}
            eventId={eventId}
            event={event}
            waitersInRestaurant={waitersInRestaurant}
        />
    );
}

AddWaitersInEventPage.displayName = 'AddWaitersInEventPage';

export default AddWaitersInEventPage;
