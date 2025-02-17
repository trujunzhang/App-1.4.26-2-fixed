import type {IFBEvent, IFBPeopleInEvent, IFBRecipe, IFBRestaurant} from '@src/types/firebase';
import type {PersonalDetails} from '@src/types/onyx';
import type {ISectionTitleRow} from './common';

type IEventInfoPanelRow = {
    event: IFBEvent;
    restaurant: IFBRestaurant | undefined;
};

type IPeopleOrderedTitleRow = ISectionTitleRow & {
    restaurantId: string;
    eventId: string;
};

type IUserInEventRow = {
    peopleInEvent: IFBPeopleInEvent;
    user: PersonalDetails;
    recipes: IFBRecipe[];
    showDivide: boolean;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    IEventInfoPanelRow,
    IPeopleOrderedTitleRow,
    IUserInEventRow,
};
