import type {FBCollections} from '@libs/FirebaseIeatta/constant';
import type {IeattaModelsWithoutUser, IFBUser} from '@src/types/firebase';

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
};

export type {GetData, SetData, CoverData, UpdateCover, DeleteData};

export default IFirebaseHelper;
