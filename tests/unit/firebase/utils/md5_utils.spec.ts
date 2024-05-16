import {getMd5Str} from '@libs/Firebase/utils/md5_utils';

describe('md5', () => {
    test('is a Vue instance', () => {
        const digest = getMd5Str('2017-11-07T07:43:10.690+0000');
        expect(digest).toBe('df1546979d56fe7fbf8ab2b24cc54668');
    });
});

describe('md5', () => {
    test('md5 to number', () => {
        // const digest = '035ac47c-5781-4da8-af21-35c97a46c101'; // error
        const digest = '00b7bb02f3d8db9a8f1be6fd7af6fac5';
        // const digest = '197d679ae23e69ae306f51a6b840e7c5';

        const bigInt = BigInt(`0x${digest.substring(0, 16)}`);

        const result = Date.now();
        const y = new Date().getTime();

        const x = 0;
        // expect(digest).toBe('df1546979d56fe7fbf8ab2b24cc54668');
    });
});
