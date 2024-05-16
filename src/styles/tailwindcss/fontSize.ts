import type {ViewStyle} from 'react-native';

/**
 * refer: https://websemantics.uk/tools/font-size-conversion-pixel-point-em-rem-percent
 */
const tailwindFontSize = {
    //       xs: ['0.75rem', { lineHeight: '1rem' }],
    //       sm: ['0.875rem', { lineHeight: '1.25rem' }],
    //       base: ['1rem', { lineHeight: '1.5rem' }],
    //       lg: ['1.125rem', { lineHeight: '1.75rem' }],
    //       xl: ['1.25rem', { lineHeight: '1.75rem' }],
    //       '2xl': ['1.5rem', { lineHeight: '2rem' }],
    //       '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    //       '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    //       '5xl': ['3rem', { lineHeight: '1' }],
    //       '6xl': ['3.75rem', { lineHeight: '1' }],
    //       '7xl': ['4.5rem', { lineHeight: '1' }],
    //       '8xl': ['6rem', { lineHeight: '1' }],
    //       '9xl': ['8rem', { lineHeight: '1' }],

    // text-xs	font-size: 0.75rem; /* 12px */
    // line-height: 1rem; /* 16px */
    // text-sm	font-size: 0.875rem; /* 14px */
    // line-height: 1.25rem; /* 20px */
    // text-base	font-size: 1rem; /* 16px */
    // line-height: 1.5rem; /* 24px */
    // text-lg	font-size: 1.125rem; /* 18px */
    // line-height: 1.75rem; /* 28px */
    // text-xl	font-size: 1.25rem; /* 20px */
    // line-height: 1.75rem; /* 28px */
    // text-2xl	font-size: 1.5rem; /* 24px */
    // line-height: 2rem; /* 32px */
    // text-3xl	font-size: 1.875rem; /* 30px */
    // line-height: 2.25rem; /* 36px */
    // text-4xl	font-size: 2.25rem; /* 36px */
    // line-height: 2.5rem; /* 40px */
    // text-5xl	font-size: 3rem; /* 48px */
    // line-height: 1;
    // text-6xl	font-size: 3.75rem; /* 60px */
    // line-height: 1;
    // text-7xl	font-size: 4.5rem; /* 72px */
    // line-height: 1;
    // text-8xl	font-size: 6rem; /* 96px */
    // line-height: 1;
    // text-9xl	font-size: 8rem; /* 128px */
    // line-height: 1;

    xs: {
        fontSize: 12,
        lineHeight: 16,
    },
    sm: {
        fontSize: 14,
        lineHeight: 20,
    },
    base: {
        fontSize: 16,
        lineHeight: 24,
    },
    lg: {
        fontSize: 18,
        lineHeight: 28,
    },
    xl: {
        fontSize: 20,
        lineHeight: 28,
    },
    xl2: {
        fontSize: 24,
        lineHeight: 32,
    },
    xl3: {
        fontSize: 30,
        lineHeight: 36,
    },
    xl4: {
        fontSize: 36,
        lineHeight: 40,
    },
    xl5: {
        fontSize: 48,
    },
    xl6: {
        fontSize: 60,
    },
    xl7: {
        fontSize: 72,
    },
    xl8: {
        fontSize: 96,
    },
    xl9: {
        fontSize: 128,
    },
} satisfies Record<string, ViewStyle>;

export default tailwindFontSize;
