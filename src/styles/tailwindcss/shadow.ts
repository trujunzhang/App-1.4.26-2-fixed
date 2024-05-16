import type {ViewStyle} from 'react-native';

/**
 * Positioning utilities for absolute-positioned components.
 * Everything is a multiple of 4 to coincide with the spacing utilities.
 *
 * https://tvke.github.io/react-native-tailwindcss/effects/box-shadow.html
 */
export default {
    shadow: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 3,
        elevation: 1.5,
    },
    shadowMd: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 6,
        elevation: 3,
    },
    shadowLg: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 15,
        elevation: 7.5,
    },
    shadowXl: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 0, height: 20},
        shadowRadius: 25,
        elevation: 12.5,
    },
    shadow2xl: {
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {width: 0, height: 25},
        shadowRadius: 50,
        elevation: 25,
    },
    shadowInner: {
        shadowColor: 'rgba(0, 0, 0, 0.06)',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 2,
    },
    shadowOutline: {
        shadowColor: 'rgba(66, 153, 225, 0.5)',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 0,
        elevation: 0,
    },
    shadowNone: {
        shadowColor: 'rgba(0, 0, 0, 0)',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 0,
        elevation: 0,
    },
} satisfies Record<string, ViewStyle>;
