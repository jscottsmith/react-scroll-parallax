import { FunctionComponent, SyntheticEvent } from 'react';
import { LinkWrapperType, ListItemProps } from './ListItem';
export interface Link extends Omit<ListItemProps, 'onClick'> {
    id: string;
    isGatsby?: boolean;
    onClick?: (event: SyntheticEvent, item: ListItemProps) => void;
}
export interface TooltipLinkListProps {
    links: Link[];
    LinkWrapper?: LinkWrapperType;
}
export declare const TooltipLinkList: FunctionComponent<TooltipLinkListProps>;
