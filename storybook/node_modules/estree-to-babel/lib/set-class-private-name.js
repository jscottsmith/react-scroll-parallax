'use strict';

const {Identifier} = require('@babel/types');

// acorn stores name in PrivateName.name
// babel stores name in PrivateName.id.name
module.exports = (path) => {
    const {node} = path;
    
    if (!node.name)
        return;
    
    node.id = Identifier(node.name);
    delete node.name;
};

