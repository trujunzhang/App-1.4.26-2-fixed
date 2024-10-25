/* eslint-disable @typescript-eslint/ban-types */
import type {OnyxEntry} from 'react-native-onyx';
import type {WithCurrentUserPersonalDetailsProps} from '@components/withCurrentUserPersonalDetails';

type FirebaseSyncOnyxProps = {
    firebaseCurrentSyncId: OnyxEntry<string>;
};
type FirebaseSyncProps = WithCurrentUserPersonalDetailsProps & FirebaseSyncOnyxProps & {};

export default FirebaseSyncProps;
export type {FirebaseSyncOnyxProps};
