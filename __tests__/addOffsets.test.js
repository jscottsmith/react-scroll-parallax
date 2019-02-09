import addOffsets from 'utils/addOffsets.js';
import { parseValueAndUnit } from 'utils/index';

describe('addOffsets', () => {
    it('adds the offset properties to an element with defaults', () => {
        const element = { props: { y0: 0, y1: 0, x1: 0, x0: 0 } };
        expect(addOffsets(element)).toEqual({
            ...element,
            offsets: {
                xUnit: '%',
                yUnit: '%',
                y0: parseValueAndUnit(element.props.y0),
                y1: parseValueAndUnit(element.props.y1),
                x0: parseValueAndUnit(element.props.x1),
                x1: parseValueAndUnit(element.props.x0),
            },
        });
    });

    it('adds the offset properties to an element with various units', () => {
        const element = {
            props: { y0: '100px', y1: '-50px', x1: '100%', x0: '300%' },
        };
        expect(addOffsets(element)).toEqual({
            ...element,
            offsets: {
                xUnit: '%',
                yUnit: 'px',
                y0: parseValueAndUnit(element.props.y0),
                y1: parseValueAndUnit(element.props.y1),
                x0: parseValueAndUnit(element.props.x1),
                x1: parseValueAndUnit(element.props.x0),
            },
        });
    });

    it("to throw if matching units aren't provided", () => {
        const element = {
            props: { y0: '100px', y1: '-50%', x1: '100px', x0: '300%' },
        };
        expect(() => addOffsets(element)).toThrow();
    });
});
