import type React from 'react';

type GoogleProviderProps = {
    children: React.ReactNode;
};

function GoogleProvider(props: GoogleProviderProps) {
    return props.children;
}

GoogleProvider.displayName = 'GoogleProvider';

export default GoogleProvider;
