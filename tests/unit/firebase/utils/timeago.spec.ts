import moment from 'moment';
import {convertDateFromString, formatByTimeAgoForTest, formatDateForPhoto, formatDateForReview, formatDateStringTest} from '@libs/Firebase/utils/timeago_helper';

describe('timeago', () => {
    test('javascript date/time', () => {
        const str = new Date().toISOString();
    });

    test('formatDateForPhoto', () => {
        let str = formatDateForPhoto('2018-01-21T07:43:10.690+0000');
        expect(str).toBe('January 21, 2018');
        str = formatDateForPhoto('2017-06-07T07:43:10.690+0000');
        expect(str).toBe('June 07, 2017');
    });

    test('formatDateForReview', () => {
        let str = formatDateForReview('2017-11-07T07:43:10.690+0000');
        expect(str).toBe('07/11/2017');
        str = formatDateForReview('2017-01-07T07:43:10.690+0000');
        expect(str).toBe('07/01/2017');
    });

    test('formatDateStringTest', () => {
        const date: Date = convertDateFromString('2017-11-07T07:43:10.690+0000');
        const str = formatDateStringTest(date);
        expect(str).toBe('2017-11-07 15:43');
    });

    test('String to date', () => {
        const str = moment('2021-03-05 08:15 am').toDate();
        // const str = new Date('2021-03-05 08:15 am').toISOString()
        // expect(str).toBe('2017-11-07 15:43')
    });

    test('formatByTimeAgoForTest', () => {
        //  updatedAt: '2017-11-07T07:43:10.690+0000',
        // '2018-11-11'
        let timeAgo: string = formatByTimeAgoForTest('2017-11-07T07:43:10.690+0000');
        expect(timeAgo).toBe('1 year ago');
        timeAgo = formatByTimeAgoForTest('2018-11-07T07:43:10.690+0000');
        expect(timeAgo).toBe('3 days ago');
        timeAgo = formatByTimeAgoForTest('2018-11-11T07:43:10.690+0000');
        expect(timeAgo).toBe('in 15 hours');
    });
});
