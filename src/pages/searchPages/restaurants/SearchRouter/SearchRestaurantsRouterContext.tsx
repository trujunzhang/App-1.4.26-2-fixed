import React, {useContext, useMemo, useRef, useState} from 'react';
import * as Modal from '@userActions/Modal';
import type ChildrenProps from '@src/types/utils/ChildrenProps';

const defaultSearchContext = {
    isSearchRestaurantsRouterDisplayed: false,
    openSearchRestaurantsRouter: () => {},
    closeSearchRestaurantsRouter: () => {},
    toggleSearchRestaurantsRouter: () => {},
};

type SearchRestaurantsRouterContext = typeof defaultSearchContext;

const Context = React.createContext<SearchRestaurantsRouterContext>(defaultSearchContext);

function SearchRestaurantsRouterContextProvider({children}: ChildrenProps) {
    const [isSearchRestaurantsRouterDisplayed, setIsSearchRestaurantsRouterDisplayed] = useState(false);
    const searchRouterDisplayedRef = useRef(false);

    const routerContext = useMemo(() => {
        const openSearchRestaurantsRouter = () => {
            Modal.close(
                () => {
                    setIsSearchRestaurantsRouterDisplayed(true);
                    searchRouterDisplayedRef.current = true;
                },
                false,
                true,
            );
        };
        const closeSearchRestaurantsRouter = () => {
            setIsSearchRestaurantsRouterDisplayed(false);
            searchRouterDisplayedRef.current = false;
        };

        // There are callbacks that live outside of React render-loop and interact with SearchRestaurantsRouter
        // So we need a function that is based on ref to correctly open/close it
        const toggleSearchRestaurantsRouter = () => {
            if (searchRouterDisplayedRef.current) {
                closeSearchRestaurantsRouter();
            } else {
                openSearchRestaurantsRouter();
            }
        };

        return {
            isSearchRestaurantsRouterDisplayed,
            openSearchRestaurantsRouter,
            closeSearchRestaurantsRouter,
            toggleSearchRestaurantsRouter,
        };
    }, [isSearchRestaurantsRouterDisplayed, setIsSearchRestaurantsRouterDisplayed]);

    return <Context.Provider value={routerContext}>{children}</Context.Provider>;
}

function useSearchRestaurantsRouterContext() {
    return useContext(Context);
}

SearchRestaurantsRouterContextProvider.displayName = 'SearchRestaurantsRouterContextProvider';

export {SearchRestaurantsRouterContextProvider, useSearchRestaurantsRouterContext};
