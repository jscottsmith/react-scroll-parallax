import React, { FunctionComponent, ReactNode, ComponentProps } from 'react';
export interface TitleProps {
    active?: boolean;
    loading?: boolean;
    disabled?: boolean;
}
export interface RightProps {
    active?: boolean;
}
export interface CenterTextProps {
    active?: boolean;
    disabled?: boolean;
}
export interface LeftProps {
    active?: boolean;
}
export interface ItemProps {
    disabled?: boolean;
}
declare const Item: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, ItemProps, import("@storybook/theming").Theme>;
export declare type LinkWrapperType = FunctionComponent;
export interface ListItemProps extends Omit<ComponentProps<typeof Item>, 'href' | 'title'> {
    loading?: boolean;
    left?: ReactNode;
    title?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    href?: string;
    LinkWrapper?: LinkWrapperType;
}
declare const ListItem: FunctionComponent<ListItemProps>;
export default ListItem;
