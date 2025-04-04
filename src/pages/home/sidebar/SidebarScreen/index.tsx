/* eslint-disable rulesdir/prefer-early-return */

/* eslint-disable no-useless-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useCallback, useRef} from 'react';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import BaseSidebarScreen from './BaseSidebarScreen';

function SidebarScreen(props: any) {
    const popoverModal = useRef(null);
    const {isSmallScreenWidth} = useResponsiveLayout();

    /**
     * Method to hide popover when dragover.
     */
    const hidePopoverOnDragOver = useCallback(() => {
        if (!popoverModal.current) {
            return;
        }
        // popoverModal.current.hideCreateMenu();
    }, []);

    /**
     * Method create event listener
     */
    const createDragoverListener = () => {
        document.addEventListener('dragover', hidePopoverOnDragOver);
    };

    /**
     * Method remove event listener.
     */
    const removeDragoverListener = () => {
        document.removeEventListener('dragover', hidePopoverOnDragOver);
    };

    return (
        <BaseSidebarScreen
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
        >
            {/* <FloatingActionButtonAndPopover /> */}
        </BaseSidebarScreen>
    );
}

SidebarScreen.displayName = 'SidebarScreen';

export default SidebarScreen;
