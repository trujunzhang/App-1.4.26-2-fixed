// eslint-disable-next-line no-restricted-imports
import _ from 'lodash';
import type {IFBPeopleInEvent} from '@src/types/firebase';

function getUserIdsInPeopleInEvents(peopleInEvents: IFBPeopleInEvent[]) {
    const userIds: string[] = _.map(peopleInEvents, 'userId');

    return userIds;
}

// eslint-disable-next-line import/prefer-default-export
export {getUserIdsInPeopleInEvents};
