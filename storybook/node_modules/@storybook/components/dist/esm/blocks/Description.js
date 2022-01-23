import React from 'react';
import Markdown from 'markdown-to-jsx';
import { ResetWrapper } from '../typography/DocumentFormatting';
import { components } from '..';

/**
 * A markdown description for a component, typically used to show the
 * components docgen docs.
 */
export var Description = function Description(_ref) {
  var markdown = _ref.markdown;
  return /*#__PURE__*/React.createElement(ResetWrapper, null, /*#__PURE__*/React.createElement(Markdown, {
    options: {
      forceBlock: true,
      overrides: components
    }
  }, markdown));
};
Description.displayName = "Description";