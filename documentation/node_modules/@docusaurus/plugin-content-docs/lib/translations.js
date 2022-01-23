"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateLoadedContent = exports.getLoadedContentTranslationFiles = void 0;
const lodash_1 = require("lodash");
const utils_1 = require("./sidebars/utils");
const utils_2 = require("@docusaurus/utils");
const constants_1 = require("./constants");
function getVersionFileName(versionName) {
    if (versionName === constants_1.CURRENT_VERSION_NAME) {
        return versionName;
    }
    else {
        // I don't like this "version-" prefix,
        // but it's for consistency with site/versioned_docs
        return `version-${versionName}`;
    }
}
// TODO legacy, the sidebar name is like "version-2.0.0-alpha.66/docs"
// input: "version-2.0.0-alpha.66/docs"
// output: "docs"
function getNormalizedSidebarName({ versionName, sidebarName, }) {
    if (versionName === constants_1.CURRENT_VERSION_NAME || !sidebarName.includes('/')) {
        return sidebarName;
    }
    const [, ...rest] = sidebarName.split('/');
    return rest.join('/');
}
/*
// Do we need to translate doc metadata?
// It seems translating frontmatter labels is good enough
function getDocTranslations(doc: DocMetadata): TranslationFileContent {
  return {
    [`${doc.unversionedId}.title`]: {
      message: doc.title,
      description: `The title for doc with id=${doc.unversionedId}`,
    },
    ...(doc.sidebar_label
      ? {
          [`${doc.unversionedId}.sidebar_label`]: {
            message: doc.sidebar_label,
            description: `The sidebar label for doc with id=${doc.unversionedId}`,
          },
        }
      : undefined),
  };
}
function translateDoc(
  doc: DocMetadata,
  docsTranslations: TranslationFileContent,
): DocMetadata {
  return {
    ...doc,
    title: docsTranslations[`${doc.unversionedId}.title`]?.message ?? doc.title,
    sidebar_label:
      docsTranslations[`${doc.unversionedId}.sidebar_label`]?.message ??
      doc.sidebar_label,
  };
}

function getDocsTranslations(version: LoadedVersion): TranslationFileContent {
  return mergeTranslations(version.docs.map(getDocTranslations));
}
function translateDocs(
  docs: DocMetadata[],
  docsTranslations: TranslationFileContent,
): DocMetadata[] {
  return docs.map((doc) => translateDoc(doc, docsTranslations));
}
 */
