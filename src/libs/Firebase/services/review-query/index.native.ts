/* eslint-disable @typescript-eslint/no-empty-function */
import {FBCollections, ReviewType} from '../../constant';
import {SortObject, SortTag} from '../../review-sort';
import type {IFirebaseReviewQuery, IReviewQueryParas} from './types';

class FirebaseReviewQuery implements IFirebaseReviewQuery {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(paras: IReviewQueryParas) {}

    buildForReview() {}
}

export {
    // eslint-disable-next-line import/prefer-default-export
    FirebaseReviewQuery,
};
