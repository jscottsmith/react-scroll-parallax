function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.string.bold.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import React from 'react';
import { styled } from '@storybook/theming';
var Wrapper = styled.label(function (_ref) {
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
var Label = styled.span(function (_ref2) {
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
export var Field = function Field(_ref3) {
  var label = _ref3.label,
      children = _ref3.children,
      props = _objectWithoutProperties(_ref3, ["label", "children"]);

  return /*#__PURE__*/React.createElement(Wrapper, props, label ? /*#__PURE__*/React.createElement(Label, null, /*#__PURE__*/React.createElement("span", null, label)) : null, children);
};
Field.displayName = "Field";
Field.defaultProps = {
  label: undefined
};