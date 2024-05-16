import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import SectionCommonTitle from '@components/Ieatta/detailedPage/common/SectionCommonTitle';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import type {ISectionTitleRow} from '@libs/Firebase/list/types/rows/common';
import type {IMenusInRestaurantRow} from '@libs/Firebase/list/types/rows/restaurant';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';

type SectionMenuTitleProps = {
    menuRow: IMenusInRestaurantRow;
};

function SectionMenuTitle({menuRow}: SectionMenuTitleProps) {
    const styles = useThemeStyles();
    const titleRow: ISectionTitleRow = {
        // title: 'On the Menu',
        title: 'sections.titles.onTheMenu',
        isSmallScreenWidth: menuRow.isSmallScreenWidth,
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
            rightContent={menuRow.isSmallScreenWidth && rightContent}
        />
    );
}

export default React.memo(SectionMenuTitle);
