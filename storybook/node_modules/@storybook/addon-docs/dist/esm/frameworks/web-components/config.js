import { extractArgTypes, extractComponentDescription } from './custom-elements';
import { sourceDecorator } from './sourceDecorator';
import { prepareForInline } from './prepareForInline';
import { SourceType } from '../../shared';
export var decorators = [sourceDecorator];
export var parameters = {
  docs: {
    extractArgTypes: extractArgTypes,
    extractComponentDescription: extractComponentDescription,
    inlineStories: true,
    prepareForInline: prepareForInline,
    source: {
      type: SourceType.DYNAMIC,
      language: 'html'
    }
  }
};