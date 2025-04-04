import type {StackScreenProps} from '@react-navigation/stack';
import lodashGet from 'lodash/get';
import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {HomeSplitNavigatorParamList} from '@src/appConfig/navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';

// type EventScreenNavigationProps = StackScreenProps<AuthScreensParamList, typeof SCREENS.EVENT>;
type EventScreenNavigationProps = PlatformStackScreenProps<HomeSplitNavigatorParamList, typeof SCREENS.EVENT>;

/**
 * Get the currently viewed restaurant ID as number
 *
 * @param route
 * @param route.params
 * @param route.params.eventId
 * @returns
 */
function getEventID(route: EventScreenNavigationProps['route']) {
    // The eventId ID is used in an onyx key. If it's an empty string, onyx will return
    // a collection instead of an individual report.
    // We can't use the default value functionality of `lodash.get()` because it only
    // provides a default value on `undefined`, and will return an empty string.
    // Placing the default value outside of `lodash.get()` is intentional.
    return String(lodashGet(route, 'params.eventId', CONST.IEATTA_MODEL_ID_EMPTY));
}

// eslint-disable-next-line import/prefer-default-export
export {getEventID};
export type {EventScreenNavigationProps};
