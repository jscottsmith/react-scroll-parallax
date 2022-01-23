/**
 * markdown-to-jsx@6 is a fork of [simple-markdown v0.2.2](https://github.com/Khan/simple-markdown)
 * from Khan Academy. Thank you Khan devs for making such an awesome and extensible
 * parsing infra... without it, half of the optimizations here wouldn't be feasible. 🙏🏼
 */
import React from 'react';
export declare namespace MarkdownToJSX {
    /**
     * RequireAtLeastOne<{ ... }> <- only requires at least one key
     */
    type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];
    export type CreateElement = typeof React.createElement;
    export type HTMLTags = keyof JSX.IntrinsicElements;
    export type State = {
        _inAnchor?: boolean;
        _inline?: boolean;
        _inTable?: boolean;
        _key?: React.Key;
        _list?: boolean;
        _simple?: boolean;
    };
    export type ParserResult = {
        [key: string]: any;
        type?: string;
    };
    export type NestedParser = (input: string, state?: MarkdownToJSX.State) => MarkdownToJSX.ParserResult;
    export type Parser<ParserOutput> = (capture: RegExpMatchArray, nestedParse: NestedParser, state?: MarkdownToJSX.State) => ParserOutput;
    export type RuleOutput = (ast: MarkdownToJSX.ParserResult, state: MarkdownToJSX.State) => JSX.Element;
    export type Rule<ParserOutput = MarkdownToJSX.ParserResult> = {
        _match: (source: string, state: MarkdownToJSX.State, prevCapturedString?: string) => RegExpMatchArray;
        _order: Priority;
        _parse: MarkdownToJSX.Parser<ParserOutput>;
        _react?: (node: ParserOutput, output: RuleOutput, state?: MarkdownToJSX.State) => React.ReactChild;
    };
    export type Rules = {
        [key: string]: Rule;
    };
    export type Override = RequireAtLeastOne<{
        component: React.ElementType;
        props: Object;
    }> | React.ElementType;
    export type Overrides = {
        [tag in HTMLTags]?: Override;
    } & {
        [customComponent: string]: Override;
    };
    export type Options = Partial<{
        /**
         * Ultimate control over the output of all rendered JSX.
         */
        createElement: (tag: Parameters<CreateElement>[0], props: React.Props<any>, ...children: React.ReactChild[]) => JSX.Element;
        /**
         * Disable the compiler's best-effort transcription of provided raw HTML
         * into JSX-equivalent. This is the functionality that prevents the need to
         * use `dangerouslySetInnerHTML` in React.
         */
        disableParsingRawHTML: boolean;
        /**
         * Forces the compiler to always output content with a block-level wrapper
         * (`<p>` or any block-level syntax your markdown already contains.)
         */
        forceBlock: boolean;
        /**
         * Forces the compiler to always output content with an inline wrapper (`<span>`)
         */
        forceInline: boolean;
        /**
         * Supply additional HTML entity: unicode replacement mappings.
         *
         * Pass only the inner part of the entity as the key,
         * e.g. `&le;` -> `{ "le": "\u2264" }`
         *
         * By default
         * the following entites are replaced with their unicode equivalents:
         *
         * ```
         * &amp;
         * &apos;
         * &gt;
         * &lt;
         * &nbsp;
         * &quot;
         * ```
         */
        namedCodesToUnicode: {
            [key: string]: string;
        };
        /**
         * Selectively control the output of particular HTML tags as they would be
         * emitted by the compiler.
         */
        overrides: Overrides;
        /**
         * Declare the type of the wrapper to be used when there are multiple
         * children to render. Set to `null` to get an array of children back
         * without any wrapper, or use `React.Fragment` to get a React element
         * that won't show up in the DOM.
         */
        wrapper: React.ElementType | null;
        /**
         * Forces the compiler to wrap results, even if there is only a single
         * child or no children.
         */
        forceWrapper: boolean;
        /**
         * Override normalization of non-URI-safe characters for use in generating
         * HTML IDs for anchor linking purposes.
         */
        slugify: (source: string) => string;
    }>;
    export {};
}
declare enum Priority {
    /**
     * anything that must scan the tree before everything else
     */
    MAX = 0,
    /**
     * scans for block-level constructs
     */
    HIGH = 1,
    /**
     * inline w/ more priority than other inline
     */
    MED = 2,
    /**
     * inline elements
     */
    LOW = 3,
    /**
     * bare text and stuff that is considered leftovers
     */
    MIN = 4
}
export declare function compiler(markdown: string, options?: MarkdownToJSX.Options): JSX.Element;
/**
 * A simple HOC for easy React use. Feed the markdown content as a direct child
 * and the rest is taken care of automatically.
 */
declare const Markdown: React.FC<{
    [key: string]: any;
    children: string;
    options?: MarkdownToJSX.Options;
}>;
export default Markdown;
