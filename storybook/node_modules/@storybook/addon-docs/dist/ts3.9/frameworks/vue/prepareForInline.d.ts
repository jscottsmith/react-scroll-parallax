import React from 'react';
import { StoryContext, PartialStoryFn } from '@storybook/csf';
import { VueFramework } from '@storybook/vue';
export declare const prepareForInline: (storyFn: PartialStoryFn<VueFramework>, { args }: StoryContext<VueFramework>) => React.DetailedReactHTMLElement<null, HTMLElement>;
