import { ComponentProps, FunctionComponent } from 'react';
import ReactSyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import { SyntaxHighlighterProps } from './syntaxhighlighter-types';
export declare function createCopyToClipboardFunction(): (text: string) => any;
export interface WrapperProps {
    bordered?: boolean;
    padded?: boolean;
}
export interface PreProps {
    padded?: boolean;
}
export interface SyntaxHighlighterState {
    copied: boolean;
}
declare type ReactSyntaxHighlighterProps = ComponentProps<typeof ReactSyntaxHighlighter>;
declare type Props = SyntaxHighlighterProps & ReactSyntaxHighlighterProps;
export declare const SyntaxHighlighter: FunctionComponent<Props>;
export default SyntaxHighlighter;
