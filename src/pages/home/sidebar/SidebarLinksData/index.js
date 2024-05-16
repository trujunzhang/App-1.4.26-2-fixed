import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useRef} from 'react';
import {usePagination} from 'react-firebase-pagination-hooks';
import {Linking, View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import _ from 'underscore';
import networkPropTypes from '@components/networkPropTypes';
import {withNetwork} from '@components/OnyxProvider';
import withCurrentRestaurantID from '@components/withCurrentRestaurantID';
import withNavigationFocus from '@components/withNavigationFocus';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import {setRestaurantIdInSidebar} from '@libs/actions/ieatta/restaurant';
import compose from '@libs/compose';
import {queryForRestaurants} from '@libs/Firebase/services/firebase-query';
import Navigation from '@navigation/Navigation';
import SidebarLinks, {basePropTypes} from '@pages/home/sidebar/SidebarLinks';
import Variables from '@styles/variables';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';

const propTypes = {
    ...basePropTypes,

    /** Whether the reports are loading. When false it means they are ready to be used. */
    isLoadingApp: PropTypes.bool,

    restaurantIdInSidebar: PropTypes.string,

    network: networkPropTypes.isRequired,
};

const defaultProps = {
    isLoadingApp: true,
    restaurantIdInSidebar: '',
};

function SidebarLinksData({isFocused, currentRestaurantID, insets, isLoadingApp, restaurantIdInSidebar, onLinkClick, priorityMode, network}) {
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();
    const {translate} = useLocalize();

    const currentRestaurantIDRef = useRef(currentRestaurantID);
    currentRestaurantIDRef.current = currentRestaurantID;
    const isActiveRestaurant = useCallback((reportID) => currentRestaurantIDRef.current === reportID, []);

    const queryFn = React.useCallback(() => {
        return queryForRestaurants({});
    }, []);

    const [value, {loaded, loadingMore, hasMore, loadMore}, error] = usePagination(queryFn(), {limit: Variables.paginationLimitInSidebar});

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const restaurants = _.map(value, (item) => item.data()) || [];

    const isLoading = loaded === false;

    // eslint-disable-next-line rulesdir/prefer-early-return
    const loadMoreRestaurants = useCallback(() => {
        if (loadingMore === false && hasMore) {
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
                        if (restaurantIdInSidebar === '' && restaurants.length > 0) {
                            const firstRestaurant = restaurants[0];
                            Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(firstRestaurant.uniqueId));
                            setRestaurantIdInSidebar(firstRestaurant.uniqueId);
                        }
                    }
                }
            }
        });
    }, [isSmallScreenWidth, restaurants, restaurantIdInSidebar]);

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
                priorityMode={priorityMode}
                // Data props:
                isActiveRestaurant={isActiveRestaurant}
                isLoading={isLoading}
                restaurantListItems={restaurants}
                fetchMoreRestaurants={loadMoreRestaurants}
            />
        </View>
    );
}

SidebarLinksData.propTypes = propTypes;
SidebarLinksData.defaultProps = defaultProps;
SidebarLinksData.displayName = 'SidebarLinksData';

export default compose(
    withCurrentRestaurantID,
    withNavigationFocus,
    withNetwork(),
    withOnyx({
        restaurantIdInSidebar: {
            key: ONYXKEYS.RESTAURANT_ID_IN_SIDEBAR,
        },
        isLoadingApp: {
            key: ONYXKEYS.IS_LOADING_APP,
        },
    }),
)(SidebarLinksData);
