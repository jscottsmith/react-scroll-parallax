/// <reference types="react" />
export declare const parameters: {
    docs: {
        inlineStories: boolean;
        getContainer: () => Promise<import("react").FunctionComponent<import("../../blocks").DocsContainerProps<import("@storybook/csf").AnyFramework>>>;
        getPage: () => Promise<import("react").FC<{}>>;
        iframeHeight: number;
    };
};
export declare const argTypesEnhancers: (<TFramework extends import("@storybook/csf").AnyFramework>(context: import("@storybook/csf").StoryContextForEnhancers<TFramework, import("@storybook/csf").Args>) => import("@storybook/csf").StrictArgTypes<import("@storybook/csf").Args> | import("@storybook/addons").Parameters)[];
