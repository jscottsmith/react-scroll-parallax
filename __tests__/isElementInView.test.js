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

const windowHeight = 1000;

test('Returns whether an element is in view', () => {
    expect(isElementInView(element1, windowHeight, 1500)).toBe(false);
    expect(isElementInView(element1, windowHeight, 0)).toBe(true);
    expect(isElementInView(element2, 4000, 0)).toBe(true);
    expect(isElementInView(element2, windowHeight, 6500)).toBe(false);
});
