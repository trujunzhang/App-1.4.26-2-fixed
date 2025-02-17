/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import type {SortObject} from '@libs/FirebaseIeatta/review-sort';
import {SortTag} from '@libs/FirebaseIeatta/review-sort';

interface IReviewQueryParas {
    relatedId: string;
    reviewType: ReviewType | string;
    reviewSortType?: string;
    reviewSearch?: string;
}
interface IFirebaseReviewQuery {
    buildForReview: () => void;
}

export type {
    // eslint-disable-next-line import/prefer-default-export
    IReviewQueryParas,
    IFirebaseReviewQuery,
};
