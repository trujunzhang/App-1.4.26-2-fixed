import React, {createContext, useContext, useReducer} from 'react';
import locationReducer, {initialLocationState} from './locationReducer';
import type {LocationAction, LocationState} from './locationReducer';

// How to use reducer
//   see: https://dev.to/elisealcala/react-context-with-usereducer-and-typescript-4obm

const LocationContext = createContext<{
    state: LocationState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialLocationState,
    dispatch: () => null,
});

// Counter provider component
function LocationProvider({children}: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(locationReducer, initialLocationState);

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    return <LocationContext.Provider value={{state, dispatch}}>{children}</LocationContext.Provider>;
}

export {LocationContext, LocationProvider};
