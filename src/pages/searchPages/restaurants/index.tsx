/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {usePagination} from 'react-firebase-pagination-hooks';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import Variables from '@styles/variables';
import type {IFBRestaurant} from '@src/types/firebase';
import SearchRestaurantsRouter from './SearchRouter/SearchRestaurantsRouter';
import SearchRestaurantsRouterModal from './SearchRouter/SearchRestaurantsRouterModal';

function SearchRestaurantsModal() {
    const [restaurantsSearch, setRestaurantsSearch] = useState<string>('');

    const queryFn = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return FirebaseQuery.queryForRestaurants({search: restaurantsSearch});
    }, [restaurantsSearch]);

    const [value, {loaded, loadingMore, hasMore, loadMore}, error] = usePagination(queryFn(), {limit: Variables.paginationLimitInSidebar});

    const restaurants: IFBRestaurant[] = _.map(value, (item) => item.data() as IFBRestaurant) || [];

    const isLoading = !loaded;

    // eslint-disable-next-line rulesdir/prefer-early-return
    const loadMoreRestaurants = useCallback(() => {
        if (!loadingMore && hasMore) {
            loadMore();
        }
    }, [loadingMore, hasMore, loadMore]);

    const onSearchRestaurantsChanged = useCallback((searchText: string) => {
        setRestaurantsSearch(searchText);
    }, []);

    return (
        <SearchRestaurantsRouterModal
            renderContent={(params: {onRouterClose: () => void}) => (
                <SearchRestaurantsRouter
                    restaurantsSearch={restaurantsSearch}
                    restauransList={restaurants}
                    onSearchRestaurantsChanged={onSearchRestaurantsChanged}
                    onRouterClose={params.onRouterClose}
                    onEndReached={loadMoreRestaurants}
                />
            )}
        />
    );
}

SearchRestaurantsModal.displayName = 'SearchRestaurantsModal';

export default SearchRestaurantsModal;
