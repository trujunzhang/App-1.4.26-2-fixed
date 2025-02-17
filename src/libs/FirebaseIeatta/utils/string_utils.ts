// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export class StringUtils {
    static capitalizeFirstLetter = (string: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
}
