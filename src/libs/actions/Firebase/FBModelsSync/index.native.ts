// eslint-disable-next-line no-restricted-imports

//
// const syncFBUsers: SyncFBUsers = (querySnapshot: QuerySnapshot) => {
//     const dict: Record<string, IFBUser> = Object.assign({}, ..._.map(querySnapshot.docs, (documentSnapshot) => {
//         const model = documentSnapshot.data() as IFBUser
//         return ({[model.id]: model});
//     }));
//     Log.info(`[sync firebase users] length: ${Object.keys(dict).length}`);
//     Onyx.set(ONYXKEYS.COLLECTION.FB_PROFILES, dict);
// }
//
// const syncFBRestaurants: SyncFBRestaurants = (querySnapshot: QuerySnapshot) => {
//     const dict: Record<string, IFBRestaurant> = Object.assign({}, ..._.map(querySnapshot.docs, (documentSnapshot) => {
//         const model = documentSnapshot.data() as IFBRestaurant
//         return ({[model.uniqueId]: model});
//     }));
//     Log.info(`[sync firebase restaurants] length: ${Object.keys(dict).length}`);
//     Onyx.set(ONYXKEYS.COLLECTION.FB_RESTAURANTS, dict);
// }
//
// const syncFBEvents: SyncFBEvents = (querySnapshot: QuerySnapshot) => {
//     const dict: Record<string, IFBEvent> = Object.assign({}, ..._.map(querySnapshot.docs, (documentSnapshot) => {
//         const model = documentSnapshot.data() as IFBEvent
//         return ({[model.uniqueId]: model});
//     }));
//     Log.info(`[sync firebase events] length: ${Object.keys(dict).length}`);
//     Onyx.set(ONYXKEYS.COLLECTION.FB_EVENTS, dict);
// }
//
// const syncFBRecipes: SyncFBRecipes = (querySnapshot: QuerySnapshot) => {
//     const dict: Record<string, IFBRecipe> = Object.assign({}, ..._.map(querySnapshot.docs, (documentSnapshot) => {
//         const model = documentSnapshot.data() as IFBRecipe
//         return ({[model.uniqueId]: model});
//     }));
//     Log.info(`[sync firebase recipes] length: ${Object.keys(dict).length}`);
//     Onyx.set(ONYXKEYS.COLLECTION.FB_RECIPES, dict);
// }
//
// const syncFBPhotos: SyncFBPhotos = (querySnapshot: QuerySnapshot) => {
//     const dict: Record<string, IFBPhoto> = Object.assign({}, ..._.map(querySnapshot.docs, (documentSnapshot) => {
//         const model = documentSnapshot.data() as IFBPhoto
//         return ({[model.uniqueId]: model});
//     }));
//     Log.info(`[sync firebase photos] length: ${Object.keys(dict).length}`);
//     Onyx.set(ONYXKEYS.COLLECTION.FB_PHOTOS, dict);
// }
//
// const syncFBReviews: SyncFBReviews = (querySnapshot: QuerySnapshot) => {
//     const dict: Record<string, IFBReview> = Object.assign({}, ..._.map(querySnapshot.docs, (documentSnapshot) => {
//         const model = documentSnapshot.data() as IFBReview
//         return ({[model.uniqueId]: model});
//     }));
//     Log.info(`[sync firebase reviews] length: ${Object.keys(dict).length}`);
//     Onyx.set(ONYXKEYS.COLLECTION.FB_REVIEWS, dict);
// }
//
// const syncFBPeopleInEvents: SyncFBPeopleInEvents = (querySnapshot: QuerySnapshot) => {
//     const dict: Record<string, IFBPeopleInEvent> = Object.assign({}, ..._.map(querySnapshot.docs, (documentSnapshot) => {
//         const model = documentSnapshot.data() as IFBPeopleInEvent
//         return ({[model.uniqueId]: model});
//     }));
//     Log.info(`[sync firebase people in events] length: ${Object.keys(dict).length}`);
//     Onyx.set(ONYXKEYS.COLLECTION.FB_PEOPLE_IN_EVENTS, dict);
// }

export // syncFBUsers,
// syncFBRestaurants,
// syncFBEvents,
// syncFBRecipes,
// syncFBPhotos,
// syncFBReviews,
// syncFBPeopleInEvents,
 {};
