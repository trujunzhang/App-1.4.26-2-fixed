import type {IFBEvent, IFBPeopleInEvent, IFBPhoto, IFBRecipe, IFBRestaurant, IFBReview, IFBUser} from '@src/types/firebase';

type FBUsers = Record<string, IFBUser>;
type FBEvents = Record<string, IFBEvent>;
type FBUPeopleInEvents = Record<string, IFBPeopleInEvent>;
type FBPhotos = Record<string, IFBPhoto>;
type FBRecipes = Record<string, IFBRecipe>;
type FBRestaurants = Record<string, IFBRestaurant>;
type FBReviews = Record<string, IFBReview>;

export type {FBUsers, FBEvents, FBUPeopleInEvents, FBPhotos, FBRecipes, FBRestaurants, FBReviews};
