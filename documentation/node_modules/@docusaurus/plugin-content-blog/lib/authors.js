"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogPostAuthors = exports.getAuthorsMap = exports.getAuthorsMapFilePath = exports.readAuthorsMapFile = exports.validateAuthorsMapFile = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = (0, tslib_1.__importDefault)(require("fs-extra"));
const logger_1 = (0, tslib_1.__importDefault)(require("@docusaurus/logger"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const utils_1 = require("@docusaurus/utils");
const utils_validation_1 = require("@docusaurus/utils-validation");
const blogUtils_1 = require("./blogUtils");
const js_yaml_1 = (0, tslib_1.__importDefault)(require("js-yaml"));
const AuthorsMapSchema = utils_validation_1.Joi.object().pattern(utils_validation_1.Joi.string(), utils_validation_1.Joi.object({
    name: utils_validation_1.Joi.string().required(),
    url: utils_validation_1.URISchema,
    imageURL: utils_validation_1.URISchema,
    title: utils_validation_1.Joi.string(),
})
    .rename('image_url', 'imageURL')
    .unknown()
    .required());
function validateAuthorsMapFile(content) {
    return utils_validation_1.Joi.attempt(content, AuthorsMapSchema);
}
exports.validateAuthorsMapFile = validateAuthorsMapFile;
async function readAuthorsMapFile(filePath) {
    if (await fs_extra_1.default.pathExists(filePath)) {
        const contentString = await fs_extra_1.default.readFile(filePath, { encoding: 'utf8' });
        try {
            const unsafeContent = js_yaml_1.default.load(contentString);
            return validateAuthorsMapFile(unsafeContent);
        }
        catch (e) {
            // TODO replace later by error cause: see https://v8.dev/features/error-cause
            logger_1.default.error('The author list file looks invalid!');
            throw e;
        }
    }
    return undefined;
}
exports.readAuthorsMapFile = readAuthorsMapFile;
async function getAuthorsMapFilePath({ authorsMapPath, contentPaths, }) {
    // Useful to load an eventually localize authors map
    const contentPath = await (0, utils_1.findFolderContainingFile)((0, blogUtils_1.getContentPathList)(contentPaths), authorsMapPath);
    if (contentPath) {
        return path_1.default.join(contentPath, authorsMapPath);
    }
    return undefined;
}
exports.getAuthorsMapFilePath = getAuthorsMapFilePath;
async function getAuthorsMap(params) {
    const filePath = await getAuthorsMapFilePath(params);
    if (!filePath) {
        return undefined;
    }
    try {
        return await readAuthorsMapFile(filePath);
    }
    catch (e) {
        // TODO replace later by error cause, see https://v8.dev/features/error-cause
        logger_1.default.error `Couldn't read blog authors map at path=${filePath}`;
        throw e;
    }
}
exports.getAuthorsMap = getAuthorsMap;
// Legacy v1/early-v2 frontmatter fields
// We may want to deprecate those in favor of using only frontMatter.authors
function getFrontMatterAuthorLegacy(frontMatter) {
    var _a, _b, _c;
    const name = frontMatter.author;
    const title = (_a = frontMatter.author_title) !== null && _a !== void 0 ? _a : frontMatter.authorTitle;
    const url = (_b = frontMatter.author_url) !== null && _b !== void 0 ? _b : frontMatter.authorURL;
    const imageURL = (_c = frontMatter.author_image_url) !== null && _c !== void 0 ? _c : frontMatter.authorImageURL;
    // Shouldn't we require at least an author name?
    if (name || title || url || imageURL) {
        return {
            name,
            title,
            url,
            imageURL,
        };
    }
    return undefined;
}
function normalizeFrontMatterAuthors(frontMatterAuthors = []) {
    function normalizeAuthor(authorInput) {
        if (typeof authorInput === 'string') {
            // Technically, we could allow users to provide an author's name here
            // IMHO it's better to only support keys here
            // Reason: a typo in a key would fallback to becoming a name and may end-up un-noticed
            return { key: authorInput };
        }
        return authorInput;
    }
    return Array.isArray(frontMatterAuthors)
        ? frontMatterAuthors.map(normalizeAuthor)
        : [normalizeAuthor(frontMatterAuthors)];
}
function getFrontMatterAuthors(params) {
    const { authorsMap } = params;
    const frontMatterAuthors = normalizeFrontMatterAuthors(params.frontMatter.authors);
    function getAuthorsMapAuthor(key) {
        if (key) {
            if (!authorsMap || Object.keys(authorsMap).length === 0) {
                throw new Error(`Can't reference blog post authors by a key (such as '${key}') because no authors map file could be loaded.
Please double-check your blog plugin config (in particular 'authorsMapPath'), ensure the file exists at the configured path, is not empty, and is valid!`);
            }
            const author = authorsMap[key];
            if (!author) {
                throw Error(`Blog author with key "${key}" not found in the authors map file.
Valid author keys are:
${Object.keys(authorsMap)
                    .map((validKey) => `- ${validKey}`)
                    .join('\n')}`);
            }
            return author;
        }
        return undefined;
    }
    function toAuthor(frontMatterAuthor) {
        return {
            // Author def from authorsMap can be locally overridden by frontmatter
            ...getAuthorsMapAuthor(frontMatterAuthor.key),
            ...frontMatterAuthor,
        };
    }
    return frontMatterAuthors.map(toAuthor);
}
function getBlogPostAuthors(params) {
    const authorLegacy = getFrontMatterAuthorLegacy(params.frontMatter);
    const authors = getFrontMatterAuthors(params);
    if (authorLegacy) {
        // Technically, we could allow mixing legacy/authors frontmatter, but do we really want to?
        if (authors.length > 0) {
            throw new Error(`To declare blog post authors, use the 'authors' FrontMatter in priority.
Don't mix 'authors' with other existing 'author_*' FrontMatter. Choose one or the other, not both at the same time.`);
        }
        return [authorLegacy];
    }
    return authors;
}
exports.getBlogPostAuthors = getBlogPostAuthors;
