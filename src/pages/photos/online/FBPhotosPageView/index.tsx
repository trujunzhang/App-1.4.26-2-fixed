/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {StackScreenProps} from '@react-navigation/stack';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useMemo} from 'react';
import {useCollection, useDocumentData} from 'react-firebase-hooks/firestore';
import {PhotosPageSkeletonView} from '@components/Ieatta/components/SkeletonViews';
import PhotosPageLayout from '@components/Ieatta/photos/PhotosPageLayout';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import {FBCollections, PhotoType} from '@libs/FirebaseIeatta/constant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {getPhotoIndexWithId, getPhotosForPage} from '@libs/ieatta/photoUtils';
import type {AuthScreensParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBEvent, IFBPhoto} from '@src/types/firebase';
import PhotosPageSmallPage from './PhotosPageSmallPage';
import PhotosPageWebPage from './PhotosPageWebPage';

type FBPhotosPageViewProps = StackScreenProps<AuthScreensParamList, typeof SCREENS.CENTER_IEATTA.PHOTO_PAGE_VIEW>;

function FBPhotosPageView({route, navigation}: FBPhotosPageViewProps) {
    const relatedId = lodashGet(route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const photoType: string = lodashGet(route, 'params.photoType', PhotoType.Unknown);
    const initialPhotoId = lodashGet(route, 'params.selected', '');

    const {isSmallScreenWidth} = useResponsiveLayout();

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
    const fixedRelatedId = useMemo(() => {
        return photoType === PhotoType.Waiter ? lodashGet(event, 'restaurantId', CONST.IEATTA_MODEL_ID_EMPTY) : relatedId;
    }, [photoType, event, relatedId]);

    const [photosSnapshot, loadingPhotos, errorInPhotos] = useCollection(
        FirebaseQuery.queryForPhotos({
            relatedId: fixedRelatedId,
            photoType,
        }),
    );

    const photosInPage = photosSnapshot === undefined ? [] : _.map(photosSnapshot.docs, (item) => item.data() as IFBPhoto);

    const shouldShowLoading = loadingPhotos;

    const fixedPhotos = getPhotosForPage(photosInPage, photoType, event);
    const pageIndex = getPhotoIndexWithId(fixedPhotos, initialPhotoId);

    return (
        <PhotosPageLayout
            containerStyle={[]}
            showFullscreen={isSmallScreenWidth}
            shouldShowHeader={!isSmallScreenWidth}
            shouldShowNotFoundPage={false}
            shouldShowLoading={shouldShowLoading}
            loadingContent={<PhotosPageSkeletonView />}
        >
            {isSmallScreenWidth ? (
                <PhotosPageSmallPage
                    key={fixedRelatedId}
                    route={route}
                    navigation={navigation}
                    pageIndex={pageIndex}
                    relatedId={relatedId}
                    photoType={photoType}
                    photosInPage={fixedPhotos}
                />
            ) : (
                <PhotosPageWebPage
                    key={fixedRelatedId}
                    route={route}
                    navigation={navigation}
                    pageIndex={pageIndex}
                    relatedId={relatedId}
                    photoType={photoType}
                    photosInPage={fixedPhotos}
                />
            )}
        </PhotosPageLayout>
    );
}

export default FBPhotosPageView;
