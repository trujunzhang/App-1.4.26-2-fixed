import React from 'react';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import {PhotoType} from '@libs/FirebaseIeatta/constant';
import type {ISectionTitleRow} from '@libs/FirebaseIeatta/list/types/rows/common';
import type {IWaiterRow} from '@libs/FirebaseIeatta/list/types/rows/photo';
import Navigation from '@libs/Navigation/Navigation';
import ROUTES from '@src/ROUTES';
import SectionCommonTitle from './SectionCommonTitle';

type SectionWaiterTitleProps = {
    waiterItem: IWaiterRow;
};

function SectionWaiterTitle({waiterItem}: SectionWaiterTitleProps) {
    const styles = useThemeStyles();
    const {isSmallScreenWidth} = useResponsiveLayout();

    const {restaurantId, eventId} = waiterItem;

    const titleRow: ISectionTitleRow = {
        title: 'sections.titles.eventWaiters',
        isSmallScreenWidth,
    };

    return (
        <SectionCommonTitle
            titleRow={titleRow}
            shouldShowCameraIcon={false}
            cameraIconToolTip="photos.takePhoto.button.waiter"
            onCameraIconPressed={() => {
                Navigation.navigate(ROUTES.TAKE_PHOTO.getRoute({photoType: PhotoType.Waiter, relatedId: restaurantId}));
            }}
            shouldShowPlusIcon
            plusIconToolTip="add.waiter.title"
            onPlusIconPressed={() => {
                Navigation.navigate(ROUTES.ADD_WAITERS_IN_EVENT.getRoute({restaurantId, eventId}));
            }}
        />
    );
}

export default React.memo(SectionWaiterTitle);
