import Onyx from 'react-native-onyx';
import ONYXKEYS from '@src/ONYXKEYS';

function setRestaurantIdInSidebar(restaurantId: string) {
    Onyx.set(ONYXKEYS.RESTAURANT_ID_IN_SIDEBAR, restaurantId);
}

export {
    // eslint-disable-next-line import/prefer-default-export
    setRestaurantIdInSidebar,
};
