"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlugger = void 0;
const tslib_1 = require("tslib");
const github_slugger_1 = (0, tslib_1.__importDefault)(require("github-slugger"));
function createSlugger() {
    const githubSlugger = new github_slugger_1.default();
    return {
        slug: (value, options) => githubSlugger.slug(value, options === null || options === void 0 ? void 0 : options.maintainCase),
    };
}
exports.createSlugger = createSlugger;
//# sourceMappingURL=slugger.js.map