/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {useQuery} from '@realm/react';
import React from 'react';
import {View} from 'react-native';
import Button from '@components/Button';
import DetailedPhotosList from '@components/Ieatta/detailedPage/common/photoAndWaiter/DetailedPhotosList';
import useThemeStyles from '@hooks/useThemeStyles';
import Navigation from '@libs/Navigation/Navigation';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import ROUTES from '@src/ROUTES';
import type {IFBPhoto} from '@src/types/firebase';
import type {DetailedPhotoProps} from './types';

function DetailedPhotosRow({photoRow}: DetailedPhotoProps) {
    const {relatedId, photoType} = photoRow;
    const styles = useThemeStyles();

    const photos = useQuery<IFBPhoto>(RealmCollections.Photos, RealmQuery.queryForRealmPhotos({relatedId, photoType}), [relatedId, photoType]);
    const photosInPage: IFBPhoto[] = toRealmModelList<IFBPhoto>(photos);

    // Log.info("")
    // Log.info("================================")
    // Log.info(`native's relatedId: ${relatedId}`)
    // Log.info(`native's photos: ${photos.length}`)
    // Log.info("================================")
    // Log.info("")

    return (
        <View style={[styles.flexColumn, styles.gap3]}>
            <DetailedPhotosList
                relatedId={relatedId}
                photoType={photoType}
                isSmallScreen
                photos={photosInPage}
            />
            <View style={[styles.mh4]}>
                <Button
                    onPress={() => {
                        Navigation.navigate(ROUTES.PHOTOS_GRID_VIEW.getRoute({relatedId, photoType}));
                    }}
                    text={`Seel All ${photosInPage.length}`}
                    shouldShowRightIcon
                    innerStyles={[styles.ph4]}
                />
            </View>
        </View>
    );
}

export default DetailedPhotosRow;
