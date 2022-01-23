import { ArgType } from '../blocks';
export interface ControlProps<T> {
    name: string;
    value?: T;
    defaultValue?: T;
    argType?: ArgType;
    onChange: (value: T) => T | void;
    onFocus?: (evt: any) => void;
    onBlur?: (evt: any) => void;
}
export declare type BooleanValue = boolean;
export interface BooleanConfig {
}
export declare type ColorValue = string;
export declare type PresetColor = ColorValue | {
    color: ColorValue;
    title?: string;
};
export interface ColorConfig {
    presetColors?: PresetColor[];
    startOpen?: boolean;
}
export declare type DateValue = Date | number;
export interface DateConfig {
}
export declare type NumberValue = number;
export interface NumberConfig {
    min?: number;
    max?: number;
    step?: number;
}
export declare type RangeConfig = NumberConfig;
export declare type ObjectValue = any;
export interface ObjectConfig {
}
export declare type OptionsSingleSelection = any;
export declare type OptionsMultiSelection = any[];
export declare type OptionsSelection = OptionsSingleSelection | OptionsMultiSelection;
export declare type OptionsArray = any[];
export declare type OptionsObject = Record<string, any>;
export declare type Options = OptionsArray | OptionsObject;
export declare type OptionsControlType = 'radio' | 'inline-radio' | 'check' | 'inline-check' | 'select' | 'multi-select';
export interface OptionsConfig {
    labels: Record<any, string>;
    options: Options;
    type: OptionsControlType;
}
export interface NormalizedOptionsConfig {
    options: OptionsObject;
}
export declare type TextValue = string;
export interface TextConfig {
}
export declare type ControlType = 'array' | 'boolean' | 'color' | 'date' | 'number' | 'range' | 'object' | OptionsControlType | 'text';
export declare type Control = BooleanConfig | ColorConfig | DateConfig | NumberConfig | ObjectConfig | OptionsConfig | RangeConfig | TextConfig;
export declare type Controls = Record<string, Control>;
