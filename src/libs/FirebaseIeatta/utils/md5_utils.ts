/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable rulesdir/no-inline-named-export */
import md5 from 'blueimp-md5';
import {getDateStringForCreatedOrUpdatedDate} from './timeago_helper';

export const getMd5Str = (str: string): string => {
    const digest: string = md5(str);
    return digest;
};

export const documentIdFromCurrentDate = () => {
    const str = getDateStringForCreatedOrUpdatedDate();
    return getMd5Str(str);
};

export const generateLoggedUserId = (): number => {
    return new Date().getTime();
};
