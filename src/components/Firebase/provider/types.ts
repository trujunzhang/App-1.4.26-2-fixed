import type {ReactNode} from 'react';

type FirebaseProviderProps = {
    /** Actual content wrapped by this component */
    children: ReactNode;

    /** User authentication status */
    isAuthenticated: boolean;
};

export default FirebaseProviderProps;
