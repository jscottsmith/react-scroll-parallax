"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;
exports.ERROR_MISSING_DEFINITION = void 0;

var _Documentation = _interopRequireDefault(require("./Documentation"));

var _postProcessDocumentation = _interopRequireDefault(require("./utils/postProcessDocumentation"));

var _babelParser = _interopRequireDefault(require("./babelParser"));

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const ERROR_MISSING_DEFINITION = 'No suitable component definition found.';
exports.ERROR_MISSING_DEFINITION = ERROR_MISSING_DEFINITION;

function executeHandlers(handlers, componentDefinitions, parser) {
  return componentDefinitions.map(componentDefinition => {
    const documentation = new _Documentation.default();
    handlers.forEach(handler => handler(documentation, componentDefinition, parser));
    return (0, _postProcessDocumentation.default)(documentation.toObject());
  });
}
/**
 * Takes JavaScript source code and returns an object with the information
 * extract from it.
 *
 * `resolver` is a strategy to find the AST node(s) of the component
 * definition(s) inside `src`.
 * It is a function that gets passed the program AST node of
 * the source as first argument, and a reference to the parser as second argument.
 *
 * This allows you define your own strategy for finding component definitions.
 *
 * `handlers` is an array of functions which are passed a reference to the
 * component definitions (extracted by `resolver`) so that they can extract
 * information from it. They get also passed a reference to a `Documentation`
 * object to attach the information to. A reference to the parser is parsed as the
 * last argument.
 *
 * If `resolver` returns an array of component definitions, `parse` will return
 * an array of documentation objects. If `resolver` returns a single node
 * instead, `parse` will return a documentation object.
 */


function parse(src, resolver, handlers, options) {
  const parser = (0, _babelParser.default)(options);
  const ast = parser.parse(src);
  ast.__src = src;
  const componentDefinitions = resolver(ast, parser);

  if (Array.isArray(componentDefinitions)) {
    if (componentDefinitions.length === 0) {
      throw new Error(ERROR_MISSING_DEFINITION);
    }

    return executeHandlers(handlers, componentDefinitions, parser);
  } else if (componentDefinitions) {
    return executeHandlers(handlers, [componentDefinitions], parser)[0];
  }

  throw new Error(ERROR_MISSING_DEFINITION);
}