import React from 'react';
import type {ISectionTitleRow} from '@libs/FirebaseIeatta/list/types/rows/common';
import type {IMenusInRestaurantRow} from '@libs/FirebaseIeatta/list/types/rows/restaurant';
import {navigationToEditRecipe} from '@libs/ieatta/editFormUtils';
import SectionCommonTitle from './SectionCommonTitle';

type SectionMenuTitleProps = {
    menuRow: IMenusInRestaurantRow;
};

function SectionMenuTitle({menuRow}: SectionMenuTitleProps) {
    const titleRow: ISectionTitleRow = {
        // title: 'On the Menu',
        title: 'sections.titles.onTheMenu',
        isSmallScreenWidth: menuRow.isSmallScreenWidth,
    };

    return (
        <SectionCommonTitle
            titleRow={titleRow}
            shouldShowPlusIcon
            plusIconToolTip="add.recipe.title"
            onPlusIconPressed={() => {
                navigationToEditRecipe({restaurantId: menuRow.restaurantId});
            }}
        />
    );
}

export default React.memo(SectionMenuTitle);
