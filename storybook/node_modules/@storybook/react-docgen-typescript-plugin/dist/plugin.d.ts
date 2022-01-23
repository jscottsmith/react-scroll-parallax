import ts from "typescript";
import * as docGen from "react-docgen-typescript";
import * as webpack from "webpack";
import { LoaderOptions } from "./types";
import { GeneratorOptions } from "./generateDocgenCodeBlock";
interface TypescriptOptions {
    /**
     * Specify the location of the tsconfig.json to use. Can not be used with
     * compilerOptions.
     **/
    tsconfigPath?: string;
    /** Specify TypeScript compiler options. Can not be used with tsconfigPath. */
    compilerOptions?: ts.CompilerOptions;
}
export declare type PluginOptions = docGen.ParserOptions & LoaderOptions & TypescriptOptions & {
    /** Glob patterns to ignore */
    exclude?: string[];
    /** Glob patterns to include. defaults to ts|tsx */
    include?: string[];
};
/** Inject typescript docgen information into modules at the end of a build */
export default class DocgenPlugin implements webpack.WebpackPluginInstance {
    static defaultOptions: {
        setDisplayName: boolean;
        typePropName: string;
        docgenCollectionName: string;
    };
    private name;
    private options;
    constructor(options?: PluginOptions);
    apply(compiler: webpack.Compiler): void;
    applyWebpack5(compiler: webpack.Compiler): void;
    applyWebpack4(compiler: webpack.Compiler): void;
    getOptions(): {
        docgenOptions: docGen.ParserOptions;
        generateOptions: {
            docgenCollectionName: GeneratorOptions["docgenCollectionName"];
            setDisplayName: GeneratorOptions["setDisplayName"];
            typePropName: GeneratorOptions["typePropName"];
        };
        compilerOptions: ts.CompilerOptions;
    };
}
export declare type DocgenPluginType = typeof DocgenPlugin;
export {};
//# sourceMappingURL=plugin.d.ts.map