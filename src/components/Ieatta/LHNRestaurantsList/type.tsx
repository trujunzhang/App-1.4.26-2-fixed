/* eslint-disable import/prefer-default-export */
import type {IRestaurantSidebarRow} from '@libs/FirebaseIeatta/list/types/rows/restaurant';

type RestaurantItemProps = {
    rowData: IRestaurantSidebarRow;
    hovered: boolean;
};

export type {RestaurantItemProps};
