import type {StackScreenProps} from '@react-navigation/stack';
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useMemo} from 'react';
import {useCollection, useDocumentData} from 'react-firebase-hooks/firestore';
import {PhotosPageSkeletonView} from '@components/Ieatta/components/SkeletonViews';
import PhotosPageLayout from '@components/Ieatta/photos/PhotosPageLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {FBCollections, PhotoType} from '@libs/Firebase/constant';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import {getPhotoIndexWithId, getPhotosForPage} from '@libs/ieatta/photoUtils';
import type {AuthScreensParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBEvent, IFBPhoto} from '@src/types/firebase';
import PhotosPageSmallPage from './PhotosPageSmallPage';
import PhotosPageWebPage from './PhotosPageWebPage';

type FBPhotosPageViewProps = StackScreenProps<AuthScreensParamList, typeof SCREENS.CENTER_IEATTA.PHOTO_PAGE_VIEW>;

function FBPhotosPageView({route}: FBPhotosPageViewProps) {
    const relatedId = lodashGet(route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const photoType = lodashGet(route, 'params.photoType', PhotoType.Unknown);
    const initialPhotoId = lodashGet(route, 'params.selected', '');

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
            shouldShowHeader={isSmallScreenWidth === false}
            shouldShowNotFoundPage={false}
            shouldShowLoading={shouldShowLoading}
            loadingContent={<PhotosPageSkeletonView />}
        >
            {isSmallScreenWidth ? (
                <PhotosPageSmallPage
                    key={fixedRelatedId}
                    pageIndex={pageIndex}
                    relatedId={relatedId}
                    photoType={photoType}
                    photosInPage={fixedPhotos}
                />
            ) : (
                <PhotosPageWebPage
                    key={fixedRelatedId}
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
