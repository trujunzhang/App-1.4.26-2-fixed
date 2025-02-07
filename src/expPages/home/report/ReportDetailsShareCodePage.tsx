import React from 'react';
import * as ReportUtils from '@libs/ReportUtils';
import NotFoundPage from '@src/expPages/ErrorPage/NotFoundPage';
import ShareCodePage from '@src/expPages/ShareCodePage';
import type {WithReportOrNotFoundProps} from './withReportOrNotFound';
import withReportOrNotFound from './withReportOrNotFound';

type ReportDetailsShareCodePageProps = WithReportOrNotFoundProps;

function ReportDetailsShareCodePage({report}: ReportDetailsShareCodePageProps) {
    if (ReportUtils.isSelfDM(report)) {
        return <NotFoundPage />;
    }
    return <ShareCodePage report={report} />;
}

export default withReportOrNotFound()(ReportDetailsShareCodePage);
