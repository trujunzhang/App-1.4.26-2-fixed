/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import type {OnyxEntry} from 'react-native-onyx';
import {withOnyx} from 'react-native-onyx';
import * as Expensicons from '@components/Icon/Expensicons';
import * as Ieattaicons from '@components/Icon/Ieattaicons';
import Image from '@components/Image';
import {PressableWithFeedback} from '@components/Pressable';
import useLocalize from '@hooks/useLocalize';
import Navigation from '@libs/Navigation/Navigation';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';

type LogoOnyxProps = {
    restaurantIdInSidebar: OnyxEntry<string>;
};
// eslint-disable-next-line @typescript-eslint/ban-types
type LogoProps = LogoOnyxProps & {};

function Logo({restaurantIdInSidebar}: LogoProps) {
    const {translate} = useLocalize();
    return (
        <PressableWithFeedback
            accessibilityRole={CONST.ROLE.BUTTON}
            accessibilityLabel={translate('headerPanel.logo')}
            accessible
            onPress={() => {
                Navigation.navigate(ROUTES.HOME);
                Navigation.navigate(ROUTES.RESTAURANT_WITH_ID.getRoute(restaurantIdInSidebar ?? ''));
            }}
        >
            <Image
                style={[
                    {
                        width: variables.iconSizeYelpLogoWidth,
                        height: variables.iconSizeYelpLogoHeight,
                    },
                ]}
                source={Ieattaicons.YelpMenu}
            />
        </PressableWithFeedback>
    );
}

export default withOnyx<LogoProps, LogoOnyxProps>({
    restaurantIdInSidebar: {
        key: ONYXKEYS.RESTAURANT_ID_IN_SIDEBAR,
    },
})(Logo);

// export default Logo;
