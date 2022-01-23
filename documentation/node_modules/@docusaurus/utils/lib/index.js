"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdownHeadingId = exports.updateTranslationFileMessages = exports.getSwizzledComponent = exports.mergeTranslations = exports.reportMessage = exports.getFolderContainingFile = exports.findFolderContainingFile = exports.findAsyncSequential = exports.mapAsyncSequencial = exports.getPluginI18nPath = exports.getElementsAround = exports.removePrefix = exports.removeSuffix = exports.removeTrailingSlash = exports.addTrailingSlash = exports.addTrailingPathSeparator = exports.addLeadingSlash = exports.resolvePathname = exports.isValidPathname = exports.getEditUrl = exports.aliasedSitePath = exports.getSubFolder = exports.idx = exports.genChunkName = exports.toMessageRelativeFilePath = exports.genComponentName = exports.upperFirst = exports.encodePath = exports.fileToPath = exports.objectWithKeySorted = exports.generate = exports.createAbsoluteFilePathMatcher = exports.createMatcher = exports.GlobExcludeDefault = exports.Globby = exports.docuHash = exports.simpleHash = exports.md5Hash = exports.posixPath = void 0;
const tslib_1 = require("tslib");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const crypto_1 = require("crypto");
const lodash_1 = require("lodash");
const escape_string_regexp_1 = (0, tslib_1.__importDefault)(require("escape-string-regexp"));
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const url_1 = require("url");
const resolve_pathname_1 = (0, tslib_1.__importDefault)(require("resolve-pathname"));
const posixPath_1 = require("./posixPath");
const hashUtils_1 = require("./hashUtils");
const normalizeUrl_1 = require("./normalizeUrl");
const constants_1 = require("./constants");
(0, tslib_1.__exportStar)(require("./constants"), exports);
(0, tslib_1.__exportStar)(require("./mdxUtils"), exports);
(0, tslib_1.__exportStar)(require("./normalizeUrl"), exports);
(0, tslib_1.__exportStar)(require("./tags"), exports);
exports.posixPath = posixPath_1.posixPath;
(0, tslib_1.__exportStar)(require("./markdownParser"), exports);
(0, tslib_1.__exportStar)(require("./markdownLinks"), exports);
(0, tslib_1.__exportStar)(require("./escapePath"), exports);
(0, tslib_1.__exportStar)(require("./slugger"), exports);
var hashUtils_2 = require("./hashUtils");
Object.defineProperty(exports, "md5Hash", { enumerable: true, get: function () { return hashUtils_2.md5Hash; } });
Object.defineProperty(exports, "simpleHash", { enumerable: true, get: function () { return hashUtils_2.simpleHash; } });
Object.defineProperty(exports, "docuHash", { enumerable: true, get: function () { return hashUtils_2.docuHash; } });
var globUtils_1 = require("./globUtils");
Object.defineProperty(exports, "Globby", { enumerable: true, get: function () { return globUtils_1.Globby; } });
Object.defineProperty(exports, "GlobExcludeDefault", { enumerable: true, get: function () { return globUtils_1.GlobExcludeDefault; } });
Object.defineProperty(exports, "createMatcher", { enumerable: true, get: function () { return globUtils_1.createMatcher; } });
Object.defineProperty(exports, "createAbsoluteFilePathMatcher", { enumerable: true, get: function () { return globUtils_1.createAbsoluteFilePathMatcher; } });
(0, tslib_1.__exportStar)(require("./webpackUtils"), exports);
const fileHash = new Map();
async function generate(generatedFilesDir, file, content, skipCache = process.env.NODE_ENV === 'production') {
    const filepath = path_1.default.join(generatedFilesDir, file);
    if (skipCache) {
        await fs_extra_1.default.ensureDir(path_1.default.dirname(filepath));
        await fs_extra_1.default.writeFile(filepath, content);
        return;
    }
    let lastHash = fileHash.get(filepath);
    // If file already exists but its not in runtime cache yet,
    // we try to calculate the content hash and then compare
    // This is to avoid unnecessary overwriting and we can reuse old file.
    if (!lastHash && fs_extra_1.default.existsSync(filepath)) {
        const lastContent = await fs_extra_1.default.readFile(filepath, 'utf8');
        lastHash = (0, crypto_1.createHash)('md5').update(lastContent).digest('hex');
        fileHash.set(filepath, lastHash);
    }
    const currentHash = (0, crypto_1.createHash)('md5').update(content).digest('hex');
    if (lastHash !== currentHash) {
        await fs_extra_1.default.ensureDir(path_1.default.dirname(filepath));
        await fs_extra_1.default.writeFile(filepath, content);
        fileHash.set(filepath, currentHash);
    }
}
exports.generate = generate;
function objectWithKeySorted(obj) {
    // https://github.com/lodash/lodash/issues/1459#issuecomment-460941233
    return Object.keys(obj)
        .sort()
        .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
    }, {});
}
exports.objectWithKeySorted = objectWithKeySorted;
const indexRE = /(^|.*\/)index\.(md|mdx|js|jsx|ts|tsx)$/i;
const extRE = /\.(md|mdx|js|jsx|ts|tsx)$/;
/**
 * Convert filepath to url path.
 * Example: 'index.md' -> '/', 'foo/bar.js' -> '/foo/bar',
 */
