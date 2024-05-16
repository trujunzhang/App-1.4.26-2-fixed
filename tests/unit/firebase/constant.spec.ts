import {FBCollections} from '@libs/Firebase/constant';

describe('FBCollections', () => {
    test('is correct enum values', () => {
        expect(FBCollections.Profiles).toBe('profiles');
        expect(FBCollections.Restaurants).toBe('restaurants');
        expect(FBCollections.Events).toBe('events');
        expect(FBCollections.PeopleInEvent).toBe('peopleinevents');
        expect(FBCollections.Recipes).toBe('recipes');
        expect(FBCollections.Photos).toBe('photos');
        expect(FBCollections.Reviews).toBe('reviews');
    });
});
