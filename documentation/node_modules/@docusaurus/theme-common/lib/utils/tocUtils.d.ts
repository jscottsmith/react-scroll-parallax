/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TOCItem } from '@docusaurus/types';
declare type FilterTOCParam = {
    toc: readonly TOCItem[];
    minHeadingLevel: number;
    maxHeadingLevel: number;
};
export declare function filterTOC({ toc, minHeadingLevel, maxHeadingLevel, }: FilterTOCParam): TOCItem[];
export declare function useTOCFilter({ toc, minHeadingLevel, maxHeadingLevel, }: FilterTOCParam): readonly TOCItem[];
export {};
//# sourceMappingURL=tocUtils.d.ts.map