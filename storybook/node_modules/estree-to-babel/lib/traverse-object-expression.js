'use strict';

const {assign} = Object;

const {
    isFunctionExpression,
    ObjectMethod,
} = require('@babel/types');

module.exports = (propertiesPaths) => {
    for (const propPath of propertiesPaths) {
        const {
            computed,
            key,
            value,
        } = propPath.node;
        
        if (isFunctionExpression(value)) {
            propPath.replaceWith(ObjectMethod('method', key, value.params, value.body, computed));
            
            assign(propPath.node, {
                id: null,
                method: true,
                generator: value.generator,
                loc: getObjectMethodLoc(key, value),
                async: value.async,
                type: 'ObjectMethod',
            });
        }
    }
};

function getObjectMethodLoc(key, value) {
    return {
        start: key.loc.start,
        end: value.loc.end,
    };
}

