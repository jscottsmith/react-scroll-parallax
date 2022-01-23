export function isCloseType(x) {
  return !!(x && x.closeMenu);
}
export function isClearType(x) {
  return !!(x && x.clearLastViewed);
}
export function isExpandType(x) {
  return !!(x && x.showAll);
}
export function isSearchResult(x) {
  return !!(x && x.item);
}