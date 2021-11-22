// Scale between AKA normalize
export function scaleBetween(
  value: number,
  newMin: number,
  newMax: number,
  oldMin: number,
  oldMax: number
) {
  return ((newMax - newMin) * (value - oldMin)) / (oldMax - oldMin) + newMin;
}
