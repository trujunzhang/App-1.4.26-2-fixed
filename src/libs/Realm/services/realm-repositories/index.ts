/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable import/prefer-default-export */
import type {RealmCollections} from '@libs/Realm/constant';
import type {IRealmRepositories} from './types';

class RealmRepositories implements IRealmRepositories {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(realm: any) {}

    listenerQuerySnapshot(querySnapshot: any, collect: RealmCollections): void {}
}
export {RealmRepositories};
