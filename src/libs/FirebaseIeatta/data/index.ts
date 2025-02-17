// import { loadEvents } from './Events'
// import { loadPhotos } from './Photos'
// import { loadRecipes } from './Recipes'
// import { loadRestaurants } from './Restaurants'
// import { loadReviews } from './Reviews'

export class MockedFirestore {
    private static instance: MockedFirestore;
    private constructor() {}
    static getInstance() {
        if (!MockedFirestore.instance) {
            MockedFirestore.instance = new MockedFirestore();
        }
        return MockedFirestore.instance;
    }

    // // Restaurant
    // singleRestaurant = (): IFBRestaurant => loadRestaurants()[0]

    // // Event
    // singleEvent = (): IFBEvent => loadEvents()[0]
    // eventsInRestaurant = (): IFBEvent[] => [loadEvents()[0], loadEvents()[1]]
    // // Recipe
    // singleRecipe = (): IFBRecipe => loadRecipes()[0]
    // recipesInRestaurant = (): IFBRecipe[] => {
    //   const _recipes = loadRecipes()
    //   return [
    //     _recipes[0],
    //     _recipes[1],
    //     _recipes[2],
    //     _recipes[3],
    //     _recipes[4],
    //     _recipes[5],
    //   ]
    // }
    // // Photo
    // singlePhoto = (): IFBPhoto => loadPhotos()[0]
    // photosInRestaurant = (): IFBPhoto[] => {
    //   const _photos = loadPhotos()
    //   return [
    //     _photos[0],
    //     _photos[1],
    //     _photos[2],
    //     _photos[3],
    //     _photos[4],
    //     _photos[5],
    //     _photos[6],
    //   ]
    // }
    // // Review
    // singleReview = (): IFBReview => loadReviews()[0]
    // reviewsInRestaurant = (): IFBReview[] => {
    //   const _reviews = loadReviews()
    //   return [_reviews[0], _reviews[1], _reviews[2], _reviews[3]]
    // }
}
