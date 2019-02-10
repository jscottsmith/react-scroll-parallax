import { percentMoved } from 'utils/percentMoved.js';

const defaultWinHeight = 500;
const defaultElement = {
    attributes: {
        height: 100,
        width: 100,
        originTotalDist: defaultWinHeight + 100,
        originTop: defaultWinHeight,
    },
};

describe.each([
    // element // win height // scroll // percent
    [defaultElement, defaultWinHeight, 300, 50],
    [defaultElement, defaultWinHeight, 600, 100],
    [defaultElement, defaultWinHeight, 0, 0],
    [defaultElement, defaultWinHeight, 150, 25],
    [defaultElement, defaultWinHeight, 450, 75],
    [defaultElement, defaultWinHeight, 1200, 200],
    [defaultElement, defaultWinHeight, -600, -100],
])('percentMoved(%o, %i, %i)', (element, windowHeight, scrollY, expected) => {
    test(`returns ${expected}%`, () => {
        expect(percentMoved(element, windowHeight, scrollY)).toBe(expected);
    });
});
