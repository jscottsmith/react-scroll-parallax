"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.ConfigSchema = exports.DEFAULT_CONFIG = exports.DEFAULT_I18N_CONFIG = void 0;
const tslib_1 = require("tslib");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const utils_1 = require("@docusaurus/utils");
const utils_validation_1 = require("@docusaurus/utils-validation");
const DEFAULT_I18N_LOCALE = 'en';
exports.DEFAULT_I18N_CONFIG = {
    defaultLocale: DEFAULT_I18N_LOCALE,
    locales: [DEFAULT_I18N_LOCALE],
    localeConfigs: {},
};
exports.DEFAULT_CONFIG = {
    i18n: exports.DEFAULT_I18N_CONFIG,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    onDuplicateRoutes: 'warn',
    plugins: [],
    themes: [],
    presets: [],
    customFields: {},
    themeConfig: {},
    titleDelimiter: '|',
    noIndex: false,
    baseUrlIssueBanner: true,
    staticDirectories: [utils_1.STATIC_DIR_NAME],
};
const PluginSchema = utils_validation_1.Joi.alternatives()
    .try(utils_validation_1.Joi.function(), utils_validation_1.Joi.array().ordered(utils_validation_1.Joi.function().required(), utils_validation_1.Joi.object().required()), utils_validation_1.Joi.string(), utils_validation_1.Joi.array()
    .ordered(utils_validation_1.Joi.string().required(), utils_validation_1.Joi.object().required())
    .length(2), utils_validation_1.Joi.bool().equal(false))
    // TODO isn't there a simpler way to customize the default Joi error message???
    // Not sure why Joi makes it complicated to add a custom error message...
    // See https://stackoverflow.com/a/54657686/82609
    .error((errors) => {
    errors.forEach((error) => {
        error.message = ` => Bad Docusaurus plugin value as path [${error.path}].
Example valid plugin config:
{
  plugins: [
    ["@docusaurus/plugin-content-docs",options],
    "./myPlugin",
    ["./myPlugin",{someOption: 42}],
    function myPlugin() { },
    [function myPlugin() { },options]
  ],
};
`;
    });
    return errors;
});
const ThemeSchema = utils_validation_1.Joi.alternatives().try(utils_validation_1.Joi.string(), utils_validation_1.Joi.array().items(utils_validation_1.Joi.string().required(), utils_validation_1.Joi.object().required()).length(2));
const PresetSchema = utils_validation_1.Joi.alternatives().try(utils_validation_1.Joi.string(), utils_validation_1.Joi.array().items(utils_validation_1.Joi.string().required(), utils_validation_1.Joi.object().required()).length(2));
const LocaleConfigSchema = utils_validation_1.Joi.object({
    label: utils_validation_1.Joi.string(),
    direction: utils_validation_1.Joi.string().equal('ltr', 'rtl').default('ltr'),
});
const I18N_CONFIG_SCHEMA = utils_validation_1.Joi.object({
    defaultLocale: utils_validation_1.Joi.string().required(),
    locales: utils_validation_1.Joi.array().items().min(1).items(utils_validation_1.Joi.string().required()).required(),
    localeConfigs: utils_validation_1.Joi.object()
        .pattern(/.*/, LocaleConfigSchema)
        .default(exports.DEFAULT_I18N_CONFIG.localeConfigs),
})
    .optional()
    .default(exports.DEFAULT_I18N_CONFIG);
