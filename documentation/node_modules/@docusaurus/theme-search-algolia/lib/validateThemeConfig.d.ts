/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Joi } from '@docusaurus/utils-validation';
import type { ThemeConfig, Validate, ValidationResult } from '@docusaurus/types';
export declare const Schema: Joi.ObjectSchema<any>;
export declare function validateThemeConfig({ validate, themeConfig, }: {
    validate: Validate<ThemeConfig>;
    themeConfig: ThemeConfig;
}): ValidationResult<ThemeConfig>;
