"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorators = exports.parameters = void 0;

var _extractArgTypes = require("./extractArgTypes");

var _docgen = require("../../lib/docgen");

var _jsxDecorator = require("./jsxDecorator");

var parameters = {
  docs: {
    inlineStories: true,
    // NOTE: that the result is a react element. Hooks support is provided by the outer code.
    prepareForInline: function prepareForInline(storyFn) {
      return storyFn();
    },
    extractArgTypes: _extractArgTypes.extractArgTypes,
    extractComponentDescription: _docgen.extractComponentDescription
  }
};
exports.parameters = parameters;
var decorators = [_jsxDecorator.jsxDecorator];
exports.decorators = decorators;