function fileToPath(file) {
    if (indexRE.test(file)) {
        return file.replace(indexRE, '/$1');
    }
    return `/${file.replace(extRE, '').replace(/\\/g, '/')}`;
}
exports.fileToPath = fileToPath;
function encodePath(userpath) {
    return userpath
        .split('/')
        .map((item) => encodeURIComponent(item))
        .join('/');
}
exports.encodePath = encodePath;
/**
 * Convert first string character to the upper case.
 * E.g: docusaurus -> Docusaurus
 */
function upperFirst(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}
exports.upperFirst = upperFirst;
/**
 * Generate unique React Component Name.
 * E.g: /foo-bar -> FooBar096
 */
function genComponentName(pagePath) {
    if (pagePath === '/') {
        return 'index';
    }
    const pageHash = (0, hashUtils_1.docuHash)(pagePath);
    return upperFirst((0, lodash_1.camelCase)(pageHash));
}
exports.genComponentName = genComponentName;
// When you want to display a path in a message/warning/error,
// it's more convenient to:
// - make it relative to cwd()
// - convert to posix (ie not using windows \ path separator)
// This way, Jest tests can run more reliably on any computer/CI
// on both Unix/Windows
// For Windows users this is not perfect (as they see / instead of \) but it's probably good enough
function toMessageRelativeFilePath(filePath) {
    return (0, exports.posixPath)(path_1.default.relative(process.cwd(), filePath));
}
exports.toMessageRelativeFilePath = toMessageRelativeFilePath;
const chunkNameCache = new Map();
/**
 * Generate unique chunk name given a module path.
 */
function genChunkName(modulePath, prefix, preferredName, shortId = process.env.NODE_ENV === 'production') {
    let chunkName = chunkNameCache.get(modulePath);
    if (!chunkName) {
        if (shortId) {
            chunkName = (0, hashUtils_1.simpleHash)(modulePath, 8);
        }
        else {
            let str = modulePath;
            if (preferredName) {
                const shortHash = (0, hashUtils_1.simpleHash)(modulePath, 3);
                str = `${preferredName}${shortHash}`;
            }
            const name = str === '/' ? 'index' : (0, hashUtils_1.docuHash)(str);
            chunkName = prefix ? `${prefix}---${name}` : name;
        }
        chunkNameCache.set(modulePath, chunkName);
    }
    return chunkName;
}
exports.genChunkName = genChunkName;
// Too dynamic
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
function idx(target, keyPaths) {
    return (target &&
        keyPaths &&
        (Array.isArray(keyPaths)
            ? keyPaths.reduce((obj, key) => obj && obj[key], target)
            : target[keyPaths]));
}
exports.idx = idx;
/**
 * Given a filepath and dirpath, get the first directory.
 */
function getSubFolder(file, refDir) {
    const separator = (0, escape_string_regexp_1.default)(path_1.default.sep);
    const baseDir = (0, escape_string_regexp_1.default)(path_1.default.basename(refDir));
    const regexSubFolder = new RegExp(`${baseDir}${separator}(.*?)${separator}.*`);
    const match = regexSubFolder.exec(file);
    return match && match[1];
}
exports.getSubFolder = getSubFolder;
/**
 * Alias filepath relative to site directory, very useful so that we
 * don't expose user's site structure.
 * Example: some/path/to/website/docs/foo.md -> @site/docs/foo.md
 */
