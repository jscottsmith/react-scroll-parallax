import * as t from '@babel/types';
export declare class ConfigFile {
    _ast: t.File;
    _exports: Record<string, t.Expression>;
    _exportsObject: t.ObjectExpression;
    fileName?: string;
    constructor(ast: t.File, fileName?: string);
    parse(): this;
    getFieldNode(path: string[]): t.Node;
    getFieldValue(path: string[]): any;
    setFieldNode(path: string[], expr: t.Expression): void;
    setFieldValue(path: string[], value: any): void;
}
export declare const loadConfig: (code: string, fileName?: string) => ConfigFile;
export declare const formatConfig: (config: ConfigFile) => string;
export declare const readConfig: (fileName: string) => Promise<ConfigFile>;
export declare const writeConfig: (config: ConfigFile, fileName?: string) => Promise<void>;
