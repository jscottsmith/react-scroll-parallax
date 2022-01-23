"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateThemeConfig = exports.validateOptions = void 0;
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const utils_validation_1 = require("@docusaurus/utils-validation");
function pluginGoogleAnalytics(context, options) {
    const { trackingID, anonymizeIP } = options;
    const isProd = process.env.NODE_ENV === 'production';
    return {
        name: 'docusaurus-plugin-google-analytics',
        getClientModules() {
            return isProd ? [path_1.default.resolve(__dirname, './analytics')] : [];
        },
        injectHtmlTags() {
            if (!isProd) {
                return {};
            }
            return {
                headTags: [
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'preconnect',
                            href: 'https://www.google-analytics.com',
                        },
                    },
                    // https://developers.google.com/analytics/devguides/collection/analyticsjs/#alternative_async_tag
                    {
                        tagName: 'script',
                        innerHTML: `
              window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
              ga('create', '${trackingID}', 'auto');
              ${anonymizeIP ? "ga('set', 'anonymizeIp', true);\n" : ''}
              ga('send', 'pageview');
            `,
                    },
                    {
                        tagName: 'script',
                        attributes: {
                            async: true,
                            src: 'https://www.google-analytics.com/analytics.js',
                        },
                    },
                ],
            };
        },
    };
}
exports.default = pluginGoogleAnalytics;
const pluginOptionsSchema = utils_validation_1.Joi.object({
    trackingID: utils_validation_1.Joi.string().required(),
    anonymizeIP: utils_validation_1.Joi.boolean().default(false),
});
function validateOptions({ validate, options, }) {
    return validate(pluginOptionsSchema, options);
}
exports.validateOptions = validateOptions;
function validateThemeConfig({ themeConfig, }) {
    if (themeConfig.googleAnalytics) {
        throw new Error('The "googleAnalytics" field in themeConfig should now be specified as option for plugin-google-analytics. More information at https://github.com/facebook/docusaurus/pull/5832.');
    }
    return themeConfig;
}
exports.validateThemeConfig = validateThemeConfig;
