"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginOptionSchema = exports.DEFAULT_OPTIONS = void 0;
const utils_validation_1 = require("@docusaurus/utils-validation");
const sitemap_1 = require("sitemap");
exports.DEFAULT_OPTIONS = {
    changefreq: sitemap_1.EnumChangefreq.WEEKLY,
    priority: 0.5,
    trailingSlash: false,
};
exports.PluginOptionSchema = utils_validation_1.Joi.object({
    // TODO temporary (@alpha-71)
    cacheTime: utils_validation_1.Joi.forbidden().messages({
        'any.unknown': 'Option `cacheTime` in sitemap config is deprecated. Please remove it.',
    }),
    changefreq: utils_validation_1.Joi.string()
        .valid(...Object.values(sitemap_1.EnumChangefreq))
        .default(exports.DEFAULT_OPTIONS.changefreq),
    priority: utils_validation_1.Joi.number().min(0).max(1).default(exports.DEFAULT_OPTIONS.priority),
    trailingSlash: utils_validation_1.Joi.bool().default(false).warning('deprecate.error', {
        msg: 'Please use the new Docusaurus global trailingSlash config instead, and the sitemaps plugin will use it.',
    }),
}).messages({
    'deprecate.error': 'Option {#label} of the sitemap plugin is deprecated: {#msg}',
});
