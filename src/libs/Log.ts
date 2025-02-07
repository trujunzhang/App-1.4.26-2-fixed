// Making an exception to this rule here since we don't need an "action" for Log and Log should just be used directly. Creating a Log
// action would likely cause confusion about which one to use. But most other API methods should happen inside an action file.

/* eslint-disable rulesdir/no-api-in-views */
import Logger from 'expensify-common/lib/Logger';
import Onyx from 'react-native-onyx';
import type {Merge} from 'type-fest';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import pkg from '../../package.json';
import {addLog} from './actions/Console';
import {shouldAttachLog} from './Console';
import getPlatform from './getPlatform';
import * as Network from './Network';
import requireParameters from './requireParameters';

let timeout: NodeJS.Timeout;
let shouldCollectLogs = false;

Onyx.connect({
    key: ONYXKEYS.SHOULD_STORE_LOGS,
    callback: (val) => {
        if (!val) {
            shouldCollectLogs = false;
        }

        shouldCollectLogs = Boolean(val);
    },
});

type LogCommandParameters = {
    ieattaCashAppVersion: string;
    logPacket: string;
};

function LogCommand(parameters: LogCommandParameters): Promise<{requestID: string}> {
    const commandName = 'Log';
    requireParameters(['logPacket', 'ieattaCashAppVersion'], parameters, commandName);

    // Note: We are forcing Log to run since it requires no authToken and should only be queued when we are offline.
    // Non-cancellable request: during logout, when requests are cancelled, we don't want to cancel any remaining logs
    return Network.post(commandName, {...parameters, forceNetworkRequest: true, canCancel: false}) as Promise<{requestID: string}>;
}

// eslint-disable-next-line
type ServerLoggingCallbackOptions = {api_setCookie: boolean; logPacket: string};
type RequestParams = Merge<ServerLoggingCallbackOptions, {shouldProcessImmediately: boolean; shouldRetry: boolean; ieattaCashAppVersion: string; parameters: string}>;

/**
 * Network interface for logger.
 */
function serverLoggingCallback(logger: Logger, params: ServerLoggingCallbackOptions): Promise<{requestID: string}> {
    const requestParams = params as RequestParams;
    requestParams.shouldProcessImmediately = false;
    requestParams.shouldRetry = false;
    requestParams.ieattaCashAppVersion = `ieattaCash[${getPlatform()}]${pkg.version}`;
    if (requestParams.parameters) {
        requestParams.parameters = JSON.stringify(requestParams.parameters);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => logger.info('Flushing logs older than 10 minutes', true, {}, true), 10 * 60 * 1000);
    return LogCommand(requestParams);
}

// Note: We are importing Logger from expensify-common because it is used by other platforms. The server and client logging
// callback methods are passed in here so we can decouple the logging library from the logging methods.
const Log = new Logger({
    serverLoggingCallback,
    clientLoggingCallback: (message) => {
        if (!shouldAttachLog(message)) {
            return;
        }

        console.debug(message);

        if (shouldCollectLogs) {
            addLog({time: new Date(), level: CONST.DEBUG_CONSOLE.LEVELS.DEBUG, message});
        }
    },
    isDebug: true,
});
timeout = setTimeout(() => Log.info('Flushing logs older than 10 minutes', true, {}, true), 10 * 60 * 1000);

export default Log;
