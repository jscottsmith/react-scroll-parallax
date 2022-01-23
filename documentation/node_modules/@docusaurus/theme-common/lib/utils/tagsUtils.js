/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { translate } from '@docusaurus/Translate';
export const translateTagsPageTitle = () => translate({
    id: 'theme.tags.tagsPageTitle',
    message: 'Tags',
    description: 'The title of the tag list page',
});
function getTagLetter(tag) {
    return tag[0].toUpperCase();
}
export function listTagsByLetters(tags) {
    // Group by letters
    const groups = {};
    Object.values(tags).forEach((tag) => {
        var _a;
        const letter = getTagLetter(tag.name);
        groups[letter] = (_a = groups[letter]) !== null && _a !== void 0 ? _a : [];
        groups[letter].push(tag);
    });
    return (Object.entries(groups)
        // Sort letters
        .sort(([letter1], [letter2]) => letter1.localeCompare(letter2))
        .map(([letter, letterTags]) => {
        // Sort tags inside a letter
        const sortedTags = letterTags.sort((tag1, tag2) => tag1.name.localeCompare(tag2.name));
        return { letter, tags: sortedTags };
    }));
}
//# sourceMappingURL=tagsUtils.js.map