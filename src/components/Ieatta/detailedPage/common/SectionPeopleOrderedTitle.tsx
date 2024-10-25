import React from 'react';
import * as Expensicons from '@components/Icon/Expensicons';
import IconWithTooltip from '@components/Ieatta/components/IconWithTooltip';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import type {IPeopleOrderedTitleRow} from '@libs/Firebase/list/types/rows/event';
import Navigation from '@libs/Navigation/Navigation';
import TailwindColors from '@styles/tailwindcss/colors';
import ROUTES from '@src/ROUTES';
import SectionCommonTitle from './SectionCommonTitle';

type SectionPeopleOrderedTitleProps = {
    peopleOrderedTitleItem: IPeopleOrderedTitleRow;
};

function SectionPeopleOrderedTitle({peopleOrderedTitleItem}: SectionPeopleOrderedTitleProps) {
    const {restaurantId, eventId} = peopleOrderedTitleItem;

    const {isSmallScreenWidth} = useWindowDimensions();

    return (
        <SectionCommonTitle
            titleRow={peopleOrderedTitleItem}
            shouldShowPlusIcon
            plusIconToolTip="add.orderedUser.title"
            onPlusIconPressed={() => {
                Navigation.navigate(ROUTES.ADD_USERS_IN_EVENT.getRoute({restaurantId, eventId}));
            }}
        />
    );
}

export default React.memo(SectionPeopleOrderedTitle);
