export interface StoryData {
    viewMode?: string;
    storyId?: string;
    refId?: string;
}
export declare const parsePath: (path: string | undefined) => StoryData;
interface Args {
    [key: string]: any;
}
export declare const DEEPLY_EQUAL: unique symbol;
export declare const deepDiff: (value: any, update: any) => any;
export declare const buildArgsParam: (initialArgs: Args, args: Args) => string;
interface Query {
    [key: string]: any;
}
export declare const queryFromString: (s: string) => Query;
export declare const queryFromLocation: (location: Partial<Location>) => Query;
export declare const stringifyQuery: (query: Query) => any;
declare type Match = {
    path: string;
};
export declare const getMatch: (current: string, target: string, startsWith?: any) => Match | null;
export {};
