/**
 * Takes two values (start, end) and returns whether the current scroll is within range
 * @param {number} start - start of scroll (x/y)
 * @param {number} end - end of scroll (x/y)
 * @param {number} scroll - current scroll (x/y)
 * @return {boolean} isInView
 */

export function isElementInView(
  start: number,
  end: number,
  scroll: number
): boolean {
  const isInView = scroll >= start && scroll <= end;

  return isInView;
}
