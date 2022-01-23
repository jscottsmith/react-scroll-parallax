import { extractArgTypes } from './extractArgTypes';
import { extractComponentDescription } from '../../lib/docgen';
import { prepareForInline } from './prepareForInline';
export var parameters = {
  docs: {
    inlineStories: true,
    prepareForInline: prepareForInline,
    extractArgTypes: extractArgTypes,
    extractComponentDescription: extractComponentDescription
  }
};