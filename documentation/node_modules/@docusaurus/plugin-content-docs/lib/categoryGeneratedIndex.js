"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryGeneratedIndexMetadataList = void 0;
const utils_1 = require("./sidebars/utils");
const docs_1 = require("./docs");
function getCategoryGeneratedIndexMetadata({ category, sidebarsUtils, docsById, }) {
    var _a;
    const { sidebarName, previous, next } = sidebarsUtils.getCategoryGeneratedIndexNavigation(category.link.permalink);
    if (!sidebarName) {
        throw new Error('unexpected');
    }
    return {
        title: (_a = category.link.title) !== null && _a !== void 0 ? _a : category.label,
        description: category.link.description,
        slug: category.link.slug,
        permalink: category.link.permalink,
        sidebar: sidebarName,
        previous: (0, utils_1.toNavigationLink)(previous, docsById),
        next: (0, utils_1.toNavigationLink)(next, docsById),
    };
}
function getCategoryGeneratedIndexMetadataList({ docs, sidebarsUtils, }) {
    const docsById = (0, docs_1.createDocsByIdIndex)(docs);
    const categoryGeneratedIndexItems = sidebarsUtils.getCategoryGeneratedIndexList();
    return categoryGeneratedIndexItems.map((category) => getCategoryGeneratedIndexMetadata({
        category,
        sidebarsUtils,
        docsById,
    }));
}
exports.getCategoryGeneratedIndexMetadataList = getCategoryGeneratedIndexMetadataList;
