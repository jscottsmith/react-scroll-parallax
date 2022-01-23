"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupTaggedItems = exports.normalizeFrontMatterTags = exports.normalizeFrontMatterTag = void 0;
const lodash_1 = require("lodash");
const normalizeUrl_1 = require("./normalizeUrl");
function normalizeFrontMatterTag(tagsPath, frontMatterTag) {
    function toTagObject(tagString) {
        return {
            label: tagString,
            permalink: (0, lodash_1.kebabCase)(tagString),
        };
    }
    // TODO maybe make ensure the permalink is valid url path?
    function normalizeTagPermalink(permalink) {
        // note: we always apply tagsPath on purpose
        // for versioned docs, v1/doc.md and v2/doc.md tags with custom permalinks don't lead to the same created page
        // tagsPath is different for each doc version
        return (0, normalizeUrl_1.normalizeUrl)([tagsPath, permalink]);
    }
    const tag = typeof frontMatterTag === 'string'
        ? toTagObject(frontMatterTag)
        : frontMatterTag;
    return {
        label: tag.label,
        permalink: normalizeTagPermalink(tag.permalink),
    };
}
exports.normalizeFrontMatterTag = normalizeFrontMatterTag;
function normalizeFrontMatterTags(tagsPath, frontMatterTags) {
    var _a;
    const tags = (_a = frontMatterTags === null || frontMatterTags === void 0 ? void 0 : frontMatterTags.map((tag) => normalizeFrontMatterTag(tagsPath, tag))) !== null && _a !== void 0 ? _a : [];
    return (0, lodash_1.uniqBy)(tags, (tag) => tag.permalink);
}
exports.normalizeFrontMatterTags = normalizeFrontMatterTags;
// Permits to group docs/blogPosts by tag (provided by FrontMatter)
// Note: groups are indexed by permalink, because routes must be unique in the end
// Labels may vary on 2 md files but they are normalized.
// Docs with label='some label' and label='some-label' should end-up in the same group/page in the end
// We can't create 2 routes /some-label because one would override the other
function groupTaggedItems(items, getItemTags) {
    const result = {};
    function handleItemTag(item, tag) {
        var _a;
        // Init missing tag groups
        // TODO: it's not really clear what should be the behavior if 2 items have the same tag but the permalink is different for each
        // For now, the first tag found wins
        result[tag.permalink] = (_a = result[tag.permalink]) !== null && _a !== void 0 ? _a : {
            tag,
            items: [],
        };
        // Add item to group
        result[tag.permalink].items.push(item);
    }
    items.forEach((item) => {
        getItemTags(item).forEach((tag) => {
            handleItemTag(item, tag);
        });
    });
    // If user add twice the same tag to a md doc (weird but possible),
    // we don't want the item to appear twice in the list...
    Object.values(result).forEach((group) => {
        group.items = (0, lodash_1.uniq)(group.items);
    });
    return result;
}
exports.groupTaggedItems = groupTaggedItems;
//# sourceMappingURL=tags.js.map