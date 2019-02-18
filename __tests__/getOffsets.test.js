import getOffsets from 'utils/getOffsets.js';
import { parseValueAndUnit } from 'utils/index';

describe('getOffsets', () => {
    it('returns the offset properties to an element with defaults', () => {
        const props = { y0: 0, y1: 0, x1: 0, x0: 0 };
        expect(getOffsets(props)).toEqual({
            xUnit: '%',
            yUnit: '%',
            y0: parseValueAndUnit(props.y0),
            y1: parseValueAndUnit(props.y1),
            x0: parseValueAndUnit(props.x0),
            x1: parseValueAndUnit(props.x1),
        });
    });

    it('adds the offset properties to an element with various units', () => {
        const props = { y0: '100px', y1: '-50px', x1: '100%', x0: '300%' };
        expect(getOffsets(props)).toEqual({
            xUnit: '%',
            yUnit: 'px',
            y0: parseValueAndUnit(props.y0),
            y1: parseValueAndUnit(props.y1),
            x0: parseValueAndUnit(props.x0),
            x1: parseValueAndUnit(props.x1),
        });
    });

    it("to throw if matching units aren't provided", () => {
        const props = { y0: '100px', y1: '-50%', x1: '100px', x0: '300%' };
        expect(() => getOffsets(props)).toThrow();
    });
});
