import type {NavigationState} from '@react-navigation/native';
import PropTypes from 'prop-types';
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

// TODO: Remove when depended components are migrated to TypeScript.
const withCurrentRestaurantIDPropTypes = {
    /** Function to update the state */
    updateCurrentRestaurantID: PropTypes.func.isRequired,

    /** The top most restaurant id */
    currentRestaurantID: PropTypes.string,
};

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
            setCurrentRestaurantID(Navigation.getTopmostRestaurantId(state) ?? '');
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

export {withCurrentRestaurantIDPropTypes, withCurrentRestaurantIDDefaultProps, CurrentRestaurantIDContextProvider, CurrentRestaurantIDContext};
export type {CurrentRestaurantIDContextValue};
