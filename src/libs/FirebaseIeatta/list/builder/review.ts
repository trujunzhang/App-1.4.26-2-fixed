// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import type {ReviewType} from '@libs/FirebaseIeatta/constant';
import {PageSection, RowPressableType} from '@libs/FirebaseIeatta/list/constant';
import type {IPageRow} from '@libs/FirebaseIeatta/list/types/page-row';
import type {ISectionEmptyRow, ISectionTitleRow} from '@libs/FirebaseIeatta/list/types/rows/common';
import type {IReviewActionbarRow, IReviewInPageRow, IReviewOnSearchAndSortChanged, IReviewSubmitRow} from '@libs/FirebaseIeatta/list/types/rows/review';
import type {IFBReview} from '@src/types/firebase';

type BuildReviewsParams = {
    shownAsReviewList?: boolean;
    relatedTitle?: string;
    relatedId: string;
    reviewType: ReviewType | string;
    reviews: IFBReview[];
    reviewChanged?: IReviewOnSearchAndSortChanged;
};

const buildReviewRows = (isSmallScreenWidth: boolean, reviews: IFBReview[]): IPageRow[] => {
    if (reviews.length === 0) {
        const rowData: ISectionEmptyRow = {emptyHint: 'sections.empty.noReviews'};
        return [
            {
                rowType: PageSection.SECTION_REVIEW_EMPTY,
                rowData,
                rowKey: 'PageSection.SECTION_REVIEW_EMPTY-<no Reviews>',
                modalName: 'empty',
                pressType: RowPressableType.NO_EVENT,
            },
        ];
    }
    const buildReviewRow = (review: IFBReview, index: number): IPageRow => {
        const rowData: IReviewInPageRow = {
            review,
            shouldShowDivide: index !== reviews.length - 1,
        };
        return {
            rowType: PageSection.SECTION_REVIEW,
            rowData,
            rowKey: `${review?.uniqueId}`,
            modalName: 'review',
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
const buildReviews = (isSmallScreenWidth: boolean, params: BuildReviewsParams): IPageRow[] => {
    const {shownAsReviewList = false, relatedTitle, relatedId, reviewType, reviews, reviewChanged} = params;

    /** only show review list on the ReviewListPage */
    if (shownAsReviewList) {
        return buildReviewRows(isSmallScreenWidth, reviews);
    }
    const titleRow: ISectionTitleRow = {
        title: isSmallScreenWidth ? 'sections.titles.reviews' : 'sections.titles.recommendedReviews',
        isSmallScreenWidth,
    };
    const titleSection: IPageRow = {
        rowType: PageSection.COMMON_TITLE,
        rowData: titleRow,
        rowKey: 'PageSection.COMMON_TITLE-<Reviews>',
        modalName: 'title',
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
    const actionbarRowData: IReviewActionbarRow | undefined = reviewChanged;
    const actionBarPageRow: IPageRow = {
        rowType: PageSection.SECTION_REVIEW_ACTION_BAR,
        rowData: actionbarRowData,
        rowKey: 'PageSection.SECTION_REVIEW_ACTION_BAR-<Reviews>',
        modalName: 'review-action-bar',
        pressType: RowPressableType.NO_EVENT,
    };
    const loggedUserSubmitRowData: IReviewSubmitRow = {
        relatedTitle: relatedTitle ?? '',
        relatedId,
        reviewType,
    };
    const loggedUserSubmitPageRow: IPageRow = {
        rowType: PageSection.SECTION_REVIEW_LOGGED_USER,
        rowData: loggedUserSubmitRowData,
        rowKey: 'PageSection.SECTION_REVIEW_LOGGED_USER<Reviews>',
        modalName: 'review-logged-user-bar',
        pressType: RowPressableType.SINGLE_PRESS,
    };

    return [titleSection, actionBarPageRow, loggedUserSubmitPageRow, ...buildReviewRows(isSmallScreenWidth, reviews)];
};

export {
    // eslint-disable-next-line import/prefer-default-export
    buildReviews,
};
