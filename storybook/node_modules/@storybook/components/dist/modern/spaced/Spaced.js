function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled, ignoreSsrWarning } from '@storybook/theming';

const toNumber = input => typeof input === 'number' ? input : Number(input);

const Container = styled.div(({
  theme,
  col,
  row = 1
}) => col ? {
  display: 'inline-block',
  verticalAlign: 'inherit',
  '& > *': {
    marginLeft: col * theme.layoutMargin,
    verticalAlign: 'inherit'
  },
  [`& > *:first-child${ignoreSsrWarning}`]: {
    marginLeft: 0
  }
} : {
  '& > *': {
    marginTop: row * theme.layoutMargin
  },
  [`& > *:first-child${ignoreSsrWarning}`]: {
    marginTop: 0
  }
}, ({
  theme,
  outer,
  col,
  row
}) => {
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
export const Spaced = (_ref) => {
  let {
    col,
    row,
    outer,
    children
  } = _ref,
      rest = _objectWithoutPropertiesLoose(_ref, ["col", "row", "outer", "children"]);

  const outerAmount = toNumber(typeof outer === 'number' || !outer ? outer : col || row);
  return /*#__PURE__*/React.createElement(Container, _extends({
    col: col,
    row: row,
    outer: outerAmount
  }, rest), children);
};
Spaced.displayName = "Spaced";