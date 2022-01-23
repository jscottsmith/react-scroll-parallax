import { transparentize } from 'polished';
import React from 'react';
import { Global } from '@storybook/theming';
export const HighlightStyles = ({
  refId,
  itemId
}) => /*#__PURE__*/React.createElement(Global, {
  styles: ({
    color
  }) => {
    const background = transparentize(0.85, color.secondary);
    return {
      [`[data-ref-id="${refId}"][data-item-id="${itemId}"]:not([data-selected="true"])`]: {
        [`&[data-nodetype="component"], &[data-nodetype="group"]`]: {
          background,
          '&:hover, &:focus': {
            background
          }
        },
        [`&[data-nodetype="story"], &[data-nodetype="document"]`]: {
          color: color.defaultText,
          background,
          '&:hover, &:focus': {
            background
          }
        }
      }
    };
  }
});
HighlightStyles.displayName = "HighlightStyles";