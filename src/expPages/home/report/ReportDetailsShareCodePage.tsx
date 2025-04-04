import NotFoundPage from '@expPages/ErrorPage/NotFoundPage';
import ShareCodePage from '@expPages/ShareCodePage';
import React from 'react';
import {withOnyx} from 'react-native-onyx';
import type {OnyxEntry} from 'react-native-onyx';
import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {ReportDetailsNavigatorParamList} from '@libs/Navigation/types';
import * as ReportUtils from '@libs/ReportUtils';
import ONYXKEYS from '@src/ONYXKEYS';
import type SCREENS from '@src/SCREENS';
import type {Policy} from '@src/types/onyx';
import type {WithReportOrNotFoundProps} from './withReportOrNotFound';
import withReportOrNotFound from './withReportOrNotFound';

type ReportDetailsShareCodePageOnyxProps = {
    policy: OnyxEntry<Policy>;
};

type ReportDetailsShareCodePageProps = ReportDetailsShareCodePageOnyxProps &
    WithReportOrNotFoundProps &
    PlatformStackScreenProps<ReportDetailsNavigatorParamList, typeof SCREENS.REPORT_DETAILS.SHARE_CODE>;

function ReportDetailsShareCodePage({report, policy, route}: ReportDetailsShareCodePageProps) {
    if (ReportUtils.isSelfDM(report)) {
        return <NotFoundPage />;
    }
    return (
        <ShareCodePage
            backTo={route.params?.backTo}
            report={report}
            policy={policy}
        />
    );
}

export default withReportOrNotFound()(
    withOnyx<ReportDetailsShareCodePageProps, ReportDetailsShareCodePageOnyxProps>({
        policy: {
            key: ({report}) => `${ONYXKEYS.COLLECTION.POLICY}${report?.policyID}`,
        },
    })(ReportDetailsShareCodePage),
);
