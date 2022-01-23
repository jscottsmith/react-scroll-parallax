/* global window */
import { addons, useEffect } from '@storybook/addons';
import dedent from 'ts-dedent';
import { SNIPPET_RENDERED, SourceType } from '../../shared';

function skipSourceRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  var isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.CODE;
} // By default, just remove indentation


function defaultTransformSource(source) {
  // Have to wrap dedent so it doesn't serialize the context
  return dedent(source);
}

function applyTransformSource(source, context) {
  var _context$parameters$d2, _docs$transformSource;

  var docs = (_context$parameters$d2 = context.parameters.docs) !== null && _context$parameters$d2 !== void 0 ? _context$parameters$d2 : {};
  var transformSource = (_docs$transformSource = docs.transformSource) !== null && _docs$transformSource !== void 0 ? _docs$transformSource : defaultTransformSource;
  return transformSource(source, context);
}

export function sourceDecorator(storyFn, context) {
  var _context$parameters$d3, _context$parameters$d4;

  var story = context !== null && context !== void 0 && (_context$parameters$d3 = context.parameters.docs) !== null && _context$parameters$d3 !== void 0 && (_context$parameters$d4 = _context$parameters$d3.source) !== null && _context$parameters$d4 !== void 0 && _context$parameters$d4.excludeDecorators ? context.originalStoryFn(context.args, context) : storyFn();
  var source;

  if (!skipSourceRender(context)) {
    if (typeof story === 'string') {
      source = story;
    } // eslint-disable-next-line no-undef
    else if (story instanceof Element) {
        source = story.outerHTML;
      }

    if (source) source = applyTransformSource(source, context);
  }

  useEffect(function () {
    if (source) addons.getChannel().emit(SNIPPET_RENDERED, context.id, source);
  });
  return story;
}