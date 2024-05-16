/* eslint-disable react/no-unused-prop-types */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React from 'react';

export interface IFBPeopleInEvent {
    // Base(5)
    uniqueId: string;
    flag: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string;
    // Common(1)
    recipeIds: string[];
    // point(3)
    restaurantId: string;
    eventId: string;
    userId: string;
}
function PeopleInEvent(props: IFBPeopleInEvent) {
    return <>{props.uniqueId}</>;
}
