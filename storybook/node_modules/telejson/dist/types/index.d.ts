export interface Options {
    allowRegExp: boolean;
    allowFunction: boolean;
    allowSymbol: boolean;
    allowDate: boolean;
    allowUndefined: boolean;
    allowClass: boolean;
    maxDepth: number;
    space: number | undefined;
    lazyEval: boolean;
}
export declare const isJSON: (input: string) => RegExpMatchArray | null;
export declare const replacer: (options: Options) => (this: any, key: string, value: any) => any;
interface ValueContainer {
    '_constructor-name_'?: string;
    [keys: string]: any;
}
export declare const reviver: (options: Options) => (this: any, key: string, value: ValueContainer | string) => any;
export declare const stringify: (data: unknown, options?: Partial<Options>) => string;
export declare const parse: (data: string, options?: Partial<Options>) => any;
export {};
