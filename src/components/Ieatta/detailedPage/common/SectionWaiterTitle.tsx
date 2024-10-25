import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import type {ISectionTitleRow} from '@libs/Firebase/list/types/rows/common';
import type {IWaiterRow} from '@libs/Firebase/list/types/rows/photo';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import ROUTES from '@src/ROUTES';
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

    return (
        <SectionCommonTitle
            titleRow={titleRow}
            shouldShowPlusIcon
            plusIconToolTip="add.waiter.title"
            onPlusIconPressed={() => {
                // Navigation.navigate(ROUTES.ADD_WAITERS.getRoute({relatedId, photoType}));
            }}
        />
    );
}

export default React.memo(SectionWaiterTitle);
