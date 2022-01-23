/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RouteConfig, ReportingSeverity } from '@docusaurus/types';
declare type BrokenLink = {
    link: string;
    resolvedLink: string;
};
export declare function getAllBrokenLinks({ allCollectedLinks, routes, }: {
    allCollectedLinks: Record<string, string[]>;
    routes: RouteConfig[];
}): Record<string, BrokenLink[]>;
export declare function getBrokenLinksErrorMessage(allBrokenLinks: Record<string, BrokenLink[]>): string | undefined;
export declare function filterExistingFileLinks({ baseUrl, outDir, allCollectedLinks, }: {
    baseUrl: string;
    outDir: string;
    allCollectedLinks: Record<string, string[]>;
}): Promise<Record<string, string[]>>;
export declare function handleBrokenLinks({ allCollectedLinks, onBrokenLinks, routes, baseUrl, outDir, }: {
    allCollectedLinks: Record<string, string[]>;
    onBrokenLinks: ReportingSeverity;
    routes: RouteConfig[];
    baseUrl: string;
    outDir: string;
}): Promise<void>;
export {};
