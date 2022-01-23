"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFrontMatter = exports.normalizeThemeConfig = exports.normalizePluginOptions = exports.printWarning = exports.logValidationBugReportHint = exports.isValidationDisabledEscapeHatch = void 0;
const tslib_1 = require("tslib");
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const validationSchemas_1 = require("./validationSchemas");
// TODO temporary escape hatch for alpha-60: to be removed soon
// Our validation schemas might be buggy at first
// will permit users to bypass validation until we fix all validation errors
// see for example: https://github.com/facebook/docusaurus/pull/3120
// Undocumented on purpose, as we don't want users to keep using it over time
// Maybe we'll make this escape hatch official some day, with a better api?
exports.isValidationDisabledEscapeHatch = process.env.DISABLE_DOCUSAURUS_VALIDATION === 'true';
if (exports.isValidationDisabledEscapeHatch) {
    logger_1.default.error `You should avoid using code=${'DISABLE_DOCUSAURUS_VALIDATION'} escape hatch, this will be removed.`;
}
const logValidationBugReportHint = () => {
    logger_1.default.error('A validation error occurred.');
    logger_1.default.info(`The validation system was added recently to Docusaurus as an attempt to avoid user configuration errors.
We may have made some mistakes.
If you think your configuration is valid and should keep working, please open a bug report.`);
};
exports.logValidationBugReportHint = logValidationBugReportHint;
function printWarning(warning) {
    if (warning) {
        const warningMessages = warning.details
            .map(({ message }) => message)
            .join('\n');
        logger_1.default.warn(warningMessages);
    }
}
exports.printWarning = printWarning;
function normalizePluginOptions(schema, options) {
    // All plugins can be provided an "id" option (multi-instance support)
    // we add schema validation automatically
    const finalSchema = schema.append({
        id: validationSchemas_1.PluginIdSchema,
    });
    const { error, warning, value } = finalSchema.validate(options, {
        convert: false,
    });
    printWarning(warning);
    if (error) {
        (0, exports.logValidationBugReportHint)();
        if (exports.isValidationDisabledEscapeHatch) {
            logger_1.default.error(error);
            return options;
        }
        else {
            throw error;
        }
    }
    return value;
}
exports.normalizePluginOptions = normalizePluginOptions;
function normalizeThemeConfig(schema, themeConfig) {
    // A theme should only validate his "slice" of the full themeConfig,
    // not the whole object, so we allow unknown attributes
    // otherwise one theme would fail validating the data of another theme
    const finalSchema = schema.unknown();
    const { error, warning, value } = finalSchema.validate(themeConfig, {
        convert: false,
    });
    printWarning(warning);
    if (error) {
        (0, exports.logValidationBugReportHint)();
        if (exports.isValidationDisabledEscapeHatch) {
            logger_1.default.error(error);
            return themeConfig;
        }
        else {
            throw error;
        }
    }
    return value;
}
exports.normalizeThemeConfig = normalizeThemeConfig;
function validateFrontMatter(frontMatter, schema) {
    const { value, error, warning } = schema.validate(frontMatter, {
        convert: true,
        allowUnknown: true,
        abortEarly: false,
    });
    printWarning(warning);
    if (error) {
        const frontMatterString = JSON.stringify(frontMatter, null, 2);
        const errorDetails = error.details;
        const invalidFields = errorDetails.map(({ path }) => path).join(', ');
        (0, exports.logValidationBugReportHint)();
        logger_1.default.error `The following frontmatter:
${logger_1.default.yellow(frontMatterString)}
contains invalid values for field(s): ${logger_1.default.yellow(invalidFields)}.
${errorDetails.map(({ message }) => message)}
`;
        throw error;
    }
    return value;
}
exports.validateFrontMatter = validateFrontMatter;
//# sourceMappingURL=validationUtils.js.map