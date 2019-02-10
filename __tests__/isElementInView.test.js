import isElementInView from 'utils/isElementInView.js';

const element1 = {
    attributes: {
        top: 0,
        bottom: 500,
    },
};

const element2 = {
    attributes: {
        top: 2500,
        bottom: 4000,
    },
};

describe.each([
    // element // win height // scroll // view
    [element1, 1000, 1500, false],
    [element1, 1000, 0, true],
    [element2, 4000, 0, true],
    [element2, 2499, 0, false],
    [element2, 2500, 4001, false],
    [element2, 500, 2500, true],
    [element2, 500, 2000, true],
    [element2, 500, 1999, false],
    [element2, 1000, 6500, false],
])(
    '.isElementInView(%o, %i, %i)',
    (element, windowHeight, scrollY, expected) => {
        test(`returns ${expected}%`, () => {
            expect(isElementInView(element, windowHeight, scrollY)).toBe(
                expected
            );
        });
    }
);
