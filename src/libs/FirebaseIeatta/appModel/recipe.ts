/* eslint-disable no-param-reassign */
import type {IAuthUser} from '@libs/FirebaseIeatta/models/auth_user_model';
import {documentIdFromCurrentDate} from '@libs/FirebaseIeatta/utils/md5_utils';
import {slugifyToLower} from '@libs/FirebaseIeatta/utils/slug_helper';
import {getDateStringForCreatedOrUpdatedDate} from '@libs/FirebaseIeatta/utils/timeago_helper';
import type {IFBRecipe} from '@src/types/firebase';

// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export class ParseModelRecipes {
    static emptyRecipe({authUserModel, restaurantId}: {authUserModel: IAuthUser; restaurantId: string}): IFBRecipe {
        const recipe: IFBRecipe = {
            // Base(5)
            uniqueId: documentIdFromCurrentDate(),
            creatorId: authUserModel.uid,
            createdAt: getDateStringForCreatedOrUpdatedDate(),
            updatedAt: getDateStringForCreatedOrUpdatedDate(),
            flag: '1',
            // Common(5)
            displayName: '',
            slug: '',
            price: '',
            originalUrl: '',
            thumbnailUrl: '',
            // for review(2)
            rate: 0,
            reviewCount: 0,
            // point(1)
            restaurantId,
        };
        return recipe;
    }

    static updateCover({model, originalUrl}: {model: IFBRecipe; originalUrl: string}): IFBRecipe {
        model.originalUrl = originalUrl;
        model.updatedAt = getDateStringForCreatedOrUpdatedDate();

        return model;
    }

    static updateRecipe({model, nextDisplayName, nextPrice}: {model: IFBRecipe; nextDisplayName: string; nextPrice: string}): IFBRecipe {
        model.displayName = nextDisplayName;
        model.slug = slugifyToLower(nextDisplayName);
        // Others
        model.price = nextPrice;
        model.updatedAt = getDateStringForCreatedOrUpdatedDate();

        return model;
    }
}
