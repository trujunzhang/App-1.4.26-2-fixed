import type {IFBEvent, IFBPeopleInEvent, IFBPhoto, IFBRecipe, IFBRestaurant, IFBReview, IFBUser} from '@src/types/firebase';

type QueryDocumentSnapshot = {
    data(): IFBUser | IFBRestaurant | IFBEvent | IFBRecipe | IFBPhoto | IFBReview | IFBPeopleInEvent;
};

type QuerySnapshot = {
    docs: QueryDocumentSnapshot[];
};

type SyncFBUsers = (querySnapshot: QuerySnapshot) => void;
type SyncFBRestaurants = (models: IFBRestaurant[]) => void;
type SyncFBEvents = (models: IFBEvent[]) => void;
type SyncFBRecipes = (models: IFBRecipe[]) => void;
type SyncFBPhotos = (models: IFBPhoto[]) => void;
type SyncFBReviews = (models: IFBReview[]) => void;
type SyncFBPeopleInEvents = (models: IFBPeopleInEvent[]) => void;

export type {QuerySnapshot, SyncFBUsers, SyncFBRestaurants, SyncFBEvents, SyncFBRecipes, SyncFBPhotos, SyncFBReviews, SyncFBPeopleInEvents};
