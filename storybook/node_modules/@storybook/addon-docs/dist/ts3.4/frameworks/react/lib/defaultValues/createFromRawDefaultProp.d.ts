import { PropDefaultValue } from '@storybook/components';
import { PropDef } from '../../../../lib/docgen';
export declare type TypeResolver = (rawDefaultProp: any, propDef: PropDef) => PropDefaultValue;
export interface TypeResolvers {
    string: TypeResolver;
    object: TypeResolver;
    function: TypeResolver;
    default: TypeResolver;
}
export declare function extractFunctionName(func: Function, propName: string): string;
export declare function createTypeResolvers(customResolvers?: Partial<TypeResolvers>): TypeResolvers;
export declare function createDefaultValueFromRawDefaultProp(rawDefaultProp: any, propDef: PropDef, typeResolvers?: TypeResolvers): PropDefaultValue;
