import type {IFBEvent, IFBPeopleInEvent, IFBPhoto, IFBRecipe, IFBRestaurant, IFBReview} from '@src/types/firebase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ToRestaurantsList = (array: any) => IFBRestaurant[];

type ToEventsList = (array: any) => IFBEvent[];

type ToRecipesList = (array: any) => IFBRecipe[];

type ToPhotosList = (array: any) => IFBPhoto[];
type ToReviewsList = (array: any) => IFBReview[];
type ToPeopleInEventsList = (array: any) => IFBPeopleInEvent;

export type {
    // eslint-disable-next-line import/prefer-default-export
    ToRestaurantsList,
    ToEventsList,
    ToRecipesList,
    ToPhotosList,
    ToReviewsList,
    ToPeopleInEventsList,
};
