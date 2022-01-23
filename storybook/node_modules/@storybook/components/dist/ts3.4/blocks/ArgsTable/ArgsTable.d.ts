import React, { FC } from 'react';
import { ArgTypes, Args } from './types';
export declare const TableWrapper: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, {
    compact?: boolean;
    inAddonPanel?: boolean;
    isLoading?: boolean;
}, import("@storybook/theming").Theme>;
export declare enum ArgsTableError {
    NO_COMPONENT = "No component found.",
    ARGS_UNSUPPORTED = "Args unsupported. See Args documentation for your framework."
}
export declare type SortType = 'alpha' | 'requiredFirst' | 'none';
export interface ArgsTableOptionProps {
    updateArgs?: (args: Args) => void;
    resetArgs?: (argNames?: string[]) => void;
    compact?: boolean;
    inAddonPanel?: boolean;
    initialExpandedArgs?: boolean;
    isLoading?: boolean;
    sort?: SortType;
}
export interface ArgsTableDataProps {
    rows: ArgTypes;
    args?: Args;
}
export interface ArgsTableErrorProps {
    error: ArgsTableError;
}
export interface ArgsTableLoadingProps {
    isLoading: true;
}
export declare const argsTableLoadingData: ArgsTableDataProps;
export declare type ArgsTableProps = ArgsTableOptionProps & (ArgsTableDataProps | ArgsTableErrorProps | ArgsTableLoadingProps);
/**
 * Display the props for a component as a props table. Each row is a collection of
 * ArgDefs, usually derived from docgen info for the component.
 */
export declare const ArgsTable: FC<ArgsTableProps>;
