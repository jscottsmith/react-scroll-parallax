/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import chalk from 'chalk';
declare type InterpolatableValue = string | number | (string | number)[];
declare function interpolate(msgs: TemplateStringsArray, ...values: InterpolatableValue[]): string;
declare function info(msg: unknown): void;
declare function info(msg: TemplateStringsArray, ...values: [InterpolatableValue, ...InterpolatableValue[]]): void;
declare function warn(msg: unknown): void;
declare function warn(msg: TemplateStringsArray, ...values: [InterpolatableValue, ...InterpolatableValue[]]): void;
declare function error(msg: unknown): void;
declare function error(msg: TemplateStringsArray, ...values: [InterpolatableValue, ...InterpolatableValue[]]): void;
declare function success(msg: unknown): void;
declare function success(msg: TemplateStringsArray, ...values: [InterpolatableValue, ...InterpolatableValue[]]): void;
declare const logger: {
    red: chalk.Chalk;
    yellow: chalk.Chalk;
    green: chalk.Chalk;
    bold: chalk.Chalk;
    dim: chalk.Chalk;
    path: (msg: unknown) => string;
    name: (msg: unknown) => string;
    code: (msg: unknown) => string;
    subdue: chalk.Chalk;
    num: chalk.Chalk;
    interpolate: typeof interpolate;
    info: typeof info;
    warn: typeof warn;
    error: typeof error;
    success: typeof success;
};
export default logger;
//# sourceMappingURL=index.d.ts.map