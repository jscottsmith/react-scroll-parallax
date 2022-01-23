"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocsDirPaths = exports.readVersionsMetadata = exports.getVersionsFilePath = exports.getVersionedSidebarsDirPath = exports.getVersionedDocsDirPath = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const constants_1 = require("./constants");
const utils_1 = require("@docusaurus/utils");
const lodash_1 = require("lodash");
const sidebars_1 = require("./sidebars");
// retro-compatibility: no prefix for the default plugin id
function addPluginIdPrefix(fileOrDir, pluginId) {
    if (pluginId === utils_1.DEFAULT_PLUGIN_ID) {
        return fileOrDir;
    }
    else {
        return `${pluginId}_${fileOrDir}`;
    }
}
function getVersionedDocsDirPath(siteDir, pluginId) {
    return path_1.default.join(siteDir, addPluginIdPrefix(constants_1.VERSIONED_DOCS_DIR, pluginId));
}
exports.getVersionedDocsDirPath = getVersionedDocsDirPath;
function getVersionedSidebarsDirPath(siteDir, pluginId) {
    return path_1.default.join(siteDir, addPluginIdPrefix(constants_1.VERSIONED_SIDEBARS_DIR, pluginId));
}
exports.getVersionedSidebarsDirPath = getVersionedSidebarsDirPath;
function getVersionsFilePath(siteDir, pluginId) {
    return path_1.default.join(siteDir, addPluginIdPrefix(constants_1.VERSIONS_JSON_FILE, pluginId));
}
exports.getVersionsFilePath = getVersionsFilePath;
function ensureValidVersionString(version) {
    if (typeof version !== 'string') {
        throw new Error(`Versions should be strings. Found type "${typeof version}" for version "${version}".`);
    }
    // Should we forbid versions with special chars like / ?
    if (version.trim().length === 0) {
        throw new Error(`Invalid version "${version}".`);
    }
}
function ensureValidVersionArray(versionArray) {
    if (!(versionArray instanceof Array)) {
        throw new Error(`The versions file should contain an array of versions! Found content: ${JSON.stringify(versionArray)}`);
    }
    versionArray.forEach(ensureValidVersionString);
}
// TODO not easy to make async due to many deps
function readVersionsFile(siteDir, pluginId) {
    const versionsFilePath = getVersionsFilePath(siteDir, pluginId);
    if (fs_extra_1.default.existsSync(versionsFilePath)) {
        const content = JSON.parse(fs_extra_1.default.readFileSync(versionsFilePath, 'utf8'));
        ensureValidVersionArray(content);
        return content;
    }
    else {
        return null;
    }
}
// TODO not easy to make async due to many deps
function readVersionNames(siteDir, options) {
    const versionFileContent = readVersionsFile(siteDir, options.id);
    if (!versionFileContent && options.disableVersioning) {
        throw new Error(`Docs: using "disableVersioning=${options.disableVersioning}" option on a non-versioned site does not make sense.`);
    }
    const versions = options.disableVersioning ? [] : versionFileContent !== null && versionFileContent !== void 0 ? versionFileContent : [];
    // We add the current version at the beginning, unless
    // - user don't want to
    // - it's been explicitly added to versions.json
    if (options.includeCurrentVersion &&
        !versions.includes(constants_1.CURRENT_VERSION_NAME)) {
        versions.unshift(constants_1.CURRENT_VERSION_NAME);
    }
    if (versions.length === 0) {
        throw new Error(`It is not possible to use docs without any version. Please check the configuration of these options: "includeCurrentVersion=${options.includeCurrentVersion}", "disableVersioning=${options.disableVersioning}".`);
    }
    return versions;
}
function getDocsDirPathLocalized({ siteDir, locale, pluginId, versionName, }) {
    return (0, utils_1.getPluginI18nPath)({
        siteDir,
        locale,
        pluginName: 'docusaurus-plugin-content-docs',
        pluginId,
        subPaths: [
            versionName === constants_1.CURRENT_VERSION_NAME
                ? constants_1.CURRENT_VERSION_NAME
                : `version-${versionName}`,
        ],
    });
}
function getVersionMetadataPaths({ versionName, context, options, }) {
    const isCurrentVersion = versionName === constants_1.CURRENT_VERSION_NAME;
    const contentPath = isCurrentVersion
        ? path_1.default.resolve(context.siteDir, options.path)
        : path_1.default.join(getVersionedDocsDirPath(context.siteDir, options.id), `version-${versionName}`);
    const contentPathLocalized = getDocsDirPathLocalized({
        siteDir: context.siteDir,
        locale: context.i18n.currentLocale,
        pluginId: options.id,
        versionName,
    });
    function getSidebarFilePath() {
        if (isCurrentVersion) {
            return (0, sidebars_1.resolveSidebarPathOption)(context.siteDir, options.sidebarPath);
        }
        else {
            return path_1.default.join(getVersionedSidebarsDirPath(context.siteDir, options.id), `version-${versionName}-sidebars.json`);
        }
    }
    return {
        contentPath,
        contentPathLocalized,
        sidebarFilePath: getSidebarFilePath(),
    };
}
function getVersionEditUrls({ contentPath, contentPathLocalized, context: { siteDir, i18n }, options: { id, path: currentVersionPath, editUrl, editCurrentVersion }, }) {
    if (!editUrl) {
        return undefined;
    }
    // if the user is using the functional form of editUrl,
    // he has total freedom and we can't compute a "version edit url"
    if (typeof editUrl === 'function') {
        return undefined;
    }
    const editDirPath = editCurrentVersion ? currentVersionPath : contentPath;
    const editDirPathLocalized = editCurrentVersion
        ? getDocsDirPathLocalized({
            siteDir,
            locale: i18n.currentLocale,
            versionName: constants_1.CURRENT_VERSION_NAME,
            pluginId: id,
        })
        : contentPathLocalized;
    const versionPathSegment = (0, utils_1.posixPath)(path_1.default.relative(siteDir, path_1.default.resolve(siteDir, editDirPath)));
    const versionPathSegmentLocalized = (0, utils_1.posixPath)(path_1.default.relative(siteDir, path_1.default.resolve(siteDir, editDirPathLocalized)));
    const versionEditUrl = (0, utils_1.normalizeUrl)([editUrl, versionPathSegment]);
    const versionEditUrlLocalized = (0, utils_1.normalizeUrl)([
        editUrl,
        versionPathSegmentLocalized,
    ]);
    return {
        versionEditUrl,
        versionEditUrlLocalized,
    };
}
function getDefaultVersionBanner({ versionName, versionNames, lastVersionName, }) {
    // Current version: good, no banner
    if (versionName === lastVersionName) {
        return null;
    }
    // Upcoming versions: unreleased banner
    else if (versionNames.indexOf(versionName) < versionNames.indexOf(lastVersionName)) {
        return 'unreleased';
    }
    // Older versions: display unmaintained banner
    else {
        return 'unmaintained';
    }
}
function getVersionBanner({ versionName, versionNames, lastVersionName, options, }) {
    var _a;
    const versionBannerOption = (_a = options.versions[versionName]) === null || _a === void 0 ? void 0 : _a.banner;
    if (versionBannerOption) {
        return versionBannerOption === 'none' ? null : versionBannerOption;
    }
    return getDefaultVersionBanner({
        versionName,
        versionNames,
        lastVersionName,
    });
}
function getVersionBadge({ versionName, versionNames, options, }) {
    var _a;
    const versionBadgeOption = (_a = options.versions[versionName]) === null || _a === void 0 ? void 0 : _a.badge;
    // If site is not versioned or only one version is included
    // we don't show the version badge by default
    // See https://github.com/facebook/docusaurus/issues/3362
    const versionBadgeDefault = versionNames.length !== 1;
    return versionBadgeOption !== null && versionBadgeOption !== void 0 ? versionBadgeOption : versionBadgeDefault;
}
function getVersionClassName({ versionName, options, }) {
    var _a;
    const versionClassNameOption = (_a = options.versions[versionName]) === null || _a === void 0 ? void 0 : _a.className;
    const versionClassNameDefault = `docs-version-${versionName}`;
    return versionClassNameOption !== null && versionClassNameOption !== void 0 ? versionClassNameOption : versionClassNameDefault;
}
function createVersionMetadata({ versionName, versionNames, lastVersionName, context, options, }) {
    var _a, _b, _c;
    const { sidebarFilePath, contentPath, contentPathLocalized } = getVersionMetadataPaths({ versionName, context, options });
    const isLast = versionName === lastVersionName;
    // retro-compatible values
    const defaultVersionLabel = versionName === constants_1.CURRENT_VERSION_NAME ? 'Next' : versionName;
    function getDefaultVersionPathPart() {
        if (isLast) {
            return '';
        }
        return versionName === constants_1.CURRENT_VERSION_NAME ? 'next' : versionName;
    }
    const defaultVersionPathPart = getDefaultVersionPathPart();
    const versionOptions = (_a = options.versions[versionName]) !== null && _a !== void 0 ? _a : {};
    const versionLabel = (_b = versionOptions.label) !== null && _b !== void 0 ? _b : defaultVersionLabel;
    const versionPathPart = (_c = versionOptions.path) !== null && _c !== void 0 ? _c : defaultVersionPathPart;
    const versionPath = (0, utils_1.normalizeUrl)([
        context.baseUrl,
        options.routeBasePath,
        versionPathPart,
    ]);
    const versionEditUrls = getVersionEditUrls({
        contentPath,
        contentPathLocalized,
        context,
        options,
    });
    // Because /docs/:route` should always be after `/docs/versionName/:route`.
    const routePriority = versionPathPart === '' ? -1 : undefined;
    // the path that will be used to refer the docs tags
    // example below will be using /docs/tags
    const tagsPath = (0, utils_1.normalizeUrl)([versionPath, options.tagsBasePath]);
    return {
        versionName,
        versionLabel,
        versionPath,
        tagsPath,
        versionEditUrl: versionEditUrls === null || versionEditUrls === void 0 ? void 0 : versionEditUrls.versionEditUrl,
        versionEditUrlLocalized: versionEditUrls === null || versionEditUrls === void 0 ? void 0 : versionEditUrls.versionEditUrlLocalized,
        versionBanner: getVersionBanner({
            versionName,
            versionNames,
            lastVersionName,
            options,
        }),
        versionBadge: getVersionBadge({ versionName, versionNames, options }),
        versionClassName: getVersionClassName({ versionName, options }),
        isLast,
        routePriority,
        sidebarFilePath,
        contentPath,
        contentPathLocalized,
    };
}
function checkVersionMetadataPaths({ versionMetadata, context, }) {
    const { versionName, contentPath, sidebarFilePath } = versionMetadata;
    const { siteDir } = context;
    const isCurrentVersion = versionName === constants_1.CURRENT_VERSION_NAME;
    if (!fs_extra_1.default.existsSync(contentPath)) {
        throw new Error(`The docs folder does not exist for version "${versionName}". A docs folder is expected to be found at ${path_1.default.relative(siteDir, contentPath)}.`);
    }
    // If the current version defines a path to a sidebar file  that does not exist, we throw!
    // Note: for versioned sidebars, the file may not exist (as we prefer to not create it rather than to create an empty file)
    // See https://github.com/facebook/docusaurus/issues/3366
    // See https://github.com/facebook/docusaurus/pull/4775
    if (isCurrentVersion &&
        typeof sidebarFilePath === 'string' &&
        !fs_extra_1.default.existsSync(sidebarFilePath)) {
        throw new Error(`The path to the sidebar file does not exist at "${path_1.default.relative(siteDir, sidebarFilePath)}".
Please set the docs "sidebarPath" field in your config file to:
- a sidebars path that exists
- false: to disable the sidebar
- undefined: for Docusaurus generates it automatically`);
    }
}
// TODO for retrocompatibility with existing behavior
// We should make this configurable
// "last version" is not a very good concept nor api surface
function getDefaultLastVersionName(versionNames) {
    if (versionNames.length === 1) {
        return versionNames[0];
    }
    else {
        return versionNames.filter((versionName) => versionName !== constants_1.CURRENT_VERSION_NAME)[0];
    }
}
function checkVersionsOptions(availableVersionNames, options) {
    const availableVersionNamesMsg = `Available version names are: ${availableVersionNames.join(', ')}`;
    if (options.lastVersion &&
        !availableVersionNames.includes(options.lastVersion)) {
        throw new Error(`Docs option lastVersion=${options.lastVersion} is invalid. ${availableVersionNamesMsg}`);
    }
    const unknownVersionConfigNames = (0, lodash_1.difference)(Object.keys(options.versions), availableVersionNames);
    if (unknownVersionConfigNames.length > 0) {
        throw new Error(`Invalid docs option "versions": unknown versions (${unknownVersionConfigNames.join(',')}) found. ${availableVersionNamesMsg}`);
    }
    if (options.onlyIncludeVersions) {
        if (options.onlyIncludeVersions.length === 0) {
            throw new Error(`Invalid docs option "onlyIncludeVersions": an empty array is not allowed, at least one version is needed.`);
        }
        const unknownOnlyIncludeVersionNames = (0, lodash_1.difference)(options.onlyIncludeVersions, availableVersionNames);
        if (unknownOnlyIncludeVersionNames.length > 0) {
            throw new Error(`Invalid docs option "onlyIncludeVersions": unknown versions (${unknownOnlyIncludeVersionNames.join(',')}) found. ${availableVersionNamesMsg}`);
        }
        if (options.lastVersion &&
            !options.onlyIncludeVersions.includes(options.lastVersion)) {
            throw new Error(`Invalid docs option "lastVersion": if you use both the "onlyIncludeVersions" and "lastVersion" options, then "lastVersion" must be present in the provided "onlyIncludeVersions" array.`);
        }
    }
}
// Filter versions according to provided options
// Note: we preserve the order in which versions are provided
// the order of the onlyIncludeVersions array does not matter
function filterVersions(versionNamesUnfiltered, options) {
    if (options.onlyIncludeVersions) {
        return versionNamesUnfiltered.filter((name) => (options.onlyIncludeVersions || []).includes(name));
    }
    else {
        return versionNamesUnfiltered;
    }
}
// TODO make this async (requires plugin init to be async)
function readVersionsMetadata({ context, options, }) {
    var _a;
    const versionNamesUnfiltered = readVersionNames(context.siteDir, options);
    checkVersionsOptions(versionNamesUnfiltered, options);
    const versionNames = filterVersions(versionNamesUnfiltered, options);
    const lastVersionName = (_a = options.lastVersion) !== null && _a !== void 0 ? _a : getDefaultLastVersionName(versionNames);
    const versionsMetadata = versionNames.map((versionName) => createVersionMetadata({
        versionName,
        versionNames,
        lastVersionName,
        context,
        options,
    }));
    versionsMetadata.forEach((versionMetadata) => checkVersionMetadataPaths({ versionMetadata, context }));
    return versionsMetadata;
}
exports.readVersionsMetadata = readVersionsMetadata;
// order matter!
// Read in priority the localized path, then the unlocalized one
// We want the localized doc to "override" the unlocalized one
function getDocsDirPaths(versionMetadata) {
    return [versionMetadata.contentPathLocalized, versionMetadata.contentPath];
}
exports.getDocsDirPaths = getDocsDirPaths;
