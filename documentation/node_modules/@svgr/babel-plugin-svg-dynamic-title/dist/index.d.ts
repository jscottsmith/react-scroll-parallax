import { NodePath, types } from '@babel/core';

declare const plugin: () => {
    visitor: {
        JSXElement(path: NodePath<types.JSXElement>): void;
    };
};

export { plugin as default };