function aliasedSitePath(filePath, siteDir) {
    const relativePath = (0, exports.posixPath)(path_1.default.relative(siteDir, filePath));
    // Cannot use path.join() as it resolves '../' and removes
    // the '@site'. Let webpack loader resolve it.
    return `@site/${relativePath}`;
}
exports.aliasedSitePath = aliasedSitePath;
function getEditUrl(fileRelativePath, editUrl) {
    return editUrl
        ? (0, normalizeUrl_1.normalizeUrl)([editUrl, (0, exports.posixPath)(fileRelativePath)])
        : undefined;
}
exports.getEditUrl = getEditUrl;
function isValidPathname(str) {
    if (!str.startsWith('/')) {
        return false;
    }
    try {
        // weird, but is there a better way?
        const parsedPathname = new url_1.URL(str, 'https://domain.com').pathname;
        return parsedPathname === str || parsedPathname === encodeURI(str);
    }
    catch (e) {
        return false;
    }
}
exports.isValidPathname = isValidPathname;
// resolve pathname and fail fast if resolution fails
function resolvePathname(to, from) {
    return (0, resolve_pathname_1.default)(to, from);
}
exports.resolvePathname = resolvePathname;
function addLeadingSlash(str) {
    return str.startsWith('/') ? str : `/${str}`;
}
exports.addLeadingSlash = addLeadingSlash;
function addTrailingPathSeparator(str) {
    return str.endsWith(path_1.default.sep) ? str : `${str}${path_1.default.sep}`;
}
exports.addTrailingPathSeparator = addTrailingPathSeparator;
// TODO deduplicate: also present in @docusaurus/utils-common
function addTrailingSlash(str) {
    return str.endsWith('/') ? str : `${str}/`;
}
exports.addTrailingSlash = addTrailingSlash;
function removeTrailingSlash(str) {
    return removeSuffix(str, '/');
}
exports.removeTrailingSlash = removeTrailingSlash;
function removeSuffix(str, suffix) {
    if (suffix === '') {
        return str; // always returns "" otherwise!
    }
    return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
}
exports.removeSuffix = removeSuffix;
function removePrefix(str, prefix) {
    return str.startsWith(prefix) ? str.slice(prefix.length) : str;
}
exports.removePrefix = removePrefix;
function getElementsAround(array, aroundIndex) {
    const min = 0;
    const max = array.length - 1;
    if (aroundIndex < min || aroundIndex > max) {
        throw new Error(`Valid "aroundIndex" for array (of size ${array.length}) are between ${min} and ${max}, but you provided ${aroundIndex}.`);
    }
    const previous = aroundIndex === min ? undefined : array[aroundIndex - 1];
    const next = aroundIndex === max ? undefined : array[aroundIndex + 1];
    return { previous, next };
}
exports.getElementsAround = getElementsAround;
function getPluginI18nPath({ siteDir, locale, pluginName, pluginId = constants_1.DEFAULT_PLUGIN_ID, subPaths = [], }) {
    return path_1.default.join(siteDir, 'i18n', 
    // namespace first by locale: convenient to work in a single folder for a translator
    locale, 
    // Make it convenient to use for single-instance
    // ie: return "docs", not "docs-default" nor "docs/default"
    `${pluginName}${pluginId === constants_1.DEFAULT_PLUGIN_ID ? '' : `-${pluginId}`}`, ...subPaths);
}
exports.getPluginI18nPath = getPluginI18nPath;
async function mapAsyncSequencial(array, action) {
    const results = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const t of array) {
        const result = await action(t);
        results.push(result);
    }
    return results;
}
exports.mapAsyncSequencial = mapAsyncSequencial;
async function findAsyncSequential(array, predicate) {
    // eslint-disable-next-line no-restricted-syntax
    for (const t of array) {
        if (await predicate(t)) {
            return t;
        }
    }
    return undefined;
}
exports.findAsyncSequential = findAsyncSequential;
// return the  first folder path in which the file exists in
async function findFolderContainingFile(folderPaths, relativeFilePath) {
    return findAsyncSequential(folderPaths, (folderPath) => fs_extra_1.default.pathExists(path_1.default.join(folderPath, relativeFilePath)));
}
exports.findFolderContainingFile = findFolderContainingFile;
async function getFolderContainingFile(folderPaths, relativeFilePath) {
    const maybeFolderPath = await findFolderContainingFile(folderPaths, relativeFilePath);
    // should never happen, as the source was read from the FS anyway...
    if (!maybeFolderPath) {
        throw new Error(`File "${relativeFilePath}" does not exist in any of these folders:\n- ${folderPaths.join('\n- ')}]`);
    }
    return maybeFolderPath;
}
exports.getFolderContainingFile = getFolderContainingFile;
function reportMessage(message, reportingSeverity) {
    switch (reportingSeverity) {
        case 'ignore':
            break;
        case 'log':
            logger_1.default.info(message);
            break;
        case 'warn':
            logger_1.default.warn(message);
            break;
        case 'error':
            logger_1.default.error(message);
            break;
        case 'throw':
            throw new Error(message);
        default:
            throw new Error(`Unexpected "reportingSeverity" value: ${reportingSeverity}.`);
    }
}
exports.reportMessage = reportMessage;
function mergeTranslations(contents) {
    return contents.reduce((acc, content) => ({ ...acc, ...content }), {});
}
exports.mergeTranslations = mergeTranslations;
function getSwizzledComponent(componentPath) {
    const swizzledComponentPath = path_1.default.resolve(process.cwd(), 'src', componentPath);
    return fs_extra_1.default.existsSync(swizzledComponentPath)
        ? swizzledComponentPath
        : undefined;
}
exports.getSwizzledComponent = getSwizzledComponent;
// Useful to update all the messages of a translation file
// Used in tests to simulate translations
function updateTranslationFileMessages(translationFile, updateMessage) {
    return {
        ...translationFile,
        content: (0, lodash_1.mapValues)(translationFile.content, (translation) => ({
            ...translation,
            message: updateMessage(translation.message),
        })),
    };
}
exports.updateTranslationFileMessages = updateTranslationFileMessages;
// Input: ## Some heading {#some-heading}
// Output: {text: "## Some heading", id: "some-heading"}
function parseMarkdownHeadingId(heading) {
    const customHeadingIdRegex = /^(.*?)\s*\{#([\w-]+)\}$/;
    const matches = customHeadingIdRegex.exec(heading);
    if (matches) {
        return {
            text: matches[1],
            id: matches[2],
        };
    }
    else {
        return { text: heading, id: undefined };
    }
}
exports.parseMarkdownHeadingId = parseMarkdownHeadingId;
//# sourceMappingURL=index.js.map