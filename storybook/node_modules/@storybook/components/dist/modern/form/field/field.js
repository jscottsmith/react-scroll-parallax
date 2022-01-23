function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
const Wrapper = styled.label(({
  theme
}) => ({
  display: 'flex',
  borderBottom: `1px solid ${theme.appBorderColor}`,
  margin: '0 15px',
  padding: '8px 0',
  '&:last-child': {
    marginBottom: '3rem'
  }
}));
const Label = styled.span(({
  theme
}) => ({
  minWidth: 100,
  fontWeight: theme.typography.weight.bold,
  marginRight: 15,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  lineHeight: '16px'
}));
export const Field = (_ref) => {
  let {
    label,
    children
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["label", "children"]);

  return /*#__PURE__*/React.createElement(Wrapper, props, label ? /*#__PURE__*/React.createElement(Label, null, /*#__PURE__*/React.createElement("span", null, label)) : null, children);
};
Field.displayName = "Field";
Field.defaultProps = {
  label: undefined
};