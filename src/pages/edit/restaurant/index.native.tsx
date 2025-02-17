/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useObject, useQuery, useRealm} from '@realm/react';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {FBCollections, PhotoType} from '@libs/FirebaseIeatta/constant';
import getCurrentPosition from '@libs/getCurrentPosition';
import {emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import RealmHelper from '@libs/Realm/services/realm-helper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBPhoto, IFBRestaurant} from '@src/types/firebase';
import BaseEditRestaurantPage from './BaseEditRestaurantPage';

type EditRestartNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.RESTAURANT>;

// eslint-disable-next-line @typescript-eslint/ban-types
type EditRestaurantPageProps = EditRestartNavigationProps & {};

function EditRestaurantPage(props: EditRestaurantPageProps) {
    const restaurantId = lodashGet(props.route, 'params.restaurantId', emptyRestaurantTag);

    const {windowWidth} = useWindowDimensions();
    const realm = useRealm();

    const [currentPosition, setCurrentPosition] = useState<{latitude: number; longitude: number}>(CONST.DEFAULT_LOCATION);
    const hasAskedForLocationPermission = useRef(false);
    /**
      |--------------------------------------------------
      | Single(Restaurant)
      |--------------------------------------------------
      */
    const restaurantInRealm = useObject<IFBRestaurant>(RealmCollections.Restaurants, restaurantId);
    const restaurant: IFBRestaurant | undefined = _.isNull(restaurantInRealm) === false ? (restaurantInRealm as IFBRestaurant) : undefined;

    const photos = useQuery(
        RealmCollections.Photos,
        RealmQuery.queryForRealmPhotos({
            onlyRestaurants: true,
            relatedId: restaurantId,
            photoType: PhotoType.Restaurant,
        }),
    );
    const photosInPage: IFBPhoto[] = toRealmModelList<IFBPhoto>(photos);

    useFocusEffect(
        useCallback(() => {
            if (hasAskedForLocationPermission.current) {
                return;
            }

            hasAskedForLocationPermission.current = true;
            getCurrentPosition(
                (params) => {
                    const currentCoords = {longitude: params.coords.longitude, latitude: params.coords.latitude};
                    setCurrentPosition(currentCoords);
                },
                () => {},
            );
        }, []),
    );

    // eslint-disable-next-line @lwc/lwc/no-async-await
    const onAfterSelectedCover = async (firebasePhotoId: string) => {
        await new RealmHelper(realm).updateSqlPhotoCover({firebasePhotoId, coverId: restaurantId, coverType: RealmCollections.Restaurants});
    };

    return (
        <BaseEditRestaurantPage
            key={lodashGet(restaurant, 'uniqueId', emptyRestaurantTag)}
            initialPanelWidth={windowWidth}
            restaurantId={restaurantId}
            restaurant={restaurant}
            isNewModel={restaurantId === CONST.IEATTA_EDIT_MODEL_NEW}
            userLocation={currentPosition}
            photosInPage={photosInPage}
            onAfterSelectedCover={onAfterSelectedCover}
        />
    );
}

EditRestaurantPage.displayName = 'EditRestaurantPage';

export default EditRestaurantPage;
