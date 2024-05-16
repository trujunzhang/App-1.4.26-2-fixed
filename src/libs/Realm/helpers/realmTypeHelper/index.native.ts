import type Realm from 'realm';
// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';
import type {RealmCollections} from '@libs/Realm/constant';
import type {IFBEvent, IFBPeopleInEvent, IFBPhoto, IFBRecipe, IFBRestaurant, IFBReview} from '@src/types/firebase';
import type {ToEventsList, ToPeopleInEventsList, ToPhotosList, ToRecipesList, ToRestaurantsList, ToReviewsList} from './types';

// const toRestaurantsList: ToRestaurantsList = (array: Realm.Results<RealmCollections.Restaurants>) => array as unknown as IFBRestaurant[];
const toRestaurantsList: ToRestaurantsList = (array: Realm.Results<RealmCollections.Restaurants>) => {
    return _.map(array, (item) => {
        return item as unknown as IFBRestaurant;
    });
};
const toEventsList: ToEventsList = (array: Realm.Results<RealmCollections.Events>) => {
    return _.map(array, (item) => {
        return item as unknown as IFBEvent;
    });
};

const toRecipesList: ToRecipesList = (array: Realm.Results<RealmCollections.Recipes>) => {
    return _.map(array, (item) => {
        return item as unknown as IFBRecipe;
    });
};

const toPhotosList: ToPhotosList = (array: Realm.Results<RealmCollections.Photos>) => {
    return _.map(array, (item) => {
        return item as unknown as IFBPhoto;
    });
};
const toReviewsList: ToReviewsList = (array: Realm.Results<RealmCollections.Reviews>) => {
    return _.map(array, (item) => {
        return item as unknown as IFBReview;
    });
};

const toPeopleInEventsList: ToPeopleInEventsList = (array: Realm.Results<RealmCollections.PeopleInEvent>) => {
    return _.map(array, (item) => {
        return item as unknown as IFBPeopleInEvent;
    });
};

export {
    // eslint-disable-next-line import/prefer-default-export
    toRestaurantsList,
    toEventsList,
    toRecipesList,
    toPhotosList,
    toReviewsList,
    toPeopleInEventsList,
};
