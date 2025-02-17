/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable import/prefer-default-export */

/* eslint-disable no-underscore-dangle */
import type {Query} from 'firebase/firestore';
import {collection, orderBy, query, where} from 'firebase/firestore';
import {db} from '@libs/FirebaseIeatta/config/firebase';
import {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import {SortObject, SortTag} from '@libs/FirebaseIeatta/review-sort';
import type {IFirebaseReviewQuery, IReviewQueryParas} from './types';

export class FirebaseReviewQuery implements IFirebaseReviewQuery {
    paras: IReviewQueryParas;

    queryConstraints: any = [];

    constructor(paras: IReviewQueryParas) {
        this.paras = paras;
    }

    _buildForSortType() {
        const {reviewSearch} = this.paras;
        const {reviewSortType} = this.paras;

        switch (reviewSortType) {
            case SortTag.YELP_SORT: {
                if (reviewSearch !== '') {
                    // this.queryConstraints.push(orderBy("body", "desc"));
                    this.queryConstraints.push(where('body', '<', reviewSearch));
                }
                break;
            }
            case SortTag.NEWEST_FIRST: {
                this.queryConstraints.push(orderBy('updatedAt', 'desc'));
                break;
            }
            case SortTag.OLDEST_FIRST: {
                this.queryConstraints.push(orderBy('updatedAt', 'asc'));
                break;
            }
            case SortTag.HIGHEST_RATED: {
                this.queryConstraints.push(orderBy('rate', 'desc'));
                break;
            }
            case SortTag.LOWEST_RATED: {
                this.queryConstraints.push(orderBy('rate', 'asc'));
                break;
            }
            default: {
                break;
            }
        }
    }

    _buildForReviewType() {
        const {reviewType, relatedId} = this.paras;
        switch (reviewType) {
            case ReviewType.Restaurant: {
                this.queryConstraints.push(where('reviewType', '==', reviewType));
                this.queryConstraints.push(where('restaurantId', '==', relatedId));
                break;
            }
            case ReviewType.Event: {
                this.queryConstraints.push(where('reviewType', '==', reviewType));
                this.queryConstraints.push(where('eventId', '==', relatedId));
                break;
            }
            case ReviewType.Recipe: {
                this.queryConstraints.push(where('reviewType', '==', reviewType));
                this.queryConstraints.push(where('recipeId', '==', relatedId));
                break;
            }
            default: {
                break;
            }
        }
    }

    /**
    |--------------------------------------------------
    | Review
    |--------------------------------------------------
    */
    buildForReview(): Query {
        this._buildForReviewType();
        this._buildForSortType();
        return query(collection(db, FBCollections.Reviews), ...this.queryConstraints);
    }
}
