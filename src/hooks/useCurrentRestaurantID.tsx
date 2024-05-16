import {useContext} from 'react';
import type {CurrentRestaurantIDContextValue} from '@components/withCurrentRestaurantID';
import {CurrentRestaurantIDContext} from '@components/withCurrentRestaurantID';

export default function useCurrentRestaurantID(): CurrentRestaurantIDContextValue | null {
    return useContext(CurrentRestaurantIDContext);
}
