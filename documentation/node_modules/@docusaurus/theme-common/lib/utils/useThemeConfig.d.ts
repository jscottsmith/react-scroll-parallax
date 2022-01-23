/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PrismTheme } from 'prism-react-renderer';
import { CSSProperties } from 'react';
import { DeepPartial } from 'utility-types';
export declare type DocsVersionPersistence = 'localStorage' | 'none';
export declare type NavbarItem = {
    type?: string | undefined;
    items?: NavbarItem[];
    label?: string;
    position?: 'left' | 'right';
} & Record<string, unknown>;
export declare type NavbarLogo = {
    src: string;
    srcDark?: string;
    width?: string | number;
    height?: string | number;
    href?: string;
    target?: string;
    alt?: string;
};
export declare type Navbar = {
    style: 'dark' | 'primary';
    hideOnScroll: boolean;
    title?: string;
    items: NavbarItem[];
    logo?: NavbarLogo;
};
export declare type ColorModeConfig = {
    defaultMode: 'light' | 'dark';
    disableSwitch: boolean;
    respectPrefersColorScheme: boolean;
    switchConfig: {
        darkIcon: string;
        darkIconStyle: CSSProperties;
        lightIcon: string;
        lightIconStyle: CSSProperties;
    };
};
export declare type AnnouncementBarConfig = {
    id: string;
    content: string;
    backgroundColor: string;
    textColor: string;
    isCloseable: boolean;
};
export declare type PrismConfig = {
    theme?: PrismTheme;
    darkTheme?: PrismTheme;
    defaultLanguage?: string;
    additionalLanguages?: string[];
};
export declare type FooterLinkItem = {
    label?: string;
    to?: string;
    href?: string;
    html?: string;
    prependBaseUrlToHref?: string;
};
export declare type FooterBase = {
    style: 'light' | 'dark';
    logo?: {
        alt?: string;
        src?: string;
        srcDark?: string;
        width?: string | number;
        height?: string | number;
        href?: string;
    };
    copyright?: string;
};
export declare type MultiColumnFooter = FooterBase & {
    links: Array<{
        title: string | null;
        items: FooterLinkItem[];
    }>;
};
export declare type SimpleFooter = FooterBase & {
    links: FooterLinkItem[];
};
export declare type Footer = MultiColumnFooter | SimpleFooter;
export declare type TableOfContents = {
    minHeadingLevel: number;
    maxHeadingLevel: number;
};
export declare type ThemeConfig = {
    docs: {
        versionPersistence: DocsVersionPersistence;
    };
    navbar: Navbar;
    colorMode: ColorModeConfig;
    announcementBar?: AnnouncementBarConfig;
    prism: PrismConfig;
    footer?: Footer;
    hideableSidebar: boolean;
    image?: string;
    metadata: Array<Record<string, string>>;
    sidebarCollapsible: boolean;
    tableOfContents: TableOfContents;
};
export declare type UserThemeConfig = DeepPartial<ThemeConfig>;
export declare function useThemeConfig(): ThemeConfig;
//# sourceMappingURL=useThemeConfig.d.ts.map