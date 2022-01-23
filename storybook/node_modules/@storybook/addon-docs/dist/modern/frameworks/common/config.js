import { enhanceArgTypes } from './enhanceArgTypes';
export const parameters = {
  docs: {
    inlineStories: false,
    getContainer: async () => (await import('../../blocks')).DocsContainer,
    getPage: async () => (await import('../../blocks')).DocsPage,
    iframeHeight: 100
  }
};
export const argTypesEnhancers = [enhanceArgTypes];