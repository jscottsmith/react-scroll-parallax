import React, { ReactElement } from 'react';
import { Options } from 'react-element-to-jsx-string';
import { StoryContext, PartialStoryFn } from '@storybook/csf';
import { ReactFramework } from '@storybook/react';
declare type JSXOptions = Options & {
    /** How many wrappers to skip when rendering the jsx */
    skip?: number;
    /** Whether to show the function in the jsx tab */
    showFunctions?: boolean;
    /** Whether to format HTML or Vue markup */
    enableBeautify?: boolean;
    /** Override the display name used for a component */
    displayName?: string | Options['displayName'];
    /** Deprecated: A function ran after the story is rendered */
    onBeforeRender?(dom: string): string;
    /** A function ran after a story is rendered (prefer this over `onBeforeRender`) */
    transformSource?(dom: string, context?: StoryContext<ReactFramework>): string;
};
/** Apply the users parameters and render the jsx for a story */
export declare const renderJsx: (code: React.ReactElement, options: JSXOptions) => string;
export declare const skipJsxRender: (context: StoryContext<ReactFramework>) => any;
export declare const jsxDecorator: (storyFn: PartialStoryFn<ReactFramework>, context: StoryContext<ReactFramework>) => import("@storybook/react/dist/ts3.9/client/preview/types").StoryFnReactReturnType;
export {};
