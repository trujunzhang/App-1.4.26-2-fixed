// eslint-disable-next-line no-restricted-syntax,rulesdir/no-inline-named-export
export enum FBCollections {
    Profiles = 'profiles',
    Restaurants = 'restaurants',
    Events = 'events',
    PeopleInEvent = 'peopleinevents',
    Recipes = 'recipes',
    Photos = 'photos',
    Reviews = 'reviews',
    Unknown = 'unknown',
}

// eslint-disable-next-line no-restricted-syntax,rulesdir/no-inline-named-export
export enum FBModelNames {
    Profiles = 'user',
    Restaurants = 'restaurant',
    Events = 'event',
    PeopleInEvent = 'peopleinevent',
    Recipes = 'recipe',
    Waiters = 'waiter',
    Photos = 'photo',
    Reviews = 'review',
}

// eslint-disable-next-line no-restricted-syntax,rulesdir/no-inline-named-export
export enum FBRemoveType {
    Restaurants = 'restaurants',
    Events = 'events',
    PeopleInEvent = 'peopleinevents', // People in Event
    OrderedRecipe = 'OrderedRecipe', // Ordered recipe in PeopleInEvent
    Recipes = 'recipes',
    Photos = 'photos',
    Reviews = 'reviews',
    // For remove
    Waiter = 'waiter',
}

// eslint-disable-next-line no-restricted-syntax,rulesdir/no-inline-named-export
export enum PhotoType {
    User = 'user',
    Restaurant = 'restaurant',
    Recipe = 'recipe',
    Waiter = 'waiter',
    Unknown = 'unknown',
}

// eslint-disable-next-line no-restricted-syntax,rulesdir/no-inline-named-export
export enum ReviewType {
    Restaurant = 'restaurant',
    Event = 'event',
    Recipe = 'recipe',
    Unknown = 'unknown',
}
