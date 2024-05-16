import {useQuery} from '@realm/react';
import React from 'react';
import DetailedPhotosList from '@components/Ieatta/detailedPage/common/photoAndWaiter/DetailedPhotosList';
import {PhotoType} from '@libs/Firebase/constant';
import {filterWaiters} from '@libs/ieatta/eventUtils';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toPhotosList} from '@libs/Realm/helpers/realmTypeHelper/index.native';
import type {WaitersRowInEventProps} from './types';

function WaitersRowInEvent({waiterRow}: WaitersRowInEventProps) {
    const {event, eventId, restaurantId} = waiterRow;

    const photos = useQuery(RealmCollections.Photos, (array) => {
        return array.filtered('restaurantId == $0', restaurantId);
    });
    const waitersInRestaurant = toPhotosList(photos);

    const waitersInEvent = filterWaiters(event, waitersInRestaurant);

    // Log.info("")
    // Log.info("================================")
    // Log.info(`native's eventId: ${eventId}`)
    // Log.info(`native's waitersInEvent: ${waitersInEvent.length}`)
    // Log.info("================================")
    // Log.info("")

    return (
        <DetailedPhotosList
            isSmallScreenWidth
            photos={waitersInEvent}
        />
    );
}

export default WaitersRowInEvent;
