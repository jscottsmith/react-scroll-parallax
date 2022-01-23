var BLACKLIST = ['null', 'undefined'];
export function isDefaultValueBlacklisted(value) {
  return BLACKLIST.some(function (x) {
    return x === value;
  });
}