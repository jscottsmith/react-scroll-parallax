import qs from 'qs';
export const stringifyQueryParams = queryParams => qs.stringify(queryParams, {
  addQueryPrefix: true,
  encode: false
}).replace(/^\?/, '&');