import _ from 'lodash';
import type {ReviewType} from '@libs/Firebase/constant';
import {PageSection, RowPressableType} from '@libs/Firebase/list/constant';
import type {ISectionEmptyRow, ISectionTitleRow} from '@libs/Firebase/list/types/rows/common';
import type {IReviewActionbarRow, IReviewInPageRow, IReviewOnSearchAndSortChanged, IReviewRow, IReviewSubmitRow, IReviewTitleRow} from '@libs/Firebase/list/types/rows/review';
import type {IFBReview} from '@src/types/firebase';

type BuildReviewsParams = {
    relatedTitle: string;
    relatedId: string;
    reviewType: ReviewType;
    reviews: IFBReview[];
    reviewChanged: IReviewOnSearchAndSortChanged;
};

const buildReviewRows = (isSmallScreenWidth: boolean, reviews: IFBReview[]) => {
    if (reviews.length === 0) {
        const rowData: ISectionEmptyRow = {emptyHint: 'sections.empty.noReviews'};
        return [
            {
                rowType: PageSection.SECTION_REVIEW_EMPTY,
                rowData,
                rowKey: 'PageSection.SECTION_REVIEW_EMPTY-<no Reviews>',
                pressType: RowPressableType.NO_EVENT,
            },
        ];
    }
    const buildReviewRow = (review: IFBReview, index: number) => {
        const rowData: IReviewInPageRow = {
            review,
            shouldShowDivide: index !== reviews.length - 1,
        };
        return {
            rowType: PageSection.SECTION_REVIEW,
            rowData,
            rowKey: `${review?.uniqueId}`,
            pressType: RowPressableType.SECONDARY_PRESS,
        };
    };

    return _.map(reviews, buildReviewRow);
};
/**
 |--------------------------------------------------
 | Reviews
 |--------------------------------------------------
 */
const buildReviews = (isSmallScreenWidth: boolean, params: BuildReviewsParams) => {
    const {relatedTitle, relatedId, reviewType, reviews, reviewChanged} = params;
    const titleRow: ISectionTitleRow = {
        title: isSmallScreenWidth ? 'sections.titles.reviews' : 'sections.titles.recommendedReviews',
        isSmallScreenWidth,
    };
    const titleSection = {
        rowType: PageSection.COMMON_TITLE,
        rowData: titleRow,
        rowKey: 'PageSection.COMMON_TITLE-<Reviews>',
        pressType: RowPressableType.NO_EVENT,
    };

    /**
     * for small screen
     */
    if (isSmallScreenWidth) {
        return [titleSection, ...buildReviewRows(isSmallScreenWidth, reviews)];
    }

    /**
     * for web screen
     */
    const actionbarRowData: IReviewActionbarRow = reviewChanged;
    const actionBarRow = {
        rowType: PageSection.SECTION_REVIEW_ACTION_BAR,
        rowData: actionbarRowData,
        rowKey: 'PageSection.SECTION_REVIEW_ACTION_BAR-<Reviews>',
        pressType: RowPressableType.NO_EVENT,
    };
    const loggedUserSubmitRowData: IReviewSubmitRow = {
        relatedTitle,
        relatedId,
        reviewType,
    };
    const loggedUserSubmitRow = {
        rowType: PageSection.SECTION_REVIEW_LOGGED_USER,
        rowData: loggedUserSubmitRowData,
        rowKey: 'PageSection.SECTION_REVIEW_LOGGED_USER<Reviews>',
        pressType: RowPressableType.SINGLE_PRESS,
    };

    return [titleSection, actionBarRow, loggedUserSubmitRow, ...buildReviewRows(isSmallScreenWidth, reviews)];
};

export {
    // eslint-disable-next-line import/prefer-default-export
    buildReviews,
};
