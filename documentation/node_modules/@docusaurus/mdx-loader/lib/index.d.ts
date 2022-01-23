/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { RemarkAndRehypePluginOptions } from '@docusaurus/mdx-loader';
import type { LoaderContext } from 'webpack';
declare type Options = RemarkAndRehypePluginOptions & {
    staticDirs: string[];
    siteDir: string;
    isMDXPartial?: (filePath: string) => boolean;
    isMDXPartialFrontMatterWarningDisabled?: boolean;
    removeContentTitle?: boolean;
    metadataPath?: string | ((filePath: string) => string);
    createAssets?: (metadata: {
        frontMatter: Record<string, unknown>;
        metadata: Record<string, unknown>;
    }) => Record<string, unknown>;
    filepath: string;
};
export default function mdxLoader(this: LoaderContext<Options>, fileString: string): Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map