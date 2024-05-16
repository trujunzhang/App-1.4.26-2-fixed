import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useObject, useQuery} from '@realm/react';
import lodashGet from 'lodash/get';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {FBCollections} from '@libs/Firebase/constant';
import {emptyEventTag} from '@libs/ieatta/editFormUtils';
import {RealmCollections} from '@libs/Realm/constant';
import CONST from '@src/CONST';
import BaseEditEventPage from './BaseEditEventPage';

const propTypes = {
    /** The route object passed to this page from the navigator */
    route: PropTypes.shape({
        /** Each parameter passed via the URL */
        params: PropTypes.shape({
            /** The policyID that is being configured */
            eventId: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

const defaultProps = {};

function EditEventPage(props) {
    const eventId = lodashGet(props.route, 'params.eventId', emptyEventTag);

    /**
      |--------------------------------------------------
      | Single(Event)
      |--------------------------------------------------
      */
    const event = useObject(RealmCollections.Events, eventId);

    return (
        <BaseEditEventPage
            key={lodashGet(event, 'uniqueId', emptyEventTag)}
            eventId={eventId}
            event={event}
            isNewModel={eventId === CONST.IEATTA_EDIT_MODEL_NEW}
        />
    );
}

EditEventPage.propTypes = propTypes;
EditEventPage.defaultProps = defaultProps;
EditEventPage.displayName = 'EditEventPage';

// export default compose(
// withNetwork()
// )(EditEventPage);

export default EditEventPage;
