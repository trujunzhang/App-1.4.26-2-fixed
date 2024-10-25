/* eslint-disable rulesdir/prefer-early-return */

/* eslint-disable no-useless-return */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useCallback, useRef} from 'react';
import useWindowDimensions from '@hooks/useWindowDimensions';
import FreezeWrapper from '@libs/Navigation/FreezeWrapper';
import BaseSidebarScreen from './BaseSidebarScreen';

function SidebarScreen(props: any) {
    const popoverModal = useRef(null);
    const {isSmallScreenWidth} = useWindowDimensions();

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
        <FreezeWrapper keepVisible={!isSmallScreenWidth}>
            <BaseSidebarScreen
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
            >
                {/* <FloatingActionButtonAndPopover /> */}
            </BaseSidebarScreen>
        </FreezeWrapper>
    );
}

SidebarScreen.displayName = 'SidebarScreen';

export default SidebarScreen;
