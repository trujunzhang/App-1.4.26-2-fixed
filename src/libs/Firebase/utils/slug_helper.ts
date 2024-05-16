/* eslint-disable rulesdir/no-inline-named-export */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const slugify = require('slugify');

// eslint-disable-next-line import/prefer-default-export
export const slugifyToLower = (s: string): string => {
    return slugify(s, {
        lower: true,
    });
};
