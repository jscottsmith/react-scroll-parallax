"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeControl = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.number.to-fixed.js");

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _helpers = require("./helpers");

var _Number = require("./Number");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var RangeInput = _theming.styled.input(function (_ref) {
  var theme = _ref.theme,
      min = _ref.min,
      max = _ref.max,
      value = _ref.value;
  return {
    // Resytled using http://danielstern.ca/range.css/#/
    '&': {
      width: '100%',
      backgroundColor: 'transparent',
      appearance: 'none'
    },
    '&::-webkit-slider-runnable-track': {
      background: theme.base === 'light' ? "linear-gradient(to right, \n            ".concat(theme.color.green, " 0%, ").concat(theme.color.green, " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.darken)(0.02, theme.input.background), " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.darken)(0.02, theme.input.background), " 100%)") : "linear-gradient(to right, \n            ".concat(theme.color.green, " 0%, ").concat(theme.color.green, " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.lighten)(0.02, theme.input.background), " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.lighten)(0.02, theme.input.background), " 100%)"),
      boxShadow: "".concat(theme.appBorderColor, " 0 0 0 1px inset"),
      borderRadius: 6,
      width: '100%',
      height: 6,
      cursor: 'pointer'
    },
    '&::-webkit-slider-thumb': {
      marginTop: '-6px',
      width: 16,
      height: 16,
      border: "1px solid ".concat((0, _polished.rgba)(theme.appBorderColor, 0.2)),
      borderRadius: '50px',
      boxShadow: "0 1px 3px 0px ".concat((0, _polished.rgba)(theme.appBorderColor, 0.2)),
      cursor: 'grab',
      appearance: 'none',
      background: "".concat(theme.input.background),
      transition: 'all 150ms ease-out',
      '&:hover': {
        background: "".concat((0, _polished.darken)(0.05, theme.input.background)),
        transform: 'scale3d(1.1, 1.1, 1.1) translateY(-1px)',
        transition: 'all 50ms ease-out'
      },
      '&:active': {
        background: "".concat(theme.input.background),
        transform: 'scale3d(1, 1, 1) translateY(0px)',
        cursor: 'grabbing'
      }
    },
    '&:focus': {
      outline: 'none',
      '&::-webkit-slider-runnable-track': {
        borderColor: (0, _polished.rgba)(theme.color.secondary, 0.4)
      },
      '&::-webkit-slider-thumb': {
        borderColor: theme.color.secondary,
        boxShadow: "0 0px 5px 0px ".concat(theme.color.secondary)
      }
    },
    '&::-moz-range-track': {
      background: theme.base === 'light' ? "linear-gradient(to right, \n            ".concat(theme.color.green, " 0%, ").concat(theme.color.green, " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.darken)(0.02, theme.input.background), " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.darken)(0.02, theme.input.background), " 100%)") : "linear-gradient(to right, \n            ".concat(theme.color.green, " 0%, ").concat(theme.color.green, " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.lighten)(0.02, theme.input.background), " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.lighten)(0.02, theme.input.background), " 100%)"),
      boxShadow: "".concat(theme.appBorderColor, " 0 0 0 1px inset"),
      borderRadius: 6,
      width: '100%',
      height: 6,
      cursor: 'pointer',
      outline: 'none'
    },
    '&::-moz-range-thumb': {
      width: 16,
      height: 16,
      border: "1px solid ".concat((0, _polished.rgba)(theme.color.border, 0.2)),
      borderRadius: '50px',
      boxShadow: "0 1px 3px 0px ".concat((0, _polished.rgba)(theme.color.border, 0.2)),
      cursor: 'grab',
      background: "".concat(theme.input.background),
      transition: 'all 150ms ease-out',
      '&:hover': {
        background: "".concat((0, _polished.darken)(0.05, theme.input.background)),
        transform: 'scale3d(1.1, 1.1, 1.1) translateY(-1px)',
        transition: 'all 50ms ease-out'
      },
      '&:active': {
        background: "".concat(theme.input.background),
        transform: 'scale3d(1, 1, 1) translateY(0px)',
        cursor: 'grabbing'
      }
    },
    '&::-ms-track': {
      background: theme.base === 'light' ? "linear-gradient(to right, \n            ".concat(theme.color.green, " 0%, ").concat(theme.color.green, " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.darken)(0.02, theme.input.background), " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.darken)(0.02, theme.input.background), " 100%)") : "linear-gradient(to right, \n            ".concat(theme.color.green, " 0%, ").concat(theme.color.green, " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.lighten)(0.02, theme.input.background), " ").concat((value - min) / (max - min) * 100, "%, \n            ").concat((0, _polished.lighten)(0.02, theme.input.background), " 100%)"),
      boxShadow: "".concat(theme.appBorderColor, " 0 0 0 1px inset"),
      color: 'transparent',
      width: '100%',
      height: '6px',
      cursor: 'pointer'
    },
    '&::-ms-fill-lower': {
      borderRadius: 6
    },
    '&::-ms-fill-upper': {
      borderRadius: 6
    },
    '&::-ms-thumb': {
      width: 16,
      height: 16,
      background: "".concat(theme.input.background),
      border: "1px solid ".concat((0, _polished.rgba)(theme.appBorderColor, 0.2)),
      borderRadius: 50,
      cursor: 'grab',
      marginTop: 0
    },
    '@supports (-ms-ime-align:auto)': {
      'input[type=range]': {
        margin: '0'
      }
    }
  };
});

var RangeLabel = _theming.styled.span({
  paddingLeft: 5,
  paddingRight: 5,
  fontSize: 12,
  whiteSpace: 'nowrap',
  fontFeatureSettings: 'tnum',
  fontVariantNumeric: 'tabular-nums'
});

var RangeWrapper = _theming.styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%'
});

function getNumberOfDecimalPlaces(number) {
  var match = number.toString().match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return !match ? 0 : Math.max(0, // Number of digits right of decimal point.
  (match[1] ? match[1].length : 0) - ( // Adjust for scientific notation.
  match[2] ? +match[2] : 0));
}

var RangeControl = function RangeControl(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      onChange = _ref2.onChange,
      _ref2$min = _ref2.min,
      min = _ref2$min === void 0 ? 0 : _ref2$min,
      _ref2$max = _ref2.max,
      max = _ref2$max === void 0 ? 100 : _ref2$max,
      _ref2$step = _ref2.step,
      step = _ref2$step === void 0 ? 1 : _ref2$step,
      onBlur = _ref2.onBlur,
      onFocus = _ref2.onFocus;

  var handleChange = function handleChange(event) {
    onChange((0, _Number.parse)(event.target.value));
  };

  var hasValue = value !== undefined;
  var numberOFDecimalsPlaces = (0, _react.useMemo)(function () {
    return getNumberOfDecimalPlaces(step);
  }, [step]);
  return /*#__PURE__*/_react.default.createElement(RangeWrapper, null, /*#__PURE__*/_react.default.createElement(RangeLabel, null, min), /*#__PURE__*/_react.default.createElement(RangeInput, {
    id: (0, _helpers.getControlId)(name),
    type: "range",
    onChange: handleChange,
    name: name,
    value: value,
    min: min,
    max: max,
    step: step,
    onFocus: onFocus,
    onBlur: onBlur
  }), /*#__PURE__*/_react.default.createElement(RangeLabel, null, "".concat(hasValue ? value.toFixed(numberOFDecimalsPlaces) : '--'), " / ", max));
};

exports.RangeControl = RangeControl;
RangeControl.displayName = "RangeControl";