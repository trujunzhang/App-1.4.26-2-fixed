import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import type {ISectionTitleRow} from '@libs/Firebase/list/types/rows/common';
import type {IWaiterRow} from '@libs/Firebase/list/types/rows/photo';
import type {IMenusInRestaurantRow} from '@libs/Firebase/list/types/rows/restaurant';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import SectionCommonTitle from './SectionCommonTitle';

type SectionWaiterTitleProps = {
    waiterItem: IWaiterRow;
};

function SectionWaiterTitle({waiterItem}: SectionWaiterTitleProps) {
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();

    const titleRow: ISectionTitleRow = {
        title: 'sections.titles.eventWaiters',
        isSmallScreenWidth,
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

export default React.memo(SectionWaiterTitle);
