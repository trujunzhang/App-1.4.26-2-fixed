/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

/* eslint-disable @dword-design/import-alias/prefer-alias */
// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import lodashGet from 'lodash/get';
import {PhotoType, ReviewType} from '@libs/Firebase/constant';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import {filterRecipes} from '@libs/ieatta/eventUtils';
import TailwindColors from '@styles/tailwindcss/colors';
import type {IFBEvent, IFBPeopleInEvent, IFBRecipe, IFBRestaurant, IFBReview, IFBUser} from '@src/types/firebase';
import type {PersonalDetails, PersonalDetailsList} from '@src/types/onyx';
import type {IPageRow} from '../types/page-row';
import type {ISectionEmptyRow, ISectionTitleRow} from '../types/rows/common';
import type {IEventInfoPanelRow, IPeopleOrderedTitleRow, IUserInEventRow} from '../types/rows/event';
import type {IReviewOnSearchAndSortChanged} from '../types/rows/review';
import {buildWaiters} from './photo';
import {buildReviews} from './review';

type BuildEventRowsParams = {
    personalDetails: PersonalDetailsList;
    eventId: string;
    event: IFBEvent | undefined;
    restaurant: IFBRestaurant | undefined;
    recipeDictInRestaurant: Record<string, IFBRecipe>;
    peopleInEvents: IFBPeopleInEvent[];
    reviews: IFBReview[];
    reviewChanged: IReviewOnSearchAndSortChanged;
};

/**
  |--------------------------------------------------
  | PeopleInEvent
  |--------------------------------------------------
  */
const buildUsers = (
    isSmallScreenWidth: boolean,
    event: IFBEvent,
    peopleInEvents: IFBPeopleInEvent[],
    recipeDictInRestaurant: Record<string, IFBRecipe>,
    personalDetails: PersonalDetailsList,
): IPageRow[] => {
    const titleRow: IPeopleOrderedTitleRow = {
        title: 'sections.titles.eventPeopleOrdered',
        isSmallScreenWidth,
        eventId: lodashGet(event, 'uniqueId', ''),
        restaurantId: lodashGet(event, 'restaurantId', ''),
    };
    const titleSection: IPageRow = {
        rowType: PageSection.EVENT_ORDERED_USER_TITLE,
        rowData: titleRow,
        rowKey: 'PageSection.EVENT_ORDERED_USER_TITLE<People Ordered>',
        modalName: 'title',
        pressType: RowPressableType.NO_EVENT,
    };

    const buildUserRow = (item: IFBPeopleInEvent, index: number): IPageRow | null => {
        const user: PersonalDetails | null = personalDetails[item.userId];
        if (user === null) {
            return null;
        }
        const rowData: IUserInEventRow = {
            peopleInEvent: item,
            user,
            recipes: filterRecipes(item.recipeIds, recipeDictInRestaurant),
            showDivide: index !== peopleInEvents.length - 1,
        };
        return {
            rowType: isSmallScreenWidth ? PageSection.EVENT_USER : PageSection.EVENT_USER_WEB,
            rowData,
            rowKey: `${item?.uniqueId}` ?? 'PageSection.EVENT_USER',
            modalName: 'ordered user',
            pressType: RowPressableType.NO_EVENT,
        };
    };

    const rows: IPageRow[] | any = _.filter(_.map(peopleInEvents, buildUserRow), (notUndefined) => notUndefined !== null);

    if (rows.length === 0) {
        const rowData: ISectionEmptyRow = {emptyHint: 'sections.empty.noPeopleOrdered'};
        return [
            titleSection,
            {
                rowType: PageSection.EVENT_USER_EMPTY,
                rowData,
                rowKey: 'PageSection.EVENT_USER_EMPTY<no People ordered>',
                modalName: 'empty',
                pressType: RowPressableType.NO_EVENT,
            },
        ];
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [titleSection, ...rows];
};

const buildEventRows = (
    isSmallScreenWidth: boolean,
    {eventId, event, restaurant, recipeDictInRestaurant, peopleInEvents, personalDetails, reviews, reviewChanged}: BuildEventRowsParams,
): IPageRow[] => {
    if (event === undefined || event === null) {
        return [];
    }
    // info
    const infoPanelRow: IEventInfoPanelRow = {
        event,
        restaurant,
    };
    const infoPageRow: IPageRow = isSmallScreenWidth
        ? {
              rowType: PageSection.PANEL_EVENT_INFO,
              rowData: infoPanelRow,
              rowKey: `${event?.uniqueId}` ?? 'PageSection.PANEL_EVENT_INFO',
              modalName: 'header',
              pressType: RowPressableType.NO_EVENT,
          }
        : {
              rowType: PageSection.PANEL_EVENT_INFO_WEB,
              rowData: infoPanelRow,
              rowKey: `${event?.uniqueId}` ?? 'PageSection.PANEL_EVENT_INFO_WEB',
              modalName: 'header',
              pressType: RowPressableType.NO_EVENT,
          };

    return [
        // info
        infoPageRow,
        // users
        ...buildUsers(isSmallScreenWidth, event, peopleInEvents, recipeDictInRestaurant, personalDetails),
        // waiters
        ...buildWaiters(isSmallScreenWidth, event),
        // review
        ...buildReviews(isSmallScreenWidth, {relatedTitle: event?.displayName ?? '', relatedId: eventId, reviewType: ReviewType.Event, reviews, reviewChanged}),
    ];
};

// eslint-disable-next-line import/prefer-default-export
export {buildEventRows};
