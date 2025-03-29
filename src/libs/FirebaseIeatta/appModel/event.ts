import lodashGet from 'lodash/get';
import type {IAuthUser} from '@libs/FirebaseIeatta/models/auth_user_model';
import {documentIdFromCurrentDate} from '@libs/FirebaseIeatta/utils/md5_utils';
import {slugifyToLower} from '@libs/FirebaseIeatta/utils/slug_helper';
import {getDateStringForCreatedOrUpdatedDate} from '@libs/FirebaseIeatta/utils/timeago_helper';
import type {IFBEvent} from '@src/types/firebase';

// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export class ParseModelEvents {
    static emptyEvent({authUserModel, restaurantId}: {authUserModel: IAuthUser; restaurantId: string}): IFBEvent {
        const event: IFBEvent = {
            // Base(5)
            uniqueId: documentIdFromCurrentDate(),
            creatorId: authUserModel.uid,
            createdAt: getDateStringForCreatedOrUpdatedDate(),
            updatedAt: getDateStringForCreatedOrUpdatedDate(),
            flag: '1',
            // Common(5+1)
            displayName: '',
            slug: '',
            want: '',
            start: '',
            end: '',
            waiterIds: [],
            // for review(2)
            rate: 0,
            reviewCount: 0,
            // point(1)
            restaurantId,
        };
        return event;
    }

    static updateEvent({
        model,
        nextDisplayName,
        nextWant,
        nextStartDate,
        nextEndDate,
    }: {
        model: IFBEvent;
        nextDisplayName: string;
        nextWant: string;
        nextStartDate: string;
        nextEndDate: string;
    }): IFBEvent {
        model.displayName = nextDisplayName;
        model.slug = slugifyToLower(nextDisplayName);
        // Others
        model.want = nextWant;
        model.start = new Date(nextStartDate).toISOString();
        model.end = new Date(nextEndDate).toISOString();

        return model;
    }

    static addWaiter({model, waiterId}: {model: IFBEvent; waiterId: string}) {
        const nextWaiters = this.getWaiterIds(model);
        const newArray = nextWaiters.concat([waiterId]);
        // Delete duplicates from a list
        const uniqueChars = [...new Set(newArray)];
        model.waiterIds = uniqueChars;

        return model;
    }

    static removeWaiter({model, waiterId}: {model: IFBEvent; waiterId: string}) {
        const nextWaiters = this.getWaiterIds(model);
        const filterArray = nextWaiters.filter((value, index, arr) => {
            return value !== waiterId;
        });
        model.waiterIds = filterArray;

        return model;
    }

    static getWaiterIds(model: IFBEvent): string[] {
        const waiterIds = model.waiterIds;
        if (typeof waiterIds === 'object') {
            return Object.values(waiterIds);
        }
        return waiterIds;
    }

    static toRealmModel(model: IFBEvent): IFBEvent {
        const parseValidWaiterIds = (waiterIds: string[] | Record<number, string>) => {
            if (typeof waiterIds === 'object') {
                return Object.values(waiterIds);
            }
            return waiterIds;
        };
        const event: IFBEvent = {
            // Base(5)
            uniqueId: lodashGet(model, 'uniqueId', ''),
            creatorId: lodashGet(model, 'creatorId', ''),
            createdAt: lodashGet(model, 'createdAt', ''),
            updatedAt: lodashGet(model, 'updatedAt', ''),
            flag: lodashGet(model, 'flag', ''),
            // Common(5+1)
            displayName: lodashGet(model, 'displayName', ''),
            slug: lodashGet(model, 'slug', ''),
            want: lodashGet(model, 'want', ''),
            start: lodashGet(model, 'start', ''),
            end: lodashGet(model, 'end', ''),
            waiterIds: parseValidWaiterIds(lodashGet(model, 'waiterIds', [])),
            // for review(2)
            rate: lodashGet(model, 'rate', 0),
            reviewCount: lodashGet(model, 'reviewCount', 0),
            // point(1)
            restaurantId: lodashGet(model, 'restaurantId', ''),
        };
        return event;
    }
}
