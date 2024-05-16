/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type {FBCollections, ReviewType} from '../../constant';
import type {SortObject} from '../../review-sort';
import {SortTag} from '../../review-sort';

interface IReviewQueryParas {
    relatedId: string;
    reviewType: ReviewType;
    reviewSortType: string;
    reviewSearch: string;
}
interface IFirebaseReviewQuery {
    buildForReview: () => void;
}

export type {
    // eslint-disable-next-line import/prefer-default-export
    IReviewQueryParas,
    IFirebaseReviewQuery,
};
