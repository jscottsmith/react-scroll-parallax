"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const DebugLayout_1 = (0, tslib_1.__importDefault)(require("@theme/DebugLayout"));
const DebugJsonView_1 = (0, tslib_1.__importDefault)(require("@theme/DebugJsonView"));
const useGlobalData_1 = (0, tslib_1.__importDefault)(require("@docusaurus/useGlobalData"));
function DebugMetadata() {
    const globalData = (0, useGlobalData_1.default)();
    return (react_1.default.createElement(DebugLayout_1.default, null,
        react_1.default.createElement("h2", null, "Global data"),
        react_1.default.createElement(DebugJsonView_1.default, { src: globalData, collapseDepth: 3 })));
}
exports.default = DebugMetadata;
