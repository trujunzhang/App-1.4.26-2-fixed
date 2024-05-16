import React from 'react';

type GoogleProviderProps = {
    children: React.ReactNode;
};

function GoogleProvider(props: GoogleProviderProps) {
    return props.children;
}

GoogleProvider.displayName = 'HTMLEngineProvider';

export default GoogleProvider;
