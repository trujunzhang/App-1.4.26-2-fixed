import React from 'react';
import FocusTrapForModal from '@components/FocusTrap/FocusTrapForModal';
import Modal from '@components/Modal';
import useResponsiveLayout from '@hooks/useResponsiveLayout';
import * as Browser from '@libs/Browser';
import CONST from '@src/CONST';
import SearchRestaurantsRouter from './SearchRestaurantsRouter';
import {useSearchRestaurantsRouterContext} from './SearchRestaurantsRouterContext';

type SearchRestaurantsRouterModalProps = {
    renderContent: (params: {onRouterClose: () => void}) => React.ReactNode;
};

function SearchRestaurantsRouterModal({renderContent}: SearchRestaurantsRouterModalProps) {
    const {isSmallScreenWidth} = useResponsiveLayout();
    const {isSearchRestaurantsRouterDisplayed, closeSearchRestaurantsRouter} = useSearchRestaurantsRouterContext();

    const modalType = isSmallScreenWidth ? CONST.MODAL.MODAL_TYPE.CENTERED_UNSWIPEABLE : CONST.MODAL.MODAL_TYPE.POPOVER;

    return (
        <Modal
            type={modalType}
            isVisible={isSearchRestaurantsRouterDisplayed}
            popoverAnchorPosition={{right: 6, top: 6}}
            fullscreen
            shouldHandleNavigationBack={Browser.isMobileChrome()}
            onClose={closeSearchRestaurantsRouter}
        >
            {isSearchRestaurantsRouterDisplayed && (
                <FocusTrapForModal active={isSearchRestaurantsRouterDisplayed}>
                    {renderContent({onRouterClose: closeSearchRestaurantsRouter})}
                    {/* <SearchRestaurantsRouter onRouterClose={closeSearchRestaurantsRouter} /> */}
                </FocusTrapForModal>
            )}
        </Modal>
    );
}

SearchRestaurantsRouterModal.displayName = 'SearchRestaurantsRouterModal';

export default SearchRestaurantsRouterModal;
