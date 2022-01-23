"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const module_1 = require("module");
const import_fresh_1 = (0, tslib_1.__importDefault)(require("import-fresh"));
const utils_1 = require("@docusaurus/utils");
const versions_1 = require("../versions");
const pluginIds_1 = require("./pluginIds");
const utils_validation_1 = require("@docusaurus/utils-validation");
function normalizePluginConfig(pluginConfig, pluginRequire) {
    var _a, _b, _c, _d;
    // plugins: ['./plugin']
    if (typeof pluginConfig === 'string') {
        const pluginModuleImport = pluginConfig;
        const pluginPath = pluginRequire.resolve(pluginModuleImport);
        const pluginModule = (0, import_fresh_1.default)(pluginPath);
        return {
            plugin: (_a = pluginModule === null || pluginModule === void 0 ? void 0 : pluginModule.default) !== null && _a !== void 0 ? _a : pluginModule,
            options: {},
            pluginModule: {
                path: pluginModuleImport,
                module: pluginModule,
            },
        };
    }
    // plugins: [function plugin() { }]
    if (typeof pluginConfig === 'function') {
        return {
            plugin: pluginConfig,
            options: {},
        };
    }
    if (Array.isArray(pluginConfig)) {
        // plugins: [
        //   ['./plugin',options],
        // ]
        if (typeof pluginConfig[0] === 'string') {
            const pluginModuleImport = pluginConfig[0];
            const pluginPath = pluginRequire.resolve(pluginModuleImport);
            const pluginModule = (0, import_fresh_1.default)(pluginPath);
            return {
                plugin: (_b = pluginModule === null || pluginModule === void 0 ? void 0 : pluginModule.default) !== null && _b !== void 0 ? _b : pluginModule,
                options: (_c = pluginConfig[1]) !== null && _c !== void 0 ? _c : {},
                pluginModule: {
                    path: pluginModuleImport,
                    module: pluginModule,
                },
            };
        }
        // plugins: [
        //   [function plugin() { },options],
        // ]
        if (typeof pluginConfig[0] === 'function') {
            return {
                plugin: pluginConfig[0],
                options: (_d = pluginConfig[1]) !== null && _d !== void 0 ? _d : {},
            };
        }
    }
    throw new Error(`Unexpected: can't load plugin for following plugin config.\n${JSON.stringify(pluginConfig)}`);
}
function getOptionValidationFunction(normalizedPluginConfig) {
    var _a, _b, _c, _d;
    if (normalizedPluginConfig.pluginModule) {
        // support both commonjs and ES modules
        return ((_c = (_b = (_a = normalizedPluginConfig.pluginModule.module) === null || _a === void 0 ? void 0 : _a.default) === null || _b === void 0 ? void 0 : _b.validateOptions) !== null && _c !== void 0 ? _c : (_d = normalizedPluginConfig.pluginModule.module) === null || _d === void 0 ? void 0 : _d.validateOptions);
    }
    else {
        return normalizedPluginConfig.plugin.validateOptions;
    }
}
function getThemeValidationFunction(normalizedPluginConfig) {
    var _a, _b;
    if (normalizedPluginConfig.pluginModule) {
        // support both commonjs and ES modules
        return ((_b = (_a = normalizedPluginConfig.pluginModule.module.default) === null || _a === void 0 ? void 0 : _a.validateThemeConfig) !== null && _b !== void 0 ? _b : normalizedPluginConfig.pluginModule.module.validateThemeConfig);
    }
    else {
        return normalizedPluginConfig.plugin.validateThemeConfig;
    }
}
function initPlugins({ pluginConfigs, context, }) {
    // We need to resolve plugins from the perspective of the siteDir, since the siteDir's package.json
    // declares the dependency on these plugins.
    const pluginRequire = (0, module_1.createRequire)(context.siteConfigPath);
    function doGetPluginVersion(normalizedPluginConfig) {
        var _a, _b;
        // get plugin version
        if ((_a = normalizedPluginConfig.pluginModule) === null || _a === void 0 ? void 0 : _a.path) {
            const pluginPath = pluginRequire.resolve((_b = normalizedPluginConfig.pluginModule) === null || _b === void 0 ? void 0 : _b.path);
            return (0, versions_1.getPluginVersion)(pluginPath, context.siteDir);
        }
        else {
            return { type: 'local' };
        }
    }
    function doValidateThemeConfig(normalizedPluginConfig) {
        const validateThemeConfig = getThemeValidationFunction(normalizedPluginConfig);
        if (validateThemeConfig) {
            return validateThemeConfig({
                validate: utils_validation_1.normalizeThemeConfig,
                themeConfig: context.siteConfig.themeConfig,
            });
        }
        else {
            return context.siteConfig.themeConfig;
        }
    }
    function doValidatePluginOptions(normalizedPluginConfig) {
        var _a;
        const validateOptions = getOptionValidationFunction(normalizedPluginConfig);
        if (validateOptions) {
            return validateOptions({
                validate: utils_validation_1.normalizePluginOptions,
                options: normalizedPluginConfig.options,
            });
        }
        else {
            // Important to ensure all plugins have an id
            // as we don't go through the Joi schema that adds it
            return {
                ...normalizedPluginConfig.options,
                id: (_a = normalizedPluginConfig.options.id) !== null && _a !== void 0 ? _a : utils_1.DEFAULT_PLUGIN_ID,
            };
        }
    }
    const plugins = pluginConfigs
        .map((pluginConfig) => {
        if (!pluginConfig) {
            return null;
        }
        const normalizedPluginConfig = normalizePluginConfig(pluginConfig, pluginRequire);
        const pluginVersion = doGetPluginVersion(normalizedPluginConfig);
        const pluginOptions = doValidatePluginOptions(normalizedPluginConfig);
        // Side-effect: merge the normalized theme config in the original one
        context.siteConfig.themeConfig = {
            ...context.siteConfig.themeConfig,
            ...doValidateThemeConfig(normalizedPluginConfig),
        };
        const pluginInstance = normalizedPluginConfig.plugin(context, pluginOptions);
        return {
            ...pluginInstance,
            options: pluginOptions,
            version: pluginVersion,
        };
    })
        .filter((item) => Boolean(item));
    (0, pluginIds_1.ensureUniquePluginInstanceIds)(plugins);
    return plugins;
}
exports.default = initPlugins;
