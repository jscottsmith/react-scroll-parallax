import { ParallaxElementProperties } from '../classes/ParallaxController';
import { OffsetShape, ParallaxStartEndOffsets } from '../types';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';

/**
 * Takes a parallax element and parses the offset props to get the value
 * and unit. Sets these values as offset object accessible on the element.
 */
export function getOffsets(
  props: ParallaxElementProperties
): ParallaxStartEndOffsets {
  const translateY: [OffsetShape, OffsetShape] = [
    parseValueAndUnit(props.translateY[0]),
    parseValueAndUnit(props.translateY[1]),
  ];
  const translateX: [OffsetShape, OffsetShape] = [
    parseValueAndUnit(props.translateX[0]),
    parseValueAndUnit(props.translateX[1]),
  ];

  if (
    translateX[0].unit !== translateX[1].unit ||
    translateY[0].unit !== translateY[1].unit
  ) {
    throw new Error(
      'Must provide matching units for the min and max offset values of each axis.'
    );
  }

  const xUnit = translateX[0].unit || '%';
  const yUnit = translateY[0].unit || '%';

  return {
    xUnit,
    yUnit,
    translateY,
    translateX,
  };
}
