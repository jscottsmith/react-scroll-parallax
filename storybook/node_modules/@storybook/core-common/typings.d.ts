import('@types/compression');

declare module 'lazy-universal-dotenv';
declare module 'pnp-webpack-plugin';
declare module '@storybook/semver';

declare namespace jest {
  interface Matchers<R> {
    toMatchPaths(paths: string[]): R;
  }
}

declare module 'file-system-cache' {
  export interface Options {
    basePath?: string;
    ns?: string | string[];
    extension?: string;
  }

  export declare class FileSystemCache {
    constructor(options: Options);
    path(key: string): string;
    fileExists(key: string): Promise<boolean>;
    ensureBasePath(): Promise<void>;
    get(key: string, defaultValue?: any): Promise<any | typeof defaultValue>;
    getSync(key: string, defaultValue?: any): any | typeof defaultValue;
    set(key: string, value: any): Promise<{ path: string }>;
    setSync(key: string, value: any): this;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    save(): Promise<{ paths: string[] }>;
    load(): Promise<{ files: Array<{ path: string; value: any }> }>;
  }

  function create(options: Options): FileSystemCache;

  export = create;
}
