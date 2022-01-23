/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { RemarkAndRehypePluginOptions } from '@docusaurus/mdx-loader';
import type { Tag, FrontMatterTag, Slugger } from '@docusaurus/utils';
import type { BrokenMarkdownLink as IBrokenMarkdownLink, ContentPaths } from '@docusaurus/utils/lib/markdownLinks';
import type { SidebarItemsGeneratorOption, Sidebars } from './sidebars/types';
export declare type DocFile = {
    contentPath: string;
    filePath: string;
    source: string;
    content: string;
    lastUpdate: LastUpdateData;
};
export declare type VersionName = string;
export declare type VersionMetadata = ContentPaths & {
    versionName: VersionName;
    versionLabel: string;
    versionPath: string;
    tagsPath: string;
    versionEditUrl?: string | undefined;
    versionEditUrlLocalized?: string | undefined;
    versionBanner: VersionBanner | null;
    versionBadge: boolean;
    versionClassName: string;
    isLast: boolean;
    sidebarFilePath: string | false | undefined;
    routePriority: number | undefined;
};
export declare type EditUrlFunction = (editUrlParams: {
    version: string;
    versionDocsDirPath: string;
    docPath: string;
    permalink: string;
    locale: string;
}) => string | undefined;
export declare type MetadataOptions = {
    routeBasePath: string;
    editUrl?: string | EditUrlFunction;
    editCurrentVersion: boolean;
    editLocalizedFiles: boolean;
    showLastUpdateTime?: boolean;
    showLastUpdateAuthor?: boolean;
    numberPrefixParser: NumberPrefixParser;
};
export declare type PathOptions = {
    path: string;
    sidebarPath?: string | false | undefined;
};
export declare type VersionBanner = 'unreleased' | 'unmaintained';
export declare type VersionOptions = {
    path?: string;
    label?: string;
    banner?: 'none' | VersionBanner;
    badge?: boolean;
    className?: string;
};
export declare type VersionsOptions = {
    lastVersion?: string;
    versions: Record<string, VersionOptions>;
    onlyIncludeVersions?: string[];
};
export declare type SidebarOptions = {
    sidebarCollapsible: boolean;
    sidebarCollapsed: boolean;
};
export declare type NormalizeSidebarsParams = SidebarOptions & {
    version: VersionMetadata;
    categoryLabelSlugger: Slugger;
};
export declare type PluginOptions = MetadataOptions & PathOptions & VersionsOptions & RemarkAndRehypePluginOptions & SidebarOptions & {
    id: string;
    include: string[];
    exclude: string[];
    docLayoutComponent: string;
    docItemComponent: string;
    docTagDocListComponent: string;
    docTagsListComponent: string;
    docCategoryGeneratedIndexComponent: string;
    admonitions: Record<string, unknown>;
    disableVersioning: boolean;
    includeCurrentVersion: boolean;
    sidebarItemsGenerator: SidebarItemsGeneratorOption;
    tagsBasePath: string;
};
export declare type LastUpdateData = {
    lastUpdatedAt?: number;
    formattedLastUpdatedAt?: string;
    lastUpdatedBy?: string;
};
export declare type DocFrontMatter = {
    id?: string;
    title?: string;
    tags?: FrontMatterTag[];
    hide_title?: boolean;
    hide_table_of_contents?: boolean;
    keywords?: string[];
    image?: string;
    description?: string;
    slug?: string;
    sidebar_label?: string;
    sidebar_position?: number;
    sidebar_class_name?: string;
    pagination_label?: string;
    custom_edit_url?: string | null;
    parse_number_prefixes?: boolean;
    toc_min_heading_level?: number;
    toc_max_heading_level?: number;
    pagination_next?: string | null;
    pagination_prev?: string | null;
};
export declare type DocMetadataBase = LastUpdateData & {
    id: string;
    unversionedId: string;
    version: VersionName;
    title: string;
    description: string;
    source: string;
    sourceDirName: string;
    slug: string;
    permalink: string;
    sidebarPosition?: number;
    editUrl?: string | null;
    tags: Tag[];
    frontMatter: DocFrontMatter & Record<string, unknown>;
};
export declare type DocNavLink = {
    title: string;
    permalink: string;
};
export declare type DocMetadata = DocMetadataBase & {
    sidebar?: string;
    previous?: DocNavLink;
    next?: DocNavLink;
};
export declare type CategoryGeneratedIndexMetadata = {
    title: string;
    description?: string;
    slug: string;
    permalink: string;
    sidebar: string;
    previous?: DocNavLink;
    next?: DocNavLink;
};
export declare type SourceToPermalink = {
    [source: string]: string;
};
export declare type VersionTag = {
    name: string;
    docIds: string[];
    permalink: string;
};
export declare type VersionTags = {
    [key: string]: VersionTag;
};
export declare type LoadedVersion = VersionMetadata & {
    versionPath: string;
    mainDocId: string;
    docs: DocMetadata[];
    sidebars: Sidebars;
    categoryGeneratedIndices: CategoryGeneratedIndexMetadata[];
};
export declare type LoadedContent = {
    loadedVersions: LoadedVersion[];
};
export declare type GlobalDoc = {
    id: string;
    path: string;
    sidebar: string | undefined;
};
export declare type GlobalVersion = {
    name: VersionName;
    label: string;
    isLast: boolean;
    path: string;
    mainDocId: string;
    docs: GlobalDoc[];
};
export declare type GlobalPluginData = {
    path: string;
    versions: GlobalVersion[];
};
export declare type BrokenMarkdownLink = IBrokenMarkdownLink<VersionMetadata>;
export declare type DocsMarkdownOption = {
    versionsMetadata: VersionMetadata[];
    siteDir: string;
    sourceToPermalink: SourceToPermalink;
    onBrokenMarkdownLink: (brokenMarkdownLink: BrokenMarkdownLink) => void;
};
export declare type NumberPrefixParser = (filename: string) => {
    filename: string;
    numberPrefix?: number;
};
