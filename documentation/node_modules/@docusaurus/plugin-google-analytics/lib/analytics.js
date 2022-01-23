"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ExecutionEnvironment_1 = (0, tslib_1.__importDefault)(require("@docusaurus/ExecutionEnvironment"));
exports.default = (function () {
    if (!ExecutionEnvironment_1.default.canUseDOM) {
        return null;
    }
    return {
        onRouteUpdate({ location }) {
            // Set page so that subsequent hits on this page are attributed
            // to this page. This is recommended for Single-page Applications.
            window.ga('set', 'page', location.pathname);
            // Always refer to the variable on window in-case it gets
            // overridden elsewhere.
            window.ga('send', 'pageview');
        },
    };
})();
