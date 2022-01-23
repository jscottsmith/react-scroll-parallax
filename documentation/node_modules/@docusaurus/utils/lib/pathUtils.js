"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortName = exports.isNameTooLong = void 0;
// Based on https://github.com/gatsbyjs/gatsby/pull/21518/files
// MacOS (APFS) and Windows (NTFS) filename length limit = 255 chars, Others = 255 bytes
const MAX_PATH_SEGMENT_CHARS = 255;
const MAX_PATH_SEGMENT_BYTES = 255;
// Space for appending things to the string like file extensions and so on
const SPACE_FOR_APPENDING = 10;
const isMacOs = process.platform === `darwin`;
const isWindows = process.platform === `win32`;
const isNameTooLong = (str) => isMacOs || isWindows
    ? str.length + SPACE_FOR_APPENDING > MAX_PATH_SEGMENT_CHARS // MacOS (APFS) and Windows (NTFS) filename length limit (255 chars)
    : Buffer.from(str).length + SPACE_FOR_APPENDING > MAX_PATH_SEGMENT_BYTES; // Other (255 bytes)
exports.isNameTooLong = isNameTooLong;
const shortName = (str) => {
    if (isMacOs || isWindows) {
        const overflowingChars = str.length - MAX_PATH_SEGMENT_CHARS;
        return str.slice(0, str.length - overflowingChars - SPACE_FOR_APPENDING - 1);
    }
    const strBuffer = Buffer.from(str);
    const overflowingBytes = Buffer.byteLength(strBuffer) - MAX_PATH_SEGMENT_BYTES;
    return strBuffer
        .slice(0, Buffer.byteLength(strBuffer) - overflowingBytes - SPACE_FOR_APPENDING - 1)
        .toString();
};
exports.shortName = shortName;
//# sourceMappingURL=pathUtils.js.map