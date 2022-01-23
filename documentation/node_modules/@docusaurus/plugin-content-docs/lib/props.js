"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTagDocListProp = exports.toVersionMetadataProp = exports.toSidebarsProp = void 0;
const lodash_1 = require("lodash");
const docs_1 = require("./docs");
function toSidebarsProp(loadedVersion) {
    const docsById = (0, docs_1.createDocsByIdIndex)(loadedVersion.docs);
    function getDocById(docId) {
        const docMetadata = docsById[docId];
        if (!docMetadata) {
            throw new Error(`Invalid sidebars file. The document with id "${docId}" was used in the sidebar, but no document with this id could be found.
Available document ids are:
- ${Object.keys(docsById).sort().join('\n- ')}`);
        }
        return docMetadata;
    }
    const convertDocLink = (item) => {
        const docMetadata = getDocById(item.id);
        const { title, permalink, frontMatter: { sidebar_label: sidebarLabel }, } = docMetadata;
        return {
            type: 'link',
            label: sidebarLabel || item.label || title,
            href: permalink,
            className: item.className,
            customProps: item.customProps,
            docId: docMetadata.unversionedId,
        };
    };
    function getCategoryLinkHref(link) {
        switch (link === null || link === void 0 ? void 0 : link.type) {
            case 'doc':
                return getDocById(link.id).permalink;
            case 'generated-index':
                return link.permalink;
            default:
                return undefined;
        }
    }
    function convertCategory(item) {
        const { link, ...rest } = item;
        const href = getCategoryLinkHref(link);
        return { ...rest, items: item.items.map(normalizeItem), ...(href && { href }) };
    }
    function normalizeItem(item) {
        switch (item.type) {
            case 'category':
                return convertCategory(item);
            case 'ref':
            case 'doc':
                return convertDocLink(item);
            case 'link':
            default:
                return item;
        }
    }
    // Transform the sidebar so that all sidebar item will be in the
    // form of 'link' or 'category' only.
    // This is what will be passed as props to the UI component.
    return (0, lodash_1.mapValues)(loadedVersion.sidebars, (items) => items.map(normalizeItem));
}
exports.toSidebarsProp = toSidebarsProp;
function toVersionDocsProp(loadedVersion) {
    return (0, lodash_1.mapValues)((0, lodash_1.keyBy)(loadedVersion.docs, (doc) => doc.unversionedId), (doc) => ({
        id: doc.unversionedId,
        title: doc.title,
        description: doc.description,
        sidebar: doc.sidebar,
    }));
}
function toVersionMetadataProp(pluginId, loadedVersion) {
    return {
        pluginId,
        version: loadedVersion.versionName,
        label: loadedVersion.versionLabel,
        banner: loadedVersion.versionBanner,
        badge: loadedVersion.versionBadge,
        className: loadedVersion.versionClassName,
        isLast: loadedVersion.isLast,
        docsSidebars: toSidebarsProp(loadedVersion),
        docs: toVersionDocsProp(loadedVersion),
    };
}
exports.toVersionMetadataProp = toVersionMetadataProp;
function toTagDocListProp({ allTagsPath, tag, docs, }) {
    function toDocListProp() {
        const list = (0, lodash_1.compact)(tag.docIds.map((id) => docs.find((doc) => doc.id === id)));
        // Sort docs by title
        list.sort((doc1, doc2) => doc1.title.localeCompare(doc2.title));
        return list.map((doc) => ({
            id: doc.id,
            title: doc.title,
            description: doc.description,
            permalink: doc.permalink,
        }));
    }
    return {
        name: tag.name,
        permalink: tag.permalink,
        docs: toDocListProp(),
        allTagsPath,
    };
}
exports.toTagDocListProp = toTagDocListProp;
