"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.docuHash = exports.simpleHash = exports.md5Hash = void 0;
const crypto_1 = require("crypto");
const lodash_1 = require("lodash");
const pathUtils_1 = require("./pathUtils");
function md5Hash(str) {
    return (0, crypto_1.createHash)('md5').update(str).digest('hex');
}
exports.md5Hash = md5Hash;
function simpleHash(str, length) {
    return md5Hash(str).substr(0, length);
}
exports.simpleHash = simpleHash;
// Based on https://github.com/gatsbyjs/gatsby/pull/21518/files
/**
 * Given an input string, convert to kebab-case and append a hash.
 * Avoid str collision.
 * Also removes part of the string if its larger than the allowed
 * filename per OS. Avoids ERRNAMETOOLONG error.
 */
function docuHash(str) {
    if (str === '/') {
        return 'index';
    }
    const shortHash = simpleHash(str, 3);
    const parsedPath = `${(0, lodash_1.kebabCase)(str)}-${shortHash}`;
    if ((0, pathUtils_1.isNameTooLong)(parsedPath)) {
        return `${(0, pathUtils_1.shortName)((0, lodash_1.kebabCase)(str))}-${shortHash}`;
    }
    return parsedPath;
}
exports.docuHash = docuHash;
//# sourceMappingURL=hashUtils.js.map