/* eslint-disable @dword-design/import-alias/prefer-alias */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useQuery} from '@realm/react';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import {GeoCircle, GeoPoint, kmToRadians} from 'realm';
import networkPropTypes from '@components/networkPropTypes';
import {withNetwork} from '@components/OnyxProvider';
import withCurrentRestaurantID from '@components/withCurrentRestaurantID';
import withNavigationFocus from '@components/withNavigationFocus';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import compose from '@libs/compose';
import {watchCurrentPosition} from '@libs/getCurrentPosition';
import Log from '@libs/Log';
import {RealmCollections} from '@libs/Realm/constant';
import {toRestaurantsList} from '@libs/Realm/helpers/realmTypeHelper';
import {RestaurantGeoPoint} from '@libs/Realm/models';
import Variables from '@styles/variables';
import {checkHaveSyncAllCollections, setIsFirstSyncFB} from '@userActions/Firebase/syncFB';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import SidebarLinks, {basePropTypes} from '../SidebarLinks';

const propTypes = {
    ...basePropTypes,

    /** Whether the reports are loading. When false it means they are ready to be used. */
    isLoadingApp: PropTypes.bool,

    isFBFirstSync: PropTypes.bool,

    /** Holds the status of the firebase sync */
    firebaseSyncStatus: PropTypes.shape({
        isUsersSyncCompleted: PropTypes.bool,
        isRestaurantsSyncCompleted: PropTypes.bool,
        isEventsSyncCompleted: PropTypes.bool,
        isRecipesSyncCompleted: PropTypes.bool,
        isReviewsSyncCompleted: PropTypes.bool,
        isPhotosSyncCompleted: PropTypes.bool,
        isPeopleInEventsSyncCompleted: PropTypes.bool,
    }).isRequired,

    network: networkPropTypes.isRequired,
};

const defaultProps = {
    isLoadingApp: true,
    isFBFirstSync: true,
};

function SidebarLinksData({isFocused, insets, isLoadingApp, isFBFirstSync, firebaseSyncStatus, onLinkClick, network}) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const [currentIndex, setCurrentIndex] = useState(Variables.paginationLimitInSidebar);
    const [currentPosition, setCurrentPosition] = useState(CONST.DEFAULT_LOCATION);
    const hasAskedForLocationPermission = useRef(false);

    const isLoading = isLoadingApp;
    const isActiveRestaurant = useCallback((reportID) => false, []);

    const shouldShowFBFirstSync = useMemo(() => isFBFirstSync && checkHaveSyncAllCollections(firebaseSyncStatus) === false, [firebaseSyncStatus, isFBFirstSync]);

    useEffect(() => {
        if (isFBFirstSync === undefined || isFBFirstSync === false) {
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

    // Realm provides `kmToRadians` and `miToRadians`
    // to convert these measurements. Import the relevant
    // convenience method for your app's needs.
    const radiusFromKm = kmToRadians(1.4);

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
    // const objects = useQuery(
    //     RealmCollections.Restaurants,
    //     collection => collection.filtered('location geoWithin $0', smallCircle),
    //     [smallCircle],
    // );

    const objects = useQuery(RealmCollections.Restaurants).slice(0, currentIndex);
    const nearbyRestaurants = toRestaurantsList(objects);
    // const nearbyRestaurants = [];

    Log.info('');
    Log.info('================================');
    Log.info(`djzhang....................${nearbyRestaurants.length}`);
    Log.info(`currentIndex: ${currentIndex}`);
    Log.info('================================');
    Log.info('');

    const loadMoreRestaurants = useCallback(() => {
        setCurrentIndex((prevIndex) => {
            return prevIndex + Variables.paginationLimitInSidebar;
        });
    }, []);

    return (
        <View
            accessibilityElementsHidden={!isFocused}
            accessibilityLabel={translate('sidebarScreen.listOfChats')}
            style={[styles.flex1, styles.h100]}
        >
            <SidebarLinks
                // Forwarded props:
                onLinkClick={onLinkClick}
                insets={insets}
                // Data props:
                isActiveRestaurant={isActiveRestaurant}
                isLoading={isLoading}
                shouldShowRadar={nearbyRestaurants.length === 0}
                shouldShowFBFirstSync={shouldShowFBFirstSync}
                restaurantListItems={nearbyRestaurants}
                fetchMoreRestaurants={loadMoreRestaurants}
            />
        </View>
    );
}

SidebarLinksData.propTypes = propTypes;
SidebarLinksData.defaultProps = defaultProps;
SidebarLinksData.displayName = 'SidebarLinksData';

export default compose(
    // withCurrentRestaurantID,
    withNavigationFocus,
    withNetwork(),
    withOnyx({
        isFBFirstSync: {
            key: ONYXKEYS.IS_FB_FIRST_SYNC,
        },
        firebaseSyncStatus: {
            key: ONYXKEYS.FIREBASE_SYNC_STATUS,
            initialValue: {
                isUsersSyncCompleted: false,
                isRestaurantsSyncCompleted: false,
                isEventsSyncCompleted: false,
                isRecipesSyncCompleted: false,
                isReviewsSyncCompleted: false,
                isPhotosSyncCompleted: false,
                isPeopleInEventsSyncCompleted: false,
            },
        },
        isLoadingApp: {
            key: ONYXKEYS.IS_LOADING_APP,
        },
        priorityMode: {
            key: ONYXKEYS.NVP_PRIORITY_MODE,
            initialValue: CONST.PRIORITY_MODE.DEFAULT,
        },
    }),
)(SidebarLinksData);
