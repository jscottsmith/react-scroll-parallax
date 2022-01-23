import React, { FunctionComponent } from 'react';
import { API, Story, Group, State } from '@storybook/api';
import { Addon } from '@storybook/addons';
import { RenderData } from '@storybook/router';
import { PreviewProps } from './utils/types';
export declare const getTools: (getFn: API['getElements']) => Addon[];
export declare const getToolsExtra: (getFn: API['getElements']) => Addon[];
export declare const Toolbar: import("@emotion/styled-base").StyledComponent<React.PropsWithChildren<{
    shown: boolean;
} & Record<string, any>>, Pick<React.PropsWithChildren<{
    shown: boolean;
} & Record<string, any>>, string>, import("@storybook/theming").Theme>;
export declare const fullScreenTool: Addon;
export declare const createTabsTool: (tabs: Addon[]) => Addon;
export declare const defaultTools: Addon[];
export declare const defaultToolsExtra: Addon[];
export interface ToolData {
    isShown: boolean;
    tabs: Addon[];
    api: API;
    story: Story | Group;
}
export declare const ToolRes: FunctionComponent<ToolData & RenderData>;
export declare const ToolbarComp: React.NamedExoticComponent<ToolData>;
export declare const Tools: React.NamedExoticComponent<{
    list: Addon[];
}>;
export declare function filterTools(tools: Addon[], toolsExtra: Addon[], tabs: Addon[], { viewMode, story, location, path, }: {
    viewMode: State['viewMode'];
    story: PreviewProps['story'];
    location: State['location'];
    path: State['path'];
}): {
    left: Addon[];
    right: Addon[];
};
