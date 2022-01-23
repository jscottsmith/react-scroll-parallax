"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@docusaurus/utils");
const numberPrefix_1 = require("./numberPrefix");
const docs_1 = require("./docs");
function getSlug({ baseID, frontmatterSlug, source, sourceDirName, stripDirNumberPrefixes = true, numberPrefixParser = numberPrefix_1.DefaultNumberPrefixParser, }) {
    function getDirNameSlug() {
        const dirNameStripped = stripDirNumberPrefixes
            ? (0, numberPrefix_1.stripPathNumberPrefixes)(sourceDirName, numberPrefixParser)
            : sourceDirName;
        const resolveDirname = sourceDirName === '.'
            ? '/'
            : (0, utils_1.addLeadingSlash)((0, utils_1.addTrailingSlash)(dirNameStripped));
        return resolveDirname;
    }
    function computeSlug() {
        if (frontmatterSlug === null || frontmatterSlug === void 0 ? void 0 : frontmatterSlug.startsWith('/')) {
            return frontmatterSlug;
        }
        else {
            const dirNameSlug = getDirNameSlug();
            if (!frontmatterSlug && (0, docs_1.isConventionalDocIndex)({ source, sourceDirName })) {
                return dirNameSlug;
            }
            const baseSlug = frontmatterSlug || baseID;
            return (0, utils_1.resolvePathname)(baseSlug, getDirNameSlug());
        }
    }
    function ensureValidSlug(slug) {
        if (!(0, utils_1.isValidPathname)(slug)) {
            throw new Error(`We couldn't compute a valid slug for document with id "${baseID}" in "${sourceDirName}" directory.
The slug we computed looks invalid: ${slug}.
Maybe your slug frontmatter is incorrect or you use weird chars in the file path?
By using the slug frontmatter, you should be able to fix this error, by using the slug of your choice:

Example =>
---
slug: /my/customDocPath
---
`);
        }
        return slug;
    }
    return ensureValidSlug(computeSlug());
}
exports.default = getSlug;
