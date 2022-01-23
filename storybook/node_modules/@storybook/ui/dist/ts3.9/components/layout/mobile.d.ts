import { Component, ComponentType, FunctionComponent } from 'react';
import { State } from '@storybook/api';
export declare type ActiveTabsType = 'sidebar' | 'canvas' | 'addons';
export interface Page {
    key: string;
    route: FunctionComponent;
    render: FunctionComponent;
}
export interface MobileProps {
    options: {
        initialActive: ActiveTabsType;
        isToolshown: boolean;
    };
    Sidebar: ComponentType<any>;
    Preview: ComponentType<any>;
    Panel: ComponentType<any>;
    Notifications: ComponentType<any>;
    viewMode: State['viewMode'];
    pages: Page[];
    docsOnly: boolean;
}
export interface MobileState {
    active: ActiveTabsType;
}
declare class Mobile extends Component<MobileProps, MobileState> {
    constructor(props: MobileProps);
    render(): JSX.Element;
}
export { Mobile };
