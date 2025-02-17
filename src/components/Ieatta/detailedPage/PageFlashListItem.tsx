/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {PhotoCarouselItem} from '@components/Ieatta/components/PhotosCarousel';
import PhotoLocalItem from '@components/Ieatta/components/PhotosGrid/PhotoLocalItem';
import {RestaurantCardView, RestaurantRowView} from '@components/Ieatta/LHNRestaurantsList';
import {PageSection} from '@libs/FirebaseIeatta/list/constant';
import type {IEventInfoPanelRow} from '@libs/FirebaseIeatta/list/types/rows/event';
import type {IPhotoCarouselItemRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import {
    DetailedPhotosNativeView,
    DetailedPhotosRow,
    DetailedReviewItem,
    DisplayNameTitle,
    EditModelButton,
    ReviewActionbar,
    ReviewSubmitPanel,
    SectionCommonTitle,
    SectionEmptyView,
    SectionMenuTitle,
    SectionPeopleOrderedTitle,
    SectionPhotoTitle,
    SectionWaiterTitle,
    SkeletonView,
} from './common';
import {OrderedUserSmallView, OrderedUserWebView, WaitersRowInEvent} from './event';
import {EventInfoPanel, EventInfoWebPanel, RecipeInfoPanel, RecipeWithPhotosInfoPanelData, RestaurantInfoPanel, RestaurantWithPhotosInfoPanelData} from './header';
import {EventSmallView, EventWebView, RestaurantAddress, RestaurantMenuRow} from './restaurant';
import RestaurantMenuNativeView from './restaurant/menu/RestaurantMenuNativeView';
import RestaurantMenuWebView from './restaurant/menu/RestaurantMenuWebView';
import type {PageFlashListItemProps} from './types';

function PageFlashListItem({pageRow, hovered}: PageFlashListItemProps) {
    switch (pageRow.rowType) {
        /**
         |--------------------------------------------------
         | SkeletonView
         |--------------------------------------------------
         */
        case PageSection.SECTION_SKELETON_VIEW: {
            return <SkeletonView rowData={pageRow.rowData} />;
        }

        /**
         |--------------------------------------------------
         | Common
         |--------------------------------------------------
         */
        case PageSection.COMMON_TITLE: {
            return <SectionCommonTitle titleRow={pageRow.rowData} />;
        }

        /**
         |--------------------------------------------------
         | photo carousel
         |--------------------------------------------------
         */
        case PageSection.PHOTO_CAROUSEL_ITEM_WITHOUT_EVENT:
        case PageSection.PHOTO_GRID_ITEM_WITH_EVENT:
        case PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT: {
            return <PhotoCarouselItem carouselItem={pageRow.rowData} />;
        }
        case PageSection.PHOTO_SELECT_COVERR_FOR_RESTAURANT_AND_RECIPE:
        case PageSection.PHOTO_ADD_WAITERS_ITEM_WITH_EVENT: {
            const carouselItem: IPhotoCarouselItemRow = pageRow.rowData as IPhotoCarouselItemRow;
            const section = carouselItem.section ?? {
                isSelected: false,
                onItemPressed: () => {},
            };
            return (
                <PhotoCarouselItem
                    carouselItem={carouselItem}
                    canSelectMultiple
                    isSelected={section.isSelected}
                />
            );
        }
        case PageSection.PHOTO_GRID_LOCAL_ITEM: {
            return <PhotoLocalItem localItem={pageRow.rowData} />;
        }
        /**
         |--------------------------------------------------
         | 'Edit button' on the Detailed pages
         |--------------------------------------------------
         */
        case PageSection.DETAILED_EDIT_MODEL_BUTTON: {
            return <EditModelButton editModelRow={pageRow.rowData} />;
        }
        case PageSection.DISPLAY_NAME_TITLE_ROW: {
            return (
                <DisplayNameTitle
                    hovered={hovered}
                    rowData={pageRow.rowData}
                />
            );
        }

        /**
         |--------------------------------------------------
         | Sidebar
         |--------------------------------------------------
         */
        case PageSection.SIDEBAR_RESTAURANT_CARD: {
            return (
                <RestaurantCardView
                    hovered={hovered}
                    rowData={pageRow.rowData}
                />
            );
        }
        case PageSection.SIDEBAR_RESTAURANT_ROW: {
            return (
                <RestaurantRowView
                    hovered={hovered}
                    rowData={pageRow.rowData}
                />
            );
        }
        /**
         |--------------------------------------------------
         | Photos in the detailed page
         |--------------------------------------------------
         */
        case PageSection.SECTION_PHOTO_TITLE: {
            return <SectionPhotoTitle photoItem={pageRow.rowData} />;
        }
        case PageSection.SECTION_PHOTO_ROW: {
            return <DetailedPhotosRow photoRow={pageRow.rowData} />;
        }
        case PageSection.SECTION_PHOTO_ITEM: {
            return <DetailedPhotosNativeView photoRow={pageRow.rowData} />;
        }
        /**
         |--------------------------------------------------
         | Reviews in the detailed page
         |--------------------------------------------------
         */
        case PageSection.SECTION_REVIEW: {
            return <DetailedReviewItem reviewRow={pageRow.rowData} />;
        }
        case PageSection.SECTION_REVIEW_EMPTY: {
            return <SectionEmptyView emptyRow={pageRow.rowData} />;
        }
        case PageSection.SECTION_REVIEW_ACTION_BAR: {
            return <ReviewActionbar reviewActionbar={pageRow.rowData} />;
        }
        case PageSection.SECTION_REVIEW_LOGGED_USER: {
            return <ReviewSubmitPanel reviewSubmitRow={pageRow.rowData} />;
        }
        /**
         |--------------------------------------------------
         | Restaurant
         |--------------------------------------------------
         */
        case PageSection.PANEL_RESTAURANT_INFO: {
            return <RestaurantInfoPanel restaurant={pageRow.rowData} />;
        }
        case PageSection.PANEL_RESTAURANT_INFO_WEB: {
            return <RestaurantWithPhotosInfoPanelData restaurant={pageRow.rowData} />;
        }
        case PageSection.RESTAURANT_ADDRESS: {
            return <RestaurantAddress address={pageRow.rowData} />;
        }
        case PageSection.RESTAURANT_EVENT_EMPTY: {
            return <SectionEmptyView emptyRow={pageRow.rowData} />;
        }
        case PageSection.RESTAURANT_EVENT: {
            return <EventSmallView eventInRestaurantRow={pageRow.rowData} />;
        }
        case PageSection.RESTAURANT_EVENT_WEB: {
            return <EventWebView eventInRestaurantRow={pageRow.rowData} />;
        }
        case PageSection.RESTAURANT_MENU_TITLE: {
            return <SectionMenuTitle menuRow={pageRow.rowData} />;
        }
        case PageSection.RESTAURANT_MENU_ROW: {
            return <RestaurantMenuRow menuRow={pageRow.rowData} />;
        }
        /**
         |--------------------------------------------------
         | Event
         |--------------------------------------------------
         */
        case PageSection.PANEL_EVENT_INFO: {
            const {restaurant, event} = pageRow.rowData as IEventInfoPanelRow;
            return (
                <EventInfoPanel
                    restaurant={restaurant}
                    event={event}
                />
            );
        }
        case PageSection.PANEL_EVENT_INFO_WEB: {
            const {restaurant, event} = pageRow.rowData as IEventInfoPanelRow;
            return (
                <EventInfoWebPanel
                    restaurant={restaurant}
                    event={event}
                />
            );
        }
        case PageSection.EVENT_WAITER_TITLE: {
            return <SectionWaiterTitle waiterItem={pageRow.rowData} />;
        }
        case PageSection.EVENT_WAITER_ROW: {
            return <WaitersRowInEvent waiterRow={pageRow.rowData} />;
        }
        case PageSection.EVENT_ORDERED_USER_TITLE: {
            return <SectionPeopleOrderedTitle peopleOrderedTitleItem={pageRow.rowData} />;
        }
        case PageSection.EVENT_USER_EMPTY: {
            return <SectionEmptyView emptyRow={pageRow.rowData} />;
        }
        case PageSection.EVENT_USER: {
            return (
                <OrderedUserSmallView
                    rowData={pageRow.rowData}
                    pageRow={pageRow}
                />
            );
        }
        case PageSection.EVENT_USER_WEB: {
            return (
                <OrderedUserWebView
                    rowData={pageRow.rowData}
                    pageRow={pageRow}
                />
            );
        }
        /**
         |--------------------------------------------------
         | Recipe
         |--------------------------------------------------
         */
        case PageSection.RECIPE_ROW: {
            return <RestaurantMenuNativeView recipe={pageRow.rowData} />;
        }
        case PageSection.RECIPE_ROW_WEB: {
            return <RestaurantMenuWebView recipe={pageRow.rowData} />;
        }
        case PageSection.PANEL_RECIPE_INFO: {
            return <RecipeInfoPanel recipe={pageRow.rowData} />;
        }
        case PageSection.PANEL_RECIPE_INFO_WEB: {
            return <RecipeWithPhotosInfoPanelData recipe={pageRow.rowData} />;
        }
        default: {
            return null;
        }
    }
}

export default PageFlashListItem;
