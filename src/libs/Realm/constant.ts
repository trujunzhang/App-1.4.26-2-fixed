// eslint-disable-next-line no-restricted-syntax,import/prefer-default-export,rulesdir/no-inline-named-export
export enum RealmCollections {
    Profiles = 'Profile',
    Restaurants = 'Restaurant',
    Events = 'Event',
    PeopleInEvent = 'PeopleInEvent',
    Recipes = 'Recipe',
    Photos = 'Photo',
    SqlPhotos = 'SqlPhoto',
    Reviews = 'Review',
    Unknown = 'unknown',
}

// eslint-disable-next-line rulesdir/no-inline-named-export,no-restricted-syntax
export enum RealmWriteMode {
    Never = 'never',
    Modified = 'modified',
    All = 'all',
}
