// eslint-disable-next-line no-restricted-imports, lodash/import-scope
import _ from 'lodash';
import type Realm from 'realm';
import type {ToRealmModelList} from './types';

/**
 * Converts an array of Realm objects to an array of specified Type.
 *
 * @template Type - The type to convert the Realm objects to.
 * @param array - The array of Realm objects to convert.
 * @return An array of objects of type Type.
 */
const toRealmModelList: ToRealmModelList = <Type>(array: Realm.Results) => {
    return _.map(array, (item) => {
        return item as Type;
    });
};

export {
    // eslint-disable-next-line import/prefer-default-export
    toRealmModelList,
};
