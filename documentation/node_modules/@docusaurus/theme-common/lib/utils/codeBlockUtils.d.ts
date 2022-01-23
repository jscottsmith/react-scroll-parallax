/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Language } from 'prism-react-renderer';
export declare function parseCodeBlockTitle(metastring?: string): string;
export declare function parseLanguage(className?: string): Language | undefined;
/**
 * @param metastring The highlight range declared here starts at 1
 * @returns Note: all line numbers start at 0, not 1
 */
export declare function parseLines(content: string, metastring?: string, language?: Language): {
    highlightLines: number[];
    code: string;
};
//# sourceMappingURL=codeBlockUtils.d.ts.map