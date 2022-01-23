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

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberControl = exports.format = exports.parse = void 0;

require("core-js/modules/es.number.is-safe-integer.js");

require("core-js/modules/es.number.constructor.js");

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

var Wrapper = _theming.styled.label({
  display: 'flex'
});

var parse = function parse(value) {
  var result = parseFloat(value);
  return Number.isNaN(result) ? undefined : result;
};

exports.parse = parse;

var format = function format(value) {
  return value != null ? String(value) : '';
};

exports.format = format;

var NumberControl = function NumberControl(_ref) {
  var name = _ref.name,
      value = _ref.value,
      onChange = _ref.onChange,
      min = _ref.min,
      max = _ref.max,
      step = _ref.step,
      onBlur = _ref.onBlur,
      onFocus = _ref.onFocus;

  var _useState = (0, _react.useState)(typeof value === 'number' ? value : ''),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      forceVisible = _useState4[0],
      setForceVisible = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      parseError = _useState6[0],
      setParseError = _useState6[1];

  var handleChange = (0, _react.useCallback)(function (event) {
    setInputValue(event.target.value);
    var result = parseFloat(event.target.value);

    if (Number.isNaN(result)) {
      setParseError(new Error("'".concat(event.target.value, "' is not a number")));
    } else {
      onChange(result);
      setParseError(null);
    }
  }, [onChange, setParseError]);
  var onForceVisible = (0, _react.useCallback)(function () {
    setInputValue('0');
    onChange(0);
    setForceVisible(true);
  }, [setForceVisible]);
  var htmlElRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (forceVisible && htmlElRef.current) htmlElRef.current.select();
  }, [forceVisible]);

  if (!forceVisible && value === undefined) {
    return /*#__PURE__*/_react.default.createElement(_form.Form.Button, {
      id: (0, _helpers.getControlSetterButtonId)(name),
      onClick: onForceVisible
    }, "Set number");
  }

  return /*#__PURE__*/_react.default.createElement(Wrapper, null, /*#__PURE__*/_react.default.createElement(_form.Form.Input, {
    ref: htmlElRef,
    id: (0, _helpers.getControlId)(name),
    type: "number",
    onChange: handleChange,
    size: "flex",
    placeholder: "Edit number...",
    value: inputValue,
    valid: parseError ? 'error' : null,
    autoFocus: forceVisible,
    name: name,
    min: min,
    max: max,
    step: step,
    onFocus: onFocus,
    onBlur: onBlur
  }));
};

exports.NumberControl = NumberControl;
NumberControl.displayName = "NumberControl";