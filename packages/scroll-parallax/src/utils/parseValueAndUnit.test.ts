import { describe, test, expect } from 'vitest';
import { parseValueAndUnit } from './parseValueAndUnit';

describe('Parse a string to get the value and unit in either pixels or percent', () => {
  test('handle valid units', () => {
    expect(parseValueAndUnit()).toEqual({ unit: '%', value: 0 });
    expect(parseValueAndUnit('5px')).toEqual({ unit: 'px', value: 5 });
    expect(parseValueAndUnit('52%')).toEqual({ unit: '%', value: 52 });
    expect(parseValueAndUnit(13.333)).toEqual({ unit: '%', value: 13.333 });
    expect(parseValueAndUnit('75.8%')).toEqual({ unit: '%', value: 75.8 });
    expect(parseValueAndUnit('23.1px')).toEqual({ unit: 'px', value: 23.1 });
    expect(parseValueAndUnit(10, '%')).toEqual({ unit: '%', value: 10 });
    expect(parseValueAndUnit(0.47783, 'px')).toEqual({
      unit: 'px',
      value: 0.47783,
    });
  });

  test('throw errors on invalid value or units', () => {
    // @ts-expect-error
    expect(() => parseValueAndUnit(false)).toThrow();
    // @ts-expect-error
    expect(() => parseValueAndUnit(() => {})).toThrow();
    // @ts-expect-error
    expect(() => parseValueAndUnit({ foo: 'bar' })).toThrow();
    expect(() => parseValueAndUnit('100%%')).toThrow();
    expect(() => parseValueAndUnit('100px%')).toThrow();
  });

  test('throw on unsupported units', () => {
    expect(() => parseValueAndUnit('1rem')).toThrow();
    expect(() => parseValueAndUnit('1em')).toThrow();
    expect(() => parseValueAndUnit('10vw')).toThrow();
    expect(() => parseValueAndUnit('1.04vh')).toThrow();
    expect(() => parseValueAndUnit('1.5turn')).toThrow();
    expect(() => parseValueAndUnit('143.4deg')).toThrow();
    expect(() => parseValueAndUnit('2.345rad')).toThrow();
  });
});
