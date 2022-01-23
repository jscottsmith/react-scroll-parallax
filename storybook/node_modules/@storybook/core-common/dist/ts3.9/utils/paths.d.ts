export declare const getProjectRoot: () => string;
export declare const nodeModulesPaths: string;
export declare const nodePathsToArray: (nodePath: string) => string[];
/**
 * Ensures that a path starts with `./` or `../`
 */
export declare function normalizeStoryPath(filename: string): string;
