'use strict';

module.exports.convertNodeComments = (node) => {
    const {comments} = node;
    
    if (!comments)
        return;
    
    delete node.comments;
    node.leadingComments = undefined;
    node.trailingComments = undefined;
    node.innerComments = undefined;
    
    for (const comment of comments) {
        const group = getCommentGroup(comment);
        
        if (!node[group])
            node[group] = [];
        
        delete comment.leading;
        delete comment.trailing;
        comment.type = getCommentType(comment);
        node[group].push(comment);
    }
};

module.exports.convertProgramComments = (comments) => {
    for (const comment of comments) {
        comment.type = getCommentType(comment);
    }
    
    return comments;
};

function getCommentType({type}) {
    return `Comment${type}`;
}

function getCommentGroup({trailing, leading}) {
    if (trailing)
        return 'trailingComments';
    
    if (leading)
        return 'leadingComments';
    
    // Dangling comments, such as `[/* a */]`.
    return 'innerComments';
}

