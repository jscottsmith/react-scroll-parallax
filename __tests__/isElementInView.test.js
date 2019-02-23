import { isElementInView } from 'helpers/isElementInView';

describe.each([
    // a // b // size // scroll // in view ?
    [0, 500, 1000, 1500, false],
    [0, 500, 1000, 0, true],
    [2500, 4000, 4000, 0, true],
    [2500, 4000, 2499, 0, false],
    [2500, 4000, 2500, 4001, false],
    [2500, 4000, 500, 2500, true],
    [2500, 4000, 500, 2000, true],
    [2500, 4000, 500, 1999, false],
    [2500, 4000, 1000, 6500, false],
])('.isElementInView(%i, %i, %i, %i)', (a, b, size, scroll, expected) => {
    test(`returns ${expected}%`, () => {
        expect(isElementInView(a, b, size, scroll)).toBe(expected);
    });
});
