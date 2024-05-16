import type {FBCollections} from '@libs/Firebase/constant';
import type {IFBEvent, IFBPeopleInEvent, IFBPhoto, IFBRecipe, IFBRestaurant, IFBReview, IFBUser} from '@src/types/firebase';

type GetData = {path: FBCollections; id: string};
type IeattaModelsWithoutUser = IFBRestaurant | IFBEvent | IFBPeopleInEvent | IFBPhoto | IFBRecipe | IFBReview;
type IeattaModelsWithUser = IeattaModelsWithoutUser | IFBUser;

type SetData = {
    path: FBCollections;
    model: IeattaModelsWithoutUser;
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

export type {GetData, SetData, DeleteData, IeattaModelsWithoutUser, IeattaModelsWithUser};

export default IFirebaseHelper;
