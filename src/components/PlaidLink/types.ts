// import type {LinkEventMetadata, LinkSuccessMetadata} from 'react-native-plaid-link-sdk';
// import type {PlaidLinkOnEventMetadata, PlaidLinkOnSuccessMetadata} from 'react-plaid-link';

type PlaidLinkProps = {
    // Plaid Link SDK public token used to initialize the Plaid SDK
    token: string;

    // Callback to execute once the user taps continue after successfully entering their account information
    // onSuccess?: (args: {publicToken: string; metadata: PlaidLinkOnSuccessMetadata | LinkSuccessMetadata}) => void;
    onSuccess?: (args: {publicToken: string; metadata: unknown}) => void;

    // Callback to execute when there is an error event emitted by the Plaid SDK
    onError?: (error: ErrorEvent | null) => void;

    // Callback to execute when the user leaves the Plaid widget flow without entering any information
    onExit?: () => void;

    // Callback to execute whenever a Plaid event occurs
    // onEvent: (eventName: string, metadata?: PlaidLinkOnEventMetadata | LinkEventMetadata) => void;
    onEvent: (eventName: string, metadata?: unknown) => void;

    // The redirect URI with an OAuth state ID. Needed to re-initialize the PlaidLink after directing the
    // user to their respective bank platform
    receivedRedirectURI?: string;
};

export default PlaidLinkProps;
