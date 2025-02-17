import type {TextStyle} from 'react-native';
import type {FBCollections} from '@libs/FirebaseIeatta/constant';
import type {SkeletonViewType} from '@libs/FirebaseIeatta/list/constant';
import type {TranslationPaths} from '@src/languages/types';

type ISectionTitleRow = {
    title: TranslationPaths;
    titleColor?: string;
    isSmallScreenWidth: boolean;
};

type ISectionEmptyRow = {
    emptyHint: TranslationPaths;
};

type IEditModelButtonRow = {
    restaurantId: string;
    relatedId: string;
    buttonTag: TranslationPaths;
    modelPath: FBCollections;
};

type IDisplayNameTitleRow = {
    relatedId: string;
    modelPath: FBCollections;
    displayName: string;
    fontSize?: TextStyle;
};

type ISkeletonViewRow = {
    skeletonViewType: SkeletonViewType;
};
export type {ISectionTitleRow, ISectionEmptyRow, IEditModelButtonRow, IDisplayNameTitleRow, ISkeletonViewRow};
