"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceDecorator = sourceDecorator;

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

var _litHtml = require("lit-html");

var _addons = require("@storybook/addons");

var _shared = require("../../shared");

/* global window */
function skipSourceRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  var isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _shared.SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === _shared.SourceType.CODE;
}

function applyTransformSource(source, context) {
  var _context$parameters$d2;

  var _ref = (_context$parameters$d2 = context.parameters.docs) !== null && _context$parameters$d2 !== void 0 ? _context$parameters$d2 : {},
      transformSource = _ref.transformSource;

  if (typeof transformSource !== 'function') return source;
  return transformSource(source, context);
}

function sourceDecorator(storyFn, context) {
  var _context$parameters$d3, _context$parameters$d4;

  var story = context !== null && context !== void 0 && (_context$parameters$d3 = context.parameters.docs) !== null && _context$parameters$d3 !== void 0 && (_context$parameters$d4 = _context$parameters$d3.source) !== null && _context$parameters$d4 !== void 0 && _context$parameters$d4.excludeDecorators ? context.originalStoryFn(context.args, context) : storyFn();
  var source;
  (0, _addons.useEffect)(function () {
    if (source) _addons.addons.getChannel().emit(_shared.SNIPPET_RENDERED, context.id, source);
  });

  if (!skipSourceRender(context)) {
    var container = window.document.createElement('div');
    (0, _litHtml.render)(story, container);
    source = applyTransformSource(container.innerHTML.replace(/<!---->/g, ''), context);
  }

  return story;
}