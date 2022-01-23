/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { TranslationFileContent, TranslationFile, TranslationMessage, InitializedPlugin } from '@docusaurus/types';
export declare type WriteTranslationsOptions = {
    override?: boolean;
    messagePrefix?: string;
};
declare type TranslationContext = {
    siteDir: string;
    locale: string;
};
export declare function ensureTranslationFileContent(content: unknown): asserts content is TranslationFileContent;
export declare function readTranslationFileContent(filePath: string): Promise<TranslationFileContent | undefined>;
export declare function writeTranslationFileContent({ filePath, content: newContent, options, }: {
    filePath: string;
    content: TranslationFileContent;
    options?: WriteTranslationsOptions;
}): Promise<void>;
export declare function getTranslationsDirPath(context: TranslationContext): string;
export declare function getTranslationsLocaleDirPath(context: TranslationContext): string;
export declare function getCodeTranslationsFilePath(context: TranslationContext): string;
export declare function readCodeTranslationFileContent(context: TranslationContext): Promise<TranslationFileContent | undefined>;
export declare function writeCodeTranslations(context: TranslationContext, content: TranslationFileContent, options: WriteTranslationsOptions): Promise<void>;
export declare function writePluginTranslations({ siteDir, plugin, locale, translationFile, options, }: TranslationContext & {
    plugin: InitializedPlugin;
    translationFile: TranslationFile;
    options?: WriteTranslationsOptions;
}): Promise<void>;
export declare function localizePluginTranslationFile({ siteDir, plugin, locale, translationFile, }: TranslationContext & {
    plugin: InitializedPlugin;
    translationFile: TranslationFile;
}): Promise<TranslationFile>;
export declare function getPluginsDefaultCodeTranslationMessages(plugins: InitializedPlugin[]): Promise<Record<string, string>>;
export declare function applyDefaultCodeTranslations({ extractedCodeTranslations, defaultCodeMessages, }: {
    extractedCodeTranslations: Record<string, TranslationMessage>;
    defaultCodeMessages: Record<string, string>;
}): Record<string, TranslationMessage>;
export {};
