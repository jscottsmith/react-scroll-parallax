"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
const path = (msg) => chalk_1.default.cyan(chalk_1.default.underline(msg));
const name = (msg) => chalk_1.default.blue(chalk_1.default.bold(msg));
const code = (msg) => chalk_1.default.cyan(`\`${msg}\``);
const subdue = chalk_1.default.gray;
const num = chalk_1.default.yellow;
function interpolate(msgs, ...values) {
    let res = '';
    values.forEach((value, idx) => {
        const flag = msgs[idx].match(/[a-z]+=$/);
        res += msgs[idx].replace(/[a-z]+=$/, '');
        const format = (function () {
            if (!flag) {
                return (a) => a;
            }
            switch (flag[0]) {
                case 'path=':
                    return path;
                case 'number=':
                    return num;
                case 'name=':
                    return name;
                case 'subdue=':
                    return subdue;
                case 'code=':
                    return code;
                default:
                    throw new Error('Bad Docusaurus logging message. This is likely an internal bug, please report it.');
            }
        })();
        res += Array.isArray(value)
            ? `\n- ${value.map((v) => format(v)).join('\n- ')}`
            : format(value);
    });
    res += msgs.slice(-1)[0];
    return res;
}
function info(msg, ...values) {
    console.info(`${chalk_1.default.cyan(chalk_1.default.bold('[INFO]'))} ${values.length === 0
        ? msg
        : interpolate(msg, ...values)}`);
}
function warn(msg, ...values) {
    console.warn(chalk_1.default.yellow(`${chalk_1.default.bold('[WARNING]')} ${values.length === 0
        ? msg
        : interpolate(msg, ...values)}`));
}
function error(msg, ...values) {
    console.error(chalk_1.default.red(`${chalk_1.default.bold('[ERROR]')} ${values.length === 0
        ? msg
        : interpolate(msg, ...values)}`));
}
function success(msg, ...values) {
    console.log(`${chalk_1.default.green(chalk_1.default.bold('[SUCCESS]'))} ${values.length === 0
        ? msg
        : interpolate(msg, ...values)}`);
}
const logger = {
    red: chalk_1.default.red,
    yellow: chalk_1.default.yellow,
    green: chalk_1.default.green,
    bold: chalk_1.default.bold,
    dim: chalk_1.default.dim,
    path,
    name,
    code,
    subdue,
    num,
    interpolate,
    info,
    warn,
    error,
    success,
};
exports.default = logger;
//# sourceMappingURL=index.js.map