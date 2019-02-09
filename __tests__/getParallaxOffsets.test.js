import getParallaxOffsets from 'utils/getParallaxOffsets.js';
import { parseValueAndUnit, scaleBetween } from 'utils';

const offset = {
    x0: parseValueAndUnit('-100px'),
    x1: parseValueAndUnit('40px'),
    y0: parseValueAndUnit('-80%'),
    y1: parseValueAndUnit('50%'),
};

const percentMoved = 44;

test('Gets offsets based on percent in view', () => {
    expect(getParallaxOffsets(offset, percentMoved)).toEqual({
        x: {
            value: scaleBetween(
                percentMoved,
                offset.x0.value,
                offset.x1.value,
                0,
                100
            ),
            unit: offset.x1.unit,
        },
        y: {
            value: scaleBetween(
                percentMoved,
                offset.y0.value,
                offset.y1.value,
                0,
                100
            ),
            unit: offset.y1.unit,
        },
    });
});
