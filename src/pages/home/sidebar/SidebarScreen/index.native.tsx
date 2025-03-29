/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import BaseSidebarScreen from './BaseSidebarScreen';
import FloatingActionButtonAndPopover from './FloatingActionButtonAndPopover';

function SidebarScreen(props: any) {
    const {isSmallScreenWidth} = useResponsiveLayout();
    return (
        <BaseSidebarScreen
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            <FloatingActionButtonAndPopover />
        </BaseSidebarScreen>
    );
}

SidebarScreen.displayName = 'SidebarScreen';

export default SidebarScreen;
