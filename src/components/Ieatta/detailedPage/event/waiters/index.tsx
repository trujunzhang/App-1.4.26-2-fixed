// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import React from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import DetailedPhotosList from '@components/Ieatta/detailedPage/common/photoAndWaiter/DetailedPhotosList';
import {PhotoType} from '@libs/Firebase/constant';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
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
    const [photoSnapshot, loader] = useCollection(
        FirebaseQuery.queryForPhotos({
            relatedId: restaurantId,
            photoType: PhotoType.Waiter,
        }),
    );

    const waitersInRestaurant = photoSnapshot === undefined ? [] : _.map(photoSnapshot.docs, (item) => item.data() as IFBPhoto);
    const waitersInEvent = filterWaiters(event, waitersInRestaurant);

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
