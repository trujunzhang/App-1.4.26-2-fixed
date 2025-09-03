/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import React from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import DetailedPhotosList from '@components/Ieatta/detailedPage/common/photoAndWaiter/DetailedPhotosList';
import {FBModelNames, PhotoType} from '@libs/FirebaseIeatta/constant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {filterWaiters} from '@libs/ieatta/eventUtils';
import type {IFBPhoto} from '@src/types/firebase';
import type {WaitersRowInEventProps} from './types';

function WaitersRowInEvent({waiterRow}: WaitersRowInEventProps) {
    const {event, eventId, restaurantId} = waiterRow;

    /**
     |--------------------------------------------------
     | Waiters in the restaurant
     |--------------------------------------------------
     */
    const [photoSnapshot, loading, error] = useCollection(
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
            modalName={FBModelNames.Waiters}
        />
    );
}

export default WaitersRowInEvent;
