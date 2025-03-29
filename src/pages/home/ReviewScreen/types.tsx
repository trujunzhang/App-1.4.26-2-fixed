/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {StackScreenProps} from '@react-navigation/stack';
import lodashGet from 'lodash/get';
import React from 'react';
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import {FBCollections, ReviewType} from '@libs/FirebaseIeatta/constant';
import * as FirebaseQuery from '@libs/FirebaseIeatta/services/firebase-query';
import {emptyReviewTag} from '@libs/ieatta/editFormUtils';
import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';

// type ReviewsListNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.REVIEWS_LIST>;
type ReviewsListNavigationProps = PlatformStackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.REVIEWS_LIST>;

// eslint-disable-next-line import/prefer-default-export
export type {ReviewsListNavigationProps};
