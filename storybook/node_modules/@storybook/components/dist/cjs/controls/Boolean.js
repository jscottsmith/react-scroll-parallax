"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

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
exports.BooleanControl = void 0;

require("core-js/modules/es.string.bold.js");

require("core-js/modules/es.function.name.js");

var _react = _interopRequireWildcard(require("react"));

var _polished = require("polished");

var _theming = require("@storybook/theming");

var _helpers = require("./helpers");

var _form = require("../form");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Label = _theming.styled.label(function (_ref) {
  var theme = _ref.theme;
  return {
    lineHeight: '18px',
    alignItems: 'center',
    marginBottom: 8,
    display: 'inline-block',
    position: 'relative',
    whiteSpace: 'nowrap',
    background: "".concat((0, _polished.opacify)(0.05, theme.appBorderColor)),
    borderRadius: '3em',
    padding: 1,
    input: {
      appearance: 'none',
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      borderRadius: '3em',
      '&:focus': {
        outline: 'none',
        boxShadow: "".concat(theme.color.secondary, " 0 0 0 1px inset !important")
      }
    },
    span: {
      textAlign: 'center',
      fontSize: theme.typography.size.s1,
      fontWeight: theme.typography.weight.bold,
      lineHeight: '1',
      cursor: 'pointer',
      display: 'inline-block',
      padding: '7px 15px',
      transition: 'all 100ms ease-out',
      userSelect: 'none',
      borderRadius: '3em',
      color: (0, _polished.transparentize)(0.4, theme.color.defaultText),
      background: 'transparent',
      '&:hover': {
        boxShadow: "".concat((0, _polished.opacify)(0.3, theme.appBorderColor), " 0 0 0 1px inset")
      },
      '&:active': {
        boxShadow: "".concat((0, _polished.opacify)(0.05, theme.appBorderColor), " 0 0 0 2px inset"),
        color: (0, _polished.opacify)(1, theme.appBorderColor)
      },
      '&:first-of-type': {
        paddingRight: 8
      },
      '&:last-of-type': {
        paddingLeft: 8
      }
    },
    'input:checked ~ span:last-of-type, input:not(:checked) ~ span:first-of-type': {
      background: theme.background.app,
      boxShadow: "".concat((0, _polished.opacify)(0.1, theme.appBorderColor), " 0 0 2px"),
      color: theme.color.defaultText,
      padding: '7px 15px'
    }
  };
});

var format = function format(value) {
  return value ? String(value) : null;
};

var parse = function parse(value) {
  return value === 'true';
};

var BooleanControl = function BooleanControl(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      _onChange = _ref2.onChange,
      onBlur = _ref2.onBlur,
      onFocus = _ref2.onFocus;
  var onSetFalse = (0, _react.useCallback)(function () {
    return _onChange(false);
  }, [_onChange]);

  if (value === undefined) {
    return /*#__PURE__*/_react.default.createElement(_form.Form.Button, {
      id: (0, _helpers.getControlSetterButtonId)(name),
      onClick: onSetFalse
    }, "Set boolean");
  }

  return /*#__PURE__*/_react.default.createElement(Label, {
    htmlFor: name,
    title: value ? 'Change to false' : 'Change to true'
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: (0, _helpers.getControlId)(name),
    type: "checkbox",
    onChange: function onChange(e) {
      return _onChange(e.target.checked);
    },
    checked: value || false,
    name: name,
    onBlur: onBlur,
    onFocus: onFocus
  }), /*#__PURE__*/_react.default.createElement("span", null, "False"), /*#__PURE__*/_react.default.createElement("span", null, "True"));
};

exports.BooleanControl = BooleanControl;
BooleanControl.displayName = "BooleanControl";