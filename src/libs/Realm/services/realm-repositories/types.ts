import type {IFirebaseQuerySnapshot} from '@libs/Firebase/types';
import type {RealmCollections} from '@libs/Realm/constant';

type IRealmRepositories = {
    listenerQuerySnapshot: (querySnapshot: IFirebaseQuerySnapshot, collect: RealmCollections) => void;
};

export type {
    // eslint-disable-next-line import/prefer-default-export
    IRealmRepositories,
};
