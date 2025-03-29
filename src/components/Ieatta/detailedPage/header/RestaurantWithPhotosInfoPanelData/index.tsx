/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import RestaurantWithPhotosInfoPanel from '@components/Ieatta/detailedPage/header/RestaurantWithPhotosInfoPanel';
import {FBCollections, PhotoType} from '@libs/FirebaseIeatta/constant';
import {printFirebaseError} from '@libs/FirebaseIeatta/services/firebase-error-helper';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import type {IFBPhoto} from '@src/types/firebase';
import type {RestaurantWithPhotosInfoPanelDataProps} from './types';

function RestaurantWithPhotosInfoPanelData({restaurant}: RestaurantWithPhotosInfoPanelDataProps) {
    const {uniqueId: restaurntUniqueId} = restaurant;
    /**
     |--------------------------------------------------
     | List(photos)
     |--------------------------------------------------
     */
    const [photoSnapshot, loading, error] = useCollection<IFBPhoto>(
        FirebaseQuery.queryForPhotos({
            relatedId: restaurntUniqueId,
            photoType: PhotoType.Restaurant,
        }),
    );

    // issue:
    //     FirebaseError: The query requires an index. You can create it here
    printFirebaseError(FBCollections.Restaurants, error);

    const photos: IFBPhoto[] = photoSnapshot !== undefined ? _.map(photoSnapshot.docs, (item) => item.data()) : [];

    return (
        <RestaurantWithPhotosInfoPanel
            restaurant={restaurant}
            photos={photos}
        />
    );
}

RestaurantWithPhotosInfoPanelData.displayName = 'RestaurantWithPhotosInfoPanelData';

export default React.memo(RestaurantWithPhotosInfoPanelData);
