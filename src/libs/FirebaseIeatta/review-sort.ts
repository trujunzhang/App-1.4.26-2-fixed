/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable no-restricted-syntax */

/* eslint-disable @typescript-eslint/naming-convention */
import type IconAsset from '@src/types/utils/IconAsset';

export enum SortTag {
    YELP_SORT = 'default',
    NEWEST_FIRST = 'newest',
    OLDEST_FIRST = 'oldest',
    HIGHEST_RATED = 'highest',
    LOWEST_RATED = 'lowest',
}

// eslint-disable-next-line rulesdir/no-inline-named-export
export type ReviewDropdownOption = {
    value: string;
    text: string;
    icon?: IconAsset;
    iconWidth?: number;
    iconHeight?: number;
    iconDescription?: string;
};

export const reviewSortOptions: ReviewDropdownOption[] = [
    {
        value: SortTag.YELP_SORT,
        text: 'Yelp Sort',
    },
    {
        value: SortTag.NEWEST_FIRST,
        text: 'Newest First',
    },
    {
        value: SortTag.OLDEST_FIRST,
        text: 'Oldest First',
    },
    {
        value: SortTag.HIGHEST_RATED,
        text: 'Highest Rated',
    },
    {
        value: SortTag.LOWEST_RATED,
        text: 'Lowest Rated',
    },
];

export type SortObject = {
    title: string;
    tag: SortTag | string;
};

export const defaultSortObject: SortObject = {
    title: 'Yelp Sort',
    tag: SortTag.YELP_SORT,
};

export const sortObjects: Record<string, SortObject> = {
    [SortTag.YELP_SORT]: {
        title: 'Yelp Sort',
        tag: SortTag.YELP_SORT,
    },
    [SortTag.NEWEST_FIRST]: {
        title: 'Newest First',
        tag: SortTag.NEWEST_FIRST,
    },
    [SortTag.OLDEST_FIRST]: {
        title: 'Oldest First',
        tag: SortTag.OLDEST_FIRST,
    },
    [SortTag.HIGHEST_RATED]: {
        title: 'Highest Rated',
        tag: SortTag.HIGHEST_RATED,
    },
    [SortTag.LOWEST_RATED]: {
        title: 'Lowest Rated',
        tag: SortTag.LOWEST_RATED,
    },
};

export const parseSortObject = (tag: string) => {
    switch (tag) {
        case SortTag.YELP_SORT: {
            return sortObjects[SortTag.YELP_SORT];
        }
        case SortTag.NEWEST_FIRST: {
            return sortObjects[SortTag.NEWEST_FIRST];
        }
        case SortTag.OLDEST_FIRST: {
            return sortObjects[SortTag.OLDEST_FIRST];
        }
        case SortTag.HIGHEST_RATED: {
            return sortObjects[SortTag.HIGHEST_RATED];
        }
        case SortTag.LOWEST_RATED: {
            return sortObjects[SortTag.LOWEST_RATED];
        }
        default: {
            break;
        }
    }

    return sortObjects[SortTag.YELP_SORT];
};
