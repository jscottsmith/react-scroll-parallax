export default pluginCreator;
export type PostCssCalcOptions = {
    precision?: number | false;
    preserve?: boolean;
    warnWhenCannotResolve?: boolean;
    mediaQueries?: boolean;
    selectors?: boolean;
};
/**
 * @typedef {{precision?: number | false,
 *          preserve?: boolean,
 *          warnWhenCannotResolve?: boolean,
 *          mediaQueries?: boolean,
 *          selectors?: boolean}} PostCssCalcOptions
 *
 * @param {PostCssCalcOptions} opts
 */
declare function pluginCreator(opts: PostCssCalcOptions): {
    postcssPlugin: string;
    /**
     * @param {import('postcss').Root} css
     * @param {{result: import('postcss').Result}} helpers
     */
    OnceExit(css: import('postcss').Root, { result }: {
        result: import('postcss').Result;
    }): void;
};
declare namespace pluginCreator {
    const postcss: boolean;
}
