import {isBefore} from 'date-fns';
// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import lodashGet from 'lodash/get';
import Onyx from 'react-native-onyx';
import * as API from '@libs/API';
import * as ErrorUtils from '@libs/ErrorUtils';
import Log from '@libs/Log';
import Navigation from '@libs/Navigation/Navigation';
import * as SequentialQueue from '@libs/Network/SequentialQueue';
import * as Pusher from '@libs/Pusher/pusher';
import PusherUtils from '@libs/PusherUtils';
import * as ReportActionsUtils from '@libs/ReportActionsUtils';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type {IFBEvent, IFBPeopleInEvent, IFBPhoto, IFBRecipe, IFBRestaurant, IFBReview, IFBUser} from '@src/types/firebase';
import type {QuerySnapshot, SyncFBEvents, SyncFBPeopleInEvents, SyncFBPhotos, SyncFBRecipes, SyncFBRestaurants, SyncFBReviews, SyncFBUsers} from './types';

const syncFBUsers: SyncFBUsers = (querySnapshot: QuerySnapshot) => {};

const syncFBRestaurants: SyncFBRestaurants = (querySnapshot: QuerySnapshot) => {};

const syncFBEvents: SyncFBEvents = (querySnapshot: QuerySnapshot) => {};

const syncFBRecipes: SyncFBRecipes = (querySnapshot: QuerySnapshot) => {};

const syncFBPhotos: SyncFBPhotos = (querySnapshot: QuerySnapshot) => {};

const syncFBReviews: SyncFBReviews = (querySnapshot: QuerySnapshot) => {};

const syncFBPeopleInEvents: SyncFBPeopleInEvents = (querySnapshot: QuerySnapshot) => {};

export {syncFBUsers, syncFBRestaurants, syncFBEvents, syncFBRecipes, syncFBPhotos, syncFBReviews, syncFBPeopleInEvents};
