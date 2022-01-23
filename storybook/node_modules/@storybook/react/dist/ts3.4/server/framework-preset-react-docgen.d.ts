import { TransformOptions } from '@babel/core';
import { Configuration } from 'webpack';
import { Options } from '@storybook/core-common';
export declare function babel(config: TransformOptions, { presets }: Options): Promise<TransformOptions>;
export declare function webpackFinal(config: Configuration, { presets }: Options): Promise<Configuration>;
