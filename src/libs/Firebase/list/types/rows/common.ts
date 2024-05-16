import type {FBCollections} from '@libs/Firebase/constant';
import type {TranslationPaths} from '@src/languages/types';
import type {IFBEvent} from '@src/types/firebase';

type ISectionTitleRow = {
    title: TranslationPaths;
    titleColor?: string;
    isSmallScreenWidth: boolean;
};

type ISectionEmptyRow = {
    emptyHint: TranslationPaths;
};

type IEditModelButtonRow = {
    relatedId: string;
    buttonTag: TranslationPaths;
    modelPath: FBCollections;
};

type IRestaurantTitleInEventRow = {
    restaurantId: string;
    displayName: string;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    ISectionTitleRow,
    ISectionEmptyRow,
    IEditModelButtonRow,
    IRestaurantTitleInEventRow,
};
