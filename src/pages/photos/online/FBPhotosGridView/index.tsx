/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import type {StackScreenProps} from '@react-navigation/stack';
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {useCollection, useDocumentData} from 'react-firebase-hooks/firestore';
import {PhotosPageSkeletonView} from '@components/Ieatta/components/SkeletonViews';
import PhotosPageLayout from '@components/Ieatta/photos/PhotosPageLayout';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {FBCollections, PhotoType} from '@libs/Firebase/constant';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import {getPhotosForPage} from '@libs/ieatta/photoUtils';
import type {AuthScreensParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBEvent, IFBPhoto} from '@src/types/firebase';
import PhotosGridSmallPage from './PhotosGridSmallPage';
import PhotosGridWebPage from './PhotosGridWebPage';

type FBPhotosGridViewProps = StackScreenProps<AuthScreensParamList, typeof SCREENS.CENTER_IEATTA.PHOTO_GRID_VIEW>;

function FBPhotosGridView({route}: FBPhotosGridViewProps) {
    const relatedId = lodashGet(route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const photoType = lodashGet(route, 'params.photoType', PhotoType.Unknown);

    const {isSmallScreenWidth} = useWindowDimensions();

    /**
     |--------------------------------------------------
     | Single(Event)
     |--------------------------------------------------
     */
    const eventId = photoType === PhotoType.Waiter ? relatedId : CONST.IEATTA_MODEL_ID_EMPTY;
    const [event, loadingForEvent, errorForEvent] = useDocumentData<IFBEvent>(
        FirebaseQuery.querySingle({
            path: FBCollections.Events,
            id: eventId,
        }),
    );

    /**
     |--------------------------------------------------
     | List(photos)
     |--------------------------------------------------
     */
    const fixedRelatedId = photoType === PhotoType.Waiter ? lodashGet(event, 'restaurantId', CONST.IEATTA_MODEL_ID_EMPTY) : relatedId;
    const [photosSnapshot, loadingPhotos] = useCollection(
        FirebaseQuery.queryForPhotos({
            relatedId: fixedRelatedId,
            photoType,
        }),
    );

    const photosInPage = photosSnapshot === undefined ? [] : _.map(photosSnapshot.docs, (item) => item.data() as IFBPhoto);
    const fixedPhotos = getPhotosForPage(photosInPage, photoType, event);

    const shouldShowLoading = loadingPhotos;

    return (
        <PhotosPageLayout
            containerStyle={[]}
            shouldShowNotFoundPage={false}
            shouldShowLoading={shouldShowLoading}
            loadingContent={<PhotosPageSkeletonView />}
        >
            {isSmallScreenWidth ? (
                <PhotosGridSmallPage
                    relatedId={relatedId}
                    photoType={photoType}
                    photosInPage={fixedPhotos}
                />
            ) : (
                <PhotosGridWebPage
                    relatedId={relatedId}
                    photoType={photoType}
                    photosInPage={fixedPhotos}
                />
            )}
        </PhotosPageLayout>
    );
}

export default FBPhotosGridView;
