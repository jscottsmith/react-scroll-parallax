'use strict';

const {convertProgramComments} = require('./comments');

module.exports = (node) => {
    if (node.type === 'File')
        return node;
    
    const {
        comments = [],
        tokens,
        ...program
    } = node;
    
    const ast = {
        type: 'File',
        program: {
            ...program,
            directives: [],
        },
        comments: convertProgramComments(comments),
        tokens,
    };
    
    return ast;
};
