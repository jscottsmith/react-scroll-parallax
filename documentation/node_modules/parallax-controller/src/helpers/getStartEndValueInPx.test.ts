import { ParsedValueEffect } from '..';
import { getStartEndValueInPx } from './getStartEndValueInPx';

describe('getStartEndValueInPx', () => {
  test('passes through start and end for pixel values', () => {
    const translate: ParsedValueEffect = { start: 100, end: -100, unit: 'px' };
    const size = 300;
    expect(getStartEndValueInPx(translate, size)).toEqual({
      start: 100,
      end: -100,
    });
  });

  test('handles percent and calculates the pixel values based on the given element width/height', () => {
    const translate: ParsedValueEffect = {
      start: 100,
      end: -100,
      unit: '%',
    };
    const size = 300;
    expect(getStartEndValueInPx(translate, size)).toEqual({
      start: 300,
      end: -300,
    });
  });
});
