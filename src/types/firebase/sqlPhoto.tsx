/* eslint-disable react/no-unused-prop-types */

/* eslint-disable rulesdir/no-inline-named-export */

/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React from 'react';
import type {RealmCollections} from '@libs/Realm/constant';

export type SQLPhotoCoverType = RealmCollections.Restaurants | RealmCollections.Recipes;
export type SQLPhotoCoverTypeWithUnknow = SQLPhotoCoverType | RealmCollections.Unknown;

export interface IFBSqlPhoto {
    // Base(3)
    uniqueId: string;
    createdAt: string;
    updatedAt: string;
    // offline(1)
    offlinePath: string;
    relatedId: string;
    photoType: string;
    firebasePhotoId: string;
    pageId: string;
    coverId: string;
    coverType: SQLPhotoCoverTypeWithUnknow;
}
