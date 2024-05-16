import type {ReactElement, ReactNode} from 'react';
import React, {useEffect, useMemo, useState} from 'react';
import CONST from '@src/CONST';

type RealmLocalProviderProps = {
    /** Actual content wrapped by this component */
    children: ReactNode;
};

export default function RealmLocalProvider({children}: RealmLocalProviderProps) {
    useEffect(() => {}, []);

    return children;
}

RealmLocalProvider.displayName = 'RealmLocalProvider';
