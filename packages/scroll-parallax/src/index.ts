import { Element } from './classes/Element';
import { ParallaxController } from './classes/ParallaxController';

import { parseValueAndUnit } from './utils/parseValueAndUnit';

export * from './types';

/**
 * Named exports are limited to symbols consumed by the `react-scroll-parallax` workspace
 * package (the integration surface). Types and enums still come from `./types` and
 * Internal modules import classes such as `View`
 * via relative paths, not from this entry.
 */
export { Element, ParallaxController, parseValueAndUnit };
