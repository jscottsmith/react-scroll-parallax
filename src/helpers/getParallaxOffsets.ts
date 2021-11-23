import { OffsetShape, ParallaxStartEndOffsets } from '../types';
import { scaleBetween } from '../utils/scaleBetween';

/**
 * Gets the parallax X and Y offsets to be applied to an element
 * based upon the percent the element has moved in the viewport
 * and the min/max offsets
 */

type ParallaxOffset = {
  x: OffsetShape;
  y: OffsetShape;
};

export function getParallaxOffsets(
  offsets: ParallaxStartEndOffsets,
  percentMoved: number
): ParallaxOffset {
  const { translateY, translateX, yUnit, xUnit } = offsets;

  const x = scaleBetween(
    percentMoved,
    translateX[0].value,
    translateX[1].value,
    0,
    100
  );
  const y = scaleBetween(
    percentMoved,
    translateY[0].value,
    translateY[1].value,
    0,
    100
  );

  return {
    x: {
      value: x,
      unit: xUnit,
    },
    y: {
      value: y,
      unit: yUnit,
    },
  };
}
