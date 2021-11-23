import { getOffsets } from './getOffsets';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';

describe('getOffsets', () => {
  it('returns the offset properties to an element with defaults', () => {
    const props: {
      translateY: [string | number, string | number];
      translateX: [string | number, string | number];
    } = {
      translateY: [0, 0],
      translateX: [0, 0],
    };
    expect(getOffsets(props)).toEqual({
      xUnit: '%',
      yUnit: '%',
      translateY: [
        parseValueAndUnit(props.translateY[0]),
        parseValueAndUnit(props.translateY[1]),
      ],
      translateX: [
        parseValueAndUnit(props.translateX[0]),
        parseValueAndUnit(props.translateX[1]),
      ],
    });
  });

  it('adds the offset properties to an element with various units', () => {
    const props: {
      translateY: [string | number, string | number];
      translateX: [string | number, string | number];
    } = {
      translateY: ['100px', '-50px'],
      translateX: ['100%', '300%'],
    };
    expect(getOffsets(props)).toEqual({
      xUnit: '%',
      yUnit: 'px',
      translateY: [
        parseValueAndUnit(props.translateY[0]),
        parseValueAndUnit(props.translateY[1]),
      ],
      translateX: [
        parseValueAndUnit(props.translateX[0]),
        parseValueAndUnit(props.translateX[1]),
      ],
    });
  });

  it("to throw if matching units aren't provided", () => {
    const props: {
      translateY: [string | number, string | number];
      translateX: [string | number, string | number];
    } = { translateY: ['100px', '-50%'], translateX: ['100px', '300%'] };
    expect(() => getOffsets(props)).toThrow();
  });
});
