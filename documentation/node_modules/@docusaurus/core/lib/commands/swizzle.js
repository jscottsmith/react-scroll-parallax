"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginNames = void 0;
const tslib_1 = require("tslib");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const import_fresh_1 = (0, tslib_1.__importDefault)(require("import-fresh"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const leven_1 = (0, tslib_1.__importDefault)(require("leven"));
const lodash_1 = require("lodash");
const utils_1 = require("@docusaurus/utils");
const server_1 = require("../server");
const init_1 = (0, tslib_1.__importDefault)(require("../server/plugins/init"));
const utils_validation_1 = require("@docusaurus/utils-validation");
function getPluginNames(plugins) {
    return plugins
        .filter((plugin) => typeof plugin === 'string' ||
        (Array.isArray(plugin) && typeof plugin[0] === 'string'))
        .map((plugin) => {
        const pluginPath = Array.isArray(plugin) ? plugin[0] : plugin;
        if (typeof pluginPath === 'string') {
            let packagePath = path_1.default.dirname(pluginPath);
            while (packagePath) {
                if (fs_extra_1.default.existsSync(path_1.default.join(packagePath, 'package.json'))) {
                    break;
                }
                else {
                    packagePath = path_1.default.dirname(packagePath);
                }
            }
            if (packagePath === '.') {
                return pluginPath;
            }
            return (0, import_fresh_1.default)(path_1.default.join(packagePath, 'package.json')).name;
        }
        return '';
    })
        .filter((plugin) => plugin !== '');
}
exports.getPluginNames = getPluginNames;
const formatComponentName = (componentName) => componentName
    .replace(/(\/|\\)index\.(js|tsx|ts|jsx)/, '')
    .replace(/\.(js|tsx|ts|jsx)/, '');
function readComponent(themePath) {
    function walk(dir) {
        let results = [];
        const list = fs_extra_1.default.readdirSync(dir);
        list.forEach((file) => {
            const fullPath = path_1.default.join(dir, file);
            const stat = fs_extra_1.default.statSync(fullPath);
            if (stat && stat.isDirectory()) {
                results = results.concat(walk(fullPath));
            }
            else if (!/\.css|\.d\.ts|\.d\.map/.test(fullPath)) {
                results.push(fullPath);
            }
        });
        return results;
    }
    return walk(themePath).map((filePath) => formatComponentName(path_1.default.relative(themePath, filePath)));
}
// load components from theme based on configurations
function getComponentName(themePath, plugin, danger) {
    var _a, _b;
    // support both commonjs and ES style exports
    const getSwizzleComponentList = (_b = (_a = plugin.default) === null || _a === void 0 ? void 0 : _a.getSwizzleComponentList) !== null && _b !== void 0 ? _b : plugin.getSwizzleComponentList;
    if (getSwizzleComponentList) {
        const allowedComponent = getSwizzleComponentList();
        if (danger) {
            return readComponent(themePath);
        }
        return allowedComponent;
    }
    return readComponent(themePath);
}
function themeComponents(themePath, plugin) {
    const components = colorCode(themePath, plugin);
    if (components.length === 0) {
        return 'No component to swizzle.';
    }
    return `Theme components available for swizzle.

${logger_1.default.green(logger_1.default.bold('green  =>'))} safe: lower breaking change risk
${logger_1.default.red(logger_1.default.bold('red    =>'))} unsafe: higher breaking change risk

${components.join('\n')}
`;
}
function colorCode(themePath, plugin) {
    var _a, _b;
    // support both commonjs and ES style exports
    const getSwizzleComponentList = (_b = (_a = plugin.default) === null || _a === void 0 ? void 0 : _a.getSwizzleComponentList) !== null && _b !== void 0 ? _b : plugin.getSwizzleComponentList;
    const components = readComponent(themePath);
    const allowedComponent = getSwizzleComponentList
        ? getSwizzleComponentList()
        : [];
    const [greenComponents, redComponents] = (0, lodash_1.partition)(components, (comp) => allowedComponent.includes(comp));
    return [
        ...greenComponents.map((component) => `${logger_1.default.green(logger_1.default.bold('safe:'))}   ${component}`),
        ...redComponents.map((component) => `${logger_1.default.red(logger_1.default.bold('unsafe:'))} ${component}`),
    ];
}
async function swizzle(siteDir, themeName, componentName, typescript, danger) {
    var _a, _b, _c, _d, _e;
    const context = await (0, server_1.loadContext)(siteDir);
    const pluginConfigs = (0, server_1.loadPluginConfigs)(context);
    const pluginNames = getPluginNames(pluginConfigs);
    const plugins = (0, init_1.default)({
        pluginConfigs,
        context,
    });
    const themeNames = pluginNames.filter((_, index) => typescript
        ? plugins[index].getTypeScriptThemePath
        : plugins[index].getThemePath);
    if (!themeName) {
        logger_1.default.info `Themes available for swizzle: name=${themeNames}`;
        return;
    }
    let pluginModule;
    try {
        pluginModule = (0, import_fresh_1.default)(themeName);
    }
    catch {
        let suggestion;
        themeNames.forEach((name) => {
            if ((0, leven_1.default)(name, themeName) < 4) {
                suggestion = name;
            }
        });
        logger_1.default.error `Theme name=${themeName} not found. ${suggestion
            ? logger_1.default.interpolate `Did you mean name=${suggestion}?`
            : logger_1.default.interpolate `Themes available for swizzle: ${themeNames}`}`;
        process.exit(1);
    }
    let pluginOptions = {};
    const resolvedThemeName = require.resolve(themeName);
    // find the plugin from list of plugin and get options if specified
    pluginConfigs.forEach((pluginConfig) => {
        // plugin can be a [string], [string,object] or string.
        if (Array.isArray(pluginConfig) && typeof pluginConfig[0] === 'string') {
            if (require.resolve(pluginConfig[0]) === resolvedThemeName) {
                if (pluginConfig.length === 2) {
                    const [, options] = pluginConfig;
                    pluginOptions = options;
                }
            }
        }
    });
    // support both commonjs and ES style exports
    const validateOptions = (_b = (_a = pluginModule.default) === null || _a === void 0 ? void 0 : _a.validateOptions) !== null && _b !== void 0 ? _b : pluginModule.validateOptions;
    if (validateOptions) {
        pluginOptions = validateOptions({
            validate: utils_validation_1.normalizePluginOptions,
            options: pluginOptions,
        });
    }
    // support both commonjs and ES style exports
    const plugin = (_c = pluginModule.default) !== null && _c !== void 0 ? _c : pluginModule;
    const pluginInstance = plugin(context, pluginOptions);
    const themePath = typescript
        ? (_d = pluginInstance.getTypeScriptThemePath) === null || _d === void 0 ? void 0 : _d.call(pluginInstance)
        : (_e = pluginInstance.getThemePath) === null || _e === void 0 ? void 0 : _e.call(pluginInstance);
    if (!themePath) {
        logger_1.default.warn(typescript
            ? logger_1.default.interpolate `name=${themeName} does not provide TypeScript theme code via ${'getTypeScriptThemePath()'}.`
            : logger_1.default.interpolate `name=${themeName} does not provide any theme code.`);
        process.exit(1);
    }
    if (!componentName) {
        logger_1.default.info(themeComponents(themePath, pluginModule));
        return;
    }
    const components = getComponentName(themePath, pluginModule, Boolean(danger));
    const formattedComponentName = formatComponentName(componentName);
    const isComponentExists = components.find((component) => component === formattedComponentName);
    let mostSuitableComponent = componentName;
    if (!isComponentExists) {
        let mostSuitableMatch = componentName;
        let score = formattedComponentName.length;
        components.forEach((component) => {
            if (component.toLowerCase() === formattedComponentName.toLowerCase()) {
                // may be components with same lowercase key, try to match closest component
                const currentScore = (0, leven_1.default)(formattedComponentName, component);
                if (currentScore < score) {
                    score = currentScore;
                    mostSuitableMatch = component;
                }
            }
        });
        if (mostSuitableMatch !== componentName) {
            mostSuitableComponent = mostSuitableMatch;
            logger_1.default.error `Component name=${componentName} doesn't exist.`;
            logger_1.default.info `name=${mostSuitableComponent} is swizzled instead of name=${componentName}.`;
        }
    }
    let fromPath = path_1.default.join(themePath, mostSuitableComponent);
    let toPath = path_1.default.resolve(siteDir, utils_1.THEME_PATH, mostSuitableComponent);
    // Handle single TypeScript/JavaScript file only.
    // E.g: if <fromPath> does not exist, we try to swizzle <fromPath>.(ts|tsx|js) instead
    if (!fs_extra_1.default.existsSync(fromPath)) {
        if (fs_extra_1.default.existsSync(`${fromPath}.ts`)) {
            [fromPath, toPath] = [`${fromPath}.ts`, `${toPath}.ts`];
        }
        else if (fs_extra_1.default.existsSync(`${fromPath}.tsx`)) {
            [fromPath, toPath] = [`${fromPath}.tsx`, `${toPath}.tsx`];
        }
        else if (fs_extra_1.default.existsSync(`${fromPath}.js`)) {
            [fromPath, toPath] = [`${fromPath}.js`, `${toPath}.js`];
        }
        else {
            let suggestion;
            components.forEach((name) => {
                if ((0, leven_1.default)(name, mostSuitableComponent) < 3) {
                    suggestion = name;
                }
            });
            logger_1.default.error `Component name=${mostSuitableComponent} not found. ${suggestion
                ? logger_1.default.interpolate `Did you mean name=${suggestion} ?`
                : themeComponents(themePath, pluginModule)}`;
            process.exit(1);
        }
    }
    if (!components.includes(mostSuitableComponent) && !danger) {
        logger_1.default.error `name=${mostSuitableComponent} is an internal component and has a higher breaking change probability. If you want to swizzle it, use the code=${'--danger'} flag.`;
        process.exit(1);
    }
    await fs_extra_1.default.copy(fromPath, toPath);
    logger_1.default.success `Copied code=${mostSuitableComponent ? `${themeName} ${mostSuitableComponent}` : themeName} to path=${path_1.default.relative(process.cwd(), toPath)}.`;
}
exports.default = swizzle;
