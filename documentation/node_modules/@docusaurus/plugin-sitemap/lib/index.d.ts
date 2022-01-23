/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Options } from '@docusaurus/plugin-sitemap';
import { LoadContext, OptionValidationContext, ValidationResult, Plugin } from '@docusaurus/types';
export default function pluginSitemap(_context: LoadContext, options: Options): Plugin<void>;
export declare function validateOptions({ validate, options, }: OptionValidationContext<Options>): ValidationResult<Options>;
