import { FC } from 'react';
import { ArgsTableProps, SortType } from './ArgsTable';
export interface TabbedArgsTableProps {
    tabs: Record<string, ArgsTableProps>;
    sort?: SortType;
}
export declare const TabbedArgsTable: FC<TabbedArgsTableProps>;
