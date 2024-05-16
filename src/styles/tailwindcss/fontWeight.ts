import type {ViewStyle} from 'react-native';

const tailwindFontWeight = {
    // font-thin	font-weight: 100;
    // font-extralight	font-weight: 200;
    // font-light	font-weight: 300;
    // font-normal	font-weight: 400;
    // font-medium	font-weight: 500;
    // font-semibold	font-weight: 600;
    // font-bold	font-weight: 700;
    // font-extrabold	font-weight: 800;
    // font-black	font-weight: 900;

    fontThin: {
        fontWeight: '100',
    },
    fontExtraLight: {
        fontWeight: '200',
    },
    fontLight: {
        fontWeight: '300',
    },
    fontNormal: {
        fontWeight: '400',
    },
    fontMedium: {
        fontWeight: '500',
    },
    fontSemiBold: {
        fontWeight: '600',
    },
    fontBold: {
        fontWeight: '700',
    },
    fontExtraBold: {
        fontWeight: '800',
    },
    fontBlack: {
        fontWeight: '900',
    },
} satisfies Record<string, ViewStyle>;

export default tailwindFontWeight;
