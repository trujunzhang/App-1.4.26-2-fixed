import {setRestaurantIdInSidebar} from '@libs/actions/ieatta/restaurant';
import {ParseModelReviews} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {PageSection} from '@libs/Firebase/list/constant';
import type {IPageRow} from '@libs/Firebase/list/types/page-row';
import type {IDisplayNameTitleRow, IEditModelButtonRow} from '@libs/Firebase/list/types/rows/common';
import type {IPhotoCarouselItemRow, IPhotoItemRow} from '@libs/Firebase/list/types/rows/photo';
import type {IEventsInRestaurantRow, IRestaurantSidebarRow} from '@libs/Firebase/list/types/rows/restaurant';
import type {IReviewInPageRow, IReviewSubmitRow} from '@libs/Firebase/list/types/rows/review';
import Navigation from '@libs/Navigation/Navigation';
import * as PhotosPageContextMenu from '@pages/photos/online/Popover/ContextMenu/PhotosPageContextMenu';
import ROUTES from '@src/ROUTES';
import type {IFBRecipe} from '@src/types/firebase';
import {navigationToEditEvent, navigationToEditRecipe, navigationToEditRestaurant, navigationToEditReview} from './editFormUtils';

function actionEditNavigateTo(item: IPageRow) {
    const {rowData} = item;
    switch (item.rowType) {
        /**
         |--------------------------------------------------
         | photo carousel
         |--------------------------------------------------
         */
        case PageSection.PHOTO_GRID_ITEM_WITH_EVENT: {
            break;
        }
        case PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT: {
            break;
        }

        /**
         |--------------------------------------------------
         | 'Edit button' on the Detailed pages
         |--------------------------------------------------
         */
        case PageSection.DETAILED_EDIT_MODEL_BUTTON: {
            break;
        }
        case PageSection.DISPLAY_NAME_TITLE_ROW: {
            break;
        }
        case PageSection.COMMON_TITLE: {
            break;
        }
        /**
         |--------------------------------------------------
         | Photos in the detailed page
         |--------------------------------------------------
         */
        case PageSection.SECTION_PHOTO_TITLE: {
            break;
        }
        case PageSection.SECTION_PHOTO_ROW: {
            break;
        }
        case PageSection.SECTION_PHOTO_ITEM: {
            break;
        }

        /**
         |--------------------------------------------------
         | Reviews in the detailed page
         |--------------------------------------------------
         */
        case PageSection.SECTION_REVIEW: {
            const reviewRow = rowData as IReviewInPageRow;
            const {review} = reviewRow;
            navigationToEditReview({
                reviewId: review.uniqueId,
                relatedId: ParseModelReviews.getRelatedId(review),
                reviewType: review.reviewType,
            });
            break;
        }
        case PageSection.SECTION_REVIEW_LOGGED_USER: {
            break;
        }
        /**
         |--------------------------------------------------
         | Restaurant
         |--------------------------------------------------
         */
        case PageSection.PANEL_RESTAURANT_INFO: {
            break;
        }
        case PageSection.PANEL_RESTAURANT_INFO_WEB: {
            break;
        }
        case PageSection.RESTAURANT_ADDRESS: {
            break;
        }
        case PageSection.RESTAURANT_EVENT_EMPTY: {
            break;
        }
        case PageSection.SIDEBAR_RESTAURANT_ROW:
        case PageSection.SIDEBAR_RESTAURANT_CARD: {
            const {restaurant} = rowData as IRestaurantSidebarRow;
            navigationToEditRestaurant(restaurant.uniqueId);
            break;
        }
        case PageSection.RESTAURANT_EVENT:
        case PageSection.RESTAURANT_EVENT_WEB: {
            const {event} = rowData as IEventsInRestaurantRow;
            navigationToEditEvent({eventId: event.uniqueId, restaurantId: event.restaurantId});
            break;
        }
        case PageSection.RECIPE_ROW:
        case PageSection.RECIPE_ROW_WEB: {
            const recipe = rowData as IFBRecipe;
            navigationToEditRecipe({recipeId: recipe.uniqueId, restaurantId: recipe.restaurantId});
            break;
        }
        case PageSection.RESTAURANT_MENU_TITLE: {
            break;
        }
        case PageSection.RESTAURANT_MENU_ROW: {
            break;
        }
        default: {
            break;
        }
    }
}

// eslint-disable-next-line import/prefer-default-export
export {actionEditNavigateTo};
