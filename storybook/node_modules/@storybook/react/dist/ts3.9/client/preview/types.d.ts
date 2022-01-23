import { ReactElement } from 'react';
export type { RenderContext } from '@storybook/store';
export type { StoryContext } from '@storybook/csf';
export interface ShowErrorArgs {
    title: string;
    description: string;
}
export declare type StoryFnReactReturnType = ReactElement<unknown>;
export interface IStorybookStory {
    name: string;
    render: (context: any) => any;
}
export interface IStorybookSection {
    kind: string;
    stories: IStorybookStory[];
}
