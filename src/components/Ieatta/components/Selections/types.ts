import type {ListItem, ListItemProps, UserListItemProps} from '@components/Ieatta/components/SelectionList/types';
import type {IFBPhoto, IFBRestaurant} from '@src/types/firebase';

type ChoiceRecipeItem = ListItem & {
    recipeId: string;
    recipeUrl: string;
};

type ChoiceWaiterItem = ListItem & IFBPhoto;

type ChoiceOrderedUserItem = ListItem & {
    userId: string;
    userUrl?: string;
};

type SearchRestaurantsItem = ListItem & IFBRestaurant;

type AddRecipeListItemProps<TItem extends ListItem> = UserListItemProps<TItem>;

type AddUserListItemProps<TItem extends ListItem> = UserListItemProps<TItem>;
type SearchRestaurantsItemProps<TItem extends ListItem> = ListItemProps<TItem>;

export type {AddRecipeListItemProps, AddUserListItemProps, ChoiceRecipeItem, ChoiceOrderedUserItem, SearchRestaurantsItem, SearchRestaurantsItemProps, ChoiceWaiterItem};
