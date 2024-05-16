import type {IFBEvent, IFBRestaurant} from '@src/types/firebase';

type IRestaurantSidebarRow = {
    restaurant: IFBRestaurant;
    isFocused: boolean;
};

type IEventsInRestaurantRow = {
    event: IFBEvent;
    shouldShowDivide: boolean;
};

type IMenusInRestaurantRow = {
    restaurantId: string;
    isSmallScreenWidth: boolean;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    IRestaurantSidebarRow,
    IEventsInRestaurantRow,
    IMenusInRestaurantRow,
};
