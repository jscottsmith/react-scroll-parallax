"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAbsoluteFilePathMatcher = exports.createMatcher = exports.GlobExcludeDefault = exports.Globby = void 0;
const tslib_1 = require("tslib");
// Globby/Micromatch are the 2 libs we use in Docusaurus consistently
var globby_1 = require("globby");
Object.defineProperty(exports, "Globby", { enumerable: true, get: function () { return (0, tslib_1.__importDefault)(globby_1).default; } });
const micromatch_1 = (0, tslib_1.__importDefault)(require("micromatch")); // Note: Micromatch is used by Globby
const path_1 = (0, tslib_1.__importDefault)(require("path"));
// The default patterns we ignore when globbing
// using _ prefix for exclusion by convention
exports.GlobExcludeDefault = [
    // Ignore files starting with _
    '**/_*.{js,jsx,ts,tsx,md,mdx}',
    // Ignore folders starting with _ (including folder content)
    '**/_*/**',
    // Ignore tests
    '**/*.test.{js,jsx,ts,tsx}',
    '**/__tests__/**',
];
function createMatcher(patterns) {
    const regexp = new RegExp(patterns.map((pattern) => micromatch_1.default.makeRe(pattern).source).join('|'));
    return (str) => regexp.test(str);
}
exports.createMatcher = createMatcher;
// We use match patterns like '**/_*/**',
// This function permits to help to:
// Match /user/sebastien/website/docs/_partials/xyz.md
// Ignore /user/_sebastien/website/docs/partials/xyz.md
function createAbsoluteFilePathMatcher(patterns, rootFolders) {
    const matcher = createMatcher(patterns);
    function getRelativeFilePath(absoluteFilePath) {
        const rootFolder = rootFolders.find((folderPath) => absoluteFilePath.startsWith(folderPath));
        if (!rootFolder) {
            throw new Error(`createAbsoluteFilePathMatcher unexpected error, absoluteFilePath=${absoluteFilePath} was not contained in any of the root folders ${JSON.stringify(rootFolders)}`);
        }
        return path_1.default.relative(rootFolder, absoluteFilePath);
    }
    return (absoluteFilePath) => matcher(getRelativeFilePath(absoluteFilePath));
}
exports.createAbsoluteFilePathMatcher = createAbsoluteFilePathMatcher;
//# sourceMappingURL=globUtils.js.map