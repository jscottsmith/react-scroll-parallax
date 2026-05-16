import { describe, it, expect } from 'vitest';
import { parseTranslationProps } from './parseElementTransitionEffects';
import type { CSSEffect } from '../types';
import { ScrollAxis } from '../types';

describe('parseTranslationProps', () => {
  it('returns the offset properties to an element with defaults', () => {
    const props: {
      translateY: CSSEffect;
      translateX: CSSEffect;
    } = {
      translateY: [0, 0],
      translateX: [0, 0],
    };
    expect(parseTranslationProps(props, ScrollAxis.vertical)).toEqual({
      translateY: {
        start: 0,
        end: 0,
        unit: '%',
      },
      translateX: {
        start: 0,
        end: 0,
        unit: '%',
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
    expect(parseTranslationProps(props, ScrollAxis.vertical)).toEqual({
      translateY: {
        start: 100,
        end: -50,
        unit: 'px',
      },
      translateX: {
        start: 100,
        end: 300,
        unit: '%',
      },
    });
  });

  it('only returns translation effects and ignores other effects', () => {
    const translations = {
      translateY: ['100px', '-50px'],
      translateX: ['100%', '300%'],
      rotate: ['0deg', '360deg'],
      scale: [1, 2],
      opacity: [0, 1],
    };

    expect(parseTranslationProps(translations, ScrollAxis.vertical)).toEqual({
      translateY: {
        start: 100,
        end: -50,
        unit: 'px',
      },
      translateX: {
        start: 100,
        end: 300,
        unit: '%',
      },
    });
  });

  describe('parses speed', () => {
    it('and creates proper translate y effect for vertical scrolling', () => {
      const translations = { speed: -10 };

      const expectedParsedTranslations = {
        translateY: {
          start: 10 * translations.speed,
          end: -10 * translations.speed,
          unit: 'px',
        },
      };

      expect(parseTranslationProps(translations, ScrollAxis.vertical)).toEqual(
        expectedParsedTranslations
      );
    });

    it('and creates proper translate x effect for horizontal scrolling', () => {
      const translations = { speed: -10 };

      const expectedParsedTranslations = {
        translateX: {
          start: 10 * translations.speed,
          end: -10 * translations.speed,
          unit: 'px',
        },
      };

      expect(
        parseTranslationProps(translations, ScrollAxis.horizontal)
      ).toEqual(expectedParsedTranslations);
    });
  });

  it('ignores and omits effects if no values are provided', () => {
    expect(parseTranslationProps({}, ScrollAxis.vertical)).toEqual({});
  });

  it('parses easing from the 3rd tuple entry', () => {
    const props = {
      translateY: [0, 100, 'ease-in'] as CSSEffect,
    };
    expect(parseTranslationProps(props, ScrollAxis.vertical)).toEqual({
      translateY: {
        start: 0,
        end: 100,
        unit: '%',
        easing: 'ease-in',
      },
    });
  });

  it("to throw if matching units aren't provided for translation effects", () => {
    const props: {
      translateY: CSSEffect;
      translateX: CSSEffect;
    } = { translateY: ['100px', '-50%'], translateX: ['100px', '300%'] };
    expect(() => parseTranslationProps(props, ScrollAxis.vertical)).toThrow();
  });
});
