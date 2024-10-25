import type {StackScreenProps} from '@react-navigation/stack';
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {useDocumentDataOnce} from 'react-firebase-hooks/firestore';
import {FBCollections} from '@libs/Firebase/constant';
import * as FirebaseQuery from '@libs/Firebase/services/firebase-query';
import {emptyEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import CONST from '@src/CONST';
import type SCREENS from '@src/SCREENS';
import type {IFBEvent} from '@src/types/firebase';
import BaseEditEventPage from './BaseEditEventPage';

type EditEventNavigationProps = StackScreenProps<RightIeattaNavigatorParamList, typeof SCREENS.RIGHT_IEATTA.EVENT>;

type EditEventPageProps = EditEventNavigationProps & {};

function EditEventPage(props: EditEventPageProps) {
    const eventId = lodashGet(props.route, 'params.eventId', emptyEventTag);
    const restaurantId = lodashGet(props.route, 'params.restaurantId', emptyRestaurantTag);
    /**
      |--------------------------------------------------
      | Single(Event)
      |--------------------------------------------------
      */
    const [event, loadingForEvent, errorForEvent] = useDocumentDataOnce<IFBEvent>(
        FirebaseQuery.querySingle({
            path: FBCollections.Events,
            id: eventId,
        }),
    );

    if (loadingForEvent && _.isUndefined(event)) {
        return null;
    }

    return (
        <BaseEditEventPage
            key={lodashGet(event, 'uniqueId', emptyEventTag)}
            restaurantId={restaurantId}
            eventId={eventId}
            event={event}
            isNewModel={eventId === CONST.IEATTA_EDIT_MODEL_NEW}
        />
    );
}

EditEventPage.displayName = 'EditEventPage';

export default EditEventPage;
