/// <reference types="react" />
import { extractComponentDescription } from './extractComponentDescription';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: import("@storybook/csf").StoryFn<import("@storybook/csf").AnyFramework, import("@storybook/csf").Args>) => import("react").DetailedReactHTMLElement<import("react").HTMLAttributes<any>, any>;
        extractArgTypes: import("../../lib/docgen").ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
};
export declare const decorators: ((storyFn: any, context: import("@storybook/csf").StoryContext<import("@storybook/csf").AnyFramework, import("@storybook/csf").Args>) => any)[];
