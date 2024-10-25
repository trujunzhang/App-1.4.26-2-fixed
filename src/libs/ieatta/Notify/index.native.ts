import {initialAndShowNotifyOnSmallScreen, updateNotifyOnSmallScreen} from './notifyForSmallscreen';
import type {InitialAndShowNotify, ToastType, UpdateNotify} from './types';

const initialAndShowNotify: InitialAndShowNotify = initialAndShowNotifyOnSmallScreen;

const updateNotify: UpdateNotify = updateNotifyOnSmallScreen;

export {initialAndShowNotify, updateNotify};
