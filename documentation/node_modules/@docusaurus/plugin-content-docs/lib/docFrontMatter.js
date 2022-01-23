"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDocFrontMatter = void 0;
const utils_validation_1 = require("@docusaurus/utils-validation");
// NOTE: we don't add any default value on purpose here
// We don't want default values to magically appear in doc metadata and props
// While the user did not provide those values explicitly
// We use default values in code instead
const DocFrontMatterSchema = utils_validation_1.JoiFrontMatter.object({
    id: utils_validation_1.JoiFrontMatter.string(),
    title: utils_validation_1.JoiFrontMatter.string().allow(''),
    hide_title: utils_validation_1.JoiFrontMatter.boolean(),
    hide_table_of_contents: utils_validation_1.JoiFrontMatter.boolean(),
    keywords: utils_validation_1.JoiFrontMatter.array().items(utils_validation_1.JoiFrontMatter.string().required()),
    image: utils_validation_1.URISchema,
    description: utils_validation_1.JoiFrontMatter.string().allow(''),
    slug: utils_validation_1.JoiFrontMatter.string(),
    sidebar_label: utils_validation_1.JoiFrontMatter.string(),
    sidebar_position: utils_validation_1.JoiFrontMatter.number(),
    sidebar_class_name: utils_validation_1.JoiFrontMatter.string(),
    tags: utils_validation_1.FrontMatterTagsSchema,
    pagination_label: utils_validation_1.JoiFrontMatter.string(),
    custom_edit_url: utils_validation_1.URISchema.allow('', null),
    parse_number_prefixes: utils_validation_1.JoiFrontMatter.boolean(),
    pagination_next: utils_validation_1.JoiFrontMatter.string().allow(null),
    pagination_prev: utils_validation_1.JoiFrontMatter.string().allow(null),
    ...utils_validation_1.FrontMatterTOCHeadingLevels,
}).unknown();
function validateDocFrontMatter(frontMatter) {
    return (0, utils_validation_1.validateFrontMatter)(frontMatter, DocFrontMatterSchema);
}
exports.validateDocFrontMatter = validateDocFrontMatter;
