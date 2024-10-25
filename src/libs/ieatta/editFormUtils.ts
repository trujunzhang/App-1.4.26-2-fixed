/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

/* eslint-disable @typescript-eslint/no-explicit-any */
import lodashGet from 'lodash/get';
import Onyx from 'react-native-onyx';
import {updateDraftValuesForEditModelId} from '@libs/actions/FormActions';
import {FBCollections} from '@libs/Firebase/constant';
import Navigation from '@libs/Navigation/Navigation';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {EditEventForm} from '@src/types/form/ieatta/EditEventForm';
import type {EditRecipeForm} from '@src/types/form/ieatta/EditRecipeForm';
import type {EditRestaurantForm} from '@src/types/form/ieatta/EditRestaurantForm';
import type {EditReviewForm} from '@src/types/form/ieatta/EditReviewForm';

// Current restaurat draft model is needed for handling
let restaurantDraft: EditRestaurantForm | null = null;
Onyx.connect({
    key: ONYXKEYS.FORMS.IEATTA_RESTAURANT_DRAFT,
    callback: (val) => {
        restaurantDraft = val;
    },
});

// Current event draft model is needed for handling
let eventDraft: EditEventForm | null = null;
Onyx.connect({
    key: ONYXKEYS.FORMS.IEATTA_EVENT_DRAFT,
    callback: (val) => {
        eventDraft = val;
    },
});

// Current recipe draft model is needed for handling
let recipeDraft: EditRecipeForm | null = null;
Onyx.connect({
    key: ONYXKEYS.FORMS.IEATTA_RECIPE_DRAFT,
    callback: (val) => {
        recipeDraft = val;
    },
});

// Current review draft model is needed for handling
let reviewDraft: EditReviewForm | null = null;
Onyx.connect({
    key: ONYXKEYS.FORMS.IEATTA_REVIEW_DRAFT,
    callback: (val) => {
        reviewDraft = val;
    },
});

const emptyRestaurantTag = `${FBCollections.Restaurants}-${CONST.IEATTA_MODEL_ID_EMPTY}`;
const emptyEventTag = `${FBCollections.Events}-${CONST.IEATTA_MODEL_ID_EMPTY}`;
const emptyRecipeTag = `${FBCollections.Recipes}-${CONST.IEATTA_MODEL_ID_EMPTY}`;
const emptyReviewTag = `${FBCollections.Reviews}-${CONST.IEATTA_MODEL_ID_EMPTY}`;
const emptyPeopleInEventTag = `${FBCollections.PeopleInEvent}-${CONST.IEATTA_MODEL_ID_EMPTY}`;

function getEditFormValidDraftValues(formID: string, currentEditFormUniqueId: string, currentDraftValues: Record<string, any>) {
    const draftFormUniqueId = '';
    // switch (formID) {
    //     case ONYXKEYS.FORMS.IEATTA_RESTAURANT: {
    //         draftFormUniqueId = lodashGet(restaurantDraft, 'editFormUniqueId', '');
    //         break;
    //     }
    //     case ONYXKEYS.FORMS.IEATTA_EVENT: {
    //         draftFormUniqueId = lodashGet(eventDraft, 'editFormUniqueId', '');
    //         break;
    //     }
    //     case ONYXKEYS.FORMS.IEATTA_RECIPE: {
    //         draftFormUniqueId = lodashGet(recipeDraft, 'editFormUniqueId', '');
    //         break;
    //     }
    //     default: {
    //         break;
    //     }
    // }
    if (draftFormUniqueId !== currentEditFormUniqueId) {
        return {};
    }
    return currentDraftValues;
}

function navigationToEditRestaurant(restaurantId: string) {
    updateDraftValuesForEditModelId({
        formID: ONYXKEYS.FORMS.IEATTA_RESTAURANT,
        editFormUniqueId: restaurantId,
        lastEditFormUniqueId: lodashGet(restaurantDraft ?? {}, 'editFormUniqueId', ''),
    });
    Navigation.navigate(ROUTES.EDIT_RESTAURANT.getRoute(restaurantId));
}
function navigationToEditEvent({eventId = CONST.IEATTA_EDIT_MODEL_NEW, restaurantId}: {eventId?: string; restaurantId: string}) {
    updateDraftValuesForEditModelId({
        formID: ONYXKEYS.FORMS.IEATTA_EVENT,
        editFormUniqueId: eventId,
        lastEditFormUniqueId: lodashGet(eventDraft ?? {}, 'editFormUniqueId', ''),
    });
    Navigation.navigate(ROUTES.EDIT_EVENT.getRoute({eventId, restaurantId}));
}
function navigationToEditRecipe({recipeId = CONST.IEATTA_EDIT_MODEL_NEW, restaurantId}: {recipeId?: string; restaurantId: string}) {
    updateDraftValuesForEditModelId({
        formID: ONYXKEYS.FORMS.IEATTA_RECIPE,
        editFormUniqueId: recipeId,
        lastEditFormUniqueId: lodashGet(recipeDraft ?? {}, 'editFormUniqueId', ''),
    });
    Navigation.navigate(ROUTES.EDIT_RECIPE.getRoute({recipeId, restaurantId}));
}

function navigationToEditReview({reviewId = CONST.IEATTA_EDIT_MODEL_NEW, relatedId, reviewType}: {reviewId?: string; relatedId: string; reviewType: string}) {
    updateDraftValuesForEditModelId({
        formID: ONYXKEYS.FORMS.IEATTA_REVIEW,
        editFormUniqueId: reviewId,
        lastEditFormUniqueId: lodashGet(reviewDraft ?? {}, 'editFormUniqueId', ''),
    });
    Navigation.navigate(ROUTES.EDIT_REVIEW.getRoute({reviewId, relatedId, reviewType}));
}

export {
    navigationToEditRestaurant,
    navigationToEditEvent,
    navigationToEditRecipe,
    navigationToEditReview,
    getEditFormValidDraftValues,
    emptyRestaurantTag,
    emptyEventTag,
    emptyRecipeTag,
    emptyReviewTag,
    emptyPeopleInEventTag,
};
