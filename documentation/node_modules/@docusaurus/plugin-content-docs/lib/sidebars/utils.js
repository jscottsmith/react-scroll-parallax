"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNavigationLink = exports.toDocNavigationLink = exports.createSidebarsUtils = exports.collectSidebarsNavigations = exports.collectSidebarsDocIds = exports.collectSidebarNavigation = exports.collectSidebarDocIds = exports.collectSidebarLinks = exports.collectSidebarCategories = exports.collectSidebarDocItems = exports.transformSidebarItems = exports.isCategoriesShorthand = void 0;
const lodash_1 = require("lodash");
const utils_1 = require("@docusaurus/utils");
function isCategoriesShorthand(item) {
    return typeof item !== 'string' && !item.type;
}
exports.isCategoriesShorthand = isCategoriesShorthand;
function transformSidebarItems(sidebar, updateFn) {
    function transformRecursive(item) {
        if (item.type === 'category') {
            return updateFn({
                ...item,
                items: item.items.map(transformRecursive),
            });
        }
        return updateFn(item);
    }
    return sidebar.map(transformRecursive);
}
exports.transformSidebarItems = transformSidebarItems;
// Flatten sidebar items into a single flat array (containing categories/docs on the same level)
// /!\ order matters (useful for next/prev nav), top categories appear before their child elements
function flattenSidebarItems(items) {
    function flattenRecursive(item) {
        return item.type === 'category'
            ? [item, ...item.items.flatMap(flattenRecursive)]
            : [item];
    }
    return items.flatMap(flattenRecursive);
}
function collectSidebarItemsOfType(type, sidebar) {
    return flattenSidebarItems(sidebar).filter((item) => item.type === type);
}
function collectSidebarDocItems(sidebar) {
    return collectSidebarItemsOfType('doc', sidebar);
}
exports.collectSidebarDocItems = collectSidebarDocItems;
function collectSidebarCategories(sidebar) {
    return collectSidebarItemsOfType('category', sidebar);
}
exports.collectSidebarCategories = collectSidebarCategories;
function collectSidebarLinks(sidebar) {
    return collectSidebarItemsOfType('link', sidebar);
}
exports.collectSidebarLinks = collectSidebarLinks;
// /!\ docId order matters for navigation!
function collectSidebarDocIds(sidebar) {
    return flattenSidebarItems(sidebar).flatMap((item) => {
        var _a;
        if (item.type === 'category') {
            return ((_a = item.link) === null || _a === void 0 ? void 0 : _a.type) === 'doc' ? [item.link.id] : [];
        }
        if (item.type === 'doc') {
            return [item.id];
        }
        return [];
    });
}
exports.collectSidebarDocIds = collectSidebarDocIds;
function collectSidebarNavigation(sidebar) {
    return flattenSidebarItems(sidebar).flatMap((item) => {
        if (item.type === 'category' && item.link) {
            return [item];
        }
        if (item.type === 'doc') {
            return [item];
        }
        return [];
    });
}
exports.collectSidebarNavigation = collectSidebarNavigation;
function collectSidebarsDocIds(sidebars) {
    return (0, lodash_1.mapValues)(sidebars, collectSidebarDocIds);
}
exports.collectSidebarsDocIds = collectSidebarsDocIds;
function collectSidebarsNavigations(sidebars) {
    return (0, lodash_1.mapValues)(sidebars, collectSidebarNavigation);
}
exports.collectSidebarsNavigations = collectSidebarsNavigations;
function createSidebarsUtils(sidebars) {
    const sidebarNameToDocIds = collectSidebarsDocIds(sidebars);
    const sidebarNameToNavigationItems = collectSidebarsNavigations(sidebars);
    // Reverse mapping
    const docIdToSidebarName = Object.fromEntries(Object.entries(sidebarNameToDocIds).flatMap(([sidebarName, docIds]) => docIds.map((docId) => [docId, sidebarName])));
    function getFirstDocIdOfFirstSidebar() {
        var _a;
        return (_a = Object.values(sidebarNameToDocIds)[0]) === null || _a === void 0 ? void 0 : _a[0];
    }
    function getSidebarNameByDocId(docId) {
        return docIdToSidebarName[docId];
    }
    function emptySidebarNavigation() {
        return {
            sidebarName: undefined,
            previous: undefined,
            next: undefined,
        };
    }
    function getDocNavigation(unversionedId, versionedId) {
        // TODO legacy id retro-compatibility!
        let docId = unversionedId;
        let sidebarName = getSidebarNameByDocId(docId);
        if (!sidebarName) {
            docId = versionedId;
            sidebarName = getSidebarNameByDocId(docId);
        }
        if (sidebarName) {
            const navigationItems = sidebarNameToNavigationItems[sidebarName];
            const currentItemIndex = navigationItems.findIndex((item) => {
                if (item.type === 'doc') {
                    return item.id === docId;
                }
                if (item.type === 'category' && item.link.type === 'doc') {
                    return item.link.id === docId;
                }
                return false;
            });
            const { previous, next } = (0, utils_1.getElementsAround)(navigationItems, currentItemIndex);
            return { sidebarName, previous, next };
        }
        else {
            return emptySidebarNavigation();
        }
    }
    function getCategoryGeneratedIndexList() {
        return Object.values(sidebarNameToNavigationItems)
            .flat()
            .flatMap((item) => {
            if (item.type === 'category' && item.link.type === 'generated-index') {
                return [item];
            }
            return [];
        });
    }
    // We identity the category generated index by its permalink (should be unique)
    // More reliable than using object identity
    function getCategoryGeneratedIndexNavigation(categoryGeneratedIndexPermalink) {
        var _a;
        function isCurrentCategoryGeneratedIndexItem(item) {
            var _a;
            return (item.type === 'category' &&
                ((_a = item.link) === null || _a === void 0 ? void 0 : _a.type) === 'generated-index' &&
                item.link.permalink === categoryGeneratedIndexPermalink);
        }
        const sidebarName = (_a = Object.entries(sidebarNameToNavigationItems).find(([, navigationItems]) => navigationItems.find(isCurrentCategoryGeneratedIndexItem))) === null || _a === void 0 ? void 0 : _a[0];
        if (sidebarName) {
            const navigationItems = sidebarNameToNavigationItems[sidebarName];
            const currentItemIndex = navigationItems.findIndex(isCurrentCategoryGeneratedIndexItem);
            const { previous, next } = (0, utils_1.getElementsAround)(navigationItems, currentItemIndex);
            return { sidebarName, previous, next };
        }
        else {
            return emptySidebarNavigation();
        }
    }
    function checkSidebarsDocIds(validDocIds, sidebarFilePath) {
        const allSidebarDocIds = Object.values(sidebarNameToDocIds).flat();
        const invalidSidebarDocIds = (0, lodash_1.difference)(allSidebarDocIds, validDocIds);
        if (invalidSidebarDocIds.length > 0) {
            throw new Error(`Invalid sidebar file at "${(0, utils_1.toMessageRelativeFilePath)(sidebarFilePath)}".
These sidebar document ids do not exist:
- ${invalidSidebarDocIds.sort().join('\n- ')}

Available document ids are:
- ${(0, lodash_1.uniq)(validDocIds).sort().join('\n- ')}`);
        }
    }
    return {
        sidebars,
        getFirstDocIdOfFirstSidebar,
        getSidebarNameByDocId,
        getDocNavigation,
        getCategoryGeneratedIndexList,
        getCategoryGeneratedIndexNavigation,
        checkSidebarsDocIds,
    };
}
exports.createSidebarsUtils = createSidebarsUtils;
function toDocNavigationLink(doc) {
    var _a;
    const { title, permalink, frontMatter: { pagination_label: paginationLabel, sidebar_label: sidebarLabel, }, } = doc;
    return { title: (_a = paginationLabel !== null && paginationLabel !== void 0 ? paginationLabel : sidebarLabel) !== null && _a !== void 0 ? _a : title, permalink };
}
exports.toDocNavigationLink = toDocNavigationLink;
function toNavigationLink(navigationItem, docsById) {
    function getDocById(docId) {
        const doc = docsById[docId];
        if (!doc) {
            throw new Error(`Can't create navigation link: no doc found with id=${docId}`);
        }
        return doc;
    }
    function handleCategory(category) {
        if (category.link.type === 'doc') {
            return toDocNavigationLink(getDocById(category.link.id));
        }
        else if (category.link.type === 'generated-index') {
            return {
                title: category.label,
                permalink: category.link.permalink,
            };
        }
        else {
            throw new Error('unexpected category link type');
        }
    }
    if (!navigationItem) {
        return undefined;
    }
    if (navigationItem.type === 'doc') {
        return toDocNavigationLink(getDocById(navigationItem.id));
    }
    else if (navigationItem.type === 'category') {
        return handleCategory(navigationItem);
    }
    else {
        throw new Error('unexpected navigation item');
    }
}
exports.toNavigationLink = toNavigationLink;
