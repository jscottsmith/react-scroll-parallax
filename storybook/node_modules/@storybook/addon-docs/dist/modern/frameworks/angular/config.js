import { SourceType } from '../../shared';
import { extractArgTypes, extractComponentDescription } from './compodoc';
import { sourceDecorator } from './sourceDecorator';
import { prepareForInline } from './prepareForInline';
export const parameters = {
  docs: {
    // probably set this to true by default once it's battle-tested
    inlineStories: false,
    prepareForInline,
    extractArgTypes,
    extractComponentDescription,
    source: {
      type: SourceType.DYNAMIC,
      language: 'html'
    }
  }
};
export const decorators = [sourceDecorator];