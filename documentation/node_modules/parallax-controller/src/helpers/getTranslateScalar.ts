export function getTranslateScalar(
  startTranslatePx: number,
  endTranslatePx: number,
  totalDist: number
) {
  const slow = endTranslatePx > startTranslatePx;

  // calculating necessary scale to increase translations
  const totalAbsOff =
    (Math.abs(startTranslatePx) + Math.abs(endTranslatePx)) * (slow ? -1 : 1);
  const totalDistTrue = totalDist + totalAbsOff;

  // Determine multiple to scale by, only values greater than 1
  const scale = Math.max(totalDist / totalDistTrue, 1);

  return scale;
}
