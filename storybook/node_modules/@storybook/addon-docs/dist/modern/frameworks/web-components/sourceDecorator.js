/* global window */
import { render } from 'lit-html';
import { addons, useEffect } from '@storybook/addons';
import { SNIPPET_RENDERED, SourceType } from '../../shared';

function skipSourceRender(context) {
  var _context$parameters$d;

  const sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  const isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.CODE;
}

function applyTransformSource(source, context) {
  var _context$parameters$d2;

  const {
    transformSource
  } = (_context$parameters$d2 = context.parameters.docs) !== null && _context$parameters$d2 !== void 0 ? _context$parameters$d2 : {};
  if (typeof transformSource !== 'function') return source;
  return transformSource(source, context);
}

export function sourceDecorator(storyFn, context) {
  var _context$parameters$d3, _context$parameters$d4;

  const story = context !== null && context !== void 0 && (_context$parameters$d3 = context.parameters.docs) !== null && _context$parameters$d3 !== void 0 && (_context$parameters$d4 = _context$parameters$d3.source) !== null && _context$parameters$d4 !== void 0 && _context$parameters$d4.excludeDecorators ? context.originalStoryFn(context.args, context) : storyFn();
  let source;
  useEffect(() => {
    if (source) addons.getChannel().emit(SNIPPET_RENDERED, context.id, source);
  });

  if (!skipSourceRender(context)) {
    const container = window.document.createElement('div');
    render(story, container);
    source = applyTransformSource(container.innerHTML.replace(/<!---->/g, ''), context);
  }

  return story;
}