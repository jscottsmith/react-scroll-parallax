"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateControl = void 0;

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.function.name.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _form = require("../form");

var _helpers = require("./helpers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var parseDate = function parseDate(value) {
  var _value$split = value.split('-'),
      _value$split2 = _slicedToArray(_value$split, 3),
      year = _value$split2[0],
      month = _value$split2[1],
      day = _value$split2[2];

  var result = new Date();
  result.setFullYear(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  return result;
};

var parseTime = function parseTime(value) {
  var _value$split3 = value.split(':'),
      _value$split4 = _slicedToArray(_value$split3, 2),
      hours = _value$split4[0],
      minutes = _value$split4[1];

  var result = new Date();
  result.setHours(parseInt(hours, 10));
  result.setMinutes(parseInt(minutes, 10));
  return result;
};

var formatDate = function formatDate(value) {
  var date = new Date(value);
  var year = "000".concat(date.getFullYear()).slice(-4);
  var month = "0".concat(date.getMonth() + 1).slice(-2);
  var day = "0".concat(date.getDate()).slice(-2);
  return "".concat(year, "-").concat(month, "-").concat(day);
};

var formatTime = function formatTime(value) {
  var date = new Date(value);
  var hours = "0".concat(date.getHours()).slice(-2);
  var minutes = "0".concat(date.getMinutes()).slice(-2);
  return "".concat(hours, ":").concat(minutes);
};

var FlexSpaced = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    flex: 1,
    display: 'flex',
    input: {
      marginLeft: 10,
      flex: 1,
      height: 32,
      // hardcode height bc Chromium bug https://bugs.chromium.org/p/chromium/issues/detail?id=417606
      '&::-webkit-calendar-picker-indicator': {
        opacity: 0.5,
        height: 12,
        filter: theme.base === 'light' ? undefined : 'invert(1)'
      }
    },
    'input:first-of-type': {
      marginLeft: 0
    }
  };
});

var DateControl = function DateControl(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      onChange = _ref2.onChange,
      onFocus = _ref2.onFocus,
      onBlur = _ref2.onBlur;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      valid = _useState2[0],
      setValid = _useState2[1];

  var dateRef = (0, _react.useRef)();
  var timeRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    if (valid !== false) {
      if (dateRef && dateRef.current) {
        dateRef.current.value = formatDate(value);
      }

      if (timeRef && timeRef.current) {
        timeRef.current.value = formatTime(value);
      }
    }
  }, [value]);

  var onDateChange = function onDateChange(e) {
    var parsed = parseDate(e.target.value);
    var result = new Date(value);
    result.setFullYear(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    var time = result.getTime();
    if (time) onChange(time);
    setValid(!!time);
  };

  var onTimeChange = function onTimeChange(e) {
    var parsed = parseTime(e.target.value);
    var result = new Date(value);
    result.setHours(parsed.getHours());
    result.setMinutes(parsed.getMinutes());
    var time = result.getTime();
    if (time) onChange(time);
    setValid(!!time);
  };

  var controlId = (0, _helpers.getControlId)(name);
  return /*#__PURE__*/_react.default.createElement(FlexSpaced, null, /*#__PURE__*/_react.default.createElement(_form.Form.Input, {
    type: "date",
    max: "9999-12-31" // I do this because of a rendering bug in chrome
    ,
    ref: dateRef,
    id: "".concat(controlId, "-date"),
    name: "".concat(controlId, "-date"),
    onChange: onDateChange,
    onFocus: onFocus,
    onBlur: onBlur
  }), /*#__PURE__*/_react.default.createElement(_form.Form.Input, {
    type: "time",
    id: "".concat(controlId, "-time"),
    name: "".concat(controlId, "-time"),
    ref: timeRef,
    onChange: onTimeChange,
    onFocus: onFocus,
    onBlur: onBlur
  }), !valid ? /*#__PURE__*/_react.default.createElement("div", null, "invalid") : null);
};

exports.DateControl = DateControl;
DateControl.displayName = "DateControl";