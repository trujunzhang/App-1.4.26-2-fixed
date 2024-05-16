// import {
//     IEventRow,
//     IPageRow,
//     IPeopleInEventInforPanelRow,
//     IReviewRow,
//     IUserInEventRow,
//     PageSection
// } from '@shared-store/selectors/enum/Page-Section-Constant'
import type {IFBRecipe} from '@src/types/firebase';
import {PageSection} from './constant';
import type {IPageRow} from './types/page-row';

// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export class KeyGenerator {
    static build = (item: IPageRow, index: number) => {
        const rowKey = KeyGenerator.generate(item, index);
        // console.log('key :>> ', item.rowType + '-' + index, ' rowKey:', rowKey)
        return rowKey;
    };

    static generate = (item: IPageRow, index: number) => {
        // eslint-disable-next-line default-case
        switch (item.rowType) {
            case PageSection.PANEL_RESTAURANT_INFO_WEB:
            case PageSection.PANEL_RESTAURANT_INFO:
            case PageSection.PANEL_EVENT_INFO:
            case PageSection.PANEL_PEOPLEINEVENT_INFO:
            case PageSection.PANEL_RECIPE_INFO: {
                return `${item.rowType}-${index}`;
            }
            case PageSection.COMMON_TITLE: {
                return `${item.rowType}-${index}`;
            }
            /**
             |--------------------------------------------------
             | restaurant
             |--------------------------------------------------
             */
            case PageSection.RESTAURANT_ADDRESS: {
                return `${item.rowType}-${index}`;
            }
            // event(restaurant)
            case PageSection.RESTAURANT_EVENT: {
                // const { event } = item.rowData as IEventRow
                // return event.uniqueId + '-' + index
                break;
            }
            case PageSection.RESTAURANT_EVENT_EMPTY: {
                return `${item.rowType}-${index}`;
            }
            // menu(restaurant)
            case PageSection.RESTAURANT_MENU_ROW: {
                return `${item.rowType}-${index}`;
            }
            case PageSection.RESTAURANT_MENU_TITLE: {
                return `${item.rowType}-${index}`;
            }
            /**
             |--------------------------------------------------
             | event
             |--------------------------------------------------
             */
            case PageSection.EVENT_USER: {
                // const { user } = item.rowData as IUserInEventRow
                // return user.id + '-' + index
                break;
            }
            case PageSection.EVENT_USER_EMPTY: {
                return `${item.rowType}-${index}`;
            }
            // waiter(event)
            case PageSection.EVENT_WAITER_TITLE: {
                return `${item.rowType}-${index}`;
            }
            case PageSection.EVENT_WAITER_ROW: {
                return `${item.rowType}-${index}`;
            }
            /**
             |--------------------------------------------------
             | PeopleInEvent
             |--------------------------------------------------
             */
            case PageSection.PEOPLEINEVENT_RECIPE: {
                // const recipe = item.rowData as IFBRecipe
                // return recipe.uniqueId + '-' + index
                break;
            }
            case PageSection.PEOPLEINEVENT_RECIPE_EMPTY: {
                return `${item.rowType}-${index}`;
            }
            /**
             |--------------------------------------------------
             | Common
             |--------------------------------------------------
             */
            // photo(restaurant/recipe)
            case PageSection.SECTION_PHOTO_ROW: {
                return `${item.rowType}-${index}`;
            }
            case PageSection.SECTION_PHOTO_TITLE: {
                return `${item.rowType}-${index}`;
            }
            // review(restaurant/event/recipe)
            case PageSection.SECTION_REVIEW: {
                // const { review } = item.rowData as IReviewRow
                // return review.uniqueId + '-' + index
                break;
            }
            case PageSection.SECTION_REVIEW_EMPTY: {
                return `${item.rowType}-${index}`;
            }
            case PageSection.SECTION_REVIEW_SEE_ALL: {
                return `${item.rowType}-${index}`;
            }
            case PageSection.SECTION_PHOTO_COVER: {
                throw new Error('Not implemented yet: PageSection.SECTION_PHOTO_COVER case');
            }
        }
    };
}
