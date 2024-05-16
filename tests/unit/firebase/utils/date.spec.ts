import DateUtils from '@libs/DateUtils';
import CONST from '@src/CONST';

const timezone = 'America/Los_Angeles';
const LOCALE = CONST.LOCALES.EN;

describe(' date utils', () => {
    it('should return correctly', () => {
        const standardDate = '2023-12-22 09:24:08.810';
        const firebaseDate = '2021-01-09T06:02:09.838+0000';
        const pythonDate = '2024-02-20T17:47:27.368838';

        // const calendarTime =DateUtils.datetimeToCalendarTime(LOCALE, standardDate)
        // const firebaseCalendarTime =DateUtils.datetimeToCalendarTime(LOCALE, firebaseDate) // invalid time format
        // const firebaseCalendarTime = DateUtils.datetimeToCalendarTime(LOCALE, new Date(firebaseDate).toString())
        // const pythonCalendarTime = DateUtils.datetimeToCalendarTime(LOCALE, new Date(pythonDate).toString())

        const standardCalendarTime = 'Wed Nov 01 2017 13:13:30 GMT+0800';
        const pythonCalendarTime = DateUtils.datetimeToCalendarTime(LOCALE, standardCalendarTime);

        const x = 0;
    });
});
