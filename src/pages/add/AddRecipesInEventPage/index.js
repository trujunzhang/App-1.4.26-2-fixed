import lodashGet from 'lodash/get';
import React, {useCallback, useState} from 'react';
import {useCollectionOnce, useDocumentData} from 'react-firebase-hooks/firestore';
import {usePagination} from 'react-firebase-pagination-hooks';
import _ from 'underscore';
import ReportActionsSkeletonView from '@components/ReportActionsSkeletonView';
import {FBCollections, ReviewType} from '@libs/Firebase/constant';
import {getEventID} from '@libs/Firebase/helper/EventUtils';
import {defaultSortObject} from '@libs/Firebase/review-sort';
import {queryEventOrMenuInRestaurant, queryForPeopleInEvents, querySingle} from '@libs/Firebase/services/firebase-query';
import {FirebaseReviewQuery} from '@libs/Firebase/services/review-query';
import {emptyPeopleInEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import {toRecipeDictInRestaurant} from '@libs/ieatta/eventUtils';
import Variables from '@styles/variables';
import CONST from '@src/CONST';
import BaseAddRecipesPage from './BaseAddRecipesPage';
import {defaultProps, propTypes} from './propTypes';

function AddRecipesInEventPage({route}) {
    const restaurantId = lodashGet(route, 'params.restaurantId', emptyRestaurantTag);
    const peopleInEventId = lodashGet(route, 'params.peopleInEventId', emptyPeopleInEventTag);

    /**
      |--------------------------------------------------
      | Single(PeopleInEvent)
      |--------------------------------------------------
      */
    const [peopleInEvent, loadingForPeopleInEvent, errorForPeopleInEvent] = useDocumentData(
        querySingle({
            path: FBCollections.PeopleInEvent,
            id: peopleInEventId,
        }),
    );

    /**
     |--------------------------------------------------
     | List(recipes)
     |--------------------------------------------------
     */
    const [recipesSnapshot, loader] = useCollectionOnce(
        queryEventOrMenuInRestaurant({
            path: FBCollections.Recipes,
            restaurantId,
        }),
    );

    const recipesInRestaurant = recipesSnapshot === undefined ? [] : _.map(recipesSnapshot.docs, (item) => item.data());
    const recipeDictInRestaurant = toRecipeDictInRestaurant(recipesInRestaurant);

    return (
        <BaseAddRecipesPage
            peopleInEvent={peopleInEvent}
            recipeDictInRestaurant={recipeDictInRestaurant}
        />
    );
}

AddRecipesInEventPage.propTypes = propTypes;
AddRecipesInEventPage.defaultProps = defaultProps;
AddRecipesInEventPage.displayName = 'AddRecipesInEventPage';

export default AddRecipesInEventPage;
