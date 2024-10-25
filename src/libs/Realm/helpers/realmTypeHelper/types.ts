/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Converts an array of Realm objects to an array of specified Type.
 *
 * @template Type - The type to convert the Realm objects to.
 * @param array - The array of Realm objects to convert.
 * @return An array of objects of type Type.
 */
type ToRealmModelList = <Type>(array: any) => Type[];

export type {
    // eslint-disable-next-line import/prefer-default-export
    ToRealmModelList,
};
