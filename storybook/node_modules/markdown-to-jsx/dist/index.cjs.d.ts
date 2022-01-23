/// <reference types="react" />
import { compiler } from './';
declare const _default: import("react").FC<{
    [key: string]: any;
    children: string;
    options?: Partial<{
        createElement: (tag: string | import("react").FunctionComponent<{}> | import("react").ComponentClass<{}, any>, props: import("react").Props<any>, ...children: import("react").ReactChild[]) => JSX.Element;
        disableParsingRawHTML: boolean;
        forceBlock: boolean;
        forceInline: boolean;
        namedCodesToUnicode: {
            [key: string]: string;
        };
        overrides: import("./").MarkdownToJSX.Overrides;
        wrapper: import("react").ElementType<any>;
        forceWrapper: boolean;
        slugify: (source: string) => string;
    }>;
}> & {
    compiler: typeof compiler;
};
export default _default;
