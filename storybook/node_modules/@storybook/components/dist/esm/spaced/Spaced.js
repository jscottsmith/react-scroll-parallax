function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import "core-js/modules/es.number.constructor.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.object.assign.js";
import React from 'react';
import { styled, ignoreSsrWarning } from '@storybook/theming';

var toNumber = function toNumber(input) {
  return typeof input === 'number' ? input : Number(input);
};

var Container = styled.div(function (_ref) {
  var theme = _ref.theme,
      col = _ref.col,
      _ref$row = _ref.row,
      row = _ref$row === void 0 ? 1 : _ref$row;
  return col ? _defineProperty({
    display: 'inline-block',
    verticalAlign: 'inherit',
    '& > *': {
      marginLeft: col * theme.layoutMargin,
      verticalAlign: 'inherit'
    }
  }, "& > *:first-child".concat(ignoreSsrWarning), {
    marginLeft: 0
  }) : _defineProperty({
    '& > *': {
      marginTop: row * theme.layoutMargin
    }
  }, "& > *:first-child".concat(ignoreSsrWarning), {
    marginTop: 0
  });
}, function (_ref4) {
  var theme = _ref4.theme,
      outer = _ref4.outer,
      col = _ref4.col,
      row = _ref4.row;

  switch (true) {
    case !!(outer && col):
      {
        return {
          marginLeft: outer * theme.layoutMargin,
          marginRight: outer * theme.layoutMargin
        };
      }

    case !!(outer && row):
      {
        return {
          marginTop: outer * theme.layoutMargin,
          marginBottom: outer * theme.layoutMargin
        };
      }

    default:
      {
        return {};
      }
  }
});
export var Spaced = function Spaced(_ref5) {
  var col = _ref5.col,
      row = _ref5.row,
      outer = _ref5.outer,
      children = _ref5.children,
      rest = _objectWithoutProperties(_ref5, ["col", "row", "outer", "children"]);

  var outerAmount = toNumber(typeof outer === 'number' || !outer ? outer : col || row);
  return /*#__PURE__*/React.createElement(Container, _extends({
    col: col,
    row: row,
    outer: outerAmount
  }, rest), children);
};
Spaced.displayName = "Spaced";