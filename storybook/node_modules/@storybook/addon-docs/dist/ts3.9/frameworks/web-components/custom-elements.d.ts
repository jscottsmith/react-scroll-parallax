import { ArgType } from '@storybook/api';
interface TagItem {
    name: string;
    type: {
        [key: string]: any;
    };
    description: string;
    default?: any;
    kind?: string;
    defaultValue?: any;
}
interface Tag {
    name: string;
    description: string;
    attributes?: TagItem[];
    properties?: TagItem[];
    events?: TagItem[];
    methods?: TagItem[];
    members?: TagItem[];
    slots?: TagItem[];
    cssProperties?: TagItem[];
    cssParts?: TagItem[];
}
interface CustomElements {
    tags: Tag[];
    modules?: [];
}
export declare const extractArgTypesFromElements: (tagName: string, customElements: CustomElements) => {
    [x: string]: ArgType;
};
export declare const extractArgTypes: (tagName: string) => {
    [x: string]: ArgType;
};
export declare const extractComponentDescription: (tagName: string) => string;
export {};
