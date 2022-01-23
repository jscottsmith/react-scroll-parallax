function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { createElement } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import dedent from 'ts-dedent';
import deprecate from 'util-deprecate';
import { addons, useEffect } from '@storybook/addons';
import { logger } from '@storybook/client-logger';
import { SourceType, SNIPPET_RENDERED } from '../../shared';
import { getDocgenSection } from '../../lib/docgen';
import { isMemo, isForwardRef } from './lib';

/** Run the user supplied onBeforeRender function if it exists */
const applyBeforeRender = (domString, options) => {
  if (typeof options.onBeforeRender !== 'function') {
    return domString;
  }

  const deprecatedOnBeforeRender = deprecate(options.onBeforeRender, dedent`
      StoryFn.parameters.jsx.onBeforeRender was deprecated.
      Prefer StoryFn.parameters.jsx.transformSource instead.
      See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-onbeforerender for details.
    `);
  return deprecatedOnBeforeRender(domString);
};
/** Run the user supplied transformSource function if it exists */


const applyTransformSource = (domString, options, context) => {
  if (typeof options.transformSource !== 'function') {
    return domString;
  }

  return options.transformSource(domString, context);
};
/** Apply the users parameters and render the jsx for a story */


export const renderJsx = (code, options) => {
  if (typeof code === 'undefined') {
    logger.warn('Too many skip or undefined component');
    return null;
  }

  let renderedJSX = code;
  const Type = renderedJSX.type;

  for (let i = 0; i < options.skip; i += 1) {
    if (typeof renderedJSX === 'undefined') {
      logger.warn('Cannot skip undefined element');
      return null;
    }

    if (React.Children.count(renderedJSX) > 1) {
      logger.warn('Trying to skip an array of elements');
      return null;
    }

    if (typeof renderedJSX.props.children === 'undefined') {
      logger.warn('Not enough children to skip elements.');

      if (typeof renderedJSX.type === 'function' && renderedJSX.type.name === '') {
        renderedJSX = /*#__PURE__*/React.createElement(Type, renderedJSX.props);
      }
    } else if (typeof renderedJSX.props.children === 'function') {
      renderedJSX = renderedJSX.props.children();
    } else {
      renderedJSX = renderedJSX.props.children;
    }
  }

  const displayNameDefaults = typeof options.displayName === 'string' ? {
    showFunctions: true,
    displayName: () => options.displayName
  } : {
    // To get exotic component names resolving properly
    displayName: el => el.type.displayName || getDocgenSection(el.type, 'displayName') || (el.type.name !== '_default' ? el.type.name : null) || (typeof el.type === 'function' ? 'No Display Name' : null) || (isForwardRef(el.type) ? el.type.render.name : null) || (isMemo(el.type) ? el.type.type.name : null) || el.type
  };
  const filterDefaults = {
    filterProps: (value, key) => value !== undefined
  };
  const opts = Object.assign({}, displayNameDefaults, filterDefaults, options);
  const result = React.Children.map(code, c => {
    // @ts-ignore FIXME: workaround react-element-to-jsx-string
    const child = typeof c === 'number' ? c.toString() : c;
    let string = applyBeforeRender(reactElementToJSXString(child, opts), options);

    if (string.indexOf('&quot;') > -1) {
      const matches = string.match(/\S+=\\"([^"]*)\\"/g);

      if (matches) {
        matches.forEach(match => {
          string = string.replace(match, match.replace(/&quot;/g, "'"));
        });
      }
    }

    return string;
  }).join('\n');
  return result.replace(/function\s+noRefCheck\(\)\s+\{\}/, '() => {}');
};
const defaultOpts = {
  skip: 0,
  showFunctions: false,
  enableBeautify: true,
  showDefaultProps: false
};
export const skipJsxRender = context => {
  var _context$parameters$d;

  const sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  const isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.CODE;
};

const isMdx = node => {
  var _node$type, _node$props;

  return ((_node$type = node.type) === null || _node$type === void 0 ? void 0 : _node$type.displayName) === 'MDXCreateElement' && !!((_node$props = node.props) !== null && _node$props !== void 0 && _node$props.mdxType);
};

const mdxToJsx = node => {
  if (!isMdx(node)) return node;

  const _node$props2 = node.props,
        {
    originalType,
    children
  } = _node$props2,
        rest = _objectWithoutPropertiesLoose(_node$props2, ["mdxType", "originalType", "children"]);

  let jsxChildren = [];

  if (children) {
    const array = Array.isArray(children) ? children : [children];
    jsxChildren = array.map(mdxToJsx);
  }

  return /*#__PURE__*/createElement(originalType, rest, ...jsxChildren);
};

export const jsxDecorator = (storyFn, context) => {
  var _context$parameters$d2, _context$parameters$d3;

  const channel = addons.getChannel();
  const skip = skipJsxRender(context);
  const story = storyFn();
  let jsx = '';
  useEffect(() => {
    if (!skip) channel.emit(SNIPPET_RENDERED, (context || {}).id, jsx);
  }); // We only need to render JSX if the source block is actually going to
  // consume it. Otherwise it's just slowing us down.

  if (skip) {
    return story;
  }

  const options = Object.assign({}, defaultOpts, (context === null || context === void 0 ? void 0 : context.parameters.jsx) || {}); // Exclude decorators from source code snippet by default

  const storyJsx = context !== null && context !== void 0 && (_context$parameters$d2 = context.parameters.docs) !== null && _context$parameters$d2 !== void 0 && (_context$parameters$d3 = _context$parameters$d2.source) !== null && _context$parameters$d3 !== void 0 && _context$parameters$d3.excludeDecorators ? context.originalStoryFn(context.args, context) : story;
  const sourceJsx = mdxToJsx(storyJsx);
  const rendered = renderJsx(sourceJsx, options);

  if (rendered) {
    jsx = applyTransformSource(rendered, options, context);
  }

  return story;
};