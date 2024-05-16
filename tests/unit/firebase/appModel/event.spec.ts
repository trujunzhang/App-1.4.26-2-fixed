import {ParseModelEvents} from '@libs/Firebase/appModel/event';

describe('ParseModelEvents', () => {
    test('addWaiter', () => {
        const nextModel = {waiterIds: ['1', '2']} as any;
        const {waiterIds} = ParseModelEvents.addWaiter({
            model: nextModel,
            waiterId: '1234',
        });

        // console.log('waiters<addWaiter>', waiters)
        expect(waiterIds).toStrictEqual(['1', '2', '1234']);
    });

    test('removeWaiter', () => {
        const nextModel = {waiters: ['1', '2', '1234']} as any;
        const {waiterIds} = ParseModelEvents.removeWaiter({
            model: nextModel,
            waiterId: '1234',
        });

        // console.log('waiters<removeWaiter>', waiters)
        expect(waiterIds).toStrictEqual(['1', '2']);
    });
});
