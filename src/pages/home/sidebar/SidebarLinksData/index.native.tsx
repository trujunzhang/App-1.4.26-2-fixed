/* eslint-disable @dword-design/import-alias/prefer-alias */
import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@realm/react';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {EdgeInsets} from 'react-native-safe-area-context';
import {kmToRadians} from 'realm';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {watchCurrentPosition} from '@libs/getCurrentPosition';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import {RestaurantGeoPoint} from '@libs/Realm/models';
import Variables from '@styles/variables';
import {checkHaveSyncAllCollections, setIsFirstSyncFB} from '@userActions/Firebase/syncFB';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {IFBRestaurant} from '@src/types/firebase';
import SidebarLinks from '../SidebarLinks';

// Realm provides `kmToRadians` and `miToRadians`
// to convert these measurements. Import the relevant
// convenience method for your app's needs.
// const radiusFromKm = kmToRadians(1.4);
// const radiusFromKm = kmToRadians(2.0);
const radiusFromKm = kmToRadians(1000 / 1000);

type SidebarLinksDataProps = {
    insets: EdgeInsets;
};

function SidebarLinksData({insets}: SidebarLinksDataProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const [isFBFirstSync] = useOnyx(ONYXKEYS.IS_FB_FIRST_SYNC, {initialValue: true});
    const [firebaseSyncStatus] = useOnyx(ONYXKEYS.FIREBASE_SYNC_STATUS, {
        initialValue: {
            isUsersSyncCompleted: false,
            isRestaurantsSyncCompleted: false,
            isEventsSyncCompleted: false,
            isRecipesSyncCompleted: false,
            isReviewsSyncCompleted: false,
            isPhotosSyncCompleted: false,
            isPeopleInEventsSyncCompleted: false,
        },
    });

    const [currentIndex, setCurrentIndex] = useState<number>(Variables.paginationLimitInSidebar);
    const [currentPosition, setCurrentPosition] = useState<{longitude: number; latitude: number}>(CONST.DEFAULT_LOCATION);
    const hasAskedForLocationPermission = useRef(false);

    const isLoading = false;

    const shouldShowFBFirstSync = useMemo((): boolean => {
        if (isFBFirstSync === undefined || isFBFirstSync === null) {
            return false;
        }
        const isSyncAllCollections = checkHaveSyncAllCollections(firebaseSyncStatus);
        return isFBFirstSync && !isSyncAllCollections;
    }, [firebaseSyncStatus, isFBFirstSync]);

    useEffect(() => {
        if (isFBFirstSync === undefined || isFBFirstSync === null || !isFBFirstSync) {
            return;
        }
        if (checkHaveSyncAllCollections(firebaseSyncStatus)) {
            setIsFirstSyncFB(false);
        }
    }, [firebaseSyncStatus, isFBFirstSync]);

    useFocusEffect(
        useCallback(() => {
            if (hasAskedForLocationPermission.current) {
                return;
            }

            hasAskedForLocationPermission.current = true;
            watchCurrentPosition(
                (params) => {
                    const currentCoords = {longitude: params.coords.longitude, latitude: params.coords.latitude};
                    setCurrentPosition(currentCoords);
                },
                () => {},
            );
        }, []),
    );

    // Define a GeoCircle
    const smallCircle = {
        center: new RestaurantGeoPoint({
            lat: currentPosition.latitude,
            long: currentPosition.longitude,
        }),
        // The GeoCircle radius is measured in radians.
        // This radian distance corresponds with 0.25 degrees.
        // distance: 0.004363323,
        distance: radiusFromKm,
    };
    // Query geospatial data
    const objects = useQuery(RealmCollections.Restaurants, (collection) => collection.filtered('location geoWithin $0', smallCircle), [smallCircle]);

    const nearbyRestaurants: IFBRestaurant[] = toRealmModelList<IFBRestaurant>(objects);

    Log.info('');
    Log.info('================================');
    Log.info(`nearby restaurants length: ${nearbyRestaurants.length}`);
    Log.info(`currentIndex: ${currentIndex}`);
    Log.info('================================');
    Log.info('');

    const loadMoreRestaurants = useCallback(() => {
        setCurrentIndex((prevIndex: number) => {
            return prevIndex + Variables.paginationLimitInSidebar;
        });
    }, []);

    return (
        <View
            accessibilityLabel={translate('sidebarScreen.listOfChats')}
            style={[styles.flex1, styles.h100]}
        >
            <SidebarLinks
                // Forwarded props:
                insets={insets}
                // Data props:
                isLoading={isLoading}
                shouldShowRadar={nearbyRestaurants.length === 0}
                shouldShowFBFirstSync={shouldShowFBFirstSync}
                shouldShowLocalPhotosIcon
                restaurantListItems={nearbyRestaurants}
                fetchMoreRestaurants={loadMoreRestaurants}
            />
        </View>
    );
}

SidebarLinksData.displayName = 'SidebarLinksData';

export default SidebarLinksData;
