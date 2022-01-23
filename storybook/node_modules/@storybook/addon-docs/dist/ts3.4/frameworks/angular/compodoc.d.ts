import { ArgTypes } from '@storybook/api';
import { Class, CompodocJson, Component, Injectable, Method, Pipe, Property, Directive } from './types';
export declare const isMethod: (methodOrProp: Method | Property) => methodOrProp is Method;
export declare const setCompodocJson: (compodocJson: CompodocJson) => void;
export declare const getCompodocJson: () => CompodocJson;
export declare const checkValidComponentOrDirective: (component: Component | Directive) => void;
export declare const checkValidCompodocJson: (compodocJson: CompodocJson) => void;
export declare const findComponentByName: (name: string, compodocJson: CompodocJson) => Class | Injectable | Pipe | Directive;
export declare const extractType: (property: Property, defaultValue: any) => {
    name: string;
    value?: undefined;
} | {
    name: string;
    value: any[];
};
export declare const extractArgTypesFromData: (componentData: Class | Directive | Injectable | Pipe) => ArgTypes;
export declare const extractArgTypes: (component: Component | Directive) => ArgTypes;
export declare const extractComponentDescription: (component: Component | Directive) => string;
