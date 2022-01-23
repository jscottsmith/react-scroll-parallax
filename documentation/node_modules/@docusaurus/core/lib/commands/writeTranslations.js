"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const server_1 = require("../server");
const init_1 = (0, tslib_1.__importDefault)(require("../server/plugins/init"));
const translations_1 = require("../server/translations/translations");
const translationsExtractor_1 = require("../server/translations/translationsExtractor");
const utils_1 = require("../webpack/utils");
// This is a hack, so that @docusaurus/theme-common translations are extracted!
// A theme doesn't have a way to express that one of its dependency (like @docusaurus/theme-common) also has translations to extract
// Instead of introducing a new lifecycle (like plugin.getThemeTranslationPaths() ?)
// We just make an exception and assume that Docusaurus user is using an official theme
async function getExtraSourceCodeFilePaths() {
    try {
        const themeCommonSourceDir = path_1.default.dirname(require.resolve('@docusaurus/theme-common/lib'));
        return (0, translationsExtractor_1.globSourceCodeFilePaths)([themeCommonSourceDir]);
    }
    catch (e) {
        return []; // User may not use a Docusaurus official theme? Quite unlikely...
    }
}
async function writePluginTranslationFiles({ siteDir, plugin, locale, options, }) {
    var _a;
    if (plugin.getTranslationFiles) {
        const content = await ((_a = plugin.loadContent) === null || _a === void 0 ? void 0 : _a.call(plugin));
        const translationFiles = await plugin.getTranslationFiles({
            content,
        });
        await Promise.all(translationFiles.map(async (translationFile) => {
            await (0, translations_1.writePluginTranslations)({
                siteDir,
                plugin,
                translationFile,
                locale,
                options,
            });
        }));
    }
}
async function writeTranslations(siteDir, options) {
    var _a;
    const context = await (0, server_1.loadContext)(siteDir, {
        customConfigFilePath: options.config,
        locale: options.locale,
    });
    const pluginConfigs = (0, server_1.loadPluginConfigs)(context);
    const plugins = (0, init_1.default)({
        pluginConfigs,
        context,
    });
    const locale = (_a = options.locale) !== null && _a !== void 0 ? _a : context.i18n.defaultLocale;
    if (!context.i18n.locales.includes(locale)) {
        throw new Error(`Can't write-translation for locale "${locale}" that is not in the locale configuration file.
Available locales are: ${context.i18n.locales.join(',')}.`);
    }
    const babelOptions = (0, utils_1.getBabelOptions)({
        isServer: true,
        babelOptions: (0, utils_1.getCustomBabelConfigFilePath)(siteDir),
    });
    const extractedCodeTranslations = await (0, translationsExtractor_1.extractSiteSourceCodeTranslations)(siteDir, plugins, babelOptions, await getExtraSourceCodeFilePaths());
    const defaultCodeMessages = await (0, translations_1.getPluginsDefaultCodeTranslationMessages)(plugins);
    const codeTranslations = (0, translations_1.applyDefaultCodeTranslations)({
        extractedCodeTranslations,
        defaultCodeMessages,
    });
    await (0, translations_1.writeCodeTranslations)({ siteDir, locale }, codeTranslations, options);
    await Promise.all(plugins.map(async (plugin) => {
        await writePluginTranslationFiles({ siteDir, plugin, locale, options });
    }));
}
exports.default = writeTranslations;
