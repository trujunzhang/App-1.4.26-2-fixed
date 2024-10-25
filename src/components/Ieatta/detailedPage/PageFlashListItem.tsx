import React from 'react';
import {PhotoCarouselItem} from '@components/Ieatta/components/PhotosCarousel';
import PhotoLocalItem from '@components/Ieatta/components/PhotosGrid/PhotoLocalItem';
import {RestaurantCardView, RestaurantRowView} from '@components/LHNRestaurantsList';
import {PageSection} from '@libs/Firebase/list/constant';
import type {IEventInfoPanelRow} from '@libs/Firebase/list/types/rows/event';
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

function PageFlashListItem({item, hovered}: PageFlashListItemProps) {
    switch (item.rowType) {
        /**
 |--------------------------------------------------
     | SkeletonView
 |--------------------------------------------------
 */
        case PageSection.SECTION_SKELETON_VIEW: {
            return <SkeletonView rowData={item.rowData} />;
        }

        /**
 |--------------------------------------------------
 | Common
 |--------------------------------------------------
 */
        case PageSection.COMMON_TITLE: {
            return <SectionCommonTitle titleRow={item.rowData} />;
        }

        /**
 |--------------------------------------------------
 | photo carousel
 |--------------------------------------------------
 */
        case PageSection.PHOTO_CAROUSEL_ITEM_WITHOUT_EVENT:
        case PageSection.PHOTO_GRID_ITEM_WITH_EVENT:
        case PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT: {
            return <PhotoCarouselItem carouselItem={item.rowData} />;
        }

        case PageSection.PHOTO_GRID_LOCAL_ITEM: {
            return <PhotoLocalItem localItem={item.rowData} />;
        }
        /**
 |--------------------------------------------------
 | 'Edit button' on the Detailed pages
 |--------------------------------------------------
 */
        case PageSection.DETAILED_EDIT_MODEL_BUTTON: {
            return <EditModelButton editModelRow={item.rowData} />;
        }
        case PageSection.DISPLAY_NAME_TITLE_ROW: {
            return (
                <DisplayNameTitle
                    hovered={hovered}
                    rowData={item.rowData}
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
                    rowData={item.rowData}
                />
            );
        }
        case PageSection.SIDEBAR_RESTAURANT_ROW: {
            return (
                <RestaurantRowView
                    hovered={hovered}
                    rowData={item.rowData}
                />
            );
        }
        /**
 |--------------------------------------------------
 | Photos in the detailed page
 |--------------------------------------------------
 */
        case PageSection.SECTION_PHOTO_TITLE: {
            return <SectionPhotoTitle photoItem={item.rowData} />;
        }
        case PageSection.SECTION_PHOTO_ROW: {
            return <DetailedPhotosRow photoRow={item.rowData} />;
        }
        case PageSection.SECTION_PHOTO_ITEM: {
            return <DetailedPhotosNativeView photoRow={item.rowData} />;
        }
        /**
 |--------------------------------------------------
 | Reviews in the detailed page
 |--------------------------------------------------
 */
        case PageSection.SECTION_REVIEW: {
            return <DetailedReviewItem reviewRow={item.rowData} />;
        }
        case PageSection.SECTION_REVIEW_EMPTY: {
            return <SectionEmptyView emptyRow={item.rowData} />;
        }
        case PageSection.SECTION_REVIEW_ACTION_BAR: {
            return <ReviewActionbar reviewActionbar={item.rowData} />;
        }
        case PageSection.SECTION_REVIEW_LOGGED_USER: {
            return <ReviewSubmitPanel reviewSubmitRow={item.rowData} />;
        }
        /**
 |--------------------------------------------------
 | Restaurant
 |--------------------------------------------------
 */
        case PageSection.PANEL_RESTAURANT_INFO: {
            return <RestaurantInfoPanel restaurant={item.rowData} />;
        }
        case PageSection.PANEL_RESTAURANT_INFO_WEB: {
            return <RestaurantWithPhotosInfoPanelData restaurant={item.rowData} />;
        }
        case PageSection.RESTAURANT_ADDRESS: {
            return <RestaurantAddress address={item.rowData} />;
        }
        case PageSection.RESTAURANT_EVENT_EMPTY: {
            return <SectionEmptyView emptyRow={item.rowData} />;
        }
        case PageSection.RESTAURANT_EVENT: {
            return <EventSmallView eventInRestaurantRow={item.rowData} />;
        }
        case PageSection.RESTAURANT_EVENT_WEB: {
            return <EventWebView eventInRestaurantRow={item.rowData} />;
        }
        case PageSection.RESTAURANT_MENU_TITLE: {
            return <SectionMenuTitle menuRow={item.rowData} />;
        }
        case PageSection.RESTAURANT_MENU_ROW: {
            return <RestaurantMenuRow menuRow={item.rowData} />;
        }
        /**
 |--------------------------------------------------
 | Event
 |--------------------------------------------------
 */
        case PageSection.PANEL_EVENT_INFO: {
            const {restaurant, event} = item.rowData as IEventInfoPanelRow;
            return (
                <EventInfoPanel
                    restaurant={restaurant}
                    event={event}
                />
            );
        }
        case PageSection.PANEL_EVENT_INFO_WEB: {
            const {restaurant, event} = item.rowData as IEventInfoPanelRow;
            return (
                <EventInfoWebPanel
                    restaurant={restaurant}
                    event={event}
                />
            );
        }
        case PageSection.EVENT_WAITER_TITLE: {
            return <SectionWaiterTitle waiterItem={item.rowData} />;
        }
        case PageSection.EVENT_WAITER_ROW: {
            return <WaitersRowInEvent waiterRow={item.rowData} />;
        }
        case PageSection.EVENT_ORDERED_USER_TITLE: {
            return <SectionPeopleOrderedTitle peopleOrderedTitleItem={item.rowData} />;
        }
        case PageSection.EVENT_USER_EMPTY: {
            return <SectionEmptyView emptyRow={item.rowData} />;
        }
        case PageSection.EVENT_USER: {
            return <OrderedUserSmallView rowData={item.rowData} />;
        }
        case PageSection.EVENT_USER_WEB: {
            return <OrderedUserWebView rowData={item.rowData} />;
        }
        /**
 |--------------------------------------------------
 | Recipe
 |--------------------------------------------------
 */
        case PageSection.RECIPE_ROW: {
            return <RestaurantMenuNativeView recipe={item.rowData} />;
        }
        case PageSection.RECIPE_ROW_WEB: {
            return <RestaurantMenuWebView recipe={item.rowData} />;
        }
        case PageSection.PANEL_RECIPE_INFO: {
            return <RecipeInfoPanel recipe={item.rowData} />;
        }
        case PageSection.PANEL_RECIPE_INFO_WEB: {
            return <RecipeWithPhotosInfoPanelData recipe={item.rowData} />;
        }
        default: {
            return null;
        }
    }
}

export default PageFlashListItem;
