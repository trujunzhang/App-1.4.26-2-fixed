import type {FBCollections} from '@libs/FirebaseIeatta/constant';
import type {IeattaModelsWithoutUser, IFBRestaurant, IFBUser} from '@src/types/firebase';
import type {PreferredTheme} from '@src/types/onyx';

type GetData = {path: FBCollections; id: string};

type SetData = {
    path: FBCollections;
    model: IeattaModelsWithoutUser;
};

type CoverData = {
    originalUrl: string;
};

type UpdateCover = {
    path: FBCollections.Restaurants | FBCollections.Recipes;
    uniqueId: string;
    coverData: CoverData;
};

type UserProperties = {
    originalUrl?: string;
    username?: string;
    /** First name of the current user from their personal details */
    firstName?: string;
    /** Last name of the current user from their personal details */
    lastName?: string;
    // The theme setting set by the user in preferences.
    // This can be either "light", "dark" or "system"
    preferredTheme?: PreferredTheme;
    /** Indicates which locale should be used */
    preferredLocale?: string;
};

type UpdateUserProperties = {
    userId: string;
    properties: UserProperties;
};

type DeleteData = {path: FBCollections; uniqueId: string};

type IFirebaseHelper = {
    /**
     |--------------------------------------------------
     | Get Data
     |--------------------------------------------------
     */
    getData({path, id}: GetData): Promise<IeattaModelsWithoutUser>;

    /**
     |--------------------------------------------------
     | Set Data
     |--------------------------------------------------
     */
    setData({path, model}: SetData): Promise<void>;

    /**
     |--------------------------------------------------
     | Update the cover of restaurants and recipes
     |--------------------------------------------------
     */
    updateCover({path, uniqueId, coverData}: UpdateCover): Promise<void>;

    /**
     |--------------------------------------------------
     | Set Data for user
     |--------------------------------------------------
     */
    saveUser(model: IFBUser): Promise<void>;

    /**
     |--------------------------------------------------
     | Set properties for user
     |--------------------------------------------------
     */
    updateUserProperties({userId, properties}: UpdateUserProperties): Promise<void>;

    /**
     |--------------------------------------------------
     | Get User Data by email
     |--------------------------------------------------
     */
    getUserByEmail(email: string): Promise<IFBUser | null | undefined>;

    /**
     |--------------------------------------------------
     | Delete Data
     |--------------------------------------------------
     */
    deleteData({path, uniqueId}: DeleteData): Promise<void>;

    /**
     |--------------------------------------------------
     | Get the first restaurant
     |--------------------------------------------------
     */
    getFirstRestaurant(): Promise<IFBRestaurant | null | undefined>;
};

export type {GetData, SetData, CoverData, UpdateCover, DeleteData, UpdateUserProperties, UserProperties};

export default IFirebaseHelper;
