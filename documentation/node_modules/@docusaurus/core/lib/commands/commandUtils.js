"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCLIOptionPort = exports.getCLIOptionHost = void 0;
const tslib_1 = require("tslib");
const choosePort_1 = (0, tslib_1.__importDefault)(require("../choosePort"));
const utils_1 = require("@docusaurus/utils");
function getCLIOptionHost(hostOption) {
    return hostOption || 'localhost';
}
exports.getCLIOptionHost = getCLIOptionHost;
async function getCLIOptionPort(portOption, host) {
    const basePort = portOption ? parseInt(portOption, 10) : utils_1.DEFAULT_PORT;
    return (0, choosePort_1.default)(host, basePort);
}
exports.getCLIOptionPort = getCLIOptionPort;
