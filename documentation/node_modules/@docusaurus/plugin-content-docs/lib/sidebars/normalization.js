"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSidebars = exports.normalizeItem = void 0;
const utils_1 = require("./utils");
const lodash_1 = require("lodash");
const utils_2 = require("@docusaurus/utils");
function normalizeCategoryLink(category, params) {
    var _a, _b;
    if (((_a = category.link) === null || _a === void 0 ? void 0 : _a.type) === 'generated-index') {
        // default slug logic can be improved
        const getDefaultSlug = () => `/category/${params.categoryLabelSlugger.slug(category.label)}`;
        const slug = (_b = category.link.slug) !== null && _b !== void 0 ? _b : getDefaultSlug();
        const permalink = (0, utils_2.normalizeUrl)([params.version.versionPath, slug]);
        return {
            ...category.link,
            slug,
            permalink,
        };
    }
    return category.link;
}
function normalizeCategoriesShorthand(sidebar, options) {
    return Object.entries(sidebar).map(([label, items]) => ({
        type: 'category',
        collapsed: options.sidebarCollapsed,
        collapsible: options.sidebarCollapsible,
        label,
        items,
    }));
}
/**
 * Normalizes recursively item and all its children. Ensures that at the end
 * each item will be an object with the corresponding type.
 */
function normalizeItem(item, options) {
    var _a, _b, _c;
    if (typeof item === 'string') {
        return [
            {
                type: 'doc',
                id: item,
            },
        ];
    }
    if ((0, utils_1.isCategoriesShorthand)(item)) {
        return normalizeCategoriesShorthand(item, options).flatMap((subItem) => normalizeItem(subItem, options));
    }
    if (item.type === 'category') {
        const link = normalizeCategoryLink(item, options);
        const normalizedCategory = {
            ...item,
            link,
            items: ((_a = item.items) !== null && _a !== void 0 ? _a : []).flatMap((subItem) => normalizeItem(subItem, options)),
            collapsible: (_b = item.collapsible) !== null && _b !== void 0 ? _b : options.sidebarCollapsible,
            collapsed: (_c = item.collapsed) !== null && _c !== void 0 ? _c : options.sidebarCollapsed,
        };
        return [normalizedCategory];
    }
    return [item];
}
exports.normalizeItem = normalizeItem;
function normalizeSidebar(sidebar, options) {
    const normalizedSidebar = Array.isArray(sidebar)
        ? sidebar
        : normalizeCategoriesShorthand(sidebar, options);
    return normalizedSidebar.flatMap((subItem) => normalizeItem(subItem, options));
}
function normalizeSidebars(sidebars, params) {
    return (0, lodash_1.mapValues)(sidebars, (items) => normalizeSidebar(items, params));
}
exports.normalizeSidebars = normalizeSidebars;
