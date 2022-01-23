import { SourceType } from '../../shared';
import { extractArgTypes, extractComponentDescription } from './compodoc';
import { sourceDecorator } from './sourceDecorator';
import { prepareForInline } from './prepareForInline';
export var parameters = {
  docs: {
    // probably set this to true by default once it's battle-tested
    inlineStories: false,
    prepareForInline: prepareForInline,
    extractArgTypes: extractArgTypes,
    extractComponentDescription: extractComponentDescription,
    source: {
      type: SourceType.DYNAMIC,
      language: 'html'
    }
  }
};
export var decorators = [sourceDecorator];