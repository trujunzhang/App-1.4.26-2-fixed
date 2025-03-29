import type {FBCollections} from '@libs/FirebaseIeatta/constant';

// eslint-disable-next-line rulesdir/prefer-early-return
const printFirebaseError = (path: FBCollections | string, error: any) => {
    if (error !== null && error !== undefined) {
        console.log(`[Firebase] ${path} <error> ${error}`);
    }
};

// eslint-disable-next-line import/prefer-default-export
export {printFirebaseError};
