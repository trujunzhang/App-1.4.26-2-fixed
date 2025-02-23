import React, {forwardRef, useCallback} from 'react';
import type {ForwardedRef} from 'react';
import {useOnyx} from 'react-native-onyx';
import * as Expensicons from '@components/Icon/Expensicons';
import SelectionList from '@components/Ieatta/components/SelectionList';
import SearchRestaurantsListItem from '@components/Ieatta/components/Selections/SearchRestaurantsListItem';
import type {SearchRestaurantsItem, SearchRestaurantsItemProps} from '@components/Ieatta/components/Selections/types';
import {usePersonalDetails} from '@components/OnyxProvider';
import SearchQueryListItem from '@components/SelectionList/Search/SearchQueryListItem';
import type {SearchQueryItem, SearchQueryListItemProps} from '@components/SelectionList/Search/SearchQueryListItem';
import type {SectionListDataType, SelectionListHandle, UserListItemProps} from '@components/SelectionList/types';
import useLocalize from '@hooks/useLocalize';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {PageSection, RowPressableType, SkeletonViewType} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {IRestaurantSidebarRow} from '@libs/FirebaseIeatta/list/types/rows/restaurant';
import {pageItemNavigateTo} from '@libs/ieatta/pageNavigationUtils';
import type {SearchQueryJSON} from '@libs/ieatta/SearchRestaurantUtils';
import * as SearchRestaurantUtils from '@libs/ieatta/SearchRestaurantUtils';
import Navigation from '@libs/Navigation/Navigation';
import Performance from '@libs/Performance';
import {getAllTaxRates} from '@libs/PolicyUtils';
import type {OptionData} from '@libs/ReportUtils';
import * as Report from '@userActions/Report';
import Timing from '@userActions/Timing';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {IFBRestaurant} from '@src/types/firebase';

type ItemWithQuery = {
    query: string;
};

type SearchRestaurantsRouterListProps = {
    /** currentQuery value computed coming from parsed TextInput value */
    currentQuery: SearchQueryJSON | undefined;

    /** Recent searches */
    recentSearches: Array<ItemWithQuery & {timestamp: string}> | undefined;

    /** Recent reports */
    recentReports: OptionData[];

    /** Callback to submit query when selecting a list item */
    // onSearchSubmit: (query: SearchQueryJSON | undefined) => void;

    /** Called when the search text changes */
    onSearchRestaurantsChanged: (searchText: string) => void;

    /** Context present when opening SearchRestaurantsRouter from a report, invoice or workspace page */
    reportForContextualSearch?: OptionData;

    /** Callback to update search query when selecting contextual suggestion */
    updateUserSearchQuery: (newSearchQuery: string) => void;

    /** Callback to close and clear SearchRestaurantsRouter */
    closeAndClearRouter: () => void;

    /** List of restaurants */
    restauransList: IFBRestaurant[];

    /** Called once when the scroll position gets within onEndReachedThreshold of the rendered content. */
    onEndReached: () => void;
};

const setPerformanceTimersEnd = () => {
    // Timing.end(CONST.TIMING.SEARCH_ROUTER_RENDER);
    // Performance.markEnd(CONST.TIMING.SEARCH_ROUTER_RENDER);
};

function isSearchQueryItem(item: OptionData | SearchQueryItem | SearchRestaurantsItem): item is SearchQueryItem {
    if ('singleIcon' in item && item.singleIcon && 'query' in item && item.query) {
        return true;
    }
    return false;
}

function isSearchQueryListItem(listItem: UserListItemProps<OptionData> | SearchRestaurantsItemProps<SearchRestaurantsItem> | SearchQueryListItemProps): listItem is SearchQueryListItemProps {
    return isSearchQueryItem(listItem.item);
}

function SearchRestaurantsRouterItem(props: UserListItemProps<OptionData> | SearchRestaurantsItemProps<SearchRestaurantsItem> | SearchQueryListItemProps) {
    const styles = useThemeStyles();

    if (isSearchQueryListItem(props)) {
        return (
            <SearchQueryListItem
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
            />
        );
    }
    return (
        <SearchRestaurantsListItem
            pressableStyle={[styles.br2]}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(props as SearchRestaurantsItemProps<SearchRestaurantsItem>)}
        />
    );
    // return (
    //     <UserListItem
    //         pressableStyle={[styles.br2]}
    //         // eslint-disable-next-line react/jsx-props-no-spreading
    //         {...props}
    //     />
    // );
}

