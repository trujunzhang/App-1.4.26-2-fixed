/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {StackScreenProps} from '@react-navigation/stack';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {useCollection, useDocumentData} from 'react-firebase-hooks/firestore';
import {FBCollections, PhotoType, ReviewType} from '@libs/FirebaseIeatta/constant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {emptyEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import type SCREENS from '@src/SCREENS';
import type {IFBEvent, IFBPeopleInEvent, IFBPhoto} from '@src/types/firebase';
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
    const [event, loadingForEvent, errorForEvent] = useDocumentData<IFBEvent>(
        FirebaseQuery.querySingle({
            path: FBCollections.Events,
            id: eventId,
        }),
    );

    /**
     |--------------------------------------------------
     | Waiters in the restaurant
     |--------------------------------------------------
     */
    const [photoSnapshot, loading, error] = useCollection<IFBPhoto>(
        FirebaseQuery.queryForPhotos({
            relatedId: restaurantId,
            photoType: PhotoType.Waiter,
        }),
    );
    const waitersInRestaurant: IFBPhoto[] = photoSnapshot === undefined ? [] : _.map(photoSnapshot.docs, (item) => item.data());

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
