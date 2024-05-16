/* eslint-disable react/no-unused-prop-types */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React from 'react';

export interface IFBReview {
    // Base(5)
    uniqueId: string;
    flag: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string;
    // Common(2)
    rate: number;
    body: string;
    // user(2)
    username: string;
    avatarUrl: string;
    // point(4)
    reviewType: string;
    restaurantId?: string;
    eventId?: string;
    recipeId?: string;
}
function Review(props: IFBReview) {
    return <>{props.uniqueId}</>;
}
