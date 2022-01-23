"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyDefaultCodeTranslations = exports.getPluginsDefaultCodeTranslationMessages = exports.localizePluginTranslationFile = exports.writePluginTranslations = exports.writeCodeTranslations = exports.readCodeTranslationFileContent = exports.getCodeTranslationsFilePath = exports.getTranslationsLocaleDirPath = exports.getTranslationsDirPath = exports.writeTranslationFileContent = exports.readTranslationFileContent = exports.ensureTranslationFileContent = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const lodash_1 = require("lodash");
const utils_1 = require("@docusaurus/utils");
const utils_validation_1 = require("@docusaurus/utils-validation");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const TranslationFileContentSchema = utils_validation_1.Joi.object()
    .pattern(utils_validation_1.Joi.string(), utils_validation_1.Joi.object({
    message: utils_validation_1.Joi.string().allow('').required(),
    description: utils_validation_1.Joi.string().optional(),
}))
    .required();
function ensureTranslationFileContent(content) {
    utils_validation_1.Joi.attempt(content, TranslationFileContentSchema, {
        abortEarly: false,
        allowUnknown: false,
        convert: false,
    });
}
exports.ensureTranslationFileContent = ensureTranslationFileContent;
async function readTranslationFileContent(filePath) {
    if (await fs_extra_1.default.pathExists(filePath)) {
        try {
            const content = JSON.parse(await fs_extra_1.default.readFile(filePath, 'utf8'));
            ensureTranslationFileContent(content);
            return content;
        }
        catch (e) {
            throw new Error(`Invalid translation file at ${filePath}.\n${e.message}`);
        }
    }
    return undefined;
}
exports.readTranslationFileContent = readTranslationFileContent;
function mergeTranslationFileContent({ existingContent = {}, newContent, options, }) {
    // Apply messagePrefix to all messages
    const newContentTransformed = (0, lodash_1.mapValues)(newContent, (value) => {
        var _a;
        return ({
            ...value,
            message: `${(_a = options.messagePrefix) !== null && _a !== void 0 ? _a : ''}${value.message}`,
        });
    });
    const result = { ...existingContent };
    // We only add missing keys here, we don't delete existing ones
    Object.entries(newContentTransformed).forEach(([key, { message, description }]) => {
        var _a, _b;
        result[key] = {
            // If the messages already exist, we don't override them (unless requested)
            message: options.override
                ? message
                : (_b = (_a = existingContent[key]) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : message,
            description, // description
        };
    });
    return result;
}
async function writeTranslationFileContent({ filePath, content: newContent, options = {}, }) {
    const existingContent = await readTranslationFileContent(filePath);
    // Warn about potential legacy keys
    const unknownKeys = (0, lodash_1.difference)(Object.keys(existingContent !== null && existingContent !== void 0 ? existingContent : {}), Object.keys(newContent));
    if (unknownKeys.length > 0) {
        logger_1.default.warn `Some translation keys looks unknown to us in file path=${filePath}.
Maybe you should remove them? ${unknownKeys}`;
    }
    const mergedContent = mergeTranslationFileContent({
        existingContent,
        newContent,
        options,
    });
    // Avoid creating empty translation files
    if (Object.keys(mergedContent).length > 0) {
        logger_1.default.info `number=${Object.keys(mergedContent).length} translations will be written at path=${(0, utils_1.toMessageRelativeFilePath)(filePath)}.`;
        await fs_extra_1.default.ensureDir(path_1.default.dirname(filePath));
        await fs_extra_1.default.writeFile(filePath, JSON.stringify(mergedContent, null, 2));
    }
}
exports.writeTranslationFileContent = writeTranslationFileContent;
// should we make this configurable?
function getTranslationsDirPath(context) {
    return path_1.default.resolve(path_1.default.join(context.siteDir, `i18n`));
}
exports.getTranslationsDirPath = getTranslationsDirPath;
function getTranslationsLocaleDirPath(context) {
    return path_1.default.join(getTranslationsDirPath(context), context.locale);
}
exports.getTranslationsLocaleDirPath = getTranslationsLocaleDirPath;
function getCodeTranslationsFilePath(context) {
    return path_1.default.join(getTranslationsLocaleDirPath(context), 'code.json');
}
exports.getCodeTranslationsFilePath = getCodeTranslationsFilePath;
async function readCodeTranslationFileContent(context) {
    return readTranslationFileContent(getCodeTranslationsFilePath(context));
}
exports.readCodeTranslationFileContent = readCodeTranslationFileContent;
async function writeCodeTranslations(context, content, options) {
    return writeTranslationFileContent({
        filePath: getCodeTranslationsFilePath(context),
        content,
        options,
    });
}
exports.writeCodeTranslations = writeCodeTranslations;
// We ask users to not provide any extension on purpose:
// maybe some day we'll want to support multiple FS formats?
// (json/yaml/toml/xml...)
function addTranslationFileExtension(translationFilePath) {
    if (translationFilePath.endsWith('.json')) {
        throw new Error(`Translation file path at "${translationFilePath}" does not need to end with ".json", we add the extension automatically.`);
    }
    return `${translationFilePath}.json`;
}
function getPluginTranslationFilePath({ siteDir, plugin, locale, translationFilePath, }) {
    const dirPath = (0, utils_1.getPluginI18nPath)({
        siteDir,
        locale,
        pluginName: plugin.name,
        pluginId: plugin.options.id,
    });
    const filePath = addTranslationFileExtension(translationFilePath);
    return path_1.default.join(dirPath, filePath);
}
async function writePluginTranslations({ siteDir, plugin, locale, translationFile, options, }) {
    const filePath = getPluginTranslationFilePath({
        plugin,
        siteDir,
        locale,
        translationFilePath: translationFile.path,
    });
    await writeTranslationFileContent({
        filePath,
        content: translationFile.content,
        options,
    });
}
exports.writePluginTranslations = writePluginTranslations;
async function localizePluginTranslationFile({ siteDir, plugin, locale, translationFile, }) {
    const filePath = getPluginTranslationFilePath({
        plugin,
        siteDir,
        locale,
        translationFilePath: translationFile.path,
    });
    const localizedContent = await readTranslationFileContent(filePath);
    if (localizedContent) {
        // localized messages "override" default unlocalized messages
        return {
            path: translationFile.path,
            content: {
                ...translationFile.content,
                ...localizedContent,
            },
        };
    }
    else {
        return translationFile;
    }
}
exports.localizePluginTranslationFile = localizePluginTranslationFile;
async function getPluginsDefaultCodeTranslationMessages(plugins) {
    const pluginsMessages = await Promise.all(plugins.map((plugin) => { var _a, _b; return (_b = (_a = plugin.getDefaultCodeTranslationMessages) === null || _a === void 0 ? void 0 : _a.call(plugin)) !== null && _b !== void 0 ? _b : {}; }));
    return pluginsMessages.reduce((allMessages, pluginMessages) => ({ ...allMessages, ...pluginMessages }), {});
}
exports.getPluginsDefaultCodeTranslationMessages = getPluginsDefaultCodeTranslationMessages;
function applyDefaultCodeTranslations({ extractedCodeTranslations, defaultCodeMessages, }) {
    const unusedDefaultCodeMessages = (0, lodash_1.difference)(Object.keys(defaultCodeMessages), Object.keys(extractedCodeTranslations));
    if (unusedDefaultCodeMessages.length > 0) {
        logger_1.default.warn `Unused default message codes found.
Please report this Docusaurus issue. name=${unusedDefaultCodeMessages}`;
    }
    return (0, lodash_1.mapValues)(extractedCodeTranslations, (messageTranslation, messageId) => {
        var _a;
        return ({
            ...messageTranslation,
            message: (_a = defaultCodeMessages[messageId]) !== null && _a !== void 0 ? _a : messageTranslation.message,
        });
    });
}
exports.applyDefaultCodeTranslations = applyDefaultCodeTranslations;
