import { scaleEffectByProgress } from './scaleEffectByProgress';
import { scaleBetween } from '../utils/scaleBetween';
import { ParsedValueEffect } from '../types';

const translateX: ParsedValueEffect = {
  start: 100,
  end: 40,
  unit: 'px',
  easing: undefined,
};
const translateY: ParsedValueEffect = {
  start: 80,
  end: 50,
  unit: '%',
  easing: undefined,
};
const scale: ParsedValueEffect = {
  start: 0,
  end: 1,
  unit: '',
  easing: undefined,
};

const progress = 0.44;

describe('scaleEffectByProgress', () => {
  test('Gets offsets based on percent in view', () => {
    expect(scaleEffectByProgress(translateX, progress)).toEqual({
      value: scaleBetween(progress, translateX.start, translateX.end, 0, 1),
      unit: 'px',
    });
    expect(scaleEffectByProgress(translateY, progress)).toEqual({
      value: scaleBetween(progress, translateY.start, translateY.end, 0, 1),
      unit: '%',
    });
    expect(scaleEffectByProgress(scale, progress)).toEqual({
      value: scaleBetween(progress, scale.start, scale.end, 0, 1),
      unit: '',
    });
  });
  test('to call easing function when available', () => {
    const easeExpect = 0.999;
    const translateYEased: ParsedValueEffect = {
      start: 0,
      end: 1,
      unit: '',
      easing: jest.fn(() => easeExpect),
    };
    expect(scaleEffectByProgress(translateYEased, progress)).toEqual({
      value: easeExpect,
      unit: '',
    });
    expect(translateYEased.easing).toBeCalledWith(0.44);
  });
});
