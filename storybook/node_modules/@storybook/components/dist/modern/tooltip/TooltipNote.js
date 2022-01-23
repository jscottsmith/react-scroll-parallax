function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { styled } from '@storybook/theming';
const Note = styled.div(({
  theme
}) => ({
  padding: '2px 6px',
  lineHeight: '16px',
  fontSize: 10,
  fontWeight: theme.typography.weight.bold,
  color: theme.color.lightest,
  boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.3)',
  borderRadius: 4,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  zIndex: -1,
  background: theme.base === 'light' ? 'rgba(60, 60, 60, 0.9)' : 'rgba(20, 20, 20, 0.85)',
  margin: 6
}));
export const TooltipNote = (_ref) => {
  let {
    note
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["note"]);

  return /*#__PURE__*/React.createElement(Note, props, note);
};
TooltipNote.displayName = "TooltipNote";