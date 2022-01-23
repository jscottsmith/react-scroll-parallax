/// <reference types="react" />
import { extractComponentDescription } from '../../lib/docgen';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: import("@storybook/csf").PartialStoryFn<import("@storybook/vue3").VueFramework, import("@storybook/csf").Args>, { args }: import("@storybook/csf").StoryContext<import("@storybook/vue3").VueFramework, import("@storybook/csf").Args>) => import("react").DetailedReactHTMLElement<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
        extractArgTypes: import("../../lib/docgen").ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
};
