/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import { Configuration, RuleSetRule, WebpackPluginInstance } from 'webpack';
import { TransformOptions } from '@babel/core';
import { ConfigureWebpackFn, ConfigurePostCssFn } from '@docusaurus/types';
export declare function getStyleLoaders(isServer: boolean, cssOptions?: {
    [key: string]: unknown;
}): RuleSetRule[];
export declare function getCustomBabelConfigFilePath(siteDir: string): string | undefined;
export declare function getBabelOptions({ isServer, babelOptions, }?: {
    isServer?: boolean;
    babelOptions?: TransformOptions | string;
}): TransformOptions;
export declare const getCustomizableJSLoader: (jsLoader?: "babel" | ((isServer: boolean) => RuleSetRule)) => ({ isServer, babelOptions, }: {
    isServer: boolean;
    babelOptions?: string | TransformOptions | undefined;
}) => RuleSetRule;
/**
 * Helper function to modify webpack config
 * @param configureWebpack a webpack config or a function to modify config
 * @param config initial webpack config
 * @param isServer indicates if this is a server webpack configuration
 * @param jsLoader custom js loader config
 * @param content content loaded by the plugin
 * @returns final/ modified webpack config
 */
export declare function applyConfigureWebpack(configureWebpack: ConfigureWebpackFn, config: Configuration, isServer: boolean, jsLoader: 'babel' | ((isServer: boolean) => RuleSetRule) | undefined, content: unknown): Configuration;
export declare function applyConfigurePostCss(configurePostCss: NonNullable<ConfigurePostCssFn>, config: Configuration): Configuration;
export declare function compile(config: Configuration[]): Promise<void>;
export declare function getHttpsConfig(): boolean | {
    cert: Buffer;
    key: Buffer;
};
export declare function getMinimizer(useSimpleCssMinifier?: boolean): WebpackPluginInstance[];