function getSidebarTranslationFileContent(sidebar, sidebarName) {
    const categories = (0, utils_1.collectSidebarCategories)(sidebar);
    const categoryContent = Object.fromEntries(categories.flatMap((category) => {
        const entries = [];
        entries.push([
            `sidebar.${sidebarName}.category.${category.label}`,
            {
                message: category.label,
                description: `The label for category ${category.label} in sidebar ${sidebarName}`,
            },
        ]);
        if (category.link) {
            if (category.link.type === 'generated-index') {
                if (category.link.title) {
                    entries.push([
                        `sidebar.${sidebarName}.category.${category.label}.link.generated-index.title`,
                        {
                            message: category.link.title,
                            description: `The generated-index page title for category ${category.label} in sidebar ${sidebarName}`,
                        },
                    ]);
                }
                if (category.link.description) {
                    entries.push([
                        `sidebar.${sidebarName}.category.${category.label}.link.generated-index.description`,
                        {
                            message: category.link.description,
                            description: `The generated-index page description for category ${category.label} in sidebar ${sidebarName}`,
                        },
                    ]);
                }
            }
        }
        return entries;
    }));
    const links = (0, utils_1.collectSidebarLinks)(sidebar);
    const linksContent = (0, lodash_1.chain)(links)
        .keyBy((link) => `sidebar.${sidebarName}.link.${link.label}`)
        .mapValues((link) => ({
        message: link.label,
        description: `The label for link ${link.label} in sidebar ${sidebarName}, linking to ${link.href}`,
    }))
        .value();
    return (0, utils_2.mergeTranslations)([categoryContent, linksContent]);
}
function translateSidebar({ sidebar, sidebarName, sidebarsTranslations, }) {
    function transformSidebarCategoryLink(category) {
        var _a, _b, _c, _d;
        if (!category.link) {
            return undefined;
        }
        if (category.link.type === 'generated-index') {
            const title = (_b = (_a = sidebarsTranslations[`sidebar.${sidebarName}.category.${category.label}.link.generated-index.title`]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : category.link.title;
            const description = (_d = (_c = sidebarsTranslations[`sidebar.${sidebarName}.category.${category.label}.link.generated-index.description`]) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : category.link.description;
            return {
                ...category.link,
                title,
                description,
            };
        }
        return category.link;
    }
    return (0, utils_1.transformSidebarItems)(sidebar, (item) => {
        var _a, _b, _c, _d;
        if (item.type === 'category') {
            const link = transformSidebarCategoryLink(item);
            return {
                ...item,
                label: (_b = (_a = sidebarsTranslations[`sidebar.${sidebarName}.category.${item.label}`]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : item.label,
                ...(link && { link }),
            };
        }
        if (item.type === 'link') {
            return {
                ...item,
                label: (_d = (_c = sidebarsTranslations[`sidebar.${sidebarName}.link.${item.label}`]) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : item.label,
            };
        }
        return item;
    });
}
function getSidebarsTranslations(version) {
    return (0, utils_2.mergeTranslations)(Object.entries(version.sidebars).map(([sidebarName, sidebar]) => {
        const normalizedSidebarName = getNormalizedSidebarName({
            sidebarName,
            versionName: version.versionName,
        });
        return getSidebarTranslationFileContent(sidebar, normalizedSidebarName);
    }));
}
function translateSidebars(version, sidebarsTranslations) {
    return (0, lodash_1.mapValues)(version.sidebars, (sidebar, sidebarName) => translateSidebar({
        sidebar,
        sidebarName: getNormalizedSidebarName({
            sidebarName,
            versionName: version.versionName,
        }),
        sidebarsTranslations,
    }));
}
function getVersionTranslationFiles(version) {
    const versionTranslations = {
        'version.label': {
            message: version.versionLabel,
            description: `The label for version ${version.versionName}`,
        },
    };
    const sidebarsTranslations = getSidebarsTranslations(version);
    // const docsTranslations: TranslationFileContent = getDocsTranslations(version);
    return [
        {
            path: getVersionFileName(version.versionName),
            content: (0, utils_2.mergeTranslations)([
                versionTranslations,
                sidebarsTranslations,
                // docsTranslations,
            ]),
        },
    ];
}
function translateVersion(version, translationFiles) {
    var _a;
    const versionTranslations = translationFiles[getVersionFileName(version.versionName)].content;
    return {
        ...version,
        versionLabel: (_a = versionTranslations['version.label']) === null || _a === void 0 ? void 0 : _a.message,
        sidebars: translateSidebars(version, versionTranslations),
        // docs: translateDocs(version.docs, versionTranslations),
    };
}
function getVersionsTranslationFiles(versions) {
    return versions.flatMap(getVersionTranslationFiles);
}
function translateVersions(versions, translationFiles) {
    return versions.map((version) => translateVersion(version, translationFiles));
}
function getLoadedContentTranslationFiles(loadedContent) {
    return getVersionsTranslationFiles(loadedContent.loadedVersions);
}
exports.getLoadedContentTranslationFiles = getLoadedContentTranslationFiles;
function translateLoadedContent(loadedContent, translationFiles) {
    const translationFilesMap = (0, lodash_1.keyBy)(translationFiles, (f) => f.path);
    return {
        loadedVersions: translateVersions(loadedContent.loadedVersions, translationFilesMap),
    };
}
exports.translateLoadedContent = translateLoadedContent;
