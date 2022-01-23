import React, { FunctionComponent, ComponentProps } from 'react';
export interface ButtonProps {
    isLink?: boolean;
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    gray?: boolean;
    inForm?: boolean;
    disabled?: boolean;
    small?: boolean;
    outline?: boolean;
    containsIcon?: boolean;
    children?: React.ReactNode;
    href?: string;
}
declare const ButtonWrapper: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ButtonProps, import("@storybook/theming").Theme>;
export declare const Button: FunctionComponent<ComponentProps<typeof ButtonWrapper>>;
export {};
