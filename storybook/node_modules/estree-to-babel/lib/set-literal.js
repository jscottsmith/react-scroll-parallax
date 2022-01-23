'use strict';

const isString = (a) => typeof a === 'string';
const isNumber = (a) => typeof a === 'number';
const isNull = (a) => a === null;
const isBool = (a) => typeof a === 'boolean';

module.exports = (node) => {
    const {value} = node;
    
    if (isNull(value)) {
        node.type = 'NullLiteral';
        return;
    }
    
    if (isString(value)) {
        node.type = 'StringLiteral';
        return;
    }
    
    if (isNumber(value)) {
        node.type = 'NumericLiteral';
        return;
    }
    
    if (isBool(value)) {
        node.type = 'BooleanLiteral';
        return;
    }
    
    if (node.regex) {
        transformRegExp(node);
        return;
    }
};

function transformRegExp(node) {
    node.type = 'RegExpLiteral';
    
    for (const key of Object.keys(node.regex)) {
        node[key] = node.regex[key];
    }
    
    delete node.regex;
}
