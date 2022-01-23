import React from 'react';
import sizeMe from 'react-sizeme';
import { State } from '@storybook/api';
export interface AppProps {
    viewMode: State['viewMode'];
    docsOnly: boolean;
    layout: State['layout'];
    panelCount: number;
    size: {
        width: number;
        height: number;
    };
}
declare const SizedApp: React.ComponentType<Pick<AppProps, "viewMode" | "docsOnly" | "panelCount" | "layout"> & sizeMe.WithSizeProps>;
export default SizedApp;
