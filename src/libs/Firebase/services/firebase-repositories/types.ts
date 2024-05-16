type IFirebaseRepositories = {
    listenUsers: () => () => void;
    listenRestaurants: () => () => void;
    listenEvents: () => () => void;
    listenRecipes: () => () => void;
    listenReviews: () => () => void;
    listenPhotos: () => () => void;
    listenPeopleInEvents: () => () => void;
};

export default IFirebaseRepositories;
