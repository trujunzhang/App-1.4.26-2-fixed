import React from 'react';
import type {PhotoType} from '@libs/Firebase/constant';
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

type BasePhotosGridListProps = CommonPhotosGridListProps & {
    renderPhoto: (item: IFBPhoto | IFBSqlPhoto, itemHeight: number) => React.ReactNode;
};

export type {BasePhotosGridListProps, CommonPhotosGridListProps, FBPhotosGridListProps};
