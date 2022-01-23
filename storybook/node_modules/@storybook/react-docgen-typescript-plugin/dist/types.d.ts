export interface Module {
    userRequest: string;
    request: string;
    built?: boolean;
    rawRequest?: string;
    external?: boolean;
    _source: {
        _value: string;
    };
}
export interface LoaderOptions {
    /**
     * Specify the docgen collection name to use. All docgen information will
     * be collected into this global object. Set to null to disable.
     *
     * @default STORYBOOK_REACT_CLASSES
     * @see https://github.com/gongreg/react-storybook-addon-docgen
     **/
    docgenCollectionName?: string | null;
    /**
     * Automatically set the component's display name. If you want to set display
     * names yourself or are using another plugin to do this, you should disable
     * this option.
     *
     * ```
     * class MyComponent extends React.Component {
     * ...
     * }
     *
     * MyComponent.displayName = "MyComponent";
     * ```
     *
     * @default true
     */
    setDisplayName?: boolean;
    /**
     * Specify the name of the property for docgen info prop type.
     *
     * @default "type"
     */
    typePropName?: string;
}
//# sourceMappingURL=types.d.ts.map