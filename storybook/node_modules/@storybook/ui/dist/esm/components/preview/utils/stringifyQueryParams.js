import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.regexp.exec.js";
import qs from 'qs';
export var stringifyQueryParams = function stringifyQueryParams(queryParams) {
  return qs.stringify(queryParams, {
    addQueryPrefix: true,
    encode: false
  }).replace(/^\?/, '&');
};