/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import type {StackScreenProps} from '@react-navigation/stack';
import {useObject, useQuery} from '@realm/react';
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import PhotosPageLayout from '@components/Ieatta/photos/PhotosPageLayout';
import {PhotoType} from '@libs/Firebase/constant';
import {getPhotoIndexWithId, getPhotosForPage} from '@libs/ieatta/photoUtils';
import Log from '@libs/Log';
import type {AuthScreensParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBEvent, IFBPhoto} from '@src/types/firebase';
import PhotosPageSmallPage from './PhotosPageSmallPage';

type FBPhotosPageViewProps = StackScreenProps<AuthScreensParamList, typeof SCREENS.CENTER_IEATTA.PHOTO_PAGE_VIEW>;

function FBPhotosPageView({route}: FBPhotosPageViewProps) {
    const relatedId = lodashGet(route, 'params.relatedId', CONST.IEATTA_MODEL_ID_EMPTY);
    const photoType = lodashGet(route, 'params.photoType', PhotoType.Unknown);
    const initialPhotoId = lodashGet(route, 'params.selected', '');

    /**
   |--------------------------------------------------
   | Single(Event)
   |--------------------------------------------------
   */
    const eventId = photoType === PhotoType.Waiter ? relatedId : CONST.IEATTA_MODEL_ID_EMPTY;
    const eventInRealm = useObject<IFBEvent>(RealmCollections.Events, eventId);
    const event: IFBEvent | undefined = _.isNull(eventInRealm) === false ? (eventInRealm as IFBEvent) : undefined;

    const fixedRelatedId = photoType === PhotoType.Waiter ? lodashGet(event, 'restaurantId', CONST.IEATTA_MODEL_ID_EMPTY) : relatedId;
    const photos = useQuery(RealmCollections.Photos, RealmQuery.queryForRealmPhotos({relatedId: fixedRelatedId, photoType}));

    Log.info('');
    Log.info('================================');
    Log.info(`relatedId: ${relatedId}, photoType: ${photoType}, initialPhotoId: ${initialPhotoId}`);
    Log.info('================================');
    Log.info('');

    const photosInPage: IFBPhoto[] = toRealmModelList<IFBPhoto>(photos);
    const fixedPhotos = getPhotosForPage(photosInPage, photoType, event);
    const pageIndex = getPhotoIndexWithId(fixedPhotos, initialPhotoId);

    return (
        <PhotosPageLayout
            showFullscreen
            shouldShowHeader={false}
            shouldShowNotFoundPage={false}
        >
            <PhotosPageSmallPage
                key={fixedRelatedId}
                pageIndex={pageIndex}
                relatedId={relatedId}
                photoType={photoType}
                photosInPage={fixedPhotos}
            />
        </PhotosPageLayout>
    );
}

export default FBPhotosPageView;
