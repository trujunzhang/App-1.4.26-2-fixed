import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import SectionCommonTitle from '@components/Ieatta/detailedPage/common/SectionCommonTitle';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import type {ISectionTitleRow} from '@libs/Firebase/list/types/rows/common';
import {IPhotoRow} from '@libs/Firebase/list/types/rows/photo';
import type {IMenusInRestaurantRow} from '@libs/Firebase/list/types/rows/restaurant';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';

type SectionPhotoTitleProps = {
    photoItem: IPhotoRow;
};

function SectionPhotoTitle({photoItem}: SectionPhotoTitleProps) {
    const styles = useThemeStyles();
    const titleRow: ISectionTitleRow = {
        title: 'sections.titles.photos',
        isSmallScreenWidth: true,
    };

    const rightContent = (
        <View style={[]}>
            <Icon
                fill={TailwindColors.blue500}
                width={variables.iconSizeNormal}
                height={variables.iconSizeNormal}
                src={Expensicons.Plus}
            />
        </View>
    );

    return (
        <SectionCommonTitle
            titleRow={titleRow}
            rightContent={rightContent}
        />
    );
}

export default React.memo(SectionPhotoTitle);
