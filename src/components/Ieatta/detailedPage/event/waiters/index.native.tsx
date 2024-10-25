import {useQuery} from '@realm/react';
import React from 'react';
import DetailedPhotosList from '@components/Ieatta/detailedPage/common/photoAndWaiter/DetailedPhotosList';
import {PhotoType} from '@libs/Firebase/constant';
import {filterWaiters} from '@libs/ieatta/eventUtils';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import type {IFBPhoto} from '@src/types/firebase';
import type {WaitersRowInEventProps} from './types';

function WaitersRowInEvent({waiterRow}: WaitersRowInEventProps) {
    const {event, eventId, restaurantId} = waiterRow;

    const photos = useQuery(RealmCollections.Photos, RealmQuery.queryForRealmPhotos({relatedId: restaurantId, photoType: PhotoType.Waiter}));
    const waitersInRestaurant: IFBPhoto[] = toRealmModelList<IFBPhoto>(photos);

    const waitersInEvent = filterWaiters(event, waitersInRestaurant);

    // Log.info("")
    // Log.info("================================")
    // Log.info(`native's eventId: ${eventId}`)
    // Log.info(`native's waitersInEvent: ${waitersInEvent.length}`)
    // Log.info("================================")
    // Log.info("")

    return (
        <DetailedPhotosList
            relatedId={eventId}
            photoType={PhotoType.Waiter}
            isSmallScreen
            photos={waitersInEvent}
            modalName="waiter"
        />
    );
}

export default WaitersRowInEvent;
