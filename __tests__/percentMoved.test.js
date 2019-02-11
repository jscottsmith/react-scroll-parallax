import { percentMoved } from 'utils/percentMoved.js';

describe.each([
    // element // win height // scroll // percent
    [500, 600, 500, 300, 50],
    [500, 600, 500, 600, 100],
    [500, 600, 500, 0, 0],
    [500, 600, 500, 150, 25],
    [500, 600, 500, 450, 75],
    [500, 600, 500, 1200, 200],
    [500, 600, 500, -600, -100],
])('percentMoved(%i, %i, %i, %i)', (a, totalDist, size, scroll, expected) => {
    test(`returns ${expected}%`, () => {
        expect(percentMoved(a, totalDist, size, scroll)).toBe(expected);
    });
});
