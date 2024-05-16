/* eslint-disable prefer-arrow-callback */

/* eslint-disable no-param-reassign */

/* eslint-disable @dword-design/import-alias/prefer-alias */

/* eslint-disable no-param-reassign */
import lodashGet from 'lodash/get';
import type {IAuthUser} from '@libs/Firebase/models/auth_user_model';
import type {IFBPeopleInEvent} from '@src/types/firebase';
import {documentIdFromCurrentDate} from '../utils/md5_utils';
import {getDateStringForCreatedOrUpdatedDate} from '../utils/timeago_helper';

// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export class ParseModelPeopleInEvent {
    static emptyPeopleInEvent({authUserModel}: {authUserModel: IAuthUser}): IFBPeopleInEvent {
        const peopleInEvent: IFBPeopleInEvent = {
            // Base(5)
            uniqueId: documentIdFromCurrentDate(),
            creatorId: authUserModel.uid,
            createdAt: getDateStringForCreatedOrUpdatedDate(),
            updatedAt: getDateStringForCreatedOrUpdatedDate(),
            flag: '1',
            // Common(1)
            recipeIds: [],
            // point(3)
            restaurantId: '',
            eventId: '',
            userId: '',
        };
        return peopleInEvent;
    }

    static updatePeopleInEvent({model, restaurantId, eventId, userId}: {model: IFBPeopleInEvent; restaurantId: string; eventId: string; userId: string}): IFBPeopleInEvent {
        model.restaurantId = restaurantId;
        model.eventId = eventId;
        model.userId = userId;

        return model;
    }

    static addRecipe({model, recipeId}: {model: IFBPeopleInEvent; recipeId: string}) {
        const nextRecipeIds = model.recipeIds;
        const newArray = nextRecipeIds.concat([recipeId]);
        // Delete duplicates from a list
        const uniqueChars = [...new Set(newArray)];
        model.recipeIds = uniqueChars;

        return model;
    }

    static removeRecipe({model, recipeId}: {model: IFBPeopleInEvent; recipeId: string}) {
        const nextRecipeIds = model.recipeIds;
        const filterArray = nextRecipeIds.filter(function (value, index, arr) {
            return value !== recipeId;
        });
        model.recipeIds = filterArray;

        return model;
    }

    static toRealmModel(model: IFBPeopleInEvent): IFBPeopleInEvent {
        const parseValidRecipeIds = (recipeIds: string[] | Record<number, string>) => {
            if (typeof recipeIds === 'object') {
                return Object.values(recipeIds);
            }
            return recipeIds;
        };

        const peopleInEvent: IFBPeopleInEvent = {
            // Base(5)
            uniqueId: lodashGet(model, 'uniqueId', ''),
            creatorId: lodashGet(model, 'creatorId', ''),
            createdAt: lodashGet(model, 'createdAt', ''),
            updatedAt: lodashGet(model, 'updatedAt', ''),
            flag: lodashGet(model, 'flag', ''),
            // Common(1)
            recipeIds: parseValidRecipeIds(lodashGet(model, 'recipeIds', [])),
            // point(3)
            restaurantId: lodashGet(model, 'restaurantId', ''),
            eventId: lodashGet(model, 'eventId', ''),
            userId: lodashGet(model, 'userId', ''),
        };
        return peopleInEvent;
    }
}
