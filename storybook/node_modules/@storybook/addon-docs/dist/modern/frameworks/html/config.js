import { sourceDecorator } from './sourceDecorator';
import { prepareForInline } from './prepareForInline';
import { SourceType } from '../../shared';
export const decorators = [sourceDecorator];
export const parameters = {
  docs: {
    inlineStories: true,
    prepareForInline,
    source: {
      type: SourceType.DYNAMIC,
      language: 'html'
    }
  }
};