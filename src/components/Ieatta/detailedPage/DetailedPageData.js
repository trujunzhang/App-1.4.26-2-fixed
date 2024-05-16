import PropTypes from 'prop-types';
import React from 'react';
import DetailedPageLayout from './DetailedPageLayout';
import {pageRowPropTypes} from './pageLayoutProptypes';

const propTypes = {
    /** Sections for the section list */
    rowsData: PropTypes.arrayOf(pageRowPropTypes).isRequired,

    fetchMoreReviews: PropTypes.func.isRequired,

    shouldShowNotFoundPage: PropTypes.bool.isRequired,

    // eslint-disable-next-line react/forbid-prop-types
    navigation: PropTypes.object.isRequired,

    shouldShowLoading: PropTypes.bool.isRequired,
    loadingContent: PropTypes.node,
};

const defaultProps = {
    loadingContent: null,
};

// eslint-disable-next-line react/prop-types
function DetailedPageData({rowsData, fetchMoreReviews, shouldShowNotFoundPage, navigation, shouldShowLoading, loadingContent}) {
    return (
        <DetailedPageLayout
            rowsData={rowsData}
            fetchMoreReviews={fetchMoreReviews}
            shouldShowNotFoundPage={shouldShowNotFoundPage}
            navigation={navigation}
            shouldShowLoading={shouldShowLoading}
            loadingContent={loadingContent}
        />
    );
}

DetailedPageData.propTypes = propTypes;
DetailedPageData.defaultProps = defaultProps;
DetailedPageData.displayName = 'DetailedPageData';

export default DetailedPageData;
