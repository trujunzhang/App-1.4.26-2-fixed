import type {ForwardedRef, RefAttributes} from 'react';
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import AddRestaurantActionButton from '@components/Ieatta/components/AddRestaurantActionButton';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {navigationToEditRestaurant} from '@libs/ieatta/editFormUtils';
import CONST from '@src/CONST';

// eslint-disable-next-line @typescript-eslint/ban-types
type FloatingActionButtonAndPopoverProps = {};

type FloatingActionButtonAndPopoverRef = {
    hideCreateMenu: () => void;
};

/**
 * Responsible for rendering the {@link PopoverMenu}, and the accompanying
 * FAB that can open or close the menu.
 */
// eslint-disable-next-line no-empty-pattern
function FloatingActionButtonAndPopover({}: FloatingActionButtonAndPopoverProps, ref: ForwardedRef<FloatingActionButtonAndPopoverRef>) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const [isCreateMenuActive, setIsCreateMenuActive] = useState(false);
    const fabRef = useRef<HTMLDivElement>(null);

    const toggleCreateMenu = () => {
        navigationToEditRestaurant({});
    };

    return (
        <View>
            <AddRestaurantActionButton
                accessibilityLabel={translate('sidebarScreen.fabNewChatExplained')}
                role={CONST.ROLE.BUTTON}
                isActive={isCreateMenuActive}
                ref={fabRef}
                onPress={toggleCreateMenu}
            />
        </View>
    );
}

FloatingActionButtonAndPopover.displayName = 'FloatingActionButtonAndPopover';

export default forwardRef(FloatingActionButtonAndPopover);
