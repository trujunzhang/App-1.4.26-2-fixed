import {useObject, useQuery} from '@realm/react';
import lodashGet from 'lodash/get';
import React, {useCallback, useState} from 'react';
import _ from 'underscore';
import ReportActionsSkeletonView from '@components/ReportActionsSkeletonView';
import {FBCollections, ReviewType} from '@libs/Firebase/constant';
import {getEventID} from '@libs/Firebase/helper/EventUtils';
import {defaultSortObject} from '@libs/Firebase/review-sort';
import {emptyPeopleInEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import {toRecipeDictInRestaurant} from '@libs/ieatta/eventUtils';
import {RealmCollections} from '@libs/Realm/constant';
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
    const peopleInEvent = useObject(RealmCollections.PeopleInEvent, peopleInEventId);

    /**
     |--------------------------------------------------
     | List(recipes)
     |--------------------------------------------------
     */
    const recipesInRestaurantInRealm = useQuery(RealmCollections.Recipes, (array) => {
        return array.filtered('restaurantId == $0', restaurantId);
    });

    const recipeDictInRestaurant = toRecipeDictInRestaurant(recipesInRestaurantInRealm);

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
