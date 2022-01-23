import { extractArgTypes } from './extractArgTypes';
import { extractComponentDescription } from '../../lib/docgen';
import { prepareForInline } from './prepareForInline';
import { sourceDecorator } from './sourceDecorator';
export var parameters = {
  docs: {
    inlineStories: true,
    prepareForInline: prepareForInline,
    extractArgTypes: extractArgTypes,
    extractComponentDescription: extractComponentDescription
  }
};
export var decorators = [sourceDecorator];