import {toast} from 'react-toastify';
import {initialAndShowNotifyOnSmallScreen, updateNotifyOnSmallScreen} from './notifyForSmallscreen';
import type {InitialAndShowNotify, ToastType, UpdateNotify} from './types';

const initialAndShowNotify: InitialAndShowNotify = ({isSmallScreenWidth, message, type = 'info', autoClose = 5000}) => {
    if (isSmallScreenWidth === false) {
        if (type === 'success') {
            return toast.success(message, {autoClose});
        }
        if (type === 'error') {
            return toast.error(message, {autoClose});
        }
        if (type === 'warning') {
            return toast.warning(message, {autoClose});
        }
        if (type === 'info') {
            return toast.info(message, {autoClose});
        }
    }
    return initialAndShowNotifyOnSmallScreen({isSmallScreenWidth, message, type, autoClose});
};

const updateNotify: UpdateNotify = ({isSmallScreenWidth, id, message, type = 'success', autoClose = 5000}) => {
    if (isSmallScreenWidth === false) {
        if (id !== null) {
            toast.update(id, {render: message, type, autoClose});
        }
    }
    return updateNotifyOnSmallScreen({isSmallScreenWidth, id, message, type, autoClose});
};

export {initialAndShowNotify, updateNotify};
