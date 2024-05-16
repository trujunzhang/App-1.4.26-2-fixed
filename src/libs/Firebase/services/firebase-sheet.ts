import type {IFBEvent, IFBPeopleInEvent, IFBReview} from '@src/types/firebase';
import {ParseModelEvents, ParseModelPeopleInEvent, ParseModelReviews} from '../appModel';
import {FBCollections, FBRemoveType} from '../constant';
import FirebaseHelper from './firebase-helper';
// import { ISheetModelState } from '@shared-store/slice/popupSlice'
import ReviewHelper, {ReviewHookType} from './help/review-helper';

class FirebaseSheet {
    // private rootState: RootState

    // private sheetModel: ISheetModelState

    // constructor(rootState: RootState) {
    // this.rootState = rootState
    // this.sheetModel = rootState.popup
    // }

    // eslint-disable-next-line @lwc/lwc/no-async-await
    delete = async () => {
        // const {sheetType, removedId, parseObjectId} = this.sheetModel
        const sheetType: string = FBRemoveType.Restaurants;

        switch (sheetType) {
            default: {
                break;
            }
            case FBRemoveType.Restaurants: {
                // await new FirebaseHelper().deleteData({
                //     path: FBCollections.Restaurants,
                //     uniqueId: removedId
                // })
                break;
            }
            case FBRemoveType.OrderedRecipe: {
                // Ordered recipe in PeopleInEvent
                // const peopleInEvent: IFBPeopleInEvent | undefined = selectSinglePeopleInEvent(this.rootState, parseObjectId)
                // const nextModel: IFBPeopleInEvent = ParseModelPeopleInEvent.removeRecipe({
                //     model: Object.assign({}, peopleInEvent),
                //     recipeId: removedId
                // })
                // await new FirebaseHelper().setData({
                //     path: FBCollections.PeopleInEvent,
                //     model: nextModel
                // })
                break;
            }
            case FBRemoveType.Waiter: {
                // const event: IFBEvent | undefined = selectSingleEvent(this.rootState, parseObjectId)
                // const nextModel: IFBEvent = ParseModelEvents.removeWaiter({
                //     model: Object.assign({}, event),
                //     waiterId: removedId
                // })
                // await new FirebaseHelper().setData({
                //     path: FBCollections.Events,
                //     model: nextModel
                // })
                break;
            }
            case FBRemoveType.Events: {
                // await new FirebaseHelper().deleteData({
                //     path: FBCollections.Events,
                //     uniqueId: removedId
                // })
                break;
            }
            case FBRemoveType.PeopleInEvent: {
                // await new FirebaseHelper().deleteData({
                //     path: FBCollections.PeopleInEvent,
                //     uniqueId: removedId
                // })
                break;
            }
            case FBRemoveType.Recipes: {
                break;
            }
            case FBRemoveType.Photos: {
                // await new FirebaseHelper().deleteData({
                //     path: FBCollections.Photos,
                //     uniqueId: removedId
                // })
                break;
            }
            case FBRemoveType.Reviews: {
                // const review: IFBReview | undefined = selectSingleReview(this.rootState, removedId)
                // if (review !== undefined && review !== null) {
                //     const instance = new ReviewHelper({
                //         rootState: this.rootState,
                //         lastReviewRate: review.rate,
                //         selectedStar: -1,
                //         isNew: false
                //     })
                //     await instance.onSaveOrRemoveReviewAfterHook({
                //         reviewHookType: ReviewHookType.Remove,
                //         reviewType: review.reviewType,
                //         relatedId: ParseModelReviews.getRelatedId(review)
                //     })
                // }
                // await new FirebaseHelper().deleteData({
                //     path: FBCollections.Reviews,
                //     uniqueId: removedId
                // })
                break;
            }
        }
    };
}

export default FirebaseSheet;
