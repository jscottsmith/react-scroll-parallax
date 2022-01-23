import {
  PARALLAX_EFFECTS,
  parseElementTransitionEffects,
} from './parseElementTransitionEffects';
import { CSSEffect, ScaleOpacityEffect } from '../types';
import { ScrollAxis } from '..';

describe('parseElementTransitionEffects', () => {
  it('returns the offset properties to an element with defaults', () => {
    const props: {
      translateY: CSSEffect;
      translateX: CSSEffect;
    } = {
      translateY: [0, 0],
      translateX: [0, 0],
    };
    expect(parseElementTransitionEffects(props, ScrollAxis.vertical)).toEqual({
      translateY: {
        start: 0,
        end: 0,
        unit: '%',
        easing: undefined,
      },
      translateX: {
        start: 0,
        end: 0,
        unit: '%',
        easing: undefined,
      },
    });
  });

  it('adds the offset properties to an element with various units', () => {
    const props: {
      translateY: CSSEffect;
      translateX: CSSEffect;
    } = {
      translateY: ['100px', '-50px'],
      translateX: ['100%', '300%'],
    };
    expect(parseElementTransitionEffects(props, ScrollAxis.vertical)).toEqual({
      translateY: {
        start: 100,
        end: -50,
        unit: 'px',
        easing: undefined,
      },
      translateX: {
        start: 100,
        end: 300,
        unit: '%',
        easing: undefined,
      },
    });
  });

  it('parses and returns all parallax effects', () => {
    const effects = PARALLAX_EFFECTS.reduce((acc: any, effect, i) => {
      acc[effect] = [`${(i + 1) * 1}px`, `${(i + 1) * -1}px`];
      return acc;
    }, {});

    const expectedParsedEffects = PARALLAX_EFFECTS.reduce(
      (acc: any, effect, i) => {
        acc[effect] = {
          start: (i + 1) * 1,
          end: (i + 1) * -1,
          unit: 'px',
          easing: undefined,
        };
        return acc;
      },
      {}
    );

    expect(parseElementTransitionEffects(effects, ScrollAxis.vertical)).toEqual(
      expectedParsedEffects
    );
  });

  describe('parses speed', () => {
    it('and creates proper translate y effect for vertical scrolling', () => {
      const effects = { speed: -10 };

      const expectedParsedEffects = {
        translateY: {
          start: 10 * effects.speed,
          end: -10 * effects.speed,
          unit: 'px',
        },
      };

      expect(
        parseElementTransitionEffects(effects, ScrollAxis.vertical)
      ).toEqual(expectedParsedEffects);
    });

    it('and creates proper translate x effect for horizontal scrolling', () => {
      const effects = { speed: -10 };

      const expectedParsedEffects = {
        translateX: {
          start: 10 * effects.speed,
          end: -10 * effects.speed,
          unit: 'px',
        },
      };

      expect(
        parseElementTransitionEffects(effects, ScrollAxis.horizontal)
      ).toEqual(expectedParsedEffects);
    });
  });

  it('parses the scale properties for an element', () => {
    const scaleProps: {
      scale: ScaleOpacityEffect;
    } = {
      scale: [1, 2],
    };
    expect(
      parseElementTransitionEffects(scaleProps, ScrollAxis.vertical)
    ).toEqual({
      scale: {
        start: 1,
        end: 2,
        unit: '',
        easing: undefined,
      },
    });
    const scaleXProps: {
      scaleX: ScaleOpacityEffect;
    } = {
      scaleX: [1.3, 0],
    };
    expect(
      parseElementTransitionEffects(scaleXProps, ScrollAxis.vertical)
    ).toEqual({
      scaleX: {
        start: 1.3,
        end: 0,
        unit: '',
        easing: undefined,
      },
    });
    const scaleYProps: {
      scaleY: ScaleOpacityEffect;
    } = {
      scaleY: [0, 1],
    };
    expect(
      parseElementTransitionEffects(scaleYProps, ScrollAxis.vertical)
    ).toEqual({
      scaleY: {
        start: 0,
        end: 1,
        unit: '',
        easing: undefined,
      },
    });
    const scaleZProps: {
      scaleZ: ScaleOpacityEffect;
    } = {
      scaleZ: [0, 1],
    };
    expect(
      parseElementTransitionEffects(scaleZProps, ScrollAxis.vertical)
    ).toEqual({
      scaleZ: {
        start: 0,
        end: 1,
        unit: '',
        easing: undefined,
      },
    });
  });

  it('ignores and omits effects if no values are provided', () => {
    expect(parseElementTransitionEffects({}, ScrollAxis.vertical)).toEqual({});
  });

  it("to throw if matching units aren't provided", () => {
    const props: {
      translateY: CSSEffect;
      translateX: CSSEffect;
    } = { translateY: ['100px', '-50%'], translateX: ['100px', '300%'] };
    expect(() =>
      parseElementTransitionEffects(props, ScrollAxis.vertical)
    ).toThrow();
  });
});
