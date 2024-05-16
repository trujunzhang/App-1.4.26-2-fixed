import {ObjectSchema} from 'realm';

export class Restaurant {}

export class RestaurantGeoPoint {
    constructor(param: {lat: number; long: number}) {}

    static schema: any = {};
}
