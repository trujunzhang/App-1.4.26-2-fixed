import type {StackScreenProps} from '@react-navigation/stack';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import type SCREENS from '@src/SCREENS';

type IEATTALocalPhotosNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.LOCAL_PHOTOS>;

type IEATTALocalPhotosPageProps = IEATTALocalPhotosNavigationProps;

// eslint-disable-next-line import/prefer-default-export
export type {IEATTALocalPhotosPageProps};
