import type {ReviewType} from '@libs/FirebaseIeatta/constant';
import type {IFBReview} from '@src/types/firebase';

type OnReviewSearchChanged = (text: string) => void;
type OnReviewSortChanged = (sortType: string) => void;

// eslint-disable-next-line rulesdir/no-inline-named-export
type IReviewOnSearchAndSortChanged = {
    onReviewSearchChanged: OnReviewSearchChanged;
    onReviewSortChanged: OnReviewSortChanged;
};

type IReviewTitleRow = {
    relatedId: string;
    reviewType: ReviewType;
};

type IReviewRow = {
    relatedId: string;
    reviewType: ReviewType | string;
};

type IReviewSubmitRow = {
    relatedTitle: string;
} & IReviewRow;

type IReviewInPageRow = {
    review: IFBReview;
    shouldShowDivide: boolean;
};

type IReviewActionbarRow = IReviewOnSearchAndSortChanged;

export type {
    // eslint-disable-next-line import/prefer-default-export
    OnReviewSortChanged,
    OnReviewSearchChanged,
    IReviewOnSearchAndSortChanged,
    IReviewTitleRow,
    IReviewRow,
    IReviewSubmitRow,
    IReviewInPageRow,
    IReviewActionbarRow,
};
