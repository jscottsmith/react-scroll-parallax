import { ScrollAxis } from '..';
import { getShouldScaleTranslateEffects } from './getShouldScaleTranslateEffects';

describe('given getShouldScaleTranslateEffects()', () => {
  describe('when a root margin is provided', () => {
    test(`then it returns false`, () => {
      expect(
        getShouldScaleTranslateEffects(
          { rootMargin: { top: 10, bottom: 10, left: 10, right: 10 } },
          {},
          ScrollAxis.vertical
        )
      ).toEqual(false);
    });
  });

  describe('when shouldDisableScalingTranslations is true', () => {
    test(`then it returns false`, () => {
      expect(
        getShouldScaleTranslateEffects(
          { shouldDisableScalingTranslations: true },
          {},
          ScrollAxis.vertical
        )
      ).toEqual(false);
    });
  });
  describe('when axis is horizontal and', () => {
    describe('when translateX provided', () => {
      test(`then it returns true`, () => {
        expect(
          getShouldScaleTranslateEffects(
            {},
            { translateX: { start: 10, end: 100, unit: 'px' } },
            ScrollAxis.horizontal
          )
        ).toEqual(true);
      });
    });
    describe('when translateY is provided', () => {
      test(`then it returns false`, () => {
        expect(
          getShouldScaleTranslateEffects(
            {},
            { translateY: { start: 10, end: 100, unit: 'px' } },
            ScrollAxis.horizontal
          )
        ).toEqual(false);
      });
    });
    describe('when translateY and translateX are provided', () => {
      test(`then it returns true`, () => {
        expect(
          getShouldScaleTranslateEffects(
            {},
            {
              translateY: { start: 10, end: 100, unit: 'px' },
              translateX: { start: 10, end: 100, unit: 'px' },
            },
            ScrollAxis.horizontal
          )
        ).toEqual(true);
      });
    });
  });
  describe('when axis is vertical and', () => {
    describe('when translateX provided', () => {
      test(`then it returns false`, () => {
        expect(
          getShouldScaleTranslateEffects(
            {},
            { translateX: { start: 10, end: 100, unit: 'px' } },
            ScrollAxis.vertical
          )
        ).toEqual(false);
      });
    });
    describe('when translateY is provided', () => {
      test(`then it returns true`, () => {
        expect(
          getShouldScaleTranslateEffects(
            {},
            { translateY: { start: 10, end: 100, unit: 'px' } },
            ScrollAxis.vertical
          )
        ).toEqual(true);
      });
    });
    describe('when translateY and translateX are provided', () => {
      test(`then it returns true`, () => {
        expect(
          getShouldScaleTranslateEffects(
            {},
            {
              translateY: { start: 10, end: 100, unit: 'px' },
              translateX: { start: 10, end: 100, unit: 'px' },
            },
            ScrollAxis.vertical
          )
        ).toEqual(true);
      });
    });
  });
  describe('when a target element is provided', () => {
    test(`then it returns false`, () => {
      expect(
        getShouldScaleTranslateEffects(
          { targetElement: document.createElement('div') },
          {},
          ScrollAxis.vertical
        )
      ).toEqual(false);
    });
  });

  describe('when a scale effect is provided', () => {
    test(`then it returns false`, () => {
      expect(
        getShouldScaleTranslateEffects(
          {},
          {
            scale: { start: 10, end: 100, unit: '' },
            scaleX: { start: 10, end: 100, unit: '' },
            scaleY: { start: 10, end: 100, unit: '' },
            scaleZ: { start: 10, end: 100, unit: '' },
          },
          ScrollAxis.vertical
        )
      ).toEqual(false);
    });
  });
  describe('when a rotate effect is provided', () => {
    test(`then it returns false`, () => {
      expect(
        getShouldScaleTranslateEffects(
          {},
          {
            rotate: { start: 10, end: 100, unit: '' },
            rotateX: { start: 10, end: 100, unit: '' },
            rotateY: { start: 10, end: 100, unit: '' },
            rotateZ: { start: 10, end: 100, unit: '' },
          },
          ScrollAxis.vertical
        )
      ).toEqual(false);
    });
  });
  describe('when a opacity effect is provided', () => {
    test(`then it returns false`, () => {
      expect(
        getShouldScaleTranslateEffects(
          {},
          { opacity: { start: 0, end: 1, unit: '' } },
          ScrollAxis.vertical
        )
      ).toEqual(false);
    });
  });
});
