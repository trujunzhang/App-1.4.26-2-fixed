/* eslint-disable rulesdir/prefer-at */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable operator-assignment */

/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable prefer-template */

/* eslint-disable rulesdir/no-inline-named-export */
import {format} from 'timeago.js';

/**
 * updatedAt: '2017-11-07T07:43:10.690+0000'
 *
 * @param date
 */
export const formatByTimeAgo = (date: string): string => {
    const timeago: string = format(date, 'en_US');
    return timeago;
};

export const formatByTimeAgoForTest = (date: string): string => {
    const timeago: string = format(date, 'en_US', {relativeDate: '2018-11-11'});
    return timeago;
};

export const getDateStringForCreatedOrUpdatedDate = (): string => {
    const str = new Date().toISOString();
    return str;
};

export const convertDateFromString = (strDate: string): Date => {
    const nextDate = new Date(strDate);
    return nextDate;
};

export const formatDateStringTest = (date: Date): string => {
    const str =
        date.getFullYear() +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + date.getDate()).slice(-2) +
        ' ' +
        ('0' + date.getHours()).slice(-2) +
        ':' +
        ('0' + date.getMinutes()).slice(-2);
    return str;
};

export const formatDateString = (strDate: string): string => {
    const date: Date = convertDateFromString(strDate);
    const str =
        date.getFullYear() +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + date.getDate()).slice(-2) +
        ' ' +
        ('0' + date.getHours()).slice(-2) +
        ':' +
        ('0' + date.getMinutes()).slice(-2);
    return str;
};

/**
 * 12/11/2018
 * @param date: '2017-11-07T07:43:10.690+0000'
 */
export const formatDateForReview = (date: string): string => {
    const dateObj = new Date(date);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let curr_date: any = dateObj.getDate();
    let curr_month: any = dateObj.getMonth();
    curr_month = curr_month + 1;
    const curr_year = dateObj.getFullYear();
    let curr_min: any = dateObj.getMinutes();
    let curr_hr: any = dateObj.getHours();
    const curr_sc = dateObj.getSeconds();
    if (curr_month.toString().length === 1) {
        curr_month = '0' + curr_month;
    }
    if (curr_date.toString().length === 1) {
        curr_date = '0' + curr_date;
    }
    if (curr_hr.toString().length === 1) {
        curr_hr = '0' + curr_hr;
    }
    if (curr_min.toString().length === 1) {
        curr_min = '0' + curr_min;
    }
    return curr_date + '/' + curr_month + '/' + curr_year;
};

/**
 * June 21, 2018
 * @param date: '2017-11-07T07:43:10.690+0000'
 */
export const formatDateForPhoto = (date: string): string => {
    const dateObj = new Date(date);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let curr_date: any = dateObj.getDate();
    const curr_month: any = dateObj.getMonth();
    const curr_year = dateObj.getFullYear();
    let curr_min: any = dateObj.getMinutes();
    let curr_hr: any = dateObj.getHours();
    const curr_sc = dateObj.getSeconds();
    if (curr_date.toString().length === 1) {
        curr_date = '0' + curr_date;
    }
    if (curr_hr.toString().length === 1) {
        curr_hr = '0' + curr_hr;
    }
    if (curr_min.toString().length === 1) {
        curr_min = '0' + curr_min;
    }
    return monthNames[curr_month] + ' ' + curr_date + ', ' + curr_year;
};
