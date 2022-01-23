"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parameters = exports.decorators = void 0;

var _sourceDecorator = require("./sourceDecorator");

var _prepareForInline = require("./prepareForInline");

var _shared = require("../../shared");

var decorators = [_sourceDecorator.sourceDecorator];
exports.decorators = decorators;
var parameters = {
  docs: {
    inlineStories: true,
    prepareForInline: _prepareForInline.prepareForInline,
    source: {
      type: _shared.SourceType.DYNAMIC,
      language: 'html'
    }
  }
};
exports.parameters = parameters;