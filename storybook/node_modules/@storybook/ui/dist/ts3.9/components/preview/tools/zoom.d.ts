import React, { Component, MouseEventHandler } from 'react';
import { Addon } from '@storybook/addons';
declare class ZoomProvider extends Component<{
    shouldScale: boolean;
}, {
    value: number;
}> {
    state: {
        value: 1;
    };
    set: (value: number) => void;
    render(): JSX.Element;
}
declare const ZoomConsumer: React.Consumer<{
    value: 1;
    set: (v: number) => void;
}>;
declare const Zoom: React.NamedExoticComponent<{
    zoomIn: MouseEventHandler;
    zoomOut: MouseEventHandler;
    reset: MouseEventHandler;
}>;
export { Zoom, ZoomConsumer, ZoomProvider };
export declare const zoomTool: Addon;
