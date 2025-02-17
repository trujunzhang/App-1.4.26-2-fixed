// eslint-disable-next-line import/prefer-default-export,rulesdir/no-inline-named-export
export const calcRateForRestaurant = (rate: number, total: number): number => {
    if (total === 0) {
        return 0.0;
    }
    const base: number = (rate * 10) / total;
    const value = Math.floor(base) % 10;
    const left = Math.floor((base - value) / 10);

    let right = 0.0;
    if (value > 7) {
        right = 1;
    } else if (value > 2 && value <= 7) {
        right = 0.5;
    }

    const nextRate = left + right;

    return nextRate;
};
