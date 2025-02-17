/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import FreezeWrapper from '@libs/Navigation/FreezeWrapper';
import BaseSidebarScreen from './BaseSidebarScreen';
import FloatingActionButtonAndPopover from './FloatingActionButtonAndPopover';

function SidebarScreen(props: any) {
    const {isSmallScreenWidth} = useResponsiveLayout();
    return (
        <FreezeWrapper keepVisible={!isSmallScreenWidth}>
            <BaseSidebarScreen
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
            >
                <FloatingActionButtonAndPopover />
            </BaseSidebarScreen>
        </FreezeWrapper>
    );
}

SidebarScreen.displayName = 'SidebarScreen';

export default SidebarScreen;
