/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import type {StackScreenProps} from '@react-navigation/stack';
import type {OnyxEntry} from 'react-native-onyx';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import type {WithWritableReportOrNotFoundProps} from '@expPages/iou/request/step/withWritableReportOrNotFound';
import type SCREENS from '@src/SCREENS';
import type * as OnyxTypes from '@src/types/onyx';

type IEATTATakePhotoNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.TAKE_PHOTO>;

// eslint-disable-next-line @typescript-eslint/ban-types
type IEATTATakePhotoPageOnyxProps = {};

type IEATTATakePhotoPageProps = IEATTATakePhotoNavigationProps &
    IEATTATakePhotoPageOnyxProps &
    WithWritableReportOrNotFoundProps<typeof SCREENS.MONEY_REQUEST.STEP_SCAN | typeof SCREENS.MONEY_REQUEST.CREATE> & {
        /** Holds data related to Money Request view state, rather than the underlying Money Request data. */
        transaction: OnyxEntry<OnyxTypes.Transaction>;
    };

export type {IEATTATakePhotoPageOnyxProps, IEATTATakePhotoPageProps};
