import type React from 'react';
import type {PhotoType} from '@libs/FirebaseIeatta/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {OnCarouselItemPressed} from '@libs/FirebaseIeatta/list/types/rows/photo';
import type {IFBPhoto, IFBSqlPhoto} from '@src/types/firebase';

type CommonPhotosGridListProps = {
    photos: IFBPhoto[] | IFBSqlPhoto[];
    headerContent?: React.ReactNode;
    footerContent?: React.ReactNode;

    gap?: number;
    paddingHorizontal?: number;
    paddingTop?: number;
};

type FBPhotosGridListProps = CommonPhotosGridListProps & {
    relatedId: string;
    photoType: PhotoType | string;
};

type AddWaitersGridListProps = FBPhotosGridListProps & {
    onCarouselItemPressed: OnCarouselItemPressed;
};

type BasePhotosGridListProps = CommonPhotosGridListProps & {
    initialPanelWidth?: number;
    isCoverPage?: boolean;
    shouldShowAsSmallScreen?: boolean;
    generatePageRow: (item: IFBPhoto | IFBSqlPhoto, itemWidth: number, itemHeight: number) => IPageRow;
};

export type {BasePhotosGridListProps, CommonPhotosGridListProps, FBPhotosGridListProps, AddWaitersGridListProps};
