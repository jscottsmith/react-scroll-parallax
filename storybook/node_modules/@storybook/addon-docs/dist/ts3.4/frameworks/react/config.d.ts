import { PartialStoryFn } from '@storybook/csf';
import { ReactFramework } from '@storybook/react';
import { extractComponentDescription } from '../../lib/docgen';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: PartialStoryFn<ReactFramework>) => import("@storybook/react/dist/ts3.9/client/preview/types").StoryFnReactReturnType;
        extractArgTypes: import("../../lib/docgen").ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
};
export declare const decorators: ((storyFn: PartialStoryFn<ReactFramework, import("@storybook/csf").Args>, context: import("@storybook/csf").StoryContext<ReactFramework, import("@storybook/csf").Args>) => import("@storybook/react/dist/ts3.9/client/preview/types").StoryFnReactReturnType)[];
