import webpackReal from 'webpack';
import { Stats, Configuration } from '@types/webpack';
import { Builder, Options } from '@storybook/core-common';
declare type WebpackBuilder = Builder<Configuration, Stats>;
export declare const executor: {
    get: (options: Options) => Promise<typeof webpackReal>;
};
export declare const getConfig: WebpackBuilder['getConfig'];
export declare const makeStatsFromError: (err: string) => Stats;
export declare const start: WebpackBuilder['start'];
export declare const bail: WebpackBuilder['bail'];
export declare const build: WebpackBuilder['build'];
export declare const corePresets: string[];
export declare const overridePresets: string[];
export {};
