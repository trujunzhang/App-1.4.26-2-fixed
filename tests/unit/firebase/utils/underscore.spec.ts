// eslint-disable-next-line no-restricted-imports
import _ from 'underscore';

describe('underscore utils', () => {
    it('should return correctly', () => {
        expect(_.isEmpty(null)).toBe(true);
        expect(_.isEmpty(undefined)).toBe(true);
    });
});
