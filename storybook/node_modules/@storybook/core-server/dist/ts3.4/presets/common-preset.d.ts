import { Options } from '@storybook/core-common';
export declare const babel: (_: unknown, options: Options) => Promise<{}>;
export declare const logLevel: (previous: any, options: Options) => any;
export declare const previewHead: (base: any, { configDir, presets }: Options) => Promise<string>;
export declare const env: () => Promise<Record<string, string>>;
export declare const previewBody: (base: any, { configDir, presets }: Options) => Promise<string>;
export declare const previewMainTemplate: () => string;
export declare const managerMainTemplate: () => string;
export declare const previewEntries: (entries: any[], options: {
    modern?: boolean;
}) => any[];
export declare const typescript: () => {
    check: boolean;
    reactDocgen: string;
    reactDocgenTypescriptOptions: {
        shouldExtractLiteralValuesFromEnum: boolean;
        shouldRemoveUndefinedFromOptional: boolean;
        propFilter: (prop: any) => boolean;
        savePropValueAsString: boolean;
    };
};
export declare const features: (existing: Record<string, boolean>) => Promise<{
    postcss: boolean;
    emotionAlias: boolean;
    warnOnLegacyHierarchySeparator: boolean;
}>;
