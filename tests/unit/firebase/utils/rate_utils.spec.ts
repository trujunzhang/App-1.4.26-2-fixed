import {calcRateForRestaurant} from '@libs/Firebase/utils/rate_utils';

describe('rate-utils-test', () => {
    test('render', () => {
        let rate = calcRateForRestaurant(3 + 2 + 4 + 2 + 5, 5); // 16(3.2)
        expect(rate).toBe(3.0);
        rate = calcRateForRestaurant(3 + 4 + 4 + 2 + 5, 5); // 18(3.6)
        expect(rate).toBe(3.5);
        rate = calcRateForRestaurant(4 + 4 + 4 + 5 + 5, 5); // 22(4.4)
        expect(rate).toBe(4.5);
        rate = calcRateForRestaurant(4 + 3, 2); // 7(3.5)
        expect(rate).toBe(3.5);
    });
});
