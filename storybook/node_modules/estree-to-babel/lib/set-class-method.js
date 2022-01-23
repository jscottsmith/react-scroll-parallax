'use strict';

const {
    isPrivateName,
    classPrivateMethod,
    classMethod,
} = require('@babel/types');

const {assign} = Object;

module.exports = (path) => {
    const {node} = path;
    const {
        key,
        kind,
        computed,
        loc,
    } = node;
    
    const {
        body,
        params,
        expression,
        generator,
    } = node.value;
    
    const method = getClassMethod({
        kind,
        key,
        params,
        body,
        computed,
        nodeStatic: node.static,
    });
    
    path.replaceWith(method);
    assign(path.node, {
        loc,
        expression,
        generator,
    });
};

function getClassMethod({kind, key, params, body, computed, nodeStatic}) {
    if (isPrivateName(key))
        return classPrivateMethod(
            kind,
            key,
            params,
            body,
            computed,
        );
    
    return classMethod(
        kind,
        key,
        params,
        body,
        computed,
        nodeStatic,
    );
}
