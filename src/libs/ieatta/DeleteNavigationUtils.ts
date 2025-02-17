/* eslint-disable @typescript-eslint/no-explicit-any */
import {FBCollections} from '@libs/FirebaseIeatta/constant';
import {PageSection} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {IUserInEventRow} from '@libs/FirebaseIeatta/list/types/rows/event';
import type {IPhotoCarouselItemRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import type {IEventsInRestaurantRow, IRestaurantSidebarRow} from '@libs/FirebaseIeatta/list/types/rows/restaurant';
import type {IReviewInPageRow} from '@libs/FirebaseIeatta/list/types/rows/review';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
// import * as PhotosPageContextMenu from '@pages/photos/online/Popover/ContextMenu/PhotosPageContextMenu';
import type {IFBRecipe} from '@src/types/firebase';

type ActionDeleteNavigateToParams = {
    item: IPageRow;
    onSuccess: () => void;
    onFailure: (error: any) => void;
};
function actionDeleteNavigateTo({item, onSuccess, onFailure}: ActionDeleteNavigateToParams) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        /**
         |--------------------------------------------------
         | Event
         |--------------------------------------------------
         */
        case PageSection.EVENT_USER:
        case PageSection.EVENT_USER_WEB: {
            const {peopleInEvent, user, recipes, showDivide} = rowData as IUserInEventRow;
            new FirebaseHelper().deleteData({path: FBCollections.PeopleInEvent, uniqueId: peopleInEvent.uniqueId});
            break;
        }
        default: {
            break;
        }
    }
}

// eslint-disable-next-line import/prefer-default-export
export {actionDeleteNavigateTo};
