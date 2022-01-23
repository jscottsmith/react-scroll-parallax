"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorators = exports.parameters = void 0;

var _shared = require("../../shared");

var _compodoc = require("./compodoc");

var _sourceDecorator = require("./sourceDecorator");

var _prepareForInline = require("./prepareForInline");

var parameters = {
  docs: {
    // probably set this to true by default once it's battle-tested
    inlineStories: false,
    prepareForInline: _prepareForInline.prepareForInline,
    extractArgTypes: _compodoc.extractArgTypes,
    extractComponentDescription: _compodoc.extractComponentDescription,
    source: {
      type: _shared.SourceType.DYNAMIC,
      language: 'html'
    }
  }
};
exports.parameters = parameters;
var decorators = [_sourceDecorator.sourceDecorator];
exports.decorators = decorators;