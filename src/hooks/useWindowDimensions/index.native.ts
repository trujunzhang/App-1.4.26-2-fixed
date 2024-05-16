// eslint-disable-next-line no-restricted-imports
import {useWindowDimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import variables from '@styles/variables';
import type WindowDimensions from './types';

/**
 * A convenience wrapper around React Native's useWindowDimensions hook that also provides booleans for our breakpoints.
 */
export default function (): WindowDimensions {
    const {width: windowWidth, height: windowHeight} = useWindowDimensions();
    const isExtraSmallScreenHeight = windowHeight <= variables.extraSmallMobileResponsiveHeightBreakpoint;
    const isSmallScreenWidth = true;
    // const isMediumScreenWidth = false;
    const isMediumScreenWidth = windowWidth > variables.mobileResponsiveWidthBreakpoint && windowWidth <= variables.tabletResponsiveWidthBreakpoint;
    const isLargeScreenWidth = false;
    const isTabletScreenWidth = DeviceInfo.isTablet();

    return {
        windowWidth,
        windowHeight,
        isExtraSmallScreenHeight,
        isSmallScreenWidth,
        isMediumScreenWidth,
        isLargeScreenWidth,
        isTabletScreenWidth,
    };
}
