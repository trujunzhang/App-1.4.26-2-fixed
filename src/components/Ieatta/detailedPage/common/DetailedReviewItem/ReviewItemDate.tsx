import React, {memo} from 'react';
import type {OnyxEntry} from 'react-native-onyx';
import {withCurrentDate} from '@components/OnyxProvider';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';

type ReviewItemDateOnyxProps = {
    /**
     * UTC timestamp for when the action was created.
     * This Onyx prop is hooked to the current date so that relative times can update when necessary
     * e.g. past midnight.
     */
    // eslint-disable-next-line react/no-unused-prop-types
    currentDate: OnyxEntry<string>;
};

type ReviewItemDateProps = ReviewItemDateOnyxProps & {
    created: string;
};

function ReviewItemDate({created}: ReviewItemDateProps) {
    const {datetimeToCalendarTime} = useLocalize();
    const styles = useThemeStyles();

    return <Text style={[styles.chatItemMessageHeaderTimestamp]}>{datetimeToCalendarTime(created, false, false)}</Text>;
}

ReviewItemDate.displayName = 'ReviewItemDate';

export default memo(withCurrentDate()(ReviewItemDate));
