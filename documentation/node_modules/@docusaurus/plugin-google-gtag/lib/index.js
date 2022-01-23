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
function pluginGoogleGtag(context, options) {
    const { anonymizeIP, trackingID } = options;
    const isProd = process.env.NODE_ENV === 'production';
    return {
        name: 'docusaurus-plugin-google-gtag',
        async contentLoaded({ actions }) {
            actions.setGlobalData(options);
        },
        getClientModules() {
            return isProd ? [path_1.default.resolve(__dirname, './gtag')] : [];
        },
        injectHtmlTags() {
            if (!isProd) {
                return {};
            }
            return {
                // Gtag includes GA by default, so we also preconnect to google-analytics.
                headTags: [
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'preconnect',
                            href: 'https://www.google-analytics.com',
                        },
                    },
                    {
                        tagName: 'link',
                        attributes: {
                            rel: 'preconnect',
                            href: 'https://www.googletagmanager.com',
                        },
                    },
                    // https://developers.google.com/analytics/devguides/collection/gtagjs/#install_the_global_site_tag
                    {
                        tagName: 'script',
                        attributes: {
                            async: true,
                            src: `https://www.googletagmanager.com/gtag/js?id=${trackingID}`,
                        },
                    },
                    {
                        tagName: 'script',
                        innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${trackingID}', { ${anonymizeIP ? "'anonymize_ip': true" : ''} });`,
                    },
                ],
            };
        },
    };
}
exports.default = pluginGoogleGtag;
const pluginOptionsSchema = utils_validation_1.Joi.object({
    trackingID: utils_validation_1.Joi.string().required(),
    anonymizeIP: utils_validation_1.Joi.boolean().default(false),
});
function validateOptions({ validate, options, }) {
    return validate(pluginOptionsSchema, options);
}
exports.validateOptions = validateOptions;
function validateThemeConfig({ themeConfig, }) {
    if (themeConfig.gtag) {
        throw new Error('The "gtag" field in themeConfig should now be specified as option for plugin-google-gtag. More information at https://github.com/facebook/docusaurus/pull/5832.');
    }
    return themeConfig;
}
exports.validateThemeConfig = validateThemeConfig;
