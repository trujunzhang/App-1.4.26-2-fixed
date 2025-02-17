import React from 'react';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import type {IPeopleOrderedTitleRow} from '@libs/FirebaseIeatta/list/types/rows/event';
import Navigation from '@libs/Navigation/Navigation';
import ROUTES from '@src/ROUTES';
import SectionCommonTitle from './SectionCommonTitle';

type SectionPeopleOrderedTitleProps = {
    peopleOrderedTitleItem: IPeopleOrderedTitleRow;
};

function SectionPeopleOrderedTitle({peopleOrderedTitleItem}: SectionPeopleOrderedTitleProps) {
    const {restaurantId, eventId} = peopleOrderedTitleItem;

    const {isSmallScreenWidth} = useResponsiveLayout();

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
