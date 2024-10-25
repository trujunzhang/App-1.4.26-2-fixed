import React from 'react';
import useStyleUtils from '@hooks/useStyleUtils';
import useTheme from '@hooks/useTheme';
import useThemeStyles from '@hooks/useThemeStyles';
import type {RecipeWithPhotosInfoPanelDataProps} from './types';

function RecipeWithPhotosInfoPanelData({recipe}: RecipeWithPhotosInfoPanelDataProps) {
    const theme = useTheme();
    const styles = useThemeStyles();
    const StyleUtils = useStyleUtils();

    return null;
}

RecipeWithPhotosInfoPanelData.displayName = 'RecipeWithPhotosInfoPanelData';

export default React.memo(RecipeWithPhotosInfoPanelData);
