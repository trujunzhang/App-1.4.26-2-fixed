import React from 'react';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import DetailedPhotosList from '@components/Ieatta/detailedPage/common/photoAndWaiter/DetailedPhotosList';
import {PhotoType} from '@libs/Firebase/constant';
import {queryForPhotos} from '@libs/Firebase/services/firebase-query';
import {filterWaiters} from '@libs/ieatta/eventUtils';
import type {IFBPhoto} from '@src/types/firebase';
import type {WaitersRowInEventProps} from './types';

function WaitersRowInEvent({waiterRow}: WaitersRowInEventProps) {
    const {event, eventId, restaurantId} = waiterRow;

    /**
     |--------------------------------------------------
     | List(waiters)
     |--------------------------------------------------
     */
    const [photoSnapshot, loader] = useCollectionOnce(
        queryForPhotos({
            relatedId: eventId,
            photoType: PhotoType.Waiter,
        }),
    );

    const waitersInRestaurant = photoSnapshot === undefined ? [] : _.map(photoSnapshot.docs, (item) => item.data() as IFBPhoto);
    const waitersInEvent = filterWaiters(event, waitersInRestaurant);

    return (
        <DetailedPhotosList
            isSmallScreenWidth
            photos={waitersInEvent}
        />
    );
}

export default WaitersRowInEvent;
