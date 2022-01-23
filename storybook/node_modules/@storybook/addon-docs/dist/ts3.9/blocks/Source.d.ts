import { FC } from 'react';
import { SourceProps as PureSourceProps } from '@storybook/components';
import { DocsContextProps } from './DocsContext';
import { SourceContextProps } from './SourceContainer';
export declare enum SourceState {
    OPEN = "open",
    CLOSED = "closed",
    NONE = "none"
}
interface CommonProps {
    language?: string;
    dark?: boolean;
    code?: string;
}
declare type SingleSourceProps = {
    id: string;
} & CommonProps;
declare type MultiSourceProps = {
    ids: string[];
} & CommonProps;
declare type CodeProps = {
    code: string;
} & CommonProps;
declare type NoneProps = CommonProps;
declare type SourceProps = SingleSourceProps | MultiSourceProps | CodeProps | NoneProps;
declare type SourceStateProps = {
    state: SourceState;
};
export declare const getSourceProps: (props: SourceProps, docsContext: DocsContextProps<any>, sourceContext: SourceContextProps) => PureSourceProps & SourceStateProps;
/**
 * Story source doc block renders source code if provided,
 * or the source for a story if `storyId` is provided, or
 * the source for the current story if nothing is provided.
 */
export declare const Source: FC<SourceProps>;
export {};
