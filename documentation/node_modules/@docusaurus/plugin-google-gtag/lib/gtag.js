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
const globalData_1 = (0, tslib_1.__importDefault)(require("@generated/globalData"));
exports.default = (function () {
    if (!ExecutionEnvironment_1.default.canUseDOM) {
        return null;
    }
    const { trackingID } = globalData_1.default['docusaurus-plugin-google-gtag']
        .default;
    return {
        onRouteUpdate({ location }) {
            // Always refer to the variable on window in-case it gets overridden elsewhere.
            window.gtag('config', trackingID, {
                page_path: location.pathname,
                page_title: document.title,
            });
            window.gtag('event', 'page_view', {
                page_title: document.title,
                page_location: location.href,
                page_path: location.pathname,
            });
        },
    };
})();
