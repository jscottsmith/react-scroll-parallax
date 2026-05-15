import { Element } from './classes/Element';
import { ParallaxController } from './classes/ParallaxController';

import { parseValueAndUnit } from './utils/parseValueAndUnit';

export * from './types';
export * from './easing';

/**
 * Named exports are limited to symbols consumed by the `react-scroll-parallax` workspace
 * package (the integration surface). Types and enums still come from `./types` and
 * `./easing` via `export *`. Internal modules import classes such as `View` / `Limits`
 * via relative paths, not from this entry.
 */
export { Element, ParallaxController, parseValueAndUnit };
