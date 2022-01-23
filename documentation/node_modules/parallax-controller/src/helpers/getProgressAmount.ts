import bezier from 'bezier-easing';

/**
 * Returns the percent (0 - 100) moved based on position in the viewport
 */

export function getProgressAmount(
  /*
   * The start value from cache
   */
  start: number,
  /*
   * total dist the element has to move to be 100% complete (view width/height + element width/height)
   */
  totalDist: number,
  /*
   * Current scroll value
   */
  currentScroll: number,
  /*
   * an optional easing function to apply
   */
  easing?: bezier.EasingFunction
): number {
  // adjust cached value
  const startAdjustedScroll = currentScroll - start;

  // Amount the element has moved based on current and total distance to move
  let amount = startAdjustedScroll / totalDist;

  // Apply bezier easing if provided
  if (easing) {
    amount = easing(amount);
  }

  return amount;
}
