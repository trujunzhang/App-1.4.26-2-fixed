import React from 'react';
import {View} from 'react-native';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import IconWithTooltip from '@components/Ieatta/components/IconWithTooltip';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import type {ISectionTitleRow} from '@libs/Firebase/list/types/rows/common';
import type {IPeopleOrderedTitleRow} from '@libs/Firebase/list/types/rows/event';
import type {IWaiterRow} from '@libs/Firebase/list/types/rows/photo';
import type {IMenusInRestaurantRow} from '@libs/Firebase/list/types/rows/restaurant';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import variables from '@styles/variables';
import ROUTES from '@src/ROUTES';
import SectionCommonTitle from './SectionCommonTitle';

type SectionPeopleOrderedTitleProps = {
    peopleOrderedTitleItem: IPeopleOrderedTitleRow;
};

function SectionPeopleOrderedTitle({peopleOrderedTitleItem}: SectionPeopleOrderedTitleProps) {
    const {restaurantId, eventId} = peopleOrderedTitleItem;

    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useWindowDimensions();

    const rightContent = (
        <IconWithTooltip
            toolTip="add.orderedUser.button"
            onPress={() => {
                Navigation.navigate(ROUTES.ADD_USERS_IN_EVENT.getRoute({restaurantId, eventId}));
            }}
            testID="Add Icon"
            containerStyle={[styles.mr2]}
            iconFill={TailwindColors.blue500}
            iconSrc={Expensicons.Plus}
        />
    );

    return (
        <SectionCommonTitle
            titleRow={peopleOrderedTitleItem}
            rightContent={rightContent}
        />
    );
}

export default React.memo(SectionPeopleOrderedTitle);
