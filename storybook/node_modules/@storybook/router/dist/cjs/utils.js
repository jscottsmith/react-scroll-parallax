"use strict";

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.object.freeze.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatch = exports.stringifyQuery = exports.queryFromLocation = exports.queryFromString = exports.buildArgsParam = exports.deepDiff = exports.DEEPLY_EQUAL = exports.parsePath = void 0;

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.fill.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.string.starts-with.js");

var _clientLogger = require("@storybook/client-logger");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _qs = _interopRequireDefault(require("qs"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var splitPathRegex = /\/([^/]+)\/(?:(.*)_)?([^/]+)?/;
var parsePath = (0, _memoizerific.default)(1000)(function (path) {
  var result = {
    viewMode: undefined,
    storyId: undefined,
    refId: undefined
  };

  if (path) {
    var _ref = path.toLowerCase().match(splitPathRegex) || [],
        _ref2 = _slicedToArray(_ref, 4),
        viewMode = _ref2[1],
        refId = _ref2[2],
        storyId = _ref2[3];

    if (viewMode) {
      Object.assign(result, {
        viewMode: viewMode,
        storyId: storyId,
        refId: refId
      });
    }
  }

  return result;
});
exports.parsePath = parsePath;
var DEEPLY_EQUAL = Symbol('Deeply equal');
exports.DEEPLY_EQUAL = DEEPLY_EQUAL;

var deepDiff = function deepDiff(value, update) {
  if (_typeof(value) !== _typeof(update)) return update;
  if ((0, _fastDeepEqual.default)(value, update)) return DEEPLY_EQUAL;

  if (Array.isArray(value) && Array.isArray(update)) {
    var res = update.reduce(function (acc, upd, index) {
      var diff = deepDiff(value[index], upd);
      if (diff !== DEEPLY_EQUAL) acc[index] = diff;
      return acc;
    }, new Array(update.length));
    if (update.length >= value.length) return res;
    return res.concat(new Array(value.length - update.length).fill(undefined));
  }

  if ((0, _isPlainObject.default)(value) && (0, _isPlainObject.default)(update)) {
    return Object.keys(Object.assign({}, value, update)).reduce(function (acc, key) {
      var diff = deepDiff(value === null || value === void 0 ? void 0 : value[key], update === null || update === void 0 ? void 0 : update[key]);
      return diff === DEEPLY_EQUAL ? acc : Object.assign(acc, _defineProperty({}, key, diff));
    }, {});
  }

  return update;
}; // Keep this in sync with validateArgs in core-client/src/preview/parseArgsParam.ts


exports.deepDiff = deepDiff;
var VALIDATION_REGEXP = /^[a-zA-Z0-9 _-]*$/;
var NUMBER_REGEXP = /^-?[0-9]+(\.[0-9]+)?$/;
var HEX_REGEXP = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i;
var COLOR_REGEXP = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i;

var validateArgs = function validateArgs() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var value = arguments.length > 1 ? arguments[1] : undefined;
  if (key === null) return false;
  if (key === '' || !VALIDATION_REGEXP.test(key)) return false;
  if (value === null || value === undefined) return true; // encoded as `!null` or `!undefined`

  if (value instanceof Date) return true; // encoded as modified ISO string

  if (typeof value === 'number' || typeof value === 'boolean') return true;

  if (typeof value === 'string') {
    return VALIDATION_REGEXP.test(value) || NUMBER_REGEXP.test(value) || HEX_REGEXP.test(value) || COLOR_REGEXP.test(value);
  }

  if (Array.isArray(value)) return value.every(function (v) {
    return validateArgs(key, v);
  });
  if ((0, _isPlainObject.default)(value)) return Object.entries(value).every(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return validateArgs(k, v);
  });
  return false;
};

var encodeSpecialValues = function encodeSpecialValues(value) {
  if (value === undefined) return '!undefined';
  if (value === null) return '!null';

  if (typeof value === 'string') {
    if (HEX_REGEXP.test(value)) return "!hex(".concat(value.slice(1), ")");
    if (COLOR_REGEXP.test(value)) return "!".concat(value.replace(/[\s%]/g, ''));
    return value;
  }

  if (Array.isArray(value)) return value.map(encodeSpecialValues);

  if ((0, _isPlainObject.default)(value)) {
    return Object.entries(value).reduce(function (acc, _ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          key = _ref6[0],
          val = _ref6[1];

      return Object.assign(acc, _defineProperty({}, key, encodeSpecialValues(val)));
    }, {});
  }

  return value;
};

var QS_OPTIONS = {
  encode: false,
  // we handle URL encoding ourselves
  delimiter: ';',
  // we don't actually create multiple query params
  allowDots: true,
  // encode objects using dot notation: obj.key=val
  format: 'RFC1738',
  // encode spaces using the + sign
  serializeDate: function serializeDate(date) {
    return "!date(".concat(date.toISOString(), ")");
  }
};

var buildArgsParam = function buildArgsParam(initialArgs, args) {
  var update = deepDiff(initialArgs, args);
  if (!update || update === DEEPLY_EQUAL) return '';
  var object = Object.entries(update).reduce(function (acc, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        value = _ref8[1];

    if (validateArgs(key, value)) return Object.assign(acc, _defineProperty({}, key, value));

    _clientLogger.once.warn((0, _tsDedent.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      Omitted potentially unsafe URL args.\n\n      More info: https://storybook.js.org/docs/react/writing-stories/args#setting-args-through-the-url\n    "]))));

    return acc;
  }, {});
  return _qs.default.stringify(encodeSpecialValues(object), QS_OPTIONS).replace(/ /g, '+').split(';').map(function (part) {
    return part.replace('=', ':');
  }).join(';');
};

exports.buildArgsParam = buildArgsParam;
var queryFromString = (0, _memoizerific.default)(1000)(function (s) {
  return _qs.default.parse(s, {
    ignoreQueryPrefix: true
  });
});
exports.queryFromString = queryFromString;

var queryFromLocation = function queryFromLocation(location) {
  return queryFromString(location.search);
};

exports.queryFromLocation = queryFromLocation;

var stringifyQuery = function stringifyQuery(query) {
  return _qs.default.stringify(query, {
    addQueryPrefix: true,
    encode: false
  });
};

exports.stringifyQuery = stringifyQuery;
var getMatch = (0, _memoizerific.default)(1000)(function (current, target) {
  var startsWith = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var startsWithTarget = current && startsWith && current.startsWith(target);
  var currentIsTarget = typeof target === 'string' && current === target;
  var matchTarget = current && target && current.match(target);

  if (startsWithTarget || currentIsTarget || matchTarget) {
    return {
      path: current
    };
  }

  return null;
});
exports.getMatch = getMatch;