/* eslint-disable @typescript-eslint/no-explicit-any */
import {setRestaurantIdInSidebar} from '@libs/actions/ieatta/restaurant';
import {ParseModelReviews} from '@libs/Firebase/appModel';
import {FBCollections} from '@libs/Firebase/constant';
import {PageSection} from '@libs/Firebase/list/constant';
import type {IPageRow} from '@libs/Firebase/list/types/page-row';
import type {IDisplayNameTitleRow, IEditModelButtonRow} from '@libs/Firebase/list/types/rows/common';
import type {IPhotoCarouselItemRow, IPhotoItemRow} from '@libs/Firebase/list/types/rows/photo';
import type {IEventsInRestaurantRow, IRestaurantSidebarRow} from '@libs/Firebase/list/types/rows/restaurant';
import type {IReviewInPageRow, IReviewSubmitRow} from '@libs/Firebase/list/types/rows/review';
import FirebaseHelper from '@libs/Firebase/services/firebase-helper';
import Navigation from '@libs/Navigation/Navigation';
import * as PhotosPageContextMenu from '@pages/photos/online/Popover/ContextMenu/PhotosPageContextMenu';
import ROUTES from '@src/ROUTES';
import type {IFBRecipe} from '@src/types/firebase';
import {navigationToEditEvent, navigationToEditRecipe, navigationToEditRestaurant, navigationToEditReview} from './editFormUtils';

type ActionDeleteNavigateToParams = {
    item: IPageRow;
    onSuccess: () => void;
    onFailure: (error: any) => void;
};
function actionDeleteNavigateTo({item, onSuccess, onFailure}: ActionDeleteNavigateToParams) {
    const {rowData} = item;
    switch (item.rowType) {
        /**
 |--------------------------------------------------
 | photo carousel
 |--------------------------------------------------
 */
        // case PageSection.PHOTO_CAROUSEL_ITEM_WITHOUT_EVENT:
        case PageSection.PHOTO_GRID_ITEM_WITH_EVENT:
        case PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT: {
            const carouselItem: IPhotoCarouselItemRow = rowData as IPhotoCarouselItemRow;
            const selected = carouselItem.photo.uniqueId;
            new FirebaseHelper().deleteData({path: FBCollections.Photos, uniqueId: selected}).then(onSuccess).catch(onFailure);
            break;
        }

        case PageSection.PHOTO_GRID_LOCAL_ITEM: {
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
            break;
        }
        case PageSection.RESTAURANT_EVENT:
        case PageSection.RESTAURANT_EVENT_WEB: {
            const {event} = rowData as IEventsInRestaurantRow;
            break;
        }
        case PageSection.RECIPE_ROW:
        case PageSection.RECIPE_ROW_WEB: {
            const recipe = rowData as IFBRecipe;
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
export {actionDeleteNavigateTo};
