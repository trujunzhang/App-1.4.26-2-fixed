import _ from 'lodash';
import lodashGet from 'lodash/get';
import React, {useCallback, useEffect} from 'react';
import {usePagination} from 'react-firebase-pagination-hooks';
import {Linking, View} from 'react-native';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import type {EdgeInsets} from 'react-native-safe-area-context';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {setRestaurantIdInSidebar} from '@libs/actions/ieatta/restaurant';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import Navigation from '@navigation/Navigation';
import SidebarLinks from '@pages/home/sidebar/SidebarLinks';
import Variables from '@styles/variables';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {IFBRestaurant} from '@src/types/firebase';

type SidebarLinksDataOnyxProps = {
    restaurantIdInSidebar: OnyxEntry<string>;
};
type SidebarLinksDataProps = SidebarLinksDataOnyxProps & {
    insets: EdgeInsets;
};

function SidebarLinksData({insets, restaurantIdInSidebar}: SidebarLinksDataProps) {
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();
    const {translate} = useLocalize();

    const queryFn = React.useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return FirebaseQuery.queryForRestaurants({});
    }, []);

    const [value, {loaded, loadingMore, hasMore, loadMore}, error] = usePagination(queryFn(), {limit: Variables.paginationLimitInSidebar});

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
        // eslint-disable-next-line rulesdir/prefer-early-return
        Linking.getInitialURL().then((url) => {
            if (url !== null) {
                const parsedUrl = new URL(url);
                if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/r') {
                    const reportID = parsedUrl.searchParams.get('reportID');
                    if (reportID === undefined || reportID === null) {
                        // only url is on the home page
                        if (restaurants.length > 0) {
                            if (restaurantIdInSidebar === '' || restaurantIdInSidebar === null) {
                                // const firstRestaurant = restaurants[0];
                                const firstRestaurant: IFBRestaurant | undefined = _.first(restaurants);
                                const restaurantId = lodashGet(firstRestaurant, 'uniqueId', '');
                                Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(restaurantId));
                                setRestaurantIdInSidebar(restaurantId);
                            } else {
                                Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(restaurantIdInSidebar));
                            }
                        }
                    }
                }
            }
        });
    }, [isSmallScreenWidth, restaurants, restaurantIdInSidebar]);

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

export default withOnyx<SidebarLinksDataProps, SidebarLinksDataOnyxProps>({
    restaurantIdInSidebar: {
        key: ONYXKEYS.RESTAURANT_ID_IN_SIDEBAR,
    },
})(SidebarLinksData);
