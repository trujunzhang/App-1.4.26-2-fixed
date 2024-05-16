import type {IRestaurantSidebarRow} from '@libs/Firebase/list/types/rows/restaurant';
import type {IFBRestaurant} from '@src/types/firebase';

type RestaurantItemProps = {
    rowData: IRestaurantSidebarRow;
    hovered: boolean;
};

export type {RestaurantItemProps};
