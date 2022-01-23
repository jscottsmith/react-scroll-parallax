import { State, API, Story, Group } from '@storybook/api';
import { FunctionComponent, ReactNode } from 'react';
export declare type ViewMode = State['viewMode'];
export interface PreviewProps {
    api: API;
    viewMode: ViewMode;
    refs: State['refs'];
    storyId: Story['id'];
    story: Group | Story;
    docsOnly: boolean;
    options: {
        isFullscreen: boolean;
        isToolshown: boolean;
    };
    id: string;
    path: string;
    location: State['location'];
    queryParams: State['customQueryParams'];
    customCanvas?: CustomCanvasRenderer;
    description: string;
    baseUrl: string;
    withLoader: boolean;
}
export interface WrapperProps {
    index: number;
    children: ReactNode;
    id: string;
    storyId: string;
    active: boolean;
}
export interface Wrapper {
    render: FunctionComponent<WrapperProps>;
}
export interface ApplyWrappersProps {
    wrappers: Wrapper[];
    viewMode: State['viewMode'];
    id: string;
    storyId: string;
    active: boolean;
}
export declare type CustomCanvasRenderer = (storyId: string, viewMode: State['viewMode'], id: string, baseUrl: string, scale: number, queryParams: Record<string, any>) => ReactNode;
export interface FramesRendererProps {
    story: Story | Group;
    storyId: string;
    refId: string;
    baseUrl: string;
    scale: number;
    viewMode: ViewMode;
    queryParams: State['customQueryParams'];
    refs: State['refs'];
}
