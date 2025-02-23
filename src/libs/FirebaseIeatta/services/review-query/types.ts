/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type {ReviewType} from '@libs/FirebaseIeatta/constant';

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
