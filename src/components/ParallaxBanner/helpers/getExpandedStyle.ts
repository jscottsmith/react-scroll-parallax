import { parseValueAndUnit } from 'parallax-controller';
import { BannerLayer } from '../types';

const FALLBACK_RECT = {
  height: 0,
};

export function getExpandedStyle(layer: BannerLayer) {
  if (Array.isArray(layer.translateY)) {
    const translateYStart = parseValueAndUnit(layer.translateY[0]);
    const translateYEnd = parseValueAndUnit(layer.translateY[1]);

    if (translateYStart.unit === 'px' && translateYEnd.unit === 'px') {
      return {
        top: `${Math.abs(translateYEnd.value) * -1}px`,
        bottom: `${Math.abs(translateYStart.value) * -1}px`,
      };
    }

    if (translateYStart.unit === '%' && translateYEnd.unit === '%') {
      const clientRect =
        layer.targetElement?.getBoundingClientRect() || FALLBACK_RECT;
      const top = Math.abs(clientRect.height * 0.01 * translateYEnd.value) * -1;
      const bottom =
        Math.abs(clientRect.height * 0.01 * translateYStart.value) * -1;
      return {
        top: `${top}px`,
        bottom: `${bottom}px`,
      };
    }
  }
  if (layer.speed) {
    const speed = layer.speed || 0;

    return {
      top: Math.abs(speed) * 10 * -1 + 'px',
      bottom: Math.abs(speed) * 10 * -1 + 'px',
    };
  }
  return {};
}
