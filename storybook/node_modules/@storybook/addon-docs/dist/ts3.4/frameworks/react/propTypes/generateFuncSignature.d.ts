import { ExtractedJsDocParam, ExtractedJsDocReturns } from '../../../lib/jsdocParser';
export declare function generateFuncSignature(params: ExtractedJsDocParam[], returns: ExtractedJsDocReturns): string;
export declare function generateShortFuncSignature(params: ExtractedJsDocParam[], returns: ExtractedJsDocReturns): string;
export declare function toMultilineSignature(signature: string): string;
