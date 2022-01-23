import { extractArgTypes } from './extractArgTypes';
import { extractComponentDescription } from '../../lib/docgen';
import { jsxDecorator } from './jsxDecorator';
export var parameters = {
  docs: {
    inlineStories: true,
    // NOTE: that the result is a react element. Hooks support is provided by the outer code.
    prepareForInline: function prepareForInline(storyFn) {
      return storyFn();
    },
    extractArgTypes: extractArgTypes,
    extractComponentDescription: extractComponentDescription
  }
};
export var decorators = [jsxDecorator];