import "core-js/modules/es.array.reduce.js";
import React, { Fragment } from 'react';
import { styled } from '@storybook/theming';
export const Separator = styled.span(({
  theme
}) => ({
  width: 1,
  height: 20,
  background: theme.appBorderColor,
  marginTop: 10,
  marginLeft: 6,
  marginRight: 2
}), ({
  force
}) => force ? {} : {
  '& + &': {
    display: 'none'
  }
});
Separator.displayName = 'Separator';
export const interleaveSeparators = list => list.reduce((acc, item, index) => item ? /*#__PURE__*/React.createElement(Fragment, {
  key: item.id || item.key || `f-${index}`
}, acc, index > 0 ? /*#__PURE__*/React.createElement(Separator, {
  key: `s-${index}`
}) : null, item.render() || item) : acc, null);