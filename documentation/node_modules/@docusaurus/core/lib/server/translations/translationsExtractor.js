"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSourceCodeFileTranslations = exports.extractAllSourceCodeFileTranslations = exports.extractSiteSourceCodeTranslations = exports.globSourceCodeFilePaths = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const traverse_1 = (0, tslib_1.__importDefault)(require("@babel/traverse"));
const generator_1 = (0, tslib_1.__importDefault)(require("@babel/generator"));
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const core_1 = require("@babel/core");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const utils_1 = require("@docusaurus/utils");
const utils_2 = require("../utils");
// We only support extracting source code translations from these kind of files
const TranslatableSourceCodeExtension = new Set([
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    // TODO support md/mdx too? (may be overkill)
    // need to compile the MDX to JSX first and remove frontmatter
    // '.md',
    // '.mdx',
]);
function isTranslatableSourceCodePath(filePath) {
    return TranslatableSourceCodeExtension.has(path_1.default.extname(filePath));
}
function getSiteSourceCodeFilePaths(siteDir) {
    return [path_1.default.join(siteDir, utils_1.SRC_DIR_NAME)];
}
function getPluginSourceCodeFilePaths(plugin) {
    var _a, _b, _c;
    // The getPathsToWatch() generally returns the js/jsx/ts/tsx/md/mdx file paths
    // We can use this method as well to know which folders we should try to extract translations from
    // Hacky/implicit, but do we want to introduce a new lifecycle method just for that???
    const codePaths = (_b = (_a = plugin.getPathsToWatch) === null || _a === void 0 ? void 0 : _a.call(plugin)) !== null && _b !== void 0 ? _b : [];
    // We also include theme code
    const themePath = (_c = plugin.getThemePath) === null || _c === void 0 ? void 0 : _c.call(plugin);
    if (themePath) {
        codePaths.push(themePath);
    }
    return codePaths;
}
async function globSourceCodeFilePaths(dirPaths) {
    const filePaths = await (0, utils_2.safeGlobby)(dirPaths);
    return filePaths.filter(isTranslatableSourceCodePath);
}
exports.globSourceCodeFilePaths = globSourceCodeFilePaths;
async function getSourceCodeFilePaths(siteDir, plugins) {
    const sitePaths = getSiteSourceCodeFilePaths(siteDir);
    // The getPathsToWatch() generally returns the js/jsx/ts/tsx/md/mdx file paths
    // We can use this method as well to know which folders we should try to extract translations from
    // Hacky/implicit, but do we want to introduce a new lifecycle method for that???
    const pluginsPaths = plugins.flatMap(getPluginSourceCodeFilePaths);
    const allPaths = [...sitePaths, ...pluginsPaths];
    return globSourceCodeFilePaths(allPaths);
}
async function extractSiteSourceCodeTranslations(siteDir, plugins, babelOptions, extraSourceCodeFilePaths = []) {
    // Should we warn here if the same translation "key" is found in multiple source code files?
    function toTranslationFileContent(sourceCodeFileTranslations) {
        return sourceCodeFileTranslations.reduce((acc, item) => ({ ...acc, ...item.translations }), {});
    }
    const sourceCodeFilePaths = await getSourceCodeFilePaths(siteDir, plugins);
    const allSourceCodeFilePaths = [
        ...sourceCodeFilePaths,
        ...extraSourceCodeFilePaths,
    ];
    const sourceCodeFilesTranslations = await extractAllSourceCodeFileTranslations(allSourceCodeFilePaths, babelOptions);
    logSourceCodeFileTranslationsWarnings(sourceCodeFilesTranslations);
    return toTranslationFileContent(sourceCodeFilesTranslations);
}
exports.extractSiteSourceCodeTranslations = extractSiteSourceCodeTranslations;
function logSourceCodeFileTranslationsWarnings(sourceCodeFilesTranslations) {
    sourceCodeFilesTranslations.forEach(({ sourceCodeFilePath, warnings }) => {
        if (warnings.length > 0) {
            logger_1.default.warn `Translation extraction warnings for file path=${sourceCodeFilePath}: ${warnings}`;
        }
    });
}
async function extractAllSourceCodeFileTranslations(sourceCodeFilePaths, babelOptions) {
    return Promise.all(sourceCodeFilePaths.flatMap((sourceFilePath) => extractSourceCodeFileTranslations(sourceFilePath, babelOptions)));
}
exports.extractAllSourceCodeFileTranslations = extractAllSourceCodeFileTranslations;
async function extractSourceCodeFileTranslations(sourceCodeFilePath, babelOptions) {
    try {
        const code = await fs_extra_1.default.readFile(sourceCodeFilePath, 'utf8');
        const ast = (0, core_1.parse)(code, {
            ...babelOptions,
            ast: true,
            // filename is important, because babel does not process the same files according to their js/ts extensions
            // see  see https://twitter.com/NicoloRibaudo/status/1321130735605002243
            filename: sourceCodeFilePath,
        });
        const translations = await extractSourceCodeAstTranslations(ast, sourceCodeFilePath);
        return translations;
    }
    catch (e) {
        if (e instanceof Error) {
            e.message = `Error while attempting to extract Docusaurus translations from source code file at path=${sourceCodeFilePath}\n${e.message}`;
        }
        throw e;
    }
}
exports.extractSourceCodeFileTranslations = extractSourceCodeFileTranslations;
/*
Need help understanding this?

Useful resources:
https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md
https://github.com/formatjs/formatjs/blob/main/packages/babel-plugin-formatjs/index.ts
https://github.com/pugjs/babel-walk
 */
function extractSourceCodeAstTranslations(ast, sourceCodeFilePath) {
    function sourceWarningPart(node) {
        var _a;
        return `File: ${sourceCodeFilePath} at ${(_a = node.loc) === null || _a === void 0 ? void 0 : _a.start.line} line\nFull code: ${(0, generator_1.default)(node).code}`;
    }
    const translations = {};
    const warnings = [];
    // TODO we should check the presence of the correct @docusaurus imports here!
    (0, traverse_1.default)(ast, {
        JSXElement(path) {
            if (!path
                .get('openingElement')
                .get('name')
                .isJSXIdentifier({ name: 'Translate' })) {
                return;
            }
            function evaluateJSXProp(propName) {
                const attributePath = path
                    .get('openingElement.attributes')
                    .find((attr) => attr.isJSXAttribute() &&
                    attr
                        .get('name')
                        .isJSXIdentifier({ name: propName }));
                if (attributePath) {
                    const attributeValue = attributePath.get('value');
                    const attributeValueEvaluated = attributeValue.isJSXExpressionContainer()
                        ? attributeValue.get('expression').evaluate()
                        : attributeValue.evaluate();
                    if (attributeValueEvaluated.confident &&
                        typeof attributeValueEvaluated.value === 'string') {
                        return attributeValueEvaluated.value;
                    }
                    else {
                        warnings.push(`<Translate> prop=${propName} should be a statically evaluable object.\nExample: <Translate id="optional.id" description="optional description">Message</Translate>\nDynamically constructed values are not allowed, because they prevent translations to be extracted.\n${sourceWarningPart(path.node)}`);
                    }
                }
                return undefined;
            }
            const id = evaluateJSXProp('id');
            const description = evaluateJSXProp('description');
            let message;
            const childrenPath = path.get('children');
            // Handle empty content
            if (!childrenPath.length) {
                if (!id) {
                    warnings.push(`
            <Translate> without children must have id prop.\nExample: <Translate id="my-id" />\n${sourceWarningPart(path.node)}
          `);
                }
                else {
                    translations[id] = {
                        message: message !== null && message !== void 0 ? message : id,
                        ...(description && { description }),
                    };
                }
                return;
            }
            // Handle single non-empty content
            const singleChildren = childrenPath
                // Remove empty/useless text nodes that might be around our translation!
                // Makes the translation system more reliable to JSX formatting issues
                .filter((children) => !(children.isJSXText() &&
                children.node.value.replace('\n', '').trim() === ''))
                .pop();
            const isJSXText = singleChildren && singleChildren.isJSXText();
            const isJSXExpressionContainer = singleChildren &&
                singleChildren.isJSXExpressionContainer() &&
                singleChildren.get('expression').evaluate().confident;
            if (isJSXText || isJSXExpressionContainer) {
                message = isJSXText
                    ? singleChildren.node.value.trim().replace(/\s+/g, ' ')
                    : singleChildren.get('expression').evaluate().value;
                translations[id !== null && id !== void 0 ? id : message] = {
                    message,
                    ...(description && { description }),
                };
            }
            else {
                warnings.push(`Translate content could not be extracted. It has to be a static string and use optional but static props, like <Translate id="my-id" description="my-description">text</Translate>.\n${sourceWarningPart(path.node)}`);
            }
        },
        CallExpression(path) {
            if (!path.get('callee').isIdentifier({ name: 'translate' })) {
                return;
            }
            const args = path.get('arguments');
            if (args.length === 1 || args.length === 2) {
                const firstArgPath = args[0];
                // evaluation allows translate("x" + "y"); to be considered as translate("xy");
                const firstArgEvaluated = firstArgPath.evaluate();
                if (firstArgEvaluated.confident &&
                    typeof firstArgEvaluated.value === 'object') {
                    const { message, id, description } = firstArgEvaluated.value;
                    translations[id !== null && id !== void 0 ? id : message] = {
                        message: message !== null && message !== void 0 ? message : id,
                        ...(description && { description }),
                    };
                }
                else {
                    warnings.push(`translate() first arg should be a statically evaluable object.\nExample: translate({message: "text",id: "optional.id",description: "optional description"}\nDynamically constructed values are not allowed, because they prevent translations to be extracted.\n${sourceWarningPart(path.node)}`);
                }
            }
            else {
                warnings.push(`translate() function only takes 1 or 2 args\n${sourceWarningPart(path.node)}`);
            }
        },
    });
    return { sourceCodeFilePath, translations, warnings };
}
