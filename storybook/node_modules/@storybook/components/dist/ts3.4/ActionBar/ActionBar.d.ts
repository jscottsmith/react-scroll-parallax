import React, { FunctionComponent, MouseEvent } from 'react';
export declare const ActionButton: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, {
    disabled: boolean;
}, import("@storybook/theming").Theme>;
export interface ActionItem {
    title: string | JSX.Element;
    className?: string;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
}
export interface ActionBarProps {
    actionItems: ActionItem[];
}
export declare const ActionBar: FunctionComponent<ActionBarProps>;
