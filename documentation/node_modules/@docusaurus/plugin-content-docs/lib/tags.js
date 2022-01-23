"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersionTags = void 0;
const utils_1 = require("@docusaurus/utils");
const lodash_1 = require("lodash");
function getVersionTags(docs) {
    const groups = (0, utils_1.groupTaggedItems)(docs, (doc) => doc.tags);
    return (0, lodash_1.mapValues)(groups, (group) => ({
        name: group.tag.label,
        docIds: group.items.map((item) => item.id),
        permalink: group.tag.permalink,
    }));
}
exports.getVersionTags = getVersionTags;
