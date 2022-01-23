"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importDefault)(require("react"));
const BrowserOnly_1 = (0, tslib_1.__importDefault)(require("@docusaurus/BrowserOnly"));
// avoids "react-json-view" to display  "root"
const RootName = null;
// Seems ReactJson does not work with SSR
// https://github.com/mac-s-g/react-json-view/issues/121
function BrowserOnlyReactJson(props) {
    return (react_1.default.createElement(BrowserOnly_1.default, null, () => {
        // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
        const ReactJson = require('react-json-view').default;
        return react_1.default.createElement(ReactJson, { ...props });
    }));
}
function DebugJsonView({ src, collapseDepth }) {
    return (react_1.default.createElement(BrowserOnlyReactJson, { src: src, style: {
            marginTop: '10px',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#292a2b',
        }, name: RootName, theme: "paraiso", shouldCollapse: (field) => 
        // By default, we collapse the json for performance reasons
        // See https://github.com/mac-s-g/react-json-view/issues/235
        // Non-root elements that are larger than 50 fields are collapsed
        field.name !== RootName && Object.keys(field.src).length > 50, collapsed: collapseDepth, groupArraysAfterLength: 5, enableClipboard: false, displayDataTypes: false }));
}
exports.default = DebugJsonView;
