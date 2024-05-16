/* eslint-disable react/no-unused-prop-types */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React from 'react';

export interface IFBEvent {
    // Base(5)
    uniqueId: string;
    flag: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string;
    // Common(5+1)
    displayName: string;
    slug: string;
    want: string;
    start: string;
    end: string;
    waiterIds: string[];
    // for review(2)
    rate: number;
    reviewCount: number;
    // point(1)
    restaurantId: string;
}
function Event(props: IFBEvent) {
    return <>{props.uniqueId}</>;
}
