/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @lwc/lwc/no-async-await */

/* eslint-disable no-invalid-this */

/* eslint-disable default-case */

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

/* eslint-disable no-param-reassign */
// eslint-disable-next-line lodash/import-scope
import _ from 'lodash';
import {ParseModelReviews} from '@libs/FirebaseIeatta/appModel';
import type {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import FirebaseHelper from '@libs/FirebaseIeatta/services/firebase-helper';
import type {IFBEvent, IFBRecipe, IFBRestaurant} from '@src/types/firebase';

// eslint-disable-next-line no-restricted-syntax
enum ReviewHookType {
    Add = 'Add',
    Remove = 'Remove',
}

type ReviewHelperParams = {
    lastReviewRate: number;
    selectedStar: number;
    isNew: boolean;
};

type RelatedModels = IFBRestaurant | IFBEvent | IFBRecipe;
type RelatedModelsWithUndefined = RelatedModels | undefined;

type BaseReview = {
    rate: number;
    reviewCount: number;
};

type BaseRelatedParams = {
    reviewType: ReviewType | string;
    relatedId: string;
};

type GetRelatedModelParams = BaseRelatedParams & {
    path: FBCollections;
};

type OnSaveOrRemoveReviewAfterHookParams = BaseRelatedParams & {
    reviewHookType: ReviewHookType;
};

class ReviewHelper {
    private lastReviewRate: number;

    private selectedStar = 0;

    private isNew = false;

    constructor({lastReviewRate, selectedStar, isNew}: ReviewHelperParams) {
        this.lastReviewRate = lastReviewRate;
        this.selectedStar = selectedStar;
        this.isNew = isNew;
    }

    updateSavedReview(baseReview: BaseReview) {
        baseReview.rate = baseReview.rate - this.lastReviewRate + this.selectedStar;
        baseReview.reviewCount += this.isNew ? 1 : 0;
    }

    updateRemovedReview(baseReview: BaseReview) {
        baseReview.rate -= this.lastReviewRate;
        baseReview.reviewCount -= 1;
    }

    private getRelatedModel({reviewType, relatedId, path}: GetRelatedModelParams): Promise<RelatedModelsWithUndefined> {
        return new FirebaseHelper().getData({path, id: relatedId}) as Promise<RelatedModelsWithUndefined>;
    }

    onSaveOrRemoveReviewAfterHook = ({reviewHookType, reviewType, relatedId}: OnSaveOrRemoveReviewAfterHookParams) => {
        const path: FBCollections = ParseModelReviews.getRelatedModelType(reviewType);
        this.getRelatedModel({
            reviewType,
            relatedId,
            path,
        }).then((relatedModel: RelatedModelsWithUndefined) => {
            if (_.isUndefined(relatedModel)) {
                console.log('');
                return Promise.resolve();
            }
            const nextModel: RelatedModels = {...relatedModel};

            /**
             |--------------------------------------------------
             | Update review
             |--------------------------------------------------
             */
            switch (reviewHookType) {
                case ReviewHookType.Add: {
                    this.updateSavedReview(nextModel);
                    break;
                }
                case ReviewHookType.Remove: {
                    this.updateRemovedReview(nextModel);
                    break;
                }
            }
            /**
             |--------------------------------------------------
             | Save model
             |--------------------------------------------------
             */
            return new FirebaseHelper().setData({path, model: nextModel});
        });
    };
}

export {ReviewHookType};

export default ReviewHelper;
