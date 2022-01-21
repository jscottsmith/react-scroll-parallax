import { parseValueAndUnit } from 'parallax-controller';
import { BannerLayer } from '../types';

export function getExpandedStyle(expanded: boolean, layer: BannerLayer) {
  if (!expanded) {
    return {};
  }
  if (Array.isArray(layer.translateY)) {
    const translateYStart = parseValueAndUnit(layer.translateY[0]);
    const translateYEnd = parseValueAndUnit(layer.translateY[1]);
    if (translateYStart.unit === 'px' && translateYEnd.unit === 'px') {
      return {
        top: `${Math.abs(translateYEnd.value) * -1}px`,
        bottom: `${Math.abs(translateYStart.value) * -1}px`,
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
