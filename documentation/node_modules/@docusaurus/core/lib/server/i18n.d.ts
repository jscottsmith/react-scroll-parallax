/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { I18n, DocusaurusConfig, I18nLocaleConfig } from '@docusaurus/types';
export declare function getDefaultLocaleConfig(locale: string): I18nLocaleConfig;
export declare function shouldWarnAboutNodeVersion(version: number, locales: string[]): boolean;
export declare function loadI18n(config: DocusaurusConfig, options?: {
    locale?: string;
}): Promise<I18n>;
export declare function localizePath({ pathType, path: originalPath, i18n, options, }: {
    pathType: 'fs' | 'url';
    path: string;
    i18n: I18n;
    options?: {
        localizePath?: boolean;
    };
}): string;
