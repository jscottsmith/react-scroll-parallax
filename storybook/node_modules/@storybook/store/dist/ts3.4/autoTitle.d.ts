interface NormalizedStoriesSpecifier {
    titlePrefix?: string;
    directory: string;
    files?: string;
    importPathMatcher: RegExp;
}
export declare const autoTitleFromSpecifier: (fileName: string, entry: NormalizedStoriesSpecifier) => string;
export declare const autoTitle: (fileName: string, storiesEntries: NormalizedStoriesSpecifier[]) => string;
export {};
