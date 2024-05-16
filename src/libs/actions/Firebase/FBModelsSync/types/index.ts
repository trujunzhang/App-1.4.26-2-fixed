import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import type {IFBEvent, IFBPeopleInEvent, IFBPhoto, IFBRecipe, IFBRestaurant, IFBReview, IFBUser} from '@src/types/firebase';

type QuerySnapshot = FirebaseFirestoreTypes.QuerySnapshot;

type SyncFBUsers = (querySnapshot: QuerySnapshot) => void;
type SyncFBRestaurants = (querySnapshot: QuerySnapshot) => void;
type SyncFBEvents = (querySnapshot: QuerySnapshot) => void;
type SyncFBRecipes = (querySnapshot: QuerySnapshot) => void;
type SyncFBPhotos = (querySnapshot: QuerySnapshot) => void;
type SyncFBReviews = (querySnapshot: QuerySnapshot) => void;
type SyncFBPeopleInEvents = (querySnapshot: QuerySnapshot) => void;

export type {QuerySnapshot, SyncFBUsers, SyncFBRestaurants, SyncFBEvents, SyncFBRecipes, SyncFBPhotos, SyncFBReviews, SyncFBPeopleInEvents};
