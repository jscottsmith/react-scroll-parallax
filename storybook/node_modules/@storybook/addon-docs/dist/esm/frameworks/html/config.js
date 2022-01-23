import { sourceDecorator } from './sourceDecorator';
import { prepareForInline } from './prepareForInline';
import { SourceType } from '../../shared';
export var decorators = [sourceDecorator];
export var parameters = {
  docs: {
    inlineStories: true,
    prepareForInline: prepareForInline,
    source: {
      type: SourceType.DYNAMIC,
      language: 'html'
    }
  }
};