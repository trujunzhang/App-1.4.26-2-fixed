import Onyx from 'react-native-onyx';
import ONYXKEYS from '@src/ONYXKEYS';

let lastRestaurantId: string | undefined;
Onyx.connect({
    key: ONYXKEYS.RESTAURANT_ID_IN_SIDEBAR,
    callback: (value) => (lastRestaurantId = value),
});

function setRestaurantIdInSidebar(restaurantId: string) {
    Onyx.set(ONYXKEYS.RESTAURANT_ID_IN_SIDEBAR, restaurantId);
}

function getLastRestaurantId() {
    return lastRestaurantId;
}

export {
    // eslint-disable-next-line import/prefer-default-export
    setRestaurantIdInSidebar,
    getLastRestaurantId,
};
