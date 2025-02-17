/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useCallback, useEffect} from 'react';
import {usePagination} from 'react-firebase-pagination-hooks';
import {Linking, View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import type {EdgeInsets} from 'react-native-safe-area-context';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {setRestaurantIdInSidebar} from '@libs/actions/ieatta/restaurant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import Navigation from '@navigation/Navigation';
import SidebarLinks from '@pages/home/sidebar/SidebarLinks';
import Variables from '@styles/variables';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {IFBRestaurant} from '@src/types/firebase';

type SidebarLinksDataProps = {
    insets: EdgeInsets;
};

function SidebarLinksData({insets}: SidebarLinksDataProps) {
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useResponsiveLayout();
    const {translate} = useLocalize();

    const [restaurantIdInSidebar] = useOnyx(ONYXKEYS.RESTAURANT_ID_IN_SIDEBAR);

    const queryFn = React.useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return FirebaseQuery.queryForRestaurants({});
    }, []);

    const [value, {loaded, loadingMore, hasMore, loadMore}, error] = usePagination(queryFn(), {limit: Variables.paginationLimitInSidebar});

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const restaurants: IFBRestaurant[] = _.map(value, (item) => item.data() as IFBRestaurant) || [];

    const isLoading = !loaded;

    // eslint-disable-next-line rulesdir/prefer-early-return
    const loadMoreRestaurants = useCallback(() => {
        if (!loadingMore && hasMore) {
            loadMore();
        }
    }, [loadingMore, hasMore, loadMore]);

    useEffect(() => {
        if (isSmallScreenWidth) {
            return;
        }
        if (restaurants.length > 0) {
            if (restaurantIdInSidebar === '' || restaurantIdInSidebar === null || restaurantIdInSidebar === undefined) {
                const firstRestaurant: IFBRestaurant | undefined = _.first(restaurants);
                const restaurantId = lodashGet(firstRestaurant, 'uniqueId', '');
                setRestaurantIdInSidebar(restaurantId);
            }
        }
    }, [isSmallScreenWidth, restaurants, restaurantIdInSidebar]);

    useEffect(() => {
        if (isSmallScreenWidth) {
            return;
        }
        // eslint-disable-next-line rulesdir/prefer-early-return
        Linking.getInitialURL().then((url) => {
            if (url !== null) {
                const parsedUrl = new URL(url);
                if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/r') {
                    // only url is on the home page
                    if (restaurantIdInSidebar === '' || restaurantIdInSidebar === null || restaurantIdInSidebar === undefined) {
                        /* empty */
                    } else {
                        Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(restaurantIdInSidebar));
                    }
                }
            }
        });
    }, [isSmallScreenWidth, restaurantIdInSidebar]);

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
                restaurantListItems={restaurants}
                fetchMoreRestaurants={loadMoreRestaurants}
            />
        </View>
    );
}

SidebarLinksData.displayName = 'SidebarLinksData';

export default SidebarLinksData;
