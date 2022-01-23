"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArgControl = void 0;

var _react = _interopRequireWildcard(require("react"));

var _controls = require("../../controls");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Controls = {
  array: _controls.ObjectControl,
  object: _controls.ObjectControl,
  boolean: _controls.BooleanControl,
  color: _controls.ColorControl,
  date: _controls.DateControl,
  number: _controls.NumberControl,
  check: _controls.OptionsControl,
  'inline-check': _controls.OptionsControl,
  radio: _controls.OptionsControl,
  'inline-radio': _controls.OptionsControl,
  select: _controls.OptionsControl,
  'multi-select': _controls.OptionsControl,
  range: _controls.RangeControl,
  text: _controls.TextControl,
  file: _controls.FilesControl
};

var NoControl = function NoControl() {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "-");
};

var ArgControl = function ArgControl(_ref) {
  var row = _ref.row,
      arg = _ref.arg,
      updateArgs = _ref.updateArgs;
  var key = row.key,
      control = row.control;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFocused = _useState2[0],
      setFocused = _useState2[1]; // box because arg can be a fn (e.g. actions) and useState calls fn's


  var _useState3 = (0, _react.useState)({
    value: arg
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      boxedValue = _useState4[0],
      setBoxedValue = _useState4[1];

  (0, _react.useEffect)(function () {
    if (!isFocused) setBoxedValue({
      value: arg
    });
  }, [isFocused, arg]);
  var onChange = (0, _react.useCallback)(function (argVal) {
    setBoxedValue({
      value: argVal
    });
    updateArgs(_defineProperty({}, key, argVal));
    return argVal;
  }, [updateArgs, key]);
  var onBlur = (0, _react.useCallback)(function () {
    return setFocused(false);
  }, []);
  var onFocus = (0, _react.useCallback)(function () {
    return setFocused(true);
  }, []);
  if (!control || control.disable) return /*#__PURE__*/_react.default.createElement(NoControl, null); // row.name is a display name and not a suitable DOM input id or name - i might contain whitespace etc.
  // row.key is a hash key and therefore a much safer choice

  var props = {
    name: key,
    argType: row,
    value: boxedValue.value,
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus
  };
  var Control = Controls[control.type] || NoControl;
  return /*#__PURE__*/_react.default.createElement(Control, _extends({}, props, control, {
    controlType: control.type
  }));
};

exports.ArgControl = ArgControl;
ArgControl.displayName = "ArgControl";