import type {StackScreenProps} from '@react-navigation/stack';
import {useObject} from '@realm/react';
import _ from 'lodash';
import lodashGet from 'lodash/get';
import React from 'react';
import {emptyEventTag, emptyRestaurantTag} from '@libs/ieatta/editFormUtils';
import type {RightIeattaNavigatorParamList} from '@libs/Navigation/types';
import {RealmCollections} from '@libs/Realm/constant';
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
    const eventInRealm = useObject<IFBEvent>(RealmCollections.Events, eventId);
    const event: IFBEvent | undefined = _.isNull(eventInRealm) === false ? (eventInRealm as IFBEvent) : undefined;

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
