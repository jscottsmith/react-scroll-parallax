"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyQueryParams = void 0;

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stringifyQueryParams = function stringifyQueryParams(queryParams) {
  return _qs.default.stringify(queryParams, {
    addQueryPrefix: true,
    encode: false
  }).replace(/^\?/, '&');
};

exports.stringifyQueryParams = stringifyQueryParams;