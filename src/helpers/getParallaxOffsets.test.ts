import { getParallaxOffsets } from './getParallaxOffsets';
import { ParallaxStartEndOffsets } from '../types';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';
import { scaleBetween } from '../utils/scaleBetween';

const offset: ParallaxStartEndOffsets = {
  xUnit: 'px',
  yUnit: '%',
  translateX: [parseValueAndUnit('-100px'), parseValueAndUnit('40px')],
  translateY: [parseValueAndUnit('-80%'), parseValueAndUnit('50%')],
};

const percentMoved = 44;

test('Gets offsets based on percent in view', () => {
  expect(getParallaxOffsets(offset, percentMoved)).toEqual({
    x: {
      value: scaleBetween(
        percentMoved,
        offset.translateX[0].value,
        offset.translateX[1].value,
        0,
        100
      ),
      unit: offset.xUnit,
    },
    y: {
      value: scaleBetween(
        percentMoved,
        offset.translateY[0].value,
        offset.translateY[1].value,
        0,
        100
      ),
      unit: offset.yUnit,
    },
  });
});
