import FirestoreParams from '@libs/Firebase/services/firestore_params';

describe('FirestorePath', () => {
    test('is a Vue instance', () => {
        expect(FirestoreParams.getUserStatisticFunctionName()).toBe('userStatistics');
        expect(FirestoreParams.KEY_RESTAURANTS).toBe('restaurants');
        expect(FirestoreParams.KEY_PHOTOS).toBe('photos');
        expect(FirestoreParams.KEY_REVIEWS).toBe('reviews');
    });
});
