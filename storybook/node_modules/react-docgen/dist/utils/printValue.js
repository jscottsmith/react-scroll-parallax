"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = printValue;

var _stripIndent = _interopRequireDefault(require("strip-indent"));

var _estreeToBabel = _interopRequireDefault(require("estree-to-babel"));

var _generator = _interopRequireDefault(require("@babel/generator"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function deindent(code) {
  const firstNewLine = code.indexOf('\n');
  return code.slice(0, firstNewLine + 1) + // remove indentation from all lines except first.
  (0, _stripIndent.default)(code.slice(firstNewLine + 1));
}

function getSrcFromAst(path) {
  do {
    if (path.node.type === 'File') {
      return path.node.__src;
    }

    path = path.parentPath;
  } while (path != null);

  throw new Error('Could not find source attached to File node');
}
/**
 * Prints the given path without leading or trailing comments.
 */


function printValue(path) {
  if (path.node.start == null) {
    try {
      const nodeCopy = { ...path.node
      }; // `estree-to-babel` expects the `comments` property to exist on the top-level node

      if (!nodeCopy.comments) {
        nodeCopy.comments = [];
      }

      return (0, _generator.default)((0, _estreeToBabel.default)(nodeCopy), {
        comments: false,
        concise: true
      }).code;
    } catch (err) {
      throw new Error(`Cannot print raw value for type '${path.node.type}'. Please report this with an example at https://github.com/reactjs/react-docgen/issues.

Original error:
${err.stack}`);
    }
  }

  const src = getSrcFromAst(path);
  return deindent(src.slice(path.node.start, path.node.end));
}