const SiteUrlSchema = utils_validation_1.URISchema.required().custom((value, helpers) => {
    try {
        const { pathname } = new URL(value);
        if (pathname !== '/') {
            helpers.warn('docusaurus.configValidationWarning', {
                warningMessage: `the url is not supposed to contain a sub-path like '${pathname}', please use the baseUrl field for sub-paths`,
            });
        }
    }
    catch (e) { }
    return value;
}, 'siteUrlCustomValidation');
// TODO move to @docusaurus/utils-validation
exports.ConfigSchema = utils_validation_1.Joi.object({
    baseUrl: utils_validation_1.Joi.string()
        .required()
        .regex(/\/$/m)
        .message('{{#label}} must be a string with a trailing slash.'),
    baseUrlIssueBanner: utils_validation_1.Joi.boolean().default(exports.DEFAULT_CONFIG.baseUrlIssueBanner),
    favicon: utils_validation_1.Joi.string().optional(),
    title: utils_validation_1.Joi.string().required(),
    url: SiteUrlSchema,
    trailingSlash: utils_validation_1.Joi.boolean(),
    i18n: I18N_CONFIG_SCHEMA,
    onBrokenLinks: utils_validation_1.Joi.string()
        .equal('ignore', 'log', 'warn', 'error', 'throw')
        .default(exports.DEFAULT_CONFIG.onBrokenLinks),
    onBrokenMarkdownLinks: utils_validation_1.Joi.string()
        .equal('ignore', 'log', 'warn', 'error', 'throw')
        .default(exports.DEFAULT_CONFIG.onBrokenMarkdownLinks),
    onDuplicateRoutes: utils_validation_1.Joi.string()
        .equal('ignore', 'log', 'warn', 'error', 'throw')
        .default(exports.DEFAULT_CONFIG.onDuplicateRoutes),
    organizationName: utils_validation_1.Joi.string().allow(''),
    staticDirectories: utils_validation_1.Joi.array()
        .items(utils_validation_1.Joi.string())
        .default(exports.DEFAULT_CONFIG.staticDirectories),
    projectName: utils_validation_1.Joi.string().allow(''),
    deploymentBranch: utils_validation_1.Joi.string().optional(),
    customFields: utils_validation_1.Joi.object().unknown().default(exports.DEFAULT_CONFIG.customFields),
    githubHost: utils_validation_1.Joi.string(),
    plugins: utils_validation_1.Joi.array().items(PluginSchema).default(exports.DEFAULT_CONFIG.plugins),
    themes: utils_validation_1.Joi.array().items(ThemeSchema).default(exports.DEFAULT_CONFIG.themes),
    presets: utils_validation_1.Joi.array().items(PresetSchema).default(exports.DEFAULT_CONFIG.presets),
    themeConfig: utils_validation_1.Joi.object().unknown().default(exports.DEFAULT_CONFIG.themeConfig),
    scripts: utils_validation_1.Joi.array().items(utils_validation_1.Joi.string(), utils_validation_1.Joi.object({
        src: utils_validation_1.Joi.string().required(),
        async: utils_validation_1.Joi.bool(),
        defer: utils_validation_1.Joi.bool(),
    })
        // See https://github.com/facebook/docusaurus/issues/3378
        .unknown()),
    ssrTemplate: utils_validation_1.Joi.string(),
    stylesheets: utils_validation_1.Joi.array().items(utils_validation_1.Joi.string(), utils_validation_1.Joi.object({
        href: utils_validation_1.Joi.string().required(),
        type: utils_validation_1.Joi.string(),
    }).unknown()),
    clientModules: utils_validation_1.Joi.array().items(utils_validation_1.Joi.string()),
    tagline: utils_validation_1.Joi.string().allow(''),
    titleDelimiter: utils_validation_1.Joi.string().default('|'),
    noIndex: utils_validation_1.Joi.bool().default(false),
    webpack: utils_validation_1.Joi.object({
        jsLoader: utils_validation_1.Joi.alternatives()
            .try(utils_validation_1.Joi.string().equal('babel'), utils_validation_1.Joi.function())
            .optional(),
    }).optional(),
}).messages({
    'docusaurus.configValidationWarning': 'Docusaurus config validation warning. Field {#label}: {#warningMessage}',
});
// TODO move to @docusaurus/utils-validation
function validateConfig(config) {
    const { error, warning, value } = exports.ConfigSchema.validate(config, {
        abortEarly: false,
    });
    (0, utils_validation_1.printWarning)(warning);
    if (error) {
        (0, utils_validation_1.logValidationBugReportHint)();
        if (utils_validation_1.isValidationDisabledEscapeHatch) {
            logger_1.default.error(error.message);
            return config;
        }
        const unknownFields = error.details.reduce((formattedError, err) => {
            if (err.type === 'object.unknown') {
                return `${formattedError}"${err.path}",`;
            }
            return formattedError;
        }, '');
        let formattedError = error.details.reduce((accumulatedErr, err) => err.type !== 'object.unknown'
            ? `${accumulatedErr}${err.message}\n`
            : accumulatedErr, '');
        formattedError = unknownFields
            ? `${formattedError}These field(s) (${unknownFields}) are not recognized in ${utils_1.DEFAULT_CONFIG_FILE_NAME}.\nIf you still want these fields to be in your configuration, put them in the "customFields" field.\nSee https://docusaurus.io/docs/docusaurus.config.js/#customfields`
            : formattedError;
        throw new Error(formattedError);
    }
    else {
        return value;
    }
}
exports.validateConfig = validateConfig;
