/* eslint-disable @typescript-eslint/lines-between-class-members */

/* eslint-disable default-case */

/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

/* eslint-disable no-param-reassign */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {FBCollections, ReviewType} from '@libs/Firebase/constant';
import type {IAuthUser} from '@libs/Firebase/models/auth_user_model';
import {documentIdFromCurrentDate} from '@libs/Firebase/utils/md5_utils';
import {getDateStringForCreatedOrUpdatedDate} from '@libs/Firebase/utils/timeago_helper';
import type {IFBReview} from '@src/types/firebase';

// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export class ParseModelReviews {
    static emptyReview({authUserModel, relatedId, reviewType}: {authUserModel: IAuthUser; relatedId: string; reviewType: string}) {
        const review: IFBReview = {
            // Base(5)
            uniqueId: documentIdFromCurrentDate(),
            creatorId: authUserModel.uid,
            createdAt: getDateStringForCreatedOrUpdatedDate(),
            updatedAt: getDateStringForCreatedOrUpdatedDate(),
            flag: '1',
            // Common(2)
            rate: 0,
            body: '',
            // user(2)
            username: authUserModel.displayName ?? '',
            avatarUrl: authUserModel.photoURL ?? '',
            // point(4)
            reviewType,
            restaurantId: reviewType === ReviewType.Restaurant ? relatedId : '',
            eventId: reviewType === ReviewType.Event ? relatedId : '',
            recipeId: reviewType === ReviewType.Recipe ? relatedId : '',
        };
        return review;
    }

    static updateReview({model, nextRate, nextExtraNote}: {model: IFBReview; nextRate: number; nextExtraNote: string}): IFBReview {
        model.rate = nextRate;
        model.body = nextExtraNote;
        model.updatedAt = getDateStringForCreatedOrUpdatedDate();

        return model;
    }

    static getRelatedModelType(reviewType: string): FBCollections {
        switch (reviewType) {
            case ReviewType.Restaurant: {
                return FBCollections.Restaurants;
            }
            case ReviewType.Event: {
                return FBCollections.Events;
            }
            case ReviewType.Recipe: {
                return FBCollections.Recipes;
            }
        }
        return FBCollections.Unknown;
    }

    static getRelatedId(model: IFBReview): string {
        switch (model.reviewType) {
            case ReviewType.Restaurant: {
                return model.restaurantId || '';
            }
            case ReviewType.Event: {
                return model.eventId || '';
            }
            case ReviewType.Recipe: {
                return model.recipeId || '';
            }
        }
        return '';
    }
}
