import type { TransformOptions } from '@babel/core';
import type { Configuration } from 'webpack';
import type { Options } from '@storybook/core-common';
export declare function babel(config: TransformOptions, { presets }: Options): Promise<TransformOptions>;
export declare function webpackFinal(config: Configuration, { presets }: Options): Promise<Configuration>;
