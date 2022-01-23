/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LoadContext, Plugin, OptionValidationContext, ValidationResult } from '@docusaurus/types';
import { PluginOptions, LoadedContent, PagesContentPaths } from './types';
export declare function getContentPathList(contentPaths: PagesContentPaths): string[];
export default function pluginContentPages(context: LoadContext, options: PluginOptions): Plugin<LoadedContent | null>;
export declare function validateOptions({ validate, options, }: OptionValidationContext<PluginOptions>): ValidationResult<PluginOptions>;
