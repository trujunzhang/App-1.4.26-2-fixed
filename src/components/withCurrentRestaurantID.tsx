import type {NavigationState} from '@react-navigation/native';
import type {ComponentType, ForwardedRef, RefAttributes} from 'react';
import React, {createContext, forwardRef, useCallback, useMemo, useState} from 'react';
import getComponentDisplayName from '@libs/getComponentDisplayName';
import Navigation from '@libs/Navigation/Navigation';

type CurrentRestaurantIDContextValue = {
    updateCurrentRestaurantID: (state: NavigationState) => void;
    currentRestaurantID: string;
};

type CurrentRestaurantIDContextProviderProps = {
    /** Actual content wrapped by this component */
    children: React.ReactNode;
};

const CurrentRestaurantIDContext = createContext<CurrentRestaurantIDContextValue | null>(null);

const withCurrentRestaurantIDDefaultProps = {
    currentRestaurantID: '',
};

function CurrentRestaurantIDContextProvider(props: CurrentRestaurantIDContextProviderProps) {
    const [currentRestaurantID, setCurrentRestaurantID] = useState('');

    /**
     * This function is used to update the currentRestaurantID
     * @param state root navigation state
     */
    const updateCurrentRestaurantID = useCallback(
        (state: NavigationState) => {
            const restaurantID = Navigation.getTopmostRestaurantId(state) ?? '-1';

            /*
             * Make sure we don't make the restaurantID undefined when switching between the chat list and settings tab.
             * This helps prevent unnecessary re-renders.
             */
            const params = state?.routes?.[state.index]?.params;
            if (params && 'screen' in params && typeof params.screen === 'string' && params.screen.indexOf('Settings_') !== -1) {
                return;
            }
            setCurrentRestaurantID(restaurantID);
        },
        [setCurrentRestaurantID],
    );

    /**
     * The context this component exposes to child components
     * @returns currentRestaurantID to share between central pane and LHN
     */
    const contextValue = useMemo(
        (): CurrentRestaurantIDContextValue => ({
            updateCurrentRestaurantID,
            currentRestaurantID,
        }),
        [updateCurrentRestaurantID, currentRestaurantID],
    );

    return <CurrentRestaurantIDContext.Provider value={contextValue}>{props.children}</CurrentRestaurantIDContext.Provider>;
}

CurrentRestaurantIDContextProvider.displayName = 'CurrentRestaurantIDContextProvider';

export default function withCurrentRestaurantID<TProps extends CurrentRestaurantIDContextValue, TRef>(
    WrappedComponent: ComponentType<TProps & RefAttributes<TRef>>,
): (props: Omit<TProps, keyof CurrentRestaurantIDContextValue> & React.RefAttributes<TRef>) => React.ReactElement | null {
    function WithCurrentRestaurantID(props: Omit<TProps, keyof CurrentRestaurantIDContextValue>, ref: ForwardedRef<TRef>) {
        return (
            <CurrentRestaurantIDContext.Consumer>
                {(currentRestaurantIDUtils) => (
                    <WrappedComponent
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...currentRestaurantIDUtils}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...(props as TProps)}
                        ref={ref}
                    />
                )}
            </CurrentRestaurantIDContext.Consumer>
        );
    }

    WithCurrentRestaurantID.displayName = `withCurrentRestaurantID(${getComponentDisplayName(WrappedComponent)})`;

    return forwardRef(WithCurrentRestaurantID);
}

export {withCurrentRestaurantIDDefaultProps, CurrentRestaurantIDContextProvider, CurrentRestaurantIDContext};
export type {CurrentRestaurantIDContextValue};
