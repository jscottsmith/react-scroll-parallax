import React from 'react';
import { StoryContext, PartialStoryFn } from '@storybook/csf';
import { VueFramework } from '@storybook/vue3';
export declare const prepareForInline: (storyFn: PartialStoryFn<VueFramework>, { args }: StoryContext<VueFramework>) => React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
