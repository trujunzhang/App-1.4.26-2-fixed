import {setRestaurantIdInSidebar} from '@libs/actions/ieatta/restaurant';
import {FBCollections} from '@libs/Firebase/constant';
import {PageSection} from '@libs/Firebase/list/constant';
import type {IPageRow} from '@libs/Firebase/list/types/page-row';
import type {IDisplayNameTitleRow, IEditModelButtonRow} from '@libs/Firebase/list/types/rows/common';
import type {IPhotoCarouselItemRow, IPhotoItemRow} from '@libs/Firebase/list/types/rows/photo';
import type {IEventsInRestaurantRow, IRestaurantSidebarRow} from '@libs/Firebase/list/types/rows/restaurant';
import type {IReviewSubmitRow} from '@libs/Firebase/list/types/rows/review';
import Navigation from '@libs/Navigation/Navigation';
import * as PhotosPageContextMenu from '@pages/photos/online/Popover/ContextMenu/PhotosPageContextMenu';
import ROUTES from '@src/ROUTES';
import type {IFBRecipe} from '@src/types/firebase';
import {navigationToEditEvent, navigationToEditRecipe, navigationToEditRestaurant, navigationToEditReview} from './editFormUtils';

function pageItemNavigateForEditButtonOnDetailedPage(rowData: IEditModelButtonRow) {
    const {restaurantId, relatedId, modelPath} = rowData;
    switch (modelPath) {
        case FBCollections.Restaurants: {
            navigationToEditRestaurant(relatedId);
            break;
        }
        case FBCollections.Events: {
            navigationToEditEvent({eventId: relatedId, restaurantId});
            break;
        }
        case FBCollections.Recipes: {
            navigationToEditRecipe({recipeId: relatedId, restaurantId});
            break;
        }
        default: {
            break;
        }
    }
}

function pageItemNavigateTo(item: IPageRow) {
    const {rowData} = item;
    switch (item.rowType) {
        /**
 |--------------------------------------------------
 | photo carousel
 |--------------------------------------------------
 */
        case PageSection.PHOTO_GRID_ITEM_WITH_EVENT: {
            const carouselItem: IPhotoCarouselItemRow = rowData as IPhotoCarouselItemRow;
            const {relatedId, photoType, photo} = carouselItem;
            const selected = photo.uniqueId;
            Navigation.navigate(ROUTES.PHOTOS_PAGE_VIEW.getRoute({relatedId, photoType, selected}));
            break;
        }
        case PageSection.PHOTO_CAROUSEL_ITEM_WITH_EVENT: {
            const carouselItem: IPhotoCarouselItemRow = rowData as IPhotoCarouselItemRow;
            const {relatedId, photoType, photo} = carouselItem;
            const initialPhotoId = photo.uniqueId;
            PhotosPageContextMenu.showPhotosPage({initialPhotoId, relatedId, photoType});
            break;
        }

        /**
     |--------------------------------------------------
     | 'Edit button' on the Detailed pages
     |--------------------------------------------------
     */
        case PageSection.DETAILED_EDIT_MODEL_BUTTON: {
            pageItemNavigateForEditButtonOnDetailedPage(rowData);
            break;
        }
        case PageSection.DISPLAY_NAME_TITLE_ROW: {
            const {relatedId, modelPath} = rowData as IDisplayNameTitleRow;
            switch (modelPath) {
                case FBCollections.Restaurants: {
                    Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(relatedId));
                    break;
                }
                case FBCollections.Events: {
                    Navigation.navigate(ROUTES.EVENT_WITH_ID.getRoute(relatedId));
                    break;
                }
                case FBCollections.Recipes: {
                    Navigation.navigate(ROUTES.RECIPE_WITH_ID.getRoute(relatedId));
                    break;
                }
                default: {
                    break;
                }
            }
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
            const photoRow = rowData as IPhotoItemRow;
            const {relatedId, photoType, photo} = photoRow;
            Navigation.navigate(ROUTES.PHOTOS_PAGE_VIEW.getRoute({relatedId, photoType, selected: photo.uniqueId}));
            break;
        }

        /**
     |--------------------------------------------------
     | Reviews in the detailed page
     |--------------------------------------------------
     */
        case PageSection.SECTION_REVIEW: {
            break;
        }
        case PageSection.SECTION_REVIEW_LOGGED_USER: {
            const reviewSubmitRow = rowData as IReviewSubmitRow;
            const {relatedId, reviewType} = reviewSubmitRow;
            navigationToEditReview({relatedId, reviewType});
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
        case PageSection.SIDEBAR_RESTAURANT_ROW: {
            const {restaurant} = rowData as IRestaurantSidebarRow;
            setRestaurantIdInSidebar(restaurant.uniqueId);
            Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(restaurant.uniqueId));
            break;
        }
        case PageSection.SIDEBAR_RESTAURANT_CARD: {
            const {restaurant} = rowData as IRestaurantSidebarRow;
            Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(restaurant.uniqueId));
            break;
        }
        case PageSection.RESTAURANT_EVENT:
        case PageSection.RESTAURANT_EVENT_WEB: {
            const {event} = rowData as IEventsInRestaurantRow;
            Navigation.navigate(ROUTES.EVENT_WITH_ID.getRoute(event.uniqueId));
            break;
        }
        case PageSection.RECIPE_ROW:
        case PageSection.RECIPE_ROW_WEB: {
            const recipe = rowData as IFBRecipe;
            Navigation.navigate(ROUTES.RECIPE_WITH_ID.getRoute(recipe.uniqueId));
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
export {pageItemNavigateTo};
