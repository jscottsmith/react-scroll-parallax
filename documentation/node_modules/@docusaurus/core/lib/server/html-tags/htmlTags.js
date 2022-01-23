"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const html_tags_1 = (0, tslib_1.__importDefault)(require("html-tags"));
const void_1 = (0, tslib_1.__importDefault)(require("html-tags/void"));
const escape_html_1 = (0, tslib_1.__importDefault)(require("escape-html"));
function assertIsHtmlTagObject(val) {
    if (!(0, lodash_1.isPlainObject)(val)) {
        throw new Error(`"${val}" is not a valid HTML tag object.`);
    }
    if (typeof val.tagName !== 'string') {
        throw new Error(`${JSON.stringify(val)} is not a valid HTML tag object. "tagName" must be defined as a string.`);
    }
}
function htmlTagObjectToString(tagDefinition) {
    assertIsHtmlTagObject(tagDefinition);
    if (html_tags_1.default.indexOf(tagDefinition.tagName) === -1) {
        throw new Error(`Error loading ${JSON.stringify(tagDefinition)}, "${tagDefinition.tagName}" is not a valid HTML tags.`);
    }
    const isVoidTag = void_1.default.indexOf(tagDefinition.tagName) !== -1;
    const tagAttributes = tagDefinition.attributes || {};
    const attributes = Object.keys(tagAttributes)
        .filter((attributeName) => tagAttributes[attributeName] !== false)
        .map((attributeName) => {
        if (tagAttributes[attributeName] === true) {
            return attributeName;
        }
        return `${attributeName}="${(0, escape_html_1.default)(tagAttributes[attributeName])}"`;
    });
    return `<${[tagDefinition.tagName].concat(attributes).join(' ')}>${(!isVoidTag && tagDefinition.innerHTML) || ''}${isVoidTag ? '' : `</${tagDefinition.tagName}>`}`;
}
exports.default = htmlTagObjectToString;
