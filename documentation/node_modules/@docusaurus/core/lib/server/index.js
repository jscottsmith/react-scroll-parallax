"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.load = exports.loadPluginConfigs = exports.loadContext = exports.loadSiteConfig = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("@docusaurus/utils");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const ssr_html_template_1 = (0, tslib_1.__importDefault)(require("../client/templates/ssr.html.template"));
const client_modules_1 = (0, tslib_1.__importDefault)(require("./client-modules"));
const config_1 = (0, tslib_1.__importDefault)(require("./config"));
const plugins_1 = require("./plugins");
const presets_1 = (0, tslib_1.__importDefault)(require("./presets"));
const routes_1 = (0, tslib_1.__importDefault)(require("./routes"));
const html_tags_1 = require("./html-tags");
const versions_1 = require("./versions");
const duplicateRoutes_1 = require("./duplicateRoutes");
const i18n_1 = require("./i18n");
const translations_1 = require("./translations/translations");
const lodash_1 = require("lodash");
const remark_admonitions_1 = (0, tslib_1.__importDefault)(require("remark-admonitions"));
const module_1 = require("module");
const moduleShorthand_1 = require("./moduleShorthand");
async function loadSiteConfig({ siteDir, customConfigFilePath, }) {
    const siteConfigPathUnresolved = customConfigFilePath !== null && customConfigFilePath !== void 0 ? customConfigFilePath : utils_1.DEFAULT_CONFIG_FILE_NAME;
    const siteConfigPath = path_1.default.isAbsolute(siteConfigPathUnresolved)
        ? siteConfigPathUnresolved
        : path_1.default.resolve(siteDir, siteConfigPathUnresolved);
    const siteConfig = await (0, config_1.default)(siteConfigPath);
    return { siteConfig, siteConfigPath };
}
exports.loadSiteConfig = loadSiteConfig;
async function loadContext(siteDir, options = {}) {
    var _a;
    const { customOutDir, locale, customConfigFilePath } = options;
    const generatedFilesDir = path_1.default.isAbsolute(utils_1.GENERATED_FILES_DIR_NAME)
        ? utils_1.GENERATED_FILES_DIR_NAME
        : path_1.default.resolve(siteDir, utils_1.GENERATED_FILES_DIR_NAME);
    const { siteConfig: initialSiteConfig, siteConfigPath } = await loadSiteConfig({
        siteDir,
        customConfigFilePath,
    });
    const { ssrTemplate } = initialSiteConfig;
    const baseOutDir = customOutDir
        ? path_1.default.resolve(customOutDir)
        : path_1.default.resolve(siteDir, utils_1.DEFAULT_BUILD_DIR_NAME);
    const i18n = await (0, i18n_1.loadI18n)(initialSiteConfig, { locale });
    const baseUrl = (0, i18n_1.localizePath)({
        path: initialSiteConfig.baseUrl,
        i18n,
        options,
        pathType: 'url',
    });
    const outDir = (0, i18n_1.localizePath)({
        path: baseOutDir,
        i18n,
        options,
        pathType: 'fs',
    });
    const siteConfig = { ...initialSiteConfig, baseUrl };
    const codeTranslationFileContent = (_a = (await (0, translations_1.readCodeTranslationFileContent)({
        siteDir,
        locale: i18n.currentLocale,
    }))) !== null && _a !== void 0 ? _a : {};
    // We only need key->message for code translations
    const codeTranslations = (0, lodash_1.mapValues)(codeTranslationFileContent, (value) => value.message);
    return {
        siteDir,
        generatedFilesDir,
        siteConfig,
        siteConfigPath,
        outDir,
        baseUrl,
        i18n,
        ssrTemplate,
        codeTranslations,
    };
}
exports.loadContext = loadContext;
function loadPluginConfigs(context) {
    let { plugins: presetPlugins, themes: presetThemes } = (0, presets_1.default)(context);
    const { siteConfig, siteConfigPath } = context;
    const require = (0, module_1.createRequire)(siteConfigPath);
    function normalizeShorthand(pluginConfig, pluginType) {
        var _a;
        if (typeof pluginConfig === 'string') {
            return (0, moduleShorthand_1.resolveModuleName)(pluginConfig, require, pluginType);
        }
        else if (Array.isArray(pluginConfig) &&
            typeof pluginConfig[0] === 'string') {
            return [
                (0, moduleShorthand_1.resolveModuleName)(pluginConfig[0], require, pluginType),
                (_a = pluginConfig[1]) !== null && _a !== void 0 ? _a : {},
            ];
        }
        return pluginConfig;
    }
    presetPlugins = presetPlugins.map((plugin) => normalizeShorthand(plugin, 'plugin'));
    presetThemes = presetThemes.map((theme) => normalizeShorthand(theme, 'theme'));
    const standalonePlugins = (siteConfig.plugins || []).map((plugin) => normalizeShorthand(plugin, 'plugin'));
    const standaloneThemes = (siteConfig.themes || []).map((theme) => normalizeShorthand(theme, 'theme'));
    return [
        ...presetPlugins,
        ...presetThemes,
        // Site config should be the highest priority.
        ...standalonePlugins,
        ...standaloneThemes,
    ];
}
exports.loadPluginConfigs = loadPluginConfigs;
// Make a fake plugin to:
// - Resolve aliased theme components
// - Inject scripts/stylesheets
function createBootstrapPlugin({ siteConfig, }) {
    const { stylesheets = [], scripts = [], clientModules: siteConfigClientModules = [], } = siteConfig;
    return {
        name: 'docusaurus-bootstrap-plugin',
        content: null,
        options: {},
        version: { type: 'synthetic' },
        getClientModules() {
            return siteConfigClientModules;
        },
        injectHtmlTags: () => {
            const stylesheetsTags = stylesheets.map((source) => typeof source === 'string'
                ? `<link rel="stylesheet" href="${source}">`
                : {
                    tagName: 'link',
                    attributes: {
                        rel: 'stylesheet',
                        ...source,
                    },
                });
            const scriptsTags = scripts.map((source) => typeof source === 'string'
                ? `<script src="${source}"></script>`
                : {
                    tagName: 'script',
                    attributes: {
                        ...source,
                    },
                });
            return {
                headTags: [...stylesheetsTags, ...scriptsTags],
            };
        },
    };
}
// Configurer Webpack fallback mdx loader for md/mdx files out of content-plugin folders
// Adds a "fallback" mdx loader for mdx files that are not processed by content plugins
// This allows to do things such as importing repo/README.md as a partial from another doc
// Not ideal solution though, but good enough for now
function createMDXFallbackPlugin({ siteDir, siteConfig, }) {
    return {
        name: 'docusaurus-mdx-fallback-plugin',
        content: null,
        options: {},
        version: { type: 'synthetic' },
        configureWebpack(config, isServer, { getJSLoader }) {
            // We need the mdx fallback loader to exclude files that were already processed by content plugins mdx loaders
            // This works, but a bit hacky...
            // Not sure there's a way to handle that differently in webpack :s
            function getMDXFallbackExcludedPaths() {
                var _a;
                const rules = (_a = config === null || config === void 0 ? void 0 : config.module) === null || _a === void 0 ? void 0 : _a.rules;
                return rules.flatMap((rule) => {
                    const isMDXRule = rule.test instanceof RegExp && rule.test.test('x.mdx');
                    return isMDXRule ? rule.include : [];
                });
            }
            return {
                module: {
                    rules: [
                        {
                            test: /(\.mdx?)$/,
                            exclude: getMDXFallbackExcludedPaths(),
                            use: [
                                getJSLoader({ isServer }),
                                {
                                    loader: require.resolve('@docusaurus/mdx-loader'),
                                    options: {
                                        staticDirs: siteConfig.staticDirectories.map((dir) => path_1.default.resolve(siteDir, dir)),
                                        siteDir,
                                        isMDXPartial: (_filename) => true,
                                        isMDXPartialFrontMatterWarningDisabled: true,
                                        remarkPlugins: [remark_admonitions_1.default],
                                    },
                                },
                            ],
                        },
                    ],
                },
            };
        },
    };
}
async function load(siteDir, options = {}) {
    // Context.
    const context = await loadContext(siteDir, options);
    const { generatedFilesDir, siteConfig, siteConfigPath, outDir, baseUrl, i18n, ssrTemplate, codeTranslations, } = context;
    // Plugins.
    const pluginConfigs = loadPluginConfigs(context);
    const { plugins, pluginsRouteConfigs, globalData, themeConfigTranslated } = await (0, plugins_1.loadPlugins)({ pluginConfigs, context });
    // Side-effect to replace the untranslated themeConfig by the translated one
    context.siteConfig.themeConfig = themeConfigTranslated;
    (0, duplicateRoutes_1.handleDuplicateRoutes)(pluginsRouteConfigs, siteConfig.onDuplicateRoutes);
    // Site config must be generated after plugins
    // We want the generated config to have been normalized by the plugins!
    const genSiteConfig = (0, utils_1.generate)(generatedFilesDir, utils_1.DEFAULT_CONFIG_FILE_NAME, `export default ${JSON.stringify(siteConfig, null, 2)};`);
    plugins.push(createBootstrapPlugin({ siteConfig }));
    plugins.push(createMDXFallbackPlugin({ siteDir, siteConfig }));
    // Load client modules.
    const clientModules = (0, client_modules_1.default)(plugins);
    const genClientModules = (0, utils_1.generate)(generatedFilesDir, 'client-modules.js', `export default [\n${clientModules
        // import() is async so we use require() because client modules can have
        // CSS and the order matters for loading CSS.
        // We need to JSON.stringify so that if its on windows, backslash are escaped.
        .map((module) => `  require(${JSON.stringify(module)}),`)
        .join('\n')}\n];\n`);
    // Load extra head & body html tags.
    const { headTags, preBodyTags, postBodyTags } = (0, html_tags_1.loadHtmlTags)(plugins);
    // Routing.
    const { registry, routesChunkNames, routesConfig, routesPaths } = await (0, routes_1.default)(pluginsRouteConfigs, baseUrl);
    const genRegistry = (0, utils_1.generate)(generatedFilesDir, 'registry.js', `export default {
${Object.keys(registry)
        .sort()
        .map((key) => 
    // We need to JSON.stringify so that if its on windows, backslash are escaped.
    `  '${key}': [${registry[key].loader}, ${JSON.stringify(registry[key].modulePath)}, require.resolveWeak(${JSON.stringify(registry[key].modulePath)})],`)
        .join('\n')}};\n`);
    const genRoutesChunkNames = (0, utils_1.generate)(generatedFilesDir, 'routesChunkNames.json', JSON.stringify(routesChunkNames, null, 2));
    const genRoutes = (0, utils_1.generate)(generatedFilesDir, 'routes.js', routesConfig);
    const genGlobalData = (0, utils_1.generate)(generatedFilesDir, 'globalData.json', JSON.stringify(globalData, null, 2));
    const genI18n = (0, utils_1.generate)(generatedFilesDir, 'i18n.json', JSON.stringify(i18n, null, 2));
    const codeTranslationsWithFallbacks = {
        ...(await (0, translations_1.getPluginsDefaultCodeTranslationMessages)(plugins)),
        ...codeTranslations,
    };
    const genCodeTranslations = (0, utils_1.generate)(generatedFilesDir, 'codeTranslations.json', JSON.stringify(codeTranslationsWithFallbacks, null, 2));
    // Version metadata.
    const siteMetadata = {
        docusaurusVersion: (0, versions_1.getPackageJsonVersion)(path_1.default.join(__dirname, '../../package.json')),
        siteVersion: (0, versions_1.getPackageJsonVersion)(path_1.default.join(siteDir, 'package.json')),
        pluginVersions: {},
    };
    plugins
        .filter(({ version: { type } }) => type !== 'synthetic')
        .forEach(({ name, version }) => {
        siteMetadata.pluginVersions[name] = version;
    });
    checkDocusaurusPackagesVersion(siteMetadata);
    const genSiteMetadata = (0, utils_1.generate)(generatedFilesDir, 'site-metadata.json', JSON.stringify(siteMetadata, null, 2));
    await Promise.all([
        genClientModules,
        genSiteConfig,
        genRegistry,
        genRoutesChunkNames,
        genRoutes,
        genGlobalData,
        genSiteMetadata,
        genI18n,
        genCodeTranslations,
    ]);
    const props = {
        siteConfig,
        siteConfigPath,
        siteMetadata,
        siteDir,
        outDir,
        baseUrl,
        i18n,
        generatedFilesDir,
        routes: pluginsRouteConfigs,
        routesPaths,
        plugins,
        headTags,
        preBodyTags,
        postBodyTags,
        ssrTemplate: ssrTemplate || ssr_html_template_1.default,
        codeTranslations,
    };
    return props;
}
exports.load = load;
// We want all @docusaurus/* packages  to have the exact same version!
// See https://github.com/facebook/docusaurus/issues/3371
// See https://github.com/facebook/docusaurus/pull/3386
function checkDocusaurusPackagesVersion(siteMetadata) {
    const { docusaurusVersion } = siteMetadata;
    Object.entries(siteMetadata.pluginVersions).forEach(([plugin, versionInfo]) => {
        var _a;
        if (versionInfo.type === 'package' &&
            ((_a = versionInfo.name) === null || _a === void 0 ? void 0 : _a.startsWith('@docusaurus/')) &&
            versionInfo.version &&
            versionInfo.version !== docusaurusVersion) {
            // should we throw instead?
            // It still could work with different versions
            logger_1.default.error `Invalid name=${plugin} version number=${versionInfo.version}.
All official @docusaurus/* packages should have the exact same version as @docusaurus/core (number=${docusaurusVersion}).
Maybe you want to check, or regenerate your yarn.lock or package-lock.json file?`;
        }
    });
}
