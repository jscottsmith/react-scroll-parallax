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
const moduleShorthand_1 = require("../moduleShorthand");
function loadPresets(context) {
    // We need to resolve presets from the perspective of the siteDir, since the siteDir's package.json
    // declares the dependency on these presets.
    const presetRequire = (0, module_1.createRequire)(context.siteConfigPath);
    const presets = (context.siteConfig || {}).presets || [];
    const unflatPlugins = [];
    const unflatThemes = [];
    presets.forEach((presetItem) => {
        var _a;
        let presetModuleImport;
        let presetOptions = {};
        if (typeof presetItem === 'string') {
            presetModuleImport = presetItem;
        }
        else if (Array.isArray(presetItem)) {
            [presetModuleImport, presetOptions = {}] = presetItem;
        }
        else {
            throw new Error('Invalid presets format detected in config.');
        }
        const presetName = (0, moduleShorthand_1.resolveModuleName)(presetModuleImport, presetRequire, 'preset');
        const presetModule = (0, import_fresh_1.default)(presetRequire.resolve(presetName));
        const preset = ((_a = presetModule.default) !== null && _a !== void 0 ? _a : presetModule)(context, presetOptions);
        if (preset.plugins) {
            unflatPlugins.push(preset.plugins);
        }
        if (preset.themes) {
            unflatThemes.push(preset.themes);
        }
    });
    return {
        plugins: unflatPlugins.flat().filter(Boolean),
        themes: unflatThemes.flat().filter(Boolean),
    };
}
exports.default = loadPresets;
