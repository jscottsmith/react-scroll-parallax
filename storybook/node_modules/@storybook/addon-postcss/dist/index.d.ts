import type { Configuration, RuleSetRule } from 'webpack';
import postcss from 'postcss';
declare type StyleLoaderOptions = Record<string, unknown>;
declare type CssLoaderOptions = Record<string, unknown> & {
    importLoaders?: number;
};
declare type PostcssLoaderOptions = Record<string, unknown> & {
    implementation?: typeof postcss;
};
interface Options {
    styleLoaderOptions?: StyleLoaderOptions | false;
    cssLoaderOptions?: CssLoaderOptions | false;
    postcssLoaderOptions?: PostcssLoaderOptions | false;
    rule?: RuleSetRule;
}
export declare const webpack: (webpackConfig?: Configuration, options?: Options) => Configuration;
export {};
