import React, { ComponentType, FunctionComponent } from 'react';
import { State } from '@storybook/api';
export interface DesktopProps {
    width: number;
    panelCount: number;
    height: number;
    Sidebar: ComponentType<any>;
    Preview: ComponentType<any>;
    Panel: ComponentType<any>;
    Notifications: ComponentType<any>;
    pages: {
        key: string;
        route: FunctionComponent;
        render: ComponentType;
    }[];
    options: State['layout'];
    viewMode: string;
    docsOnly: boolean;
}
declare const Desktop: React.NamedExoticComponent<DesktopProps> & {
    displayName: string;
};
export { Desktop };
