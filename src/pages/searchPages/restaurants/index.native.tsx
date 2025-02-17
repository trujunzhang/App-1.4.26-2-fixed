/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
// eslint-disable-next-line lodash/import-scope
import {useQuery} from '@realm/react';
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {RealmCollections} from '@libs/Realm/constant';
import {toRealmModelList} from '@libs/Realm/helpers/realmTypeHelper';
import * as RealmQuery from '@libs/Realm/services/realm-query';
import Variables from '@styles/variables';
import type {IFBRestaurant} from '@src/types/firebase';
import SearchRestaurantsRouter from './SearchRouter/SearchRestaurantsRouter';
import SearchRestaurantsRouterModal from './SearchRouter/SearchRestaurantsRouterModal';

function SearchRestaurantsModal() {
    const [restaurantsSearch, setRestaurantsSearch] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(Variables.paginationLimitInSidebar);

    const objects = useQuery<IFBRestaurant>(
        RealmCollections.Restaurants,
        (array) => {
            let nextArray = array;
            if (restaurantsSearch !== '') {
                nextArray = array.filtered('displayName CONTAINS $0', restaurantsSearch);
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return RealmQuery.sortUpdateFromNewToOld(nextArray);
        },
        [restaurantsSearch],
    ).slice(0, currentIndex);

    const restaurants: IFBRestaurant[] = toRealmModelList<IFBRestaurant>(objects);

    // const isLoading = !loaded;
    const isLoading = false;

    const loadMoreRestaurants = useCallback(() => {
        setCurrentIndex((prevIndex: number) => {
            return prevIndex + Variables.paginationLimitInSidebar;
        });
    }, []);

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
