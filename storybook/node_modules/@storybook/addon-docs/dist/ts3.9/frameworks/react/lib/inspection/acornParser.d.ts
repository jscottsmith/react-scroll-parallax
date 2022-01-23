import { InspectionInferedType } from './types';
interface ParsingResult<T> {
    inferredType: T;
    ast: any;
}
export declare function parse(value: string): ParsingResult<InspectionInferedType>;
export {};
