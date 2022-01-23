import { FunctionComponent } from 'react';
import { StoriesHash, State } from '@storybook/api';
export interface SidebarProps {
    stories: StoriesHash;
    storiesConfigured: boolean;
    storiesFailed?: Error;
    refs: State['refs'];
    menu: any[];
    storyId?: string;
    refId?: string;
    menuHighlighted?: boolean;
    enableShortcuts?: boolean;
}
export declare const Sidebar: FunctionComponent<SidebarProps>;
