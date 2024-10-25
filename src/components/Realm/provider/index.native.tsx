import {RealmProvider} from '@realm/react';
import type {ReactNode} from 'react';
import React, {useEffect} from 'react';
import {Event, PeopleInEvent, Photo, Profile, Recipe, Restaurant, RestaurantGeoPoint, Review, SqlPhoto} from '@libs/Realm/models';

type RealmLocalProviderProps = {
    /** Actual content wrapped by this component */
    children: ReactNode;
};

export default function RealmLocalProvider({children}: RealmLocalProviderProps) {
    useEffect(() => {}, []);

    return (
        <RealmProvider
            schemaVersion={1}
            schema={[Event, PeopleInEvent, Profile, Recipe, Review, Restaurant, RestaurantGeoPoint.schema, Photo, SqlPhoto]}
        >
            {children}
        </RealmProvider>
    );
}

RealmLocalProvider.displayName = 'RealmLocalProvider';
