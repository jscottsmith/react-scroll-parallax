import { ComponentDoc } from "react-docgen-typescript";
export interface GeneratorOptions {
    filename: string;
    source: string;
    componentDocs: ComponentDoc[];
    docgenCollectionName: string | null;
    setDisplayName: boolean;
    typePropName: string;
}
export declare function generateDocgenCodeBlock(options: GeneratorOptions): string;
//# sourceMappingURL=generateDocgenCodeBlock.d.ts.map