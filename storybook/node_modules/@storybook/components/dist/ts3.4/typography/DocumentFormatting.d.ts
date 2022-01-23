import React from 'react';
export declare const H1: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
export declare const H2: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
export declare const H3: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
export declare const H4: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
export declare const H5: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
export declare const H6: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
export declare const Pre: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>, {}, import("@storybook/theming").Theme>;
export declare const A: import("@emotion/styled-base").StyledComponent<any, {}, import("@storybook/theming").Theme>;
export declare const HR: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>, {}, import("@storybook/theming").Theme>;
export declare const DL: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement>, {}, import("@storybook/theming").Theme>;
export declare const Blockquote: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>, {}, import("@storybook/theming").Theme>;
export declare const Table: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, {}, import("@storybook/theming").Theme>;
export declare const Img: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, {}, import("@storybook/theming").Theme>;
export declare const Div: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}, import("@storybook/theming").Theme>;
export declare const Span: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}, import("@storybook/theming").Theme>;
export declare const LI: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, {}, import("@storybook/theming").Theme>;
export declare const UL: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, {}, import("@storybook/theming").Theme>;
export declare const OL: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, {}, import("@storybook/theming").Theme>;
export declare const P: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, {}, import("@storybook/theming").Theme>;
declare const DefaultCodeBlock: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, {}, import("@storybook/theming").Theme>;
export declare const Code: ({ className, children, ...props }: React.ComponentProps<typeof DefaultCodeBlock>) => JSX.Element;
export declare const TT: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>, {}, import("@storybook/theming").Theme>;
/**
 * This is a "local" reset to style subtrees with Storybook styles
 *
 * We can't style individual elements (e.g. h1, h2, etc.) in here
 * because the CSS specificity is too high, so those styles can too
 * easily override child elements that are not expecting it.
 */
export declare const ResetWrapper: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}, import("@storybook/theming").Theme>;
export declare const components: {
    h1: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
    h2: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
    h3: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
    h4: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
    h5: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
    h6: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, {}, import("@storybook/theming").Theme>;
    pre: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>, {}, import("@storybook/theming").Theme>;
    a: import("@emotion/styled-base").StyledComponent<any, {}, import("@storybook/theming").Theme>;
    hr: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>, {}, import("@storybook/theming").Theme>;
    dl: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDListElement>, HTMLDListElement>, {}, import("@storybook/theming").Theme>;
    blockquote: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>, {}, import("@storybook/theming").Theme>;
    table: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, {}, import("@storybook/theming").Theme>;
    img: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, {}, import("@storybook/theming").Theme>;
    div: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}, import("@storybook/theming").Theme>;
    span: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}, import("@storybook/theming").Theme>;
    li: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, {}, import("@storybook/theming").Theme>;
    ul: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, {}, import("@storybook/theming").Theme>;
    ol: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>, {}, import("@storybook/theming").Theme>;
    p: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, {}, import("@storybook/theming").Theme>;
    code: ({ className, children, ...props }: React.ComponentProps<typeof DefaultCodeBlock>) => JSX.Element;
    tt: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>, {}, import("@storybook/theming").Theme>;
    resetwrapper: import("@emotion/styled-base").StyledComponent<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}, import("@storybook/theming").Theme>;
};
export {};
