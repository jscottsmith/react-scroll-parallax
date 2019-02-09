import addAttributes from 'utils/addAttributes.js';
import addOffsets from 'utils/addOffsets.js';

const getBoundingClientRect = Element.prototype.getBoundingClientRect;

function createElement() {
    const elOuter = document.createElement('div');
    Object.defineProperty(elOuter, 'offsetHeight', {
        value: 120,
        writable: false,
    });
    Object.defineProperty(elOuter, 'offsetWidth', {
        value: 120,
        writable: false,
    });
    return elOuter;
}

describe('addAttributes', () => {
    beforeAll(() => {
        Element.prototype.getBoundingClientRect = function() {
            return {
                width: 120,
                height: 120,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            };
        };
        window.pageYOffset = 2000;
    });

    afterAll(() => {
        Element.prototype.getBoundingClientRect = getBoundingClientRect;
        window.pageYOffset = 0;
    });

    it.skip('adds the attribute cache properties to an element with defaults', () => {
        const element = {
            props: { y0: -100, y1: 100, x1: 0, x0: 0 },
            elOuter: createElement(),
        };

        expect(addAttributes(addOffsets(element), 768)).toEqual(
            expect.objectContaining({
                attributes: {
                    bottom: 2164.4444444444443,
                    top: 1835.5555555555557,
                    elHeight: 120,
                    elWidth: 120,
                    totalDist: 1128,

                    elInner: expect.any(Function),
                    originBottom: 2000,
                    originTop: 2000,
                    originTotalDist: 768,
                },
            })
        );
    });
});
