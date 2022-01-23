"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const path_1 = require("path");
describe('getPluginVersion', () => {
    it('Can detect external packages plugins versions of correctly.', () => {
        expect((0, __1.getPluginVersion)((0, path_1.join)(__dirname, '..', '__fixtures__', 'dummy-plugin.js'), 
        // Make the plugin appear external.
        (0, path_1.join)(__dirname, '..', '..', '..', '..', '..', '..', 'website'))).toEqual({ type: 'package', version: 'random-version' });
    });
    it('Can detect project plugins versions correctly.', () => {
        expect((0, __1.getPluginVersion)((0, path_1.join)(__dirname, '..', '__fixtures__', 'dummy-plugin.js'), 
        // Make the plugin appear project local.
        (0, path_1.join)(__dirname, '..', '__fixtures__'))).toEqual({ type: 'project' });
    });
    it('Can detect local packages versions correctly.', () => {
        expect((0, __1.getPluginVersion)('/', '/')).toEqual({ type: 'local' });
    });
});
