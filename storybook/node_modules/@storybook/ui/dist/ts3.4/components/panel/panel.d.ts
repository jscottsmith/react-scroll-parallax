import React, { ReactElement } from 'react';
import { State } from '@storybook/api';
export interface SafeTabProps {
    title: (() => string) | string;
    id: string;
    children: ReactElement;
}
declare const AddonPanel: React.NamedExoticComponent<{
    selectedPanel?: string;
    actions: {
        onSelect: (id: string) => void;
    } & Record<string, any>;
    panels: Record<string, any>;
    shortcuts: State['shortcuts'];
    panelPosition?: 'bottom' | 'right';
    absolute?: boolean;
}>;
export default AddonPanel;
