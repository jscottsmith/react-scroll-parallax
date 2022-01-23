/// <reference types="react" />
import { SourceType } from '../../shared';
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        prepareForInline: (storyFn: import("@storybook/csf").PartialStoryFn<import("@storybook/angular").AngularFramework, import("@storybook/csf").Args>, { id, parameters, component }: import("@storybook/angular").StoryContext) => import("react").DetailedReactHTMLElement<import("react").HTMLAttributes<undefined>, undefined>;
        extractArgTypes: (component: import("./types").Directive) => import("@storybook/api").ArgTypes;
        extractComponentDescription: (component: import("./types").Directive) => string;
        source: {
            type: SourceType;
            language: string;
        };
    };
};
export declare const decorators: ((storyFn: import("@storybook/csf").PartialStoryFn<import("@storybook/angular").AngularFramework, import("@storybook/csf").Args>, context: import("@storybook/angular").StoryContext) => import("@storybook/angular").IStory)[];
