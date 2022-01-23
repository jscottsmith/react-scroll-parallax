/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PluginOptions, BlogContent } from './types';
import { LoadContext, Plugin, OptionValidationContext, ValidationResult } from '@docusaurus/types';
export default function pluginContentBlog(context: LoadContext, options: PluginOptions): Plugin<BlogContent>;
export declare function validateOptions({ validate, options, }: OptionValidationContext<PluginOptions>): ValidationResult<PluginOptions>;