function SearchRestaurantsRouterList(
    {
        currentQuery,
        reportForContextualSearch,
        recentSearches,
        recentReports,
        onSearchRestaurantsChanged,
        updateUserSearchQuery,
        closeAndClearRouter,
        restauransList,
        onEndReached,
    }: SearchRestaurantsRouterListProps,
    ref: ForwardedRef<SelectionListHandle>,
) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const {isSmallScreenWidth} = useResponsiveLayout();

    const personalDetails = usePersonalDetails();
    const [reports] = useOnyx(ONYXKEYS.COLLECTION.REPORT);
    const taxRates = getAllTaxRates();
    const [cardList = {}] = useOnyx(ONYXKEYS.CARD_LIST);
    // const sections: Array<SectionListDataType<OptionData | SearchQueryItem>> = [];
    const sections: Array<SectionListDataType<OptionData | SearchQueryItem | SearchRestaurantsItem>> = [];

    // if (currentQuery?.inputQuery) {
    //     sections.push({
    //         data: [
    //             {
    //                 text: currentQuery?.inputQuery,
    //                 singleIcon: Expensicons.MagnifyingGlass,
    //                 query: currentQuery?.inputQuery,
    //                 itemStyle: styles.activeComponentBG,
    //                 keyForList: 'findItem',
    //             },
    //         ],
    //     });
    // }

    // if (reportForContextualSearch && !currentQuery?.inputQuery) {
    //     sections.push({
    //         data: [
    //             {
    //                 text: `${translate('search.searchIn')} ${reportForContextualSearch.text ?? reportForContextualSearch.alternateText}`,
    //                 singleIcon: Expensicons.MagnifyingGlass,
    //                 query: SearchRestaurantUtils.getContextualSuggestionQuery(reportForContextualSearch.reportID),
    //                 itemStyle: styles.activeComponentBG,
    //                 keyForList: 'contextualSearch',
    //                 isContextualSearchItem: true,
    //             },
    //         ],
    //     });
    // }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const recentSearchesData = recentSearches?.map(({query, timestamp}) => {
        const searchQueryJSON = SearchRestaurantUtils.buildSearchQueryJSON(query);
        return {
            // text: searchQueryJSON ? SearchRestaurantUtils.getSearchHeaderTitle(searchQueryJSON, personalDetails) : query,
            text: query,
            singleIcon: Expensicons.History,
            query,
            keyForList: timestamp,
        };
    });

    if (!currentQuery?.inputQuery && recentSearchesData && recentSearchesData.length > 0) {
        // sections.push({title: translate('search.recentSearches'), data: recentSearchesData});
    }

    // const styledRecentReports = recentReports.map((item) => ({...item, pressableStyle: styles.br2, wrapperStyle: [styles.pr3, styles.pl3]}));
    const styledRecentReports = restauransList;
    sections.push({title: translate('sidebar.search.recentRestaurants'), data: styledRecentReports});

    const onSelectRow = useCallback(
        (item: OptionData | SearchQueryItem | SearchRestaurantsItem) => {
            if (isSearchQueryItem(item)) {
                // if (item.isContextualSearchItem) {
                //     // Handle selection of "Contextual search suggestion"
                //     updateUserSearchQuery(`${item?.query} ${currentQuery?.inputQuery ?? ''}`);
                //     return;
                // }

                // // Handle selection of "Recent search"
                // if (!item?.query) {
                //     return;
                // }
                // onSearchSubmit(SearchRestaurantUtils.buildSearchQueryJSON(item?.query));
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
                const queryItem: SearchQueryItem = item as SearchQueryItem;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                onSearchRestaurantsChanged(queryItem?.searchQuery ?? '');
                return;
            }

            // Handle selection of "Recent chat"
            closeAndClearRouter();
            if ('uniqueId' in item && item?.uniqueId) {
                const rowData: IRestaurantSidebarRow = {
                    restaurant: item,
                    isFocused: false,
                };
                const pageRow: IPageRow = {
                    rowType: PageSection.RESTAURANT_SEARCH_ROW,
                    rowData,
                    rowKey: 'PageSection.RESTAURANT_SEARCH_ROW',
                    modalName: 'restaurant',
                    pressType: RowPressableType.SINGLE_PRESS,
                };
                pageItemNavigateTo(pageRow);
                // Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(item?.uniqueId));
            } else if ('login' in item) {
                Report.navigateToAndOpenReport(item.login ? [item.login] : [], false);
            }
        },
        [closeAndClearRouter, onSearchRestaurantsChanged],
    );

    return (
        <SelectionList<OptionData | SearchQueryItem | SearchRestaurantsItem>
            sections={sections}
            onSelectRow={onSelectRow}
            ListItem={SearchRestaurantsRouterItem}
            containerStyle={[styles.mh100]}
            sectionListStyle={[isSmallScreenWidth ? styles.ph5 : styles.ph2, styles.pb2]}
            listItemWrapperStyle={[styles.pr3, styles.pl3]}
            onLayout={setPerformanceTimersEnd}
            ref={ref}
            showScrollIndicator={!isSmallScreenWidth}
            sectionTitleStyles={styles.mhn2}
            shouldSingleExecuteRowSelect
            onEndReachedThreshold={0.3}
            onEndReached={onEndReached}
        />
    );
}

export default forwardRef(SearchRestaurantsRouterList);
export {SearchRestaurantsRouterItem};
export type {ItemWithQuery};
