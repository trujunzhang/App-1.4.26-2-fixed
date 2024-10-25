import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import type {ISectionTitleRow} from '@libs/Firebase/list/types/rows/common';
import type {IPhotoRow} from '@libs/Firebase/list/types/rows/photo';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import ROUTES from '@src/ROUTES';
import SectionCommonTitle from './SectionCommonTitle';

type SectionPhotoTitleProps = {
    photoItem: IPhotoRow;
};

function SectionPhotoTitle({photoItem}: SectionPhotoTitleProps) {
    const {relatedId, photoType} = photoItem;
    const titleRow: ISectionTitleRow = {
        title: 'sections.titles.photos',
        isSmallScreenWidth: true,
    };

    return (
        <SectionCommonTitle
            titleRow={titleRow}
            shouldShowPlusIcon
            plusIconToolTip="add.photo.title"
            onPlusIconPressed={() => {
                Navigation.navigate(ROUTES.TAKE_PHOTO.getRoute({relatedId, photoType}));
            }}
        />
    );
}

export default React.memo(SectionPhotoTitle);
