/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Joi from './Joi';
export declare const isValidationDisabledEscapeHatch: boolean;
export declare const logValidationBugReportHint: () => void;
export declare function printWarning(warning?: Joi.ValidationError): void;
export declare function normalizePluginOptions<T extends {
    id?: string;
}>(schema: Joi.ObjectSchema<T>, options: Partial<T>): T;
export declare function normalizeThemeConfig<T>(schema: Joi.ObjectSchema<T>, themeConfig: Partial<T>): T;
export declare function validateFrontMatter<T>(frontMatter: Record<string, unknown>, schema: Joi.ObjectSchema<T>): T;
//# sourceMappingURL=validationUtils.d.ts.map