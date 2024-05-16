import {ParseModelUsers} from '@libs/Firebase/appModel/user';

describe('ParseModelUsers utils', () => {
    it('should return correctly', () => {
        const result = ParseModelUsers.extractFirstAndLastNameFromDisplayName('trujun zhang');
        expect(result.firstName).toBe('trujun');
        expect(result.lastName).toBe('zhang');
    });
});
