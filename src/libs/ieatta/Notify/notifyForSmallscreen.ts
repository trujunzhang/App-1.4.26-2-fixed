/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */
import Toast from 'react-native-toast-message';
import type {InitialAndShowNotify, UpdateNotify} from './types';

const initialAndShowNotifyOnSmallScreen: InitialAndShowNotify = ({isSmallScreenWidth, message, type = 'info', autoClose = 5000}) => {
    return -1;
};

const updateNotifyOnSmallScreen: UpdateNotify = ({isSmallScreenWidth, id, message, type = 'success', autoClose = 5000}) => {
    const fixedType = {
        success: 'success',
        error: 'error',
        warning: 'info',
        info: 'info',
        default: 'info',
        // 'success' | 'error' | 'warning' | 'info' | 'default';
        // 'success' | 'error' | 'info' | (string & {});
    };
    Toast.show({
        type: fixedType[type],
        text2: message,
    });
};

export {initialAndShowNotifyOnSmallScreen, updateNotifyOnSmallScreen};
