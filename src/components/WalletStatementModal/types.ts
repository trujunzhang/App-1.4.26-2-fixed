import type {OnyxEntry} from 'react-native-onyx';
import type {Session} from '@src/types/onyx';

type WalletStatementOnyxProps = {
    /** Session info for the currently logged in user. */
    session: OnyxEntry<Session>;
};

type WalletStatementProps = WalletStatementOnyxProps & {
    /** URL for oldDot (ieatta.com) statements page to display */
    statementPageURL: string;
};

export type {WalletStatementProps, WalletStatementOnyxProps};
