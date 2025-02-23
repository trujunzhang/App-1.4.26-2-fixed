/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-invalid-this */
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import type {IFirebaseQuerySnapshot} from '@libs/FirebaseIeatta/types';
import {upsetPersonalDetail} from '@userActions/Firebase/UserFB';

class ListenerUsersSnapshot {
    private saveAsAddType = (changeDocId: string, data: any) => {
        // Log.info("")
        // Log.info("================================")
        // Log.info(`FBUser Repositories: {AddType}`)
        // Log.info(`changeDocId: ${changeDocId}`)
        // Log.info("================================")
        // Log.info("")

        upsetPersonalDetail(data);
    };

    private saveAsModifiedType = (changeDocId: string, data: any) => {
        // Log.info('');
        // Log.info('================================');
        // Log.info(`FBUser Repositories: {ModifiedType}`);
        // Log.info(`changeDocId: ${changeDocId}`);
        // Log.info('================================');
        // Log.info('');

        upsetPersonalDetail(data);
    };

    private saveAsRemovedType = (changeDocId: string, data: any) => {
        // Log.info('');
        // Log.info('================================');
        // Log.info(`FBUser Repositories: {RemovedType}`);
        // Log.info(`changeDocId: ${changeDocId}`);
        // Log.info('================================');
        // Log.info('');
    };

    listenerQuerySnapshot = (querySnapshot: IFirebaseQuerySnapshot) => {
        if (querySnapshot?.docChanges === undefined || querySnapshot.docChanges === null) {
            return;
        }
        querySnapshot.docChanges().forEach((change: any) => {
            if (_.isEmpty(change) || _.isEmpty(change.doc) || _.isEmpty(change.doc.data())) {
                return;
            }
            const changeDocId: string = change.doc.id;
            const data = change.doc.data();
            if (change.type === 'added') {
                this.saveAsAddType(changeDocId, data);
            } else if (change.type === 'modified') {
                this.saveAsModifiedType(changeDocId, data);
            } else if (change.type === 'removed') {
                this.saveAsRemovedType(changeDocId, data);
            }
        });
    };
}

export default ListenerUsersSnapshot;
