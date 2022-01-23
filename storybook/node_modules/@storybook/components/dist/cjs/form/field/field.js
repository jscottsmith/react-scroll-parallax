"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = void 0;

require("core-js/modules/es.string.bold.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Wrapper = _theming.styled.label(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'flex',
    borderBottom: "1px solid ".concat(theme.appBorderColor),
    margin: '0 15px',
    padding: '8px 0',
    '&:last-child': {
      marginBottom: '3rem'
    }
  };
});

var Label = _theming.styled.span(function (_ref2) {
  var theme = _ref2.theme;
  return {
    minWidth: 100,
    fontWeight: theme.typography.weight.bold,
    marginRight: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    lineHeight: '16px'
  };
});

var Field = function Field(_ref3) {
  var label = _ref3.label,
      children = _ref3.children,
      props = _objectWithoutProperties(_ref3, ["label", "children"]);

  return /*#__PURE__*/_react.default.createElement(Wrapper, props, label ? /*#__PURE__*/_react.default.createElement(Label, null, /*#__PURE__*/_react.default.createElement("span", null, label)) : null, children);
};

exports.Field = Field;
Field.displayName = "Field";
Field.defaultProps = {
  label: undefined
};