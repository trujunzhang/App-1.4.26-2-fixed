/* eslint-disable import/prefer-default-export */

/* eslint-disable @typescript-eslint/no-explicit-any */
import type {RealmCollections} from '@libs/Realm/constant';

type IRealmRepositories = {
    listenerQuerySnapshot: (querySnapshot: any, collect: RealmCollections) => void;
};

export type {IRealmRepositories};
