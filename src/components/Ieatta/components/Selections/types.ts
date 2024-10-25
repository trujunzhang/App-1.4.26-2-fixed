import type {ListItem, UserListItemProps} from '@components/SelectionList/types';

type ChoiceRecipeItem = ListItem & {
    recipeId: string;
    recipeUrl: string;
};

type ChoiceOrderedUserItem = ListItem & {
    userId: string;
    userUrl: string;
};

type AddRecipeListItemProps<TItem extends ChoiceRecipeItem> = UserListItemProps<TItem>;
type AddUserListItemProps<TItem extends ChoiceOrderedUserItem> = UserListItemProps<TItem>;

export type {AddRecipeListItemProps, AddUserListItemProps, ChoiceRecipeItem, ChoiceOrderedUserItem};
