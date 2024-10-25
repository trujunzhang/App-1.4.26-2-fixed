// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import React from 'react';
import {useCollectionOnce} from 'react-firebase-hooks/firestore';
import RestaurantWithPhotosInfoPanel from '@components/Ieatta/detailedPage/header/RestaurantWithPhotosInfoPanel';
import {PhotoType} from '@libs/Firebase/constant';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import type {IFBPhoto} from '@src/types/firebase';
import type {RestaurantWithPhotosInfoPanelDataProps} from './types';

function RestaurantWithPhotosInfoPanelData({restaurant}: RestaurantWithPhotosInfoPanelDataProps) {
    /**
     |--------------------------------------------------
     | List(photos)
     |--------------------------------------------------
     */
    const [photoSnapshot, loader] = useCollectionOnce(
        FirebaseQuery.queryForPhotos({
            relatedId: restaurant.uniqueId,
            photoType: PhotoType.Restaurant,
        }),
    );

    const photos = photoSnapshot !== undefined ? _.map(photoSnapshot.docs, (item) => item.data()) : [];

    return (
        <RestaurantWithPhotosInfoPanel
            restaurant={restaurant}
            photos={photos as IFBPhoto[]}
        />
    );
}

RestaurantWithPhotosInfoPanelData.displayName = 'RestaurantWithPhotosInfoPanelData';

export default React.memo(RestaurantWithPhotosInfoPanelData);
