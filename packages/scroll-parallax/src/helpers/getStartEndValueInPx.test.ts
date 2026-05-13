import { describe, test, expect } from 'vitest';
import type { ParsedValueEffect } from '../types';
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

  test('handles vh units and calculates the pixel values based on the window', () => {
    const translate: ParsedValueEffect = {
      start: 100,
      end: -100,
      unit: 'vh',
    };
    expect(getStartEndValueInPx(translate, 100)).toEqual({
      start: window.innerHeight,
      end: -window.innerHeight,
    });
  });

  test('handles vw units and calculates the pixel values based on the window', () => {
    const translate: ParsedValueEffect = {
      start: 50,
      end: -50,
      unit: 'vw',
    };
    expect(getStartEndValueInPx(translate, 100)).toEqual({
      start: window.innerWidth / 2,
      end: -window.innerWidth / 2,
    });
  });
});
