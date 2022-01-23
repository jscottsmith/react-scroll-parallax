import webpack, { Stats, Configuration } from 'webpack';
import { Builder, Options } from '@storybook/core-common';
declare type WebpackBuilder = Builder<Configuration, Stats>;
export declare const WEBPACK_VERSION = "4";
export declare const getConfig: WebpackBuilder['getConfig'];
export declare const makeStatsFromError: (err: string) => webpack.Stats;
export declare const executor: {
    get: (options: Options) => Promise<typeof webpack>;
};
export declare const start: WebpackBuilder['start'];
export declare const bail: WebpackBuilder['bail'];
export declare const build: WebpackBuilder['build'];
export declare const corePresets: WebpackBuilder['corePresets'];
export declare const overridePresets: WebpackBuilder['overridePresets'];
export {};
