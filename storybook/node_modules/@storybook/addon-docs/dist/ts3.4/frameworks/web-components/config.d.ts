/// <reference types="react" />
import { sourceDecorator } from './sourceDecorator';
import { SourceType } from '../../shared';
export declare const decorators: (typeof sourceDecorator)[];
export declare const parameters: {
    docs: {
        extractArgTypes: (tagName: string) => {
            [x: string]: import("@storybook/api").ArgType;
        };
        extractComponentDescription: (tagName: string) => string;
        inlineStories: boolean;
        prepareForInline: (storyFn: import("@storybook/csf").PartialStoryFn<import("@storybook/web-components").WebComponentsFramework, import("@storybook/csf").Args>) => import("react").CElement<{}, import("react").Component<{}, {}, any>>;
        source: {
            type: SourceType;
            language: string;
        };
    };
};
