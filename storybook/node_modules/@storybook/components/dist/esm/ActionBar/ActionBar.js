function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "core-js/modules/es.string.bold.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import React from 'react';
import { styled } from '@storybook/theming';
var Container = styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    position: 'absolute',
    bottom: 0,
    right: 0,
    maxWidth: '100%',
    display: 'flex',
    background: theme.background.content,
    zIndex: 1
  };
});
export var ActionButton = styled.button(function (_ref2) {
  var theme = _ref2.theme;
  return {
    margin: 0,
    border: '0 none',
    padding: '4px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: theme.color.defaultText,
    background: theme.background.content,
    fontSize: 12,
    lineHeight: '16px',
    fontFamily: theme.typography.fonts.base,
    fontWeight: theme.typography.weight.bold,
    borderTop: "1px solid ".concat(theme.appBorderColor),
    borderLeft: "1px solid ".concat(theme.appBorderColor),
    marginLeft: -1,
    borderRadius: "4px 0 0 0",
    '&:not(:last-child)': {
      borderRight: "1px solid ".concat(theme.appBorderColor)
    },
    '& + *': {
      borderLeft: "1px solid ".concat(theme.appBorderColor),
      borderRadius: 0
    },
    '&:focus': {
      boxShadow: "".concat(theme.color.secondary, " 0 -3px 0 0 inset"),
      outline: '0 none'
    }
  };
}, function (_ref3) {
  var disabled = _ref3.disabled;
  return disabled && {
    cursor: 'not-allowed',
    opacity: 0.5
  };
});
ActionButton.displayName = 'ActionButton';
export var ActionBar = function ActionBar(_ref4) {
  var actionItems = _ref4.actionItems,
      props = _objectWithoutProperties(_ref4, ["actionItems"]);

  return /*#__PURE__*/React.createElement(Container, props, actionItems.map(function (_ref5, index) {
    var title = _ref5.title,
        className = _ref5.className,
        onClick = _ref5.onClick,
        disabled = _ref5.disabled;
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement(ActionButton, {
        key: index,
        className: className,
        onClick: onClick,
        disabled: disabled
      }, title)
    );
  }));
};
ActionBar.displayName = "ActionBar";