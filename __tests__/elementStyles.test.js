import { setParallaxStyles } from 'utils/elementStyles.js';
import createNodeMock from './testUtils/createNodeMock';
import addOffsets from 'utils/addOffsets';

function createElement(x0, x1, y0, y1) {
    return addOffsets({
        elInner: createNodeMock(),
        props: {
            x0,
            x1,
            y0,
            y1,
        },
    });
}

describe.each([
    [createElement(0, 100, 0, 0), 0, `translate3d(0%, 0%, 0)`],
    [createElement(0, 100, 0, 0), 100, `translate3d(100%, 0%, 0)`],
    [createElement(0, 100, 0, 0), 200, `translate3d(200%, 0%, 0)`],
    [createElement(0, 100, 0, 0), 0, `translate3d(0%, 0%, 0)`],
    [createElement(100, 0, 0, 0), 50, `translate3d(50%, 0%, 0)`],
    [createElement(100, -100, 100, -100), 0, `translate3d(100%, 100%, 0)`],
    [createElement(100, -100, 100, -100), 50, `translate3d(0%, 0%, 0)`],
    [createElement(100, -100, 100, -100), 100, `translate3d(-100%, -100%, 0)`],
    [createElement(100, -100, 100, -100), 200, `translate3d(-300%, -300%, 0)`],
    [createElement(100, -100, 100, -100), -100, `translate3d(300%, 300%, 0)`],
    [
        createElement('0px', '100px', '100%', '50%'),
        0,
        `translate3d(0px, 100%, 0)`,
    ],
    [
        createElement('0px', '100px', '100%', '50%'),
        50,
        `translate3d(50px, 75%, 0)`,
    ],
    [
        createElement('-100px', '100px', '100%', '-200%'),
        50,
        `translate3d(0px, -50%, 0)`,
    ],
])('.setParallaxStyles(%o, %i)', (element, percent, expected) => {
    test(`sets element styles to: ${expected}%`, () => {
        setParallaxStyles(element, percent);
        expect(element.elInner.style.transform).toBe(expected);
    });
});
