/// <reference types="react" />
import { extractComponentDescription } from '../../lib/docgen';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: import("@storybook/csf").PartialStoryFn<import("@storybook/vue").VueFramework, import("@storybook/csf").Args>, { args }: import("@storybook/csf").StoryContext<import("@storybook/vue").VueFramework, import("@storybook/csf").Args>) => import("react").DetailedReactHTMLElement<null, HTMLElement>;
        extractArgTypes: import("../../lib/docgen").ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
};
export declare const decorators: ((storyFn: any, context: import("@storybook/csf").StoryContext<import("@storybook/vue").VueFramework, import("@storybook/csf").Args>) => any)[];
