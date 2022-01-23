"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateThemeConfig = exports.Schema = void 0;
const utils_validation_1 = require("@docusaurus/utils-validation");
const DEFAULT_CONFIG = {
    contextualSearch: false,
    // By default, all Docusaurus sites are using the same AppId
    // This has been designed on purpose with Algolia.
    appId: 'BH4D9OD16A',
    searchParameters: {},
};
exports.DEFAULT_CONFIG = DEFAULT_CONFIG;
exports.Schema = utils_validation_1.Joi.object({
    algolia: utils_validation_1.Joi.object({
        // Docusaurus attributes
        contextualSearch: utils_validation_1.Joi.boolean().default(DEFAULT_CONFIG.contextualSearch),
        externalUrlRegex: utils_validation_1.Joi.string().optional(),
        // Algolia attributes
        appId: utils_validation_1.Joi.string().default(DEFAULT_CONFIG.appId),
        apiKey: utils_validation_1.Joi.string().required(),
        indexName: utils_validation_1.Joi.string().required(),
        searchParameters: utils_validation_1.Joi.object()
            .default(DEFAULT_CONFIG.searchParameters)
            .unknown(),
    })
        .label('themeConfig.algolia')
        .required()
        .unknown(), // DocSearch 3 is still alpha: don't validate the rest for now
});
function validateThemeConfig({ validate, themeConfig, }) {
    return validate(exports.Schema, themeConfig);
}
exports.validateThemeConfig = validateThemeConfig;
