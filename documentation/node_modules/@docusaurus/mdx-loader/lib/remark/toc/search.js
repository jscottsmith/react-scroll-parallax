"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mdast_util_to_string_1 = (0, tslib_1.__importDefault)(require("mdast-util-to-string"));
const unist_util_visit_1 = (0, tslib_1.__importDefault)(require("unist-util-visit"));
const utils_1 = require("../utils");
/**
 *
 * Generate a TOC AST from the raw Markdown contents
 */
function search(node) {
    const headings = [];
    const visitor = (child, _index, parent) => {
        const value = (0, mdast_util_to_string_1.default)(child);
        // depth:1 headings are titles and not included in the TOC
        if (parent !== node || !value || child.depth < 2) {
            return;
        }
        headings.push({
            node: {
                value: (0, utils_1.toValue)(child),
                id: child.data.id,
                children: [],
                level: child.depth,
            },
            level: child.depth,
            parentIndex: -1,
        });
    };
    (0, unist_util_visit_1.default)(node, 'heading', visitor);
    // Keep track of which previous index would be the current heading's direcy parent.
    // Each entry <i> is the last index of the `headings` array at heading level <i>.
    // We will modify these indices as we iterate through all headings.
    // e.g. if an ### H3 was last seen at index 2, then prevIndexForLevel[3] === 2
    // indices 0 and 1 will remain unused.
    const prevIndexForLevel = Array(7).fill(-1);
    headings.forEach((curr, currIndex) => {
        // take the last seen index for each ancestor level. the highest
        // index will be the direct ancestor of the current heading.
        const ancestorLevelIndexes = prevIndexForLevel.slice(2, curr.level);
        curr.parentIndex = Math.max(...ancestorLevelIndexes);
        // mark that curr.level was last seen at the current index
        prevIndexForLevel[curr.level] = currIndex;
    });
    const rootNodeIndexes = [];
    // For a given parentIndex, add each Node into that parent's `children` array
    headings.forEach((heading, i) => {
        if (heading.parentIndex >= 0) {
            headings[heading.parentIndex].node.children.push(heading.node);
        }
        else {
            rootNodeIndexes.push(i);
        }
    });
    const toc = headings
        .filter((_, k) => rootNodeIndexes.includes(k)) // only return root nodes
        .map((heading) => heading.node); // only return Node, no metadata
    return toc;
}
exports.default = search;
//# sourceMappingURL=search.js.map