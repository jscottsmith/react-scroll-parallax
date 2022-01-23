"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.localizePath = exports.loadI18n = exports.shouldWarnAboutNodeVersion = exports.getDefaultLocaleConfig = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const utils_1 = require("@docusaurus/utils");
const rtl_detect_1 = require("rtl-detect");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
function getDefaultLocaleLabel(locale) {
    // Intl.DisplayNames is ES2021 - Node14+
    // https://v8.dev/features/intl-displaynames
    if (typeof Intl.DisplayNames !== 'undefined') {
        const languageName = new Intl.DisplayNames(locale, { type: 'language' }).of(locale);
        return (languageName.charAt(0).toLocaleUpperCase(locale) +
            languageName.substring(1));
    }
    return locale;
}
function getDefaultLocaleConfig(locale) {
    return {
        label: getDefaultLocaleLabel(locale),
        direction: (0, rtl_detect_1.getLangDir)(locale),
    };
}
exports.getDefaultLocaleConfig = getDefaultLocaleConfig;
function shouldWarnAboutNodeVersion(version, locales) {
    const isOnlyEnglish = locales.length === 1 && locales.includes('en');
    const isOlderNodeVersion = version < 14;
    return isOlderNodeVersion && !isOnlyEnglish;
}
exports.shouldWarnAboutNodeVersion = shouldWarnAboutNodeVersion;
async function loadI18n(config, options = {}) {
    var _a;
    const { i18n: i18nConfig } = config;
    const currentLocale = (_a = options.locale) !== null && _a !== void 0 ? _a : i18nConfig.defaultLocale;
    if (!i18nConfig.locales.includes(currentLocale)) {
        logger_1.default.warn `The locale name=${currentLocale} was not found in your site configuration: Available locales are: ${i18nConfig.locales}
Note: Docusaurus only support running one locale at a time.`;
    }
    const locales = i18nConfig.locales.includes(currentLocale)
        ? i18nConfig.locales
        : i18nConfig.locales.concat(currentLocale);
    function getLocaleConfig(locale) {
        return {
            ...getDefaultLocaleConfig(locale),
            ...i18nConfig.localeConfigs[locale],
        };
    }
    const localeConfigs = locales.reduce((acc, locale) => ({ ...acc, [locale]: getLocaleConfig(locale) }), {});
    return {
        defaultLocale: i18nConfig.defaultLocale,
        locales,
        currentLocale,
        localeConfigs,
    };
}
exports.loadI18n = loadI18n;
function localizePath({ pathType, path: originalPath, i18n, options = {}, }) {
    const shouldLocalizePath = typeof options.localizePath === 'undefined'
        ? // By default, we don't localize the path of defaultLocale
            i18n.currentLocale !== i18n.defaultLocale
        : options.localizePath;
    if (shouldLocalizePath) {
        // FS paths need special care, for Windows support
        if (pathType === 'fs') {
            return path_1.default.join(originalPath, path_1.default.sep, i18n.currentLocale, path_1.default.sep);
        }
        // Url paths
        else if (pathType === 'url') {
            return (0, utils_1.normalizeUrl)([originalPath, '/', i18n.currentLocale, '/']);
        }
        // should never happen
        else {
            throw new Error(`Unhandled path type "${pathType}".`);
        }
    }
    else {
        return originalPath;
    }
}
exports.localizePath = localizePath;
