import type {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import * as ReportUtils from '@libs/ReportUtils';
import type {ReportSettingsNavigatorParamList} from '@navigation/types';
import GroupChatNameEditPage from '@expPages/GroupChatNameEditPage';
import withReportOrNotFound from '@expPages/home/report/withReportOrNotFound';
import type {WithReportOrNotFoundProps} from '@expPages/home/report/withReportOrNotFound';
import type SCREENS from '@src/SCREENS';
import RoomNamePage from './RoomNamePage';

type NamePageProps = WithReportOrNotFoundProps & StackScreenProps<ReportSettingsNavigatorParamList, typeof SCREENS.REPORT_SETTINGS.NAME>;

function NamePage({report}: NamePageProps) {
    if (ReportUtils.isGroupChat(report)) {
        return <GroupChatNameEditPage report={report} />;
    }
    return <RoomNamePage report={report} />;
}

NamePage.displayName = 'NamePage';

export default withReportOrNotFound()(NamePage);
