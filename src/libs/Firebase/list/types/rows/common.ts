import type {TextStyle, ViewStyle} from 'react-native';
import type {FBCollections} from '@libs/Firebase/constant';
import type {SkeletonViewType} from '@libs/Firebase/list/constant';
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
