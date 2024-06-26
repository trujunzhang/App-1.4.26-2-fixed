import PropTypes from 'prop-types';
import React from 'react';
import {withOnyx} from 'react-native-onyx';
import ONYXKEYS from '@src/ONYXKEYS';
import IOURequestStepWaypoint from './request/step/IOURequestStepWaypoint';

const propTypes = {
    /** The transactionID of this request */
    transactionID: PropTypes.string,

    /** Route params */
    route: PropTypes.shape({
        params: PropTypes.shape({
            /** IOU type */
            iouType: PropTypes.string,

            /** Index of the waypoint being edited */
            waypointIndex: PropTypes.string,
        }),
    }),
};

const defaultProps = {
    transactionID: '',
    route: {
        params: {
            iouType: '',
            waypointIndex: '',
        },
    },
};

// This component is responsible for grabbing the transactionID from the IOU key
// You can't use Onyx props in the withOnyx mapping, so we need to set up and access the transactionID here, and then pass it down so that WaypointEditor can subscribe to the transaction.
function MoneyRequestWaypointPage({transactionID, route}) {
    return (
        <IOURequestStepWaypoint
            // Put the transactionID into the route params so that WaypointEdit behaves the same when creating a new waypoint
            // or editing an existing waypoint.
            route={{
                params: {
                    ...route.params,
                    transactionID,
                },
            }}
        />
    );
}

MoneyRequestWaypointPage.displayName = 'MoneyRequestWaypointPage';
MoneyRequestWaypointPage.propTypes = propTypes;
MoneyRequestWaypointPage.defaultProps = defaultProps;
export default withOnyx({
    transactionID: {key: ONYXKEYS.IOU, selector: (iou) => iou && iou.transactionID},
})(MoneyRequestWaypointPage);
