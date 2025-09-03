/* eslint-disable @dword-design/import-alias/prefer-alias */
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import {FBModelNames, PhotoType, ReviewType} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType, SkeletonViewType} from '@libs/FirebaseIeatta/list/constant';
import TailwindColors from '@styles/tailwindcss/colors';
import type {IFBEvent, IFBRestaurant, IFBReview} from '@src/types/firebase';
import type {IPageRow} from '../types/page-row';
import type {ISectionEmptyRow, ISectionTitleRow, ISkeletonViewRow} from '../types/rows/common';
import type {IEventsInRestaurantRow, IMenusInRestaurantRow, IRestaurantSidebarRow} from '../types/rows/restaurant';
import type {IReviewOnSearchAndSortChanged} from '../types/rows/review';
import {buildPhotos} from './photo';
import {buildReviews} from './review';

type BuildEventsInRestaurantParams = {
    events: IFBEvent[];
    loadingForEvents: boolean;
};
type BuildRestaurantRowsParams = {
    restaurantId: string;
    restaurant: IFBRestaurant | undefined;
    // events: IFBEvent[];
    eventsInRestaurant: BuildEventsInRestaurantParams;
    reviews: IFBReview[];
    reviewChanged: IReviewOnSearchAndSortChanged;
};

type BuildRestaurantSidebarParams = {
    restaurants: IFBRestaurant[];
    currentRestaurantID: string;
};

const buildEvents = (isSmallScreenWidth: boolean, eventsInRestaurant: BuildEventsInRestaurantParams): IPageRow[] => {
    const {events, loadingForEvents} = eventsInRestaurant;
    const titleRow: ISectionTitleRow = {
        title: isSmallScreenWidth ? 'sections.titles.eventsRecorded' : 'sections.titles.events',
        // 'Events Recorded'
        // : 'Events',
        titleColor: isSmallScreenWidth ? undefined : TailwindColors.red600,
        isSmallScreenWidth,
    };
    const titleSection: IPageRow = {
        rowType: PageSection.COMMON_TITLE,
        rowData: titleRow,
        rowKey: 'PageSection.COMMON_TITLE-<Events Recorded>',
        modalName: 'title',
        pressType: RowPressableType.NO_EVENT,
    };

    if (loadingForEvents) {
        const rowData: ISkeletonViewRow = {skeletonViewType: SkeletonViewType.EVENTS_IN_RESTAURANT};
        return [
            titleSection,
            {
                rowType: PageSection.SECTION_SKELETON_VIEW,
                rowData,
                rowKey: 'PageSection.SECTION_SKELETON_VIEW-<Loading>',
                modalName: 'skeleton',
                pressType: RowPressableType.NO_EVENT,
            },
        ];
    }
    if (events.length === 0) {
        const rowData: ISectionEmptyRow = {emptyHint: 'sections.empty.noEvents'};
        return [
            titleSection,
            {
                rowType: PageSection.RESTAURANT_EVENT_EMPTY,
                rowData,
                rowKey: 'PageSection.RESTAURANT_EVENT_EMPTY-<no Events>',
                modalName: 'empty',
                pressType: RowPressableType.NO_EVENT,
            },
        ];
    }

    const buildEventRow = (item: IFBEvent, index: number): IPageRow => {
        const rowData: IEventsInRestaurantRow = {
            event: item,
            shouldShowDivide: index !== events.length - 1,
        };
        return {
            rowType: isSmallScreenWidth ? PageSection.RESTAURANT_EVENT : PageSection.RESTAURANT_EVENT_WEB,
            rowData,
            rowKey: `${item?.uniqueId}` ?? 'PageSection.RESTAURANT_EVENT',
            modalName: FBModelNames.Events,
            pressType: RowPressableType.SECONDARY_PRESS,
        };
    };

    const rows: IPageRow[] = _.map(events, buildEventRow);

    return [titleSection, ...rows];
};

