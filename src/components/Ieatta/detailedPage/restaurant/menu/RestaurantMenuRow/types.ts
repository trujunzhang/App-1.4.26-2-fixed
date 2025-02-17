import type {IMenusInRestaurantRow} from '@libs/FirebaseIeatta/list/types/rows/restaurant';
import type {IFBRecipe} from '@src/types/firebase';

type RestaurantMenuRowProps = {
    menuRow: IMenusInRestaurantRow;
};

type MenuViewProps = {
    recipe: IFBRecipe;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    RestaurantMenuRowProps,
    MenuViewProps,
};
