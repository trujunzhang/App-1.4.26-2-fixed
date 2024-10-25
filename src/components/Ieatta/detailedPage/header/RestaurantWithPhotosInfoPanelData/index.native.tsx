import React from 'react';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import type {RestaurantWithPhotosInfoPanelDataProps} from './types';

function RestaurantWithPhotosInfoPanelData({restaurant}: RestaurantWithPhotosInfoPanelDataProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();

    return null;
}

RestaurantWithPhotosInfoPanelData.displayName = 'RestaurantWithPhotosInfoPanelData';

export default React.memo(RestaurantWithPhotosInfoPanelData);
