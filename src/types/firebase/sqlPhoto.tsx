/* eslint-disable react/no-unused-prop-types */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React from 'react';

export interface IFBSqlPhoto {
    // Base(5)
    uniqueId: string;
    // offline(1)
    offlinePath: string;
    relatedId: string;
    photoType: string;
    photoTableId: string;
    pageId: string;
}
