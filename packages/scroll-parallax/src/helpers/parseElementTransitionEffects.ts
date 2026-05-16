import {
  type ParsedValueEffect,
  type ParallaxElementConfig,
  type ParallaxStartEndEffects,
  type ValidTranslationUnits,
  type CSSEffect,
  ScrollAxis,
  type ValidScrollAxis,
} from '../types';
import { parseValueAndUnit } from '../utils/parseValueAndUnit';
import { parseTupleEasing } from '../utils/parseTupleEasing';

// Only translation effects need parsing
export const TRANSLATION_EFFECTS = ['translateX', 'translateY'] as const;
export const SPEED_EFFECT = 'speed' as const;

export const MAP_EFFECT_TO_DEFAULT_UNIT: {
  [key in 'translateX' | 'translateY']: ValidTranslationUnits;
} = {
  translateX: '%',
  translateY: '%',
};

/**
 * Takes a parallax element effects and parses only the translation properties to get the start and end values and units.
 * Only returns parsed translation effects.
 */
export function parseTranslationProps(
  props: ParallaxElementConfig,
  scrollAxis: ValidScrollAxis
): ParallaxStartEndEffects {
  const parsedTranslations: { [key: string]: ParsedValueEffect } = {};

  // Handle speed prop - this creates translation effects
  if (typeof props?.speed === 'number') {
    const value = props.speed as number;
    const startSpeed = `${(value || 0) * 10}px`;
    const endSpeed = `${(value || 0) * -10}px`;

    const startParsed = parseValueAndUnit(startSpeed);
    const endParsed = parseValueAndUnit(endSpeed);

    const speedConfig = {
      start: startParsed.value,
      end: endParsed.value,
      unit: startParsed.unit,
    };

    // Manually set translate y value
    if (scrollAxis === ScrollAxis.vertical) {
      parsedTranslations.translateY = speedConfig;
    }

    // Manually set translate x value
    if (scrollAxis === ScrollAxis.horizontal) {
      parsedTranslations.translateX = speedConfig;
    }
  }

  // Parse only translation effects
  TRANSLATION_EFFECTS.forEach((key) => {
    const defaultValue: ValidTranslationUnits = MAP_EFFECT_TO_DEFAULT_UNIT[key];

    if (Array.isArray(props?.[key])) {
      const value = props?.[key] as CSSEffect;

      if (typeof value[0] !== 'undefined' && typeof value[1] !== 'undefined') {
        const startParsed = parseValueAndUnit(value?.[0], defaultValue);
        const endParsed = parseValueAndUnit(value?.[1], defaultValue);

        const easing = parseTupleEasing(value, `translate${key === 'translateX' ? 'X' : 'Y'}`);

        parsedTranslations[key] = {
          start: startParsed.value,
          end: endParsed.value,
          unit: startParsed.unit,
          ...(easing ? { easing } : {}),
        };

        if (startParsed.unit !== endParsed.unit) {
          throw new Error(
            'Must provide matching units for the min and max offset values of each axis.'
          );
        }
      }
    }
  });

  return parsedTranslations;
}
