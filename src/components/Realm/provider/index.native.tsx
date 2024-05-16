import {RealmProvider} from '@realm/react';
import type {ReactElement, ReactNode} from 'react';
import React, {useEffect, useMemo, useState} from 'react';
// Import your models
import {Event, PeopleInEvent, Photo, Profile, Recipe, Restaurant, RestaurantGeoPoint, Review} from '@libs/Realm/models';
import CONST from '@src/CONST';

type RealmLocalProviderProps = {
    /** Actual content wrapped by this component */
    children: ReactNode;
};

export default function RealmLocalProvider({children}: RealmLocalProviderProps) {
    useEffect(() => {}, []);

    return (
        <RealmProvider
            schemaVersion={1}
            schema={[Event, PeopleInEvent, Profile, Recipe, Review, Restaurant, RestaurantGeoPoint.schema, Photo]}
        >
            {children}
        </RealmProvider>
    );
}

RealmLocalProvider.displayName = 'RealmLocalProvider';
