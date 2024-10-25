import type {IFBEvent} from './event';
import type {IFBPeopleInEvent} from './peopleInEvent';
import type {IFBPhoto} from './photo';
import type {IFBRecipe} from './recipe';
import type {IFBRestaurant} from './restaurant';
import type {IFBReview} from './review';
import type {IFBSqlPhoto} from './sqlPhoto';
import type {IFBUser} from './user';

type IeattaModelsWithoutUser = IFBRestaurant | IFBEvent | IFBPeopleInEvent | IFBPhoto | IFBRecipe | IFBReview | IFBSqlPhoto;
type IeattaModelsWithUser = IeattaModelsWithoutUser | IFBUser;

export type {IeattaModelsWithoutUser, IeattaModelsWithUser};
