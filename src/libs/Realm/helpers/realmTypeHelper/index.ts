import type {ToEventsList, ToPeopleInEventsList, ToPhotosList, ToRecipesList, ToRestaurantsList, ToReviewsList} from './types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
const toRestaurantsList: ToRestaurantsList = (array: any) => array;
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const toEventsList: ToEventsList = (array: any) => array;
const toRecipesList: ToRecipesList = (array: any) => array;
const toPhotosList: ToPhotosList = (array: any) => array;
const toReviewsList: ToReviewsList = (array: any) => array;
const toPeopleInEventsList: ToPeopleInEventsList = (array: any) => array;

export {
    // eslint-disable-next-line import/prefer-default-export
    toRestaurantsList,
    toEventsList,
    toRecipesList,
    toPhotosList,
    toReviewsList,
    toPeopleInEventsList,
};
