"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGlobalDataVersion = exports.toGlobalDataDoc = void 0;
function toGlobalDataDoc(doc) {
    return {
        id: doc.unversionedId,
        path: doc.permalink,
        sidebar: doc.sidebar,
    };
}
exports.toGlobalDataDoc = toGlobalDataDoc;
function toGlobalDataVersion(version) {
    return {
        name: version.versionName,
        label: version.versionLabel,
        isLast: version.isLast,
        path: version.versionPath,
        mainDocId: version.mainDocId,
        docs: version.docs.map(toGlobalDataDoc),
    };
}
exports.toGlobalDataVersion = toGlobalDataVersion;
