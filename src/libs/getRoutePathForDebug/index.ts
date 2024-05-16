import PropTypes from 'prop-types';
import {PhotoType, ReviewType} from '@libs/Firebase/constant';
import Log from '@libs/Log';
import Navigation from '@navigation/Navigation';
import {showPhotosPage} from '@pages/photos/online/pageview/web/ContextMenu/PhotosPageContextMenu';
import reportPropTypes from '@expPages/reportPropTypes';
import Config from '@src/CONFIG';
import ROUTES from '@src/ROUTES';
import type {IFBEvent, IFBPeopleInEvent, IFBPhoto, IFBRecipe, IFBRestaurant, IFBReview, IFBUser} from '@src/types/firebase';
import type {Report} from './types';

type DebugAndSwitchRouterProps = {
    chatReports: Report[];
    fbUsers: IFBUser[];
    fbRestaurants: IFBRestaurant[];
    fbEvents: IFBEvent[];
    fbPeopleInEvents: IFBPeopleInEvent[];
    fbRecipes: IFBRecipe[];
    fbPhotos: IFBPhoto[];
    fbReviews: IFBReview[];
};

const restaurantId = '035ac47c-5781-4da8-af21-35c97a46c101';
// const restaurantId = '055e6f70880d2c67e89bb157576a2f6f' // temp
const eventId = '4918e004-9792-40e4-9b3e-2040e7f028d1';
const recipeId = '5d30724f-4d13-456c-8a50-358ac3861786';
const reviewId = 'c463206e-b39b-470c-b9c5-9d56642fd8e6';
const peopleInEventId = '3245f143-8281-51f6-7c4m-3160e8g136f1_MpNc0BKhXl';
// [
//   "XrsaazbaMVYIezLk7qHMJSQuIqu2",
//   "onXIPCE8oMYaN2SmJglSWVOeMgF2",
//   "W8GI01AwlQNnU8RLSOknFruGrV13",
//   "nJxJwoMiU5Xy3yhXxprUIeBxhx73",
//   "uqZjWH9GumZnla2ezzzwxyxgIvg2",
//   "xJj0zh0FPcdxJL6C7vUm2EX4X753",
//   "ogz2i07SYfR4fM7qS5MwK7rEyBW2",
//   "h9NIN7G44oWgo9gLJLnt3IhiURt2",
//   "kY4p1BjfyvN472kWaGKWM5tS7Mh2"
// ]
// userId: 'onXIPCE8oMYaN2SmJglSWVOeMgF2',
const userId = 'kY4p1BjfyvN472kWaGKWM5tS7Mh2';

// reviews list
const reviewsList = {
    reviewType: ReviewType.Restaurant,
    relatedId: '035ac47c-5781-4da8-af21-35c97a46c101',
};

// take camera
const takeCamera = {
    relatedId: '035ac47c-5781-4da8-af21-35c97a46c101',
    photoType: PhotoType.Restaurant,
};

// new photo
const newPhoto = {
    imagePath: '',
    relatedId: '035ac47c-5781-4da8-af21-35c97a46c101',
    photoType: PhotoType.Restaurant,
};

// Edit photo
const photoId = '8fda3252-1bdb-4195-8c2d-29a715ddce6f';

// select person
const selectPerson = {
    restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
    eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
};

// select waiter
const selectWaiter = {
    restaurantId: '035ac47c-5781-4da8-af21-35c97a46c101',
    eventId: '4918e004-9792-40e4-9b3e-2040e7f028d1',
};

function getReportId(props: DebugAndSwitchRouterProps) {
    const reports = Object.values(props.chatReports);
    const length = reports.length;
    if (length === 0) {
        return null;
    }
    return reports[Math.max(length - 1, 0)].reportID;
}

export default function getRoutePathForDebug(developingRouteName: string, props: DebugAndSwitchRouterProps) {
    const routeName = developingRouteName;

    switch (routeName) {
        case ROUTES.REPORT_WITH_ID_DETAILS.route: {
            const reportID = getReportId(props);
            if (reportID !== null) {
                return ROUTES.REPORT_WITH_ID_DETAILS.getRoute(reportID);
            }
            return null;
        }

        /**
         * Detailed pages
         */
        case ROUTES.RESTAURANT_WITH_ID.route: {
            return ROUTES.RESTAURANT_WITH_ID.getRoute(restaurantId);
        }
        case ROUTES.EVENT_WITH_ID.route: {
            return ROUTES.EVENT_WITH_ID.getRoute(eventId);
        }
        case ROUTES.RECIPE_WITH_ID.route: {
            return ROUTES.RECIPE_WITH_ID.getRoute(recipeId);
        }
        /**
         * Edit pages
         */
        case ROUTES.EDIT_RESTAURANT.route: {
            return ROUTES.EDIT_RESTAURANT.getRoute(restaurantId);
        }
        case ROUTES.EDIT_EVENT.route: {
            return ROUTES.EDIT_EVENT.getRoute(eventId);
        }
        case ROUTES.EDIT_RECIPE.route: {
            return ROUTES.EDIT_RECIPE.getRoute(recipeId);
        }
        case ROUTES.EDIT_REVIEW.route: {
            return ROUTES.EDIT_REVIEW.getRoute({reviewId, relatedId: restaurantId, reviewType: ReviewType.Restaurant});
        }
        /**
         * Add (recipes/users) pages
         */
        case ROUTES.ADD_RECIPES_IN_EVENT.route: {
            return ROUTES.ADD_RECIPES_IN_EVENT.getRoute({restaurantId, peopleInEventId});
        }
        case ROUTES.ADD_USERS_IN_EVENT.route: {
            return ROUTES.ADD_USERS_IN_EVENT.getRoute({restaurantId, eventId});
        }
        /**
|--------------------------------------------------
| photo carousel
|--------------------------------------------------
*/
        case ROUTES.PHOTOS_PAGE.route: {
            // showPhotosPage(photoId, restaurantId, PhotoType.Restaurant);
            return null;
        }

        default: {
            return routeName;
        }
    }
}