const buildAddress = (isSmallScreenWidth: boolean, restaurant: IFBRestaurant | undefined): IPageRow[] => {
    const address = restaurant?.address;
    if (!isSmallScreenWidth || address === null || address === undefined || address === '') {
        return [];
    }
    const titleRow: ISectionTitleRow = {
        title: 'sections.titles.currentAddress',
        // 'Current Address',
        isSmallScreenWidth,
    };

    return [
        {
            rowType: PageSection.COMMON_TITLE,
            rowData: titleRow,
            rowKey: 'PageSection.COMMON_TITLE-<Current Address>',
            modalName: 'title',
            pressType: RowPressableType.NO_EVENT,
        },
        {
            rowType: PageSection.RESTAURANT_ADDRESS,
            rowData: address,
            rowKey: 'PageSection.RESTAURANT_ADDRESS',
            modalName: 'address',
            pressType: RowPressableType.NO_EVENT,
        },
    ];
};
/**
 |--------------------------------------------------
 | Menus
 |--------------------------------------------------
 */
const buildMenus = (isSmallScreenWidth: boolean, restaurantId: string): IPageRow[] => {
    const menuRow: IMenusInRestaurantRow = {
        restaurantId,
        isSmallScreenWidth,
    };
    return [
        {
            rowType: PageSection.RESTAURANT_MENU_TITLE,
            rowData: menuRow,
            rowKey: 'PageSection.RESTAURANT_MENU_TITLE',
            modalName: 'title',
            pressType: RowPressableType.NO_EVENT,
        },
        {
            rowType: PageSection.RESTAURANT_MENU_ROW,
            rowData: menuRow,
            rowKey: 'PageSection.RESTAURANT_MENU_ROW',
            modalName: FBModelNames.Recipes,
            pressType: RowPressableType.NO_EVENT,
        },
    ];
};

const buildRestaurantSidebar = (isSmallScreenWidth: boolean, {restaurants, currentRestaurantID}: BuildRestaurantSidebarParams): IPageRow[] => {
    const buildRestaurantRow = (item: IFBRestaurant, index: number): IPageRow => {
        const rowData: IRestaurantSidebarRow = {
            restaurant: item,
            isFocused: !isSmallScreenWidth && item.uniqueId === currentRestaurantID,
        };
        return {
            rowType: isSmallScreenWidth ? PageSection.SIDEBAR_RESTAURANT_CARD : PageSection.SIDEBAR_RESTAURANT_ROW,
            rowData,
            rowKey: `${item?.uniqueId}` ?? 'PageSection.SIDEBAR_RESTAURANT_ROW',
            modalName: FBModelNames.Restaurants,
            pressType: RowPressableType.SECONDARY_PRESS,
        };
    };

    return _.map(restaurants, buildRestaurantRow);
};

const buildRestaurantRows = (isSmallScreenWidth: boolean, {restaurantId, restaurant, eventsInRestaurant, reviews, reviewChanged}: BuildRestaurantRowsParams): IPageRow[] => {
    // info
    const infoPageRow: IPageRow = isSmallScreenWidth
        ? {
              rowType: PageSection.PANEL_RESTAURANT_INFO,
              rowData: restaurant,
              rowKey: `${restaurant?.uniqueId}` ?? 'PageSection.PANEL_RESTAURANT_INFO',
              modalName: 'header',
              pressType: RowPressableType.NO_EVENT,
          }
        : {
              rowType: PageSection.PANEL_RESTAURANT_INFO_WEB,
              rowData: restaurant,
              rowKey: `${restaurant?.uniqueId}` ?? 'PageSection.PANEL_RESTAURANT_INFO_WEB',
              modalName: 'header',
              pressType: RowPressableType.NO_EVENT,
          };

    return [
        // info
        infoPageRow,
        // address
        ...buildAddress(isSmallScreenWidth, restaurant),
        // event
        ...buildEvents(isSmallScreenWidth, eventsInRestaurant),
        // menu
        ...buildMenus(isSmallScreenWidth, restaurantId),
        // photo
        ...buildPhotos(isSmallScreenWidth, restaurantId, PhotoType.Restaurant),
        // review
        ...buildReviews(isSmallScreenWidth, {relatedTitle: restaurant?.displayName ?? '', relatedId: restaurantId, reviewType: ReviewType.Restaurant, reviews, reviewChanged}),
    ];
};

export {buildRestaurantSidebar, buildRestaurantRows};

export type {BuildEventsInRestaurantParams};
