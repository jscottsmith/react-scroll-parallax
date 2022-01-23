import React, { Component, FunctionComponent, CSSProperties, ReactNode } from 'react';
import { Theme } from '@storybook/theming';
import { State } from '@storybook/api';
import { DraggableData, DraggableEvent } from './draggers';
export declare const Sidebar: FunctionComponent<{
    hidden: boolean;
    position: CSSProperties;
}>;
export declare const Main: FunctionComponent<{
    isFullscreen: boolean;
    position: CSSProperties;
}>;
export declare const Preview: FunctionComponent<{
    hidden: boolean;
    position: CSSProperties;
}>;
export declare const Panel: FunctionComponent<{
    hidden: boolean;
    position: CSSProperties;
    align: 'bottom' | 'right';
}>;
export declare type PanelPosition = 'right' | 'bottom';
export interface Bounds {
    top: number;
    width: number;
    left: number;
    height: number;
}
export interface Coordinates {
    x: number;
    y: number;
}
export interface BasePanelRenderProps {
    viewMode?: State['viewMode'];
    animate: boolean;
    isFullscreen?: boolean;
    position: Bounds;
}
export interface LayoutRenderProps {
    mainProps: BasePanelRenderProps;
    previewProps: BasePanelRenderProps & {
        docsOnly: boolean;
        isToolshown: boolean;
    };
    navProps: BasePanelRenderProps & {
        hidden: boolean;
    };
    panelProps: BasePanelRenderProps & {
        align: PanelPosition;
        hidden: boolean;
    };
}
export interface LayoutState {
    isDragging: 'nav' | 'panel' | false;
    resizerNav: Coordinates;
    resizerPanel: Coordinates;
}
export interface LayoutProps {
    children: (data: LayoutRenderProps) => ReactNode;
    panelCount: number;
    bounds: {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    options: {
        isFullscreen: boolean;
        showNav: boolean;
        showPanel: boolean;
        panelPosition: 'bottom' | 'right';
        isToolshown: boolean;
    };
    viewMode: State['viewMode'];
    docsOnly: boolean;
    theme: Theme;
}
declare class Layout extends Component<LayoutProps, LayoutState> {
    static defaultProps: Partial<LayoutProps>;
    constructor(props: LayoutProps);
    static getDerivedStateFromProps(props: LayoutProps, state: LayoutState): LayoutState;
    componentDidUpdate(prevProps: LayoutProps, prevState: LayoutState): void;
    resizeNav: (e: DraggableEvent, data: DraggableData) => void;
    resizePanel: (e: DraggableEvent, data: DraggableData) => void;
    setDragNav: () => void;
    setDragPanel: () => void;
    unsetDrag: () => void;
    render(): JSX.Element;
}
declare const ThemedLayout: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<Pick<LayoutProps & React.RefAttributes<Layout>, "ref" | "key"> & Partial<Pick<LayoutProps & React.RefAttributes<Layout>, "children" | "theme" | "viewMode" | "options" | "docsOnly" | "bounds" | "panelCount">> & Partial<Pick<Partial<LayoutProps>, never>>, "theme">>;
export { ThemedLayout as Layout